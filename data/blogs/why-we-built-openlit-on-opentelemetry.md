---
title: Why We Built OpenLIT on OpenTelemetry (and What It Means for Your Stack)
date: '2026-04-04'
lastmod: '2026-04-04'
tags: ['openlit', 'opentelemetry', 'architecture', 'otlp', 'vendor-neutral', 'llm']
draft: false
summary: The architectural decision behind building OpenLIT as an OTel-native LLM observability platform. How OpenTelemetry GenAI semantic conventions, OTLP, and Fleet Hub enable vendor-neutral AI monitoring.
authors: ['OpenLIT']
images: ['/static/images/blog/why-openlit-on-opentelemetry.png']
---

# Why We Built OpenLIT on OpenTelemetry (and What It Means for Your Stack)

**TL;DR:** We built OpenLIT on OpenTelemetry because your LLM observability data shouldn't be locked into one vendor's format. Every trace, metric, and log that OpenLIT produces is standard OTLP — sendable to Grafana, Datadog, New Relic, or any of the 40+ OTLP-compatible backends. This was a deliberate architectural decision, and this post explains why.

---

## The Problem with Proprietary LLM Observability

Most LLM observability tools work like this:

1. You install their SDK
2. Your LLM calls produce telemetry in their proprietary format
3. The telemetry goes to their backend (and only their backend)
4. You view it in their UI (and only their UI)

This creates a dependency chain. Your instrumentation code, your data format, your storage, and your dashboards are all tied to one vendor. Want to switch? Re-instrument everything. Want to combine LLM telemetry with your existing backend monitoring? Build a custom integration.

We've seen this pattern before. It's exactly how APM worked before OpenTelemetry came along. Every vendor had their own agent, their own protocol, and their own lock-in. OpenTelemetry broke that cycle for backend services. We wanted to break it for LLM observability.

## The Bet on OpenTelemetry

When we started OpenLIT, we had a choice: build a proprietary ingestion API (faster to build, tighter integration) or build on OpenTelemetry (harder to build, better for users). We chose OTel.

Here's why.

### Reason 1: Your Team Already Uses OTel

If you're running production services, there's a good chance you already have OpenTelemetry instrumentation. Your backend services emit traces. Your infrastructure emits metrics. You have an OTel Collector pipeline routing data to Grafana or Datadog.

Adding LLM observability shouldn't mean adding a separate telemetry pipeline. With OpenLIT, your LLM traces and metrics flow through the same Collector, land in the same backend, and show up in the same dashboards as your HTTP latency, database queries, and error rates.

One pipeline. One set of tools. One place to look.

### Reason 2: GenAI Semantic Conventions Exist

OpenTelemetry isn't just a transport protocol. It defines **semantic conventions** — standardized attribute names for different types of telemetry. The [GenAI semantic conventions](https://opentelemetry.io/docs/specs/semconv/gen-ai/) define attributes for:

- `gen_ai.system` — the LLM provider (openai, anthropic, etc.)
- `gen_ai.request.model` — the model name
- `gen_ai.usage.input_tokens` — prompt token count
- `gen_ai.usage.output_tokens` — completion token count
- `gen_ai.request.temperature` — the temperature parameter
- And many more

When OpenLIT emits a trace, it uses these standard attribute names. This means any tool that understands OTel GenAI conventions can parse your data correctly — not just OpenLIT's UI.

We've actively aligned our SDK with these conventions. Recent work (visible in our commit history: `feat: Align with OpenTelemetry GenAI Semconv`, `feat: Adopt OpenTelemetry Semantic convention in GenAI spans`) ensures that OpenLIT stays in sync as the conventions evolve.

### Reason 3: The Export-Anywhere Architecture

Because OpenLIT produces OTLP, you pick where the data goes:

```
Your Application
      │
      │ openlit.init()
      │
      ▼
OpenLIT SDK (produces OTLP)
      │
      ▼
OTel Collector (optional, for routing/processing)
      │
      ├──► OpenLIT Platform (ClickHouse)
      ├──► Grafana Cloud (Tempo + Mimir)
      ├──► Datadog
      ├──► New Relic
      ├──► Elastic APM
      ├──► SigNoz
      ├──► Dynatrace
      ├──► Jaeger
      ├──► Prometheus + Tempo
      └──► Any OTLP-compatible backend
```

You can even send data to multiple backends simultaneously. Run OpenLIT's platform for the LLM-specific UI while also sending data to your team's existing Grafana setup. No duplication of instrumentation — the Collector fans out.

### Reason 4: You Can Leave Without Pain

This might sound like a weird selling point, but it matters: if you stop using OpenLIT tomorrow, your data and your pipeline still work.

- Your OTel Collector config doesn't change
- Your Grafana dashboards still show LLM data
- Your alerting rules still fire
- You just lose the OpenLIT-specific UI features

With a proprietary tool, leaving means re-instrumenting every service and losing access to historical data. With OTel-native, the lock-in surface is minimal.

## How It Works Under the Hood

### The SDK: TracerProvider and MeterProvider

When you call `openlit.init()`, the SDK sets up OpenTelemetry's standard components:

**TracerProvider** — Creates a tracer that emits spans for every LLM call. Spans are batched and exported via OTLP HTTP or gRPC.

**MeterProvider** — Creates a meter that emits histograms and counters for token usage, latency, and cost. Metrics are exported on a separate OTLP channel.

**Resource attributes** — Every signal carries:
- `service.name` — your application name
- `deployment.environment` — your environment (production, staging, etc.)
- `telemetry.sdk.name` — "openlit"

You can pass your own `tracer` and `meter` instances if you want to use an existing OTel setup:

```python
from opentelemetry import trace, metrics

my_tracer = trace.get_tracer("my-app")
my_meter = metrics.get_meter("my-app")

openlit.init(
    tracer=my_tracer,
    meter=my_meter,
)
```

### Evaluations as OTel Signals

Even evaluations (hallucination, toxicity, bias) produce OTel data. When you run `detector.measure(...)`, the result is emitted as an OTel Log Record by default:

```python
openlit.init(evals_logs_export=True)  # default
```

This means eval results show up in the same pipeline as your traces and metrics. Filter logs by `guard: hallucination` in your backend to see all flagged responses.

You can also configure eval results as OTel Events (attached to spans) for tighter trace correlation.

### The Hosted Stack: OTel Collector + ClickHouse

The self-hosted OpenLIT platform includes an embedded OTel Collector that receives OTLP and exports to ClickHouse:

```yaml
# otel-collector-config.yaml (simplified)
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318

exporters:
  clickhouse:
    endpoint: clickhouse:9000
    database: openlit
    traces_table_name: otel_traces
    metrics_table_name: otel_metrics
    logs_table_name: otel_logs

service:
  pipelines:
    traces:
      receivers: [otlp]
      exporters: [clickhouse]
    metrics:
      receivers: [otlp]
      exporters: [clickhouse]
    logs:
      receivers: [otlp]
      exporters: [clickhouse]
```

This is a standard OTel Collector config. You can modify it to add processors (filtering, sampling, attribute enrichment), add more exporters (fan out to Grafana and ClickHouse simultaneously), or replace ClickHouse with something else entirely.

## Fleet Hub: Managing OTel Collectors at Scale

If you have many services across many environments, you probably run multiple OTel Collectors. Managing their configurations is a pain — update the config on one Collector, restart it, hope it works, repeat 30 times.

OpenLIT's **Fleet Hub** solves this with **OpAMP** (Open Agent Management Protocol) — an OpenTelemetry standard for remotely managing Collectors:

- View all your Collectors in one dashboard
- Push configuration updates remotely
- Monitor Collector health and throughput
- No SSH, no Kubernetes rollouts, no manual restarts

This is particularly useful for platform teams managing LLM observability across a large organization. Fleet Hub makes the OTel Collector fleet a managed resource rather than a manual chore.

## The Practical Impact

Here's what the OTel-native architecture enables in day-to-day work:

**Unified dashboards.** Your Grafana dashboard shows HTTP latency, database query time, LLM token usage, and GPU utilization — all from the same data pipeline. No switching between tools.

**Existing alerting works.** Your PagerDuty integration, your Slack alerting, your Grafana alerts — they all work on LLM data because it's the same metrics format they already understand.

**Sampling and filtering.** Use your existing OTel Collector tail sampling to control which LLM traces get stored. Keep all traces for errors, sample 10% for successful requests.

**Compliance and data residency.** Route data through your existing OTel Collector pipeline. Apply the same data masking, PII scrubbing, and routing rules you use for other telemetry.

**Incremental adoption.** You don't need to rip and replace anything. Add `openlit.init()` to one service, see the data flow into your existing stack, and roll out from there.

## The Tradeoff

Being OTel-native isn't free. There are tradeoffs:

**Complexity of generic vs. specialized.** A proprietary tool can optimize its UI, storage, and queries for exactly the data it produces. OpenLIT's platform is optimized for ClickHouse, but if you're sending data to a generic Grafana instance, you lose some LLM-specific UI niceties.

**Convention evolution.** The GenAI semantic conventions are still evolving. When they change, we update the SDK — which means attribute names can shift between versions. We try to make this smooth, but it's inherent to building on a moving standard.

**OTel ecosystem maturity.** OTel for LLMs is newer than OTel for HTTP services. Some tooling in the ecosystem doesn't have GenAI-specific features yet. This is improving rapidly, but it's not at the same maturity level as traditional APM.

We think these tradeoffs are worth it. Vendor independence and ecosystem interoperability matter more in the long run than short-term UI optimization.

## Getting Started

```bash
pip install openlit
```

```python
import openlit

# Send to your existing OTel Collector
openlit.init(otlp_endpoint="http://your-collector:4318")

# Or send to Grafana Cloud directly
openlit.init(
    otlp_endpoint="https://otlp-gateway-prod-us-east-0.grafana.net/otlp",
    otlp_headers={"Authorization": "Basic YOUR_TOKEN"},
)

# Or run the full OpenLIT platform
# docker compose up -d
openlit.init()  # defaults to localhost:4318
```

Your LLM calls are now producing standard OpenTelemetry data. Do with it whatever you want.

---

## FAQ

**Can I use OpenLIT with my existing Grafana setup?**

Yes. Point `otlp_endpoint` to your Grafana OTLP gateway (or to an OTel Collector that exports to Grafana Cloud). Traces land in Tempo, metrics in Mimir/Prometheus.

**Do I need to run ClickHouse?**

Only if you want to use the OpenLIT platform UI. If you're sending data to Grafana, Datadog, or another backend, you don't need ClickHouse at all. The SDK is independent of the storage backend.

**What if I want both OpenLIT's UI and Grafana?**

Add a second exporter to your OTel Collector config. One exports to ClickHouse (for OpenLIT), the other to your Grafana backend. Both get the same data, no instrumentation changes needed.

**Is OpAMP / Fleet Hub required?**

No. Fleet Hub is optional. If you manage your OTel Collectors manually or through Kubernetes ConfigMaps, that works fine. Fleet Hub is useful at scale (10+ Collectors).

**How do I contribute to the GenAI semantic conventions?**

The conventions are defined in the [OpenTelemetry specification repo](https://github.com/open-telemetry/semantic-conventions). Contributions are welcome — and using them in production (via tools like OpenLIT) provides valuable feedback to the working group.
