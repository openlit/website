---
title: 'Tracking LLM Costs in Production: Per-Model, Per-Request, Per-User Attribution'
date: '2026-03-31'
lastmod: '2026-03-31'
tags: ['openlit', 'cost-tracking', 'finops', 'llm', 'opentelemetry', 'production']
draft: false
summary: Break down LLM costs by model, service, user, and environment using OpenLIT. Auto-calculated token costs exported as OpenTelemetry metrics to Grafana, Datadog, or any backend.
authors: ['OpenLIT']
images: ['/static/images/blog/llm-cost-tracking-production.png']
---

# Tracking LLM Costs in Production: Per-Model, Per-Request, Per-User Attribution

**TL;DR:** OpenLIT auto-calculates the cost of every LLM call based on model, token count, and a configurable pricing table. Costs are exported as OpenTelemetry metrics, so you can break them down by service, environment, model, or any custom attribute — and send the data to Grafana, Datadog, or wherever you already monitor things.

---

## The Problem: Your LLM Bill Is a Black Box

You get an invoice from OpenAI at the end of the month. It says $4,200. You have questions:

- Which service spent the most?
- Was it the summarization feature or the chatbot?
- Did someone's runaway test loop burn $800 over the weekend?
- Is GPT-4o actually worth the premium over GPT-4o-mini for this use case?

The provider dashboard gives you total tokens and total cost. It doesn't tell you which part of your application consumed what. And if you're using multiple providers (OpenAI + Anthropic + Bedrock), you're reconciling across three different billing dashboards.

You need per-request cost attribution at the application level.

## How OpenLIT Tracks Costs

When you call `openlit.init()`, every LLM request is automatically traced with:

- **Model name** (e.g., `gpt-4o`, `claude-sonnet-4-20250514`)
- **Input tokens** (prompt tokens)
- **Output tokens** (completion tokens)
- **Calculated cost** (based on the model's pricing)

The cost calculation happens inside the SDK using a pricing table. Here's the flow:

```
LLM Call → SDK intercepts → counts tokens → looks up price → emits span + metric
```

### A Minimal Example

```python
import openlit
from openai import OpenAI

openlit.init(
    otlp_endpoint="http://localhost:4318",
    application_name="summarizer",
    environment="production",
)

client = OpenAI()
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Summarize this quarterly report..."}],
)
```

The trace span for this request will include attributes like:

```
gen_ai.usage.input_tokens: 1420
gen_ai.usage.output_tokens: 380
gen_ai.usage.cost: 0.0142
gen_ai.request.model: gpt-4o
gen_ai.system: openai
deployment.environment: production
service.name: summarizer
```

That `gen_ai.usage.cost` value is auto-calculated. You didn't have to look up pricing or do any math.

## How Pricing Works

OpenLIT ships with a built-in pricing table that covers major models from OpenAI, Anthropic, Cohere, Mistral, Google, and others. The table is maintained in a `pricing.json` file that maps model names to per-token costs.

A simplified version looks like this:

```json
{
  "chat": {
    "gpt-4o": {"input": 0.0025, "output": 0.01},
    "gpt-4o-mini": {"input": 0.00015, "output": 0.0006},
    "claude-sonnet-4-20250514": {"input": 0.003, "output": 0.015}
  },
  "embeddings": {
    "text-embedding-3-small": 0.00002,
    "text-embedding-ada-002": 0.0001
  },
  "images": {
    "dall-e-3": {
      "standard": {"1024x1024": 0.040}
    }
  }
}
```

Prices are per 1,000 tokens (for chat/completions) or per unit (for images/embeddings).

### Using Custom Pricing

If you're using a model that isn't in the default table — say a fine-tuned model or a provider with custom pricing — you can supply your own:

```python
openlit.init(
    pricing_json="/path/to/my-pricing.json",
)
```

Or pass a URL:

```python
openlit.init(
    pricing_json="https://internal.example.com/llm-pricing.json",
)
```

The SDK fetches and caches it at startup. Use the same JSON structure as the default table, and your custom models will get accurate cost tracking.

## Breaking Down Costs by Dimension

Once cost data is flowing, you can slice it by any attribute attached to the trace or metric. The most useful breakdowns:

### By Service / Application

If you set `application_name` per service, costs naturally break down:

```python
# Service A
openlit.init(application_name="chatbot")

# Service B
openlit.init(application_name="summarizer")

# Service C
openlit.init(application_name="code-review-agent")
```

Now you can answer: "The chatbot costs $2,100/month, the summarizer costs $1,400/month, and the code-review agent costs $700/month."

### By Model

Every span includes the model name, so you can aggregate cost by model:

- GPT-4o: $2,800/month
- GPT-4o-mini: $600/month
- Claude Sonnet: $800/month

This helps you decide when to downgrade. If GPT-4o-mini gives 90% of the quality for 15% of the cost on your summarization task, the numbers make the decision obvious.

### By Environment

```python
openlit.init(environment="production")  # vs "staging" vs "development"
```

If your staging environment is burning $500/month on LLM calls, you probably want to know about it. Common fix: use a cheaper model in staging or add rate limits.

### By User (Custom Attributes)

To track costs per user, you need to add the user ID as a span attribute. OpenTelemetry makes this straightforward:

```python
from opentelemetry import trace

tracer = trace.get_tracer(__name__)

def handle_request(user_id: str, message: str):
    with tracer.start_as_current_span("user-request") as span:
        span.set_attribute("user.id", user_id)

        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": message}],
        )
        return response.choices[0].message.content
```

Now the LLM span (auto-created by OpenLIT) is a child of your `user-request` span. In your dashboard, you can group costs by `user.id`.

## Building Cost Dashboards

### In the OpenLIT Platform

The self-hosted OpenLIT dashboard includes built-in cost views:

1. **Total cost over time** — see daily/weekly/monthly trends
2. **Cost by model** — bar chart breaking down spend per model
3. **Cost by application** — which service is costing you the most
4. **Individual request costs** — drill into specific expensive calls

You can also build custom dashboards with the dashboard builder, adding widgets that query ClickHouse directly.

### In Grafana

Since OpenLIT exports OTLP, you can build Grafana dashboards with:

- **Prometheus/Mimir** for cost metrics (histograms, counters)
- **Tempo** for trace details with cost attributes

Example PromQL for daily cost by model:

```
sum by (gen_ai_request_model) (
  rate(gen_ai_usage_cost_total[24h])
)
```

### In Datadog

Send OTLP to Datadog's OTLP endpoint. Cost data shows up as custom metrics. Create monitors like:

- Alert if daily cost exceeds $X
- Alert if a single request costs more than $Y (indicates a runaway prompt)
- Weekly cost trend report by service

## Setting Up Budget Alerts

The combination of per-request cost tracking and standard metrics backends gives you alerting for free:

**Alert: Daily spend exceeds budget**

Set up a Grafana or Datadog alert on the cumulative daily cost metric. If `sum(gen_ai.usage.cost)` over the last 24 hours exceeds your threshold, fire an alert.

**Alert: Anomalous request cost**

Some requests cost 100x the average because of unexpectedly long prompts or completions. Track the p99 of `gen_ai.usage.cost` and alert if it suddenly spikes.

**Alert: New model appeared**

If someone deploys code that uses an expensive model you didn't approve, you'll see a new `gen_ai.request.model` value in your metrics. Alert on new label values.

## Cost Optimization Strategies

Once you have visibility, optimization follows naturally:

**Switch models where quality allows.** Compare `gpt-4o` vs `gpt-4o-mini` cost with side-by-side quality (use OpenLIT's OpenGround for this). If quality is similar, switch and save 80%.

**Cache repeated prompts.** If you see the same prompt pattern in traces (e.g., summarization of the same document), add a cache layer. Zero LLM cost for cache hits.

**Reduce context length.** If your RAG pipeline stuffs 10 documents into context but the LLM only uses 2, reduce the context window. Fewer input tokens = lower cost.

**Set max_tokens.** If your completion only needs 100 tokens, set `max_tokens=100`. This prevents the model from generating unnecessarily long responses.

**Batch where possible.** Some providers offer lower per-token pricing for batch API calls. If latency isn't critical, batch requests.

## A Complete Cost Tracking Setup

Here's a production-ready setup with cost tracking, custom attributes, and Grafana export:

```python
import openlit
from openai import OpenAI
from opentelemetry import trace

openlit.init(
    otlp_endpoint="https://grafana-otlp.example.com/otlp",
    otlp_headers={"Authorization": "Bearer YOUR_GRAFANA_TOKEN"},
    application_name="my-saas-api",
    environment="production",
)

client = OpenAI()
tracer = trace.get_tracer(__name__)

def generate_response(user_id: str, tier: str, prompt: str) -> str:
    model = "gpt-4o" if tier == "enterprise" else "gpt-4o-mini"

    with tracer.start_as_current_span("generate") as span:
        span.set_attribute("user.id", user_id)
        span.set_attribute("user.tier", tier)

        response = client.chat.completions.create(
            model=model,
            messages=[{"role": "user", "content": prompt}],
        )
        return response.choices[0].message.content
```

Now you can answer: "Enterprise users cost us $X/month on GPT-4o, free-tier users cost $Y/month on GPT-4o-mini."

---

## FAQ

**How do I add custom model pricing?**

Create a JSON file following the same structure as the default `pricing.json` and pass it to `openlit.init(pricing_json="/path/to/custom.json")`. You can also pass a URL to load pricing from a remote server.

**Does it work with fine-tuned models?**

Yes. Add your fine-tuned model's name and pricing to a custom pricing JSON. The model name in the JSON must match the model name you pass to the provider's API.

**What if the pricing table is outdated?**

The default pricing table is updated with each SDK release. Between releases, you can override with a custom JSON pointing to a URL that you control and update as needed.

**How accurate is the cost calculation?**

It's based on the token count reported by the provider and the per-token price in the pricing table. For chat/completion models, accuracy is very high. For image and embedding models, it depends on the pricing model (per-image, per-token, etc.).

**Can I track costs across multiple providers?**

Yes. OpenLIT instruments all providers uniformly. If a request goes to OpenAI and another to Anthropic, both get cost attributes. Aggregate them in your dashboard for a unified view.
