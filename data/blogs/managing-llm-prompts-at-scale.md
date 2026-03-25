---
title: 'Managing LLM Prompts at Scale: Version Control, Variables, and Experiments'
date: '2026-04-03'
lastmod: '2026-04-03'
tags: ['openlit', 'prompt-management', 'prompt-hub', 'versioning', 'llm', 'experiments']
draft: false
summary: Manage LLM prompts with version control, variable templating, and A/B comparison using OpenLIT's Prompt Hub and OpenGround. Includes SDK integration examples.
authors: ['OpenLIT']
images: ['/static/images/blog/managing-llm-prompts-at-scale.png']
---

# Managing LLM Prompts at Scale: Version Control, Variables, and Experiments

**TL;DR:** Prompts are the most critical part of your LLM application, yet most teams manage them in code comments, Slack messages, or shared docs. OpenLIT's Prompt Hub gives you version control (semver), variable templating, and SDK-based retrieval. Pair it with OpenGround for side-by-side model comparisons before deploying prompt changes.

---

## The Prompt Management Problem

You have a system prompt that works great. Then someone changes it "just a little." Now the chatbot is hallucinating on edge cases that used to work fine. You want to roll back, but you can't remember what the previous version looked like because it was edited inline in the codebase three commits ago.

Sound familiar?

Here's what prompt management looks like at most teams:

- Prompts live as hardcoded strings in application code
- Changes go through the same PR process as code changes (which is slow for prompt iteration)
- No way to A/B test prompt versions without deploying code
- No history of what changed and when
- No way for non-engineers (product managers, domain experts) to edit prompts without a PR

This doesn't scale. Prompts change 10x more frequently than application logic, and they need a workflow that matches that cadence.

## OpenLIT Prompt Hub: Prompts as a Managed Resource

Prompt Hub treats prompts as first-class resources with:

- **Named prompts** — Give each prompt a descriptive name (e.g., `customer-support-v1`, `summarizer-concise`)
- **Semantic versioning** — Major.minor.patch versioning so you know when changes are breaking vs. incremental
- **Variable templating** — Use `{{variable}}` placeholders that get compiled at runtime
- **Access history** — See which versions are being used in production
- **UI-based editing** — Edit prompts in the OpenLIT dashboard without touching code

### Creating a Prompt in the UI

1. Open the OpenLIT dashboard → **Prompt Hub**
2. Click **Create Prompt**
3. Enter a name: `customer-support`
4. Write the prompt template:

```
You are a helpful customer support agent for {{company_name}}.

The customer's name is {{customer_name}} and they have a {{plan_type}} plan.

Answer their question based on the following documentation:
{{context}}

Be concise, friendly, and accurate. If you don't know the answer, say so.
```

5. Save it as version `1.0.0`

### Version Control

Each time you edit a prompt, you choose the version increment:

- **Patch** (1.0.0 → 1.0.1): Typo fix, minor wording change. No behavioral impact expected.
- **Minor** (1.0.0 → 1.1.0): Added a new instruction or constraint. Behavior may change slightly.
- **Major** (1.0.0 → 2.0.0): Complete rewrite or structural change. Behavior will change significantly.

This gives your team a shared language for prompt changes. "We shipped a major version of the support prompt" means something different than "we patched a typo."

## Fetching Prompts from the SDK

### Python

```python
import openlit
from openai import OpenAI

openlit.init()

prompt = openlit.get_prompt(
    url="http://localhost:3000",     # or set OPENLIT_URL env var
    api_key="your-openlit-api-key",  # or set OPENLIT_API_KEY env var
    name="customer-support",
    version="1.0.0",                 # optional: omit to get latest
    should_compile=True,
    variables={
        "company_name": "Acme Corp",
        "customer_name": "Alice",
        "plan_type": "enterprise",
        "context": "Enterprise plan includes 24/7 support and 99.9% SLA...",
    },
)

client = OpenAI()
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": prompt["content"]},
        {"role": "user", "content": "What SLA do I get?"},
    ],
)
```

### TypeScript

```typescript
import Openlit from "openlit";
import OpenAI from "openai";

Openlit.init();

const prompt = await Openlit.getPrompt({
  url: "http://localhost:3000",
  apiKey: "your-openlit-api-key",
  name: "customer-support",
  version: "1.0.0",
  shouldCompile: true,
  variables: {
    company_name: "Acme Corp",
    customer_name: "Alice",
    plan_type: "enterprise",
    context: "Enterprise plan includes 24/7 support and 99.9% SLA...",
  },
});

const client = new OpenAI();
const response = await client.chat.completions.create({
  model: "gpt-4o",
  messages: [
    { role: "system", content: prompt.content },
    { role: "user", content: "What SLA do I get?" },
  ],
});
```

### Key Parameters

| Parameter | Description |
|---|---|
| `name` | The prompt name in Prompt Hub |
| `prompt_id` | Alternative to name — use the prompt's unique ID |
| `version` | Specific version to fetch. Omit to get the latest |
| `should_compile` | If `True`, variables are substituted before returning |
| `variables` | Dictionary of values for `{{variable}}` placeholders |
| `meta_properties` | Additional metadata to record with the access |

## Variable Templating

Variables use double-curly-brace syntax: `{{variable_name}}`. When you call `get_prompt` with `should_compile=True`, the SDK substitutes variables before returning the prompt.

This keeps your prompts dynamic without hardcoding values:

```
Template: "Translate the following {{source_language}} text to {{target_language}}: {{text}}"

Variables: {
  "source_language": "English",
  "target_language": "Spanish",
  "text": "Hello, how are you?"
}

Compiled: "Translate the following English text to Spanish: Hello, how are you?"
```

If a variable in the template doesn't have a corresponding value, it stays as `{{variable_name}}` in the output — so you can debug missing variables easily.

## Testing Prompts with OpenGround

Before deploying a new prompt version to production, test it with OpenGround — OpenLIT's built-in LLM comparison playground.

OpenGround lets you:

1. **Compare models side by side.** Send the same prompt to GPT-4o and Claude Sonnet and see both responses.
2. **Compare prompt versions.** Send prompt v1.0.0 and v2.0.0 to the same model and compare outputs.
3. **Iterate quickly.** Edit the prompt, test it, see results immediately — no code deployment.

### Workflow: Prompt Hub + OpenGround + Production

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Prompt Hub  │     │  OpenGround  │     │  Production  │
│              │     │              │     │              │
│  Draft v2.0  │────►│  Test v2.0   │────►│  Deploy v2.0 │
│  (edit UI)   │     │  vs v1.0     │     │  (SDK fetch) │
│              │     │  (compare)   │     │              │
└──────────────┘     └──────────────┘     └──────────────┘
                                                │
                                                ▼
                                          ┌──────────────┐
                                          │   Tracing    │
                                          │              │
                                          │  Monitor v2.0│
                                          │  performance │
                                          └──────────────┘
```

1. **Draft** the new prompt version in Prompt Hub
2. **Test** it in OpenGround against the current version
3. **Deploy** by updating the version in your SDK call (or just omit version to always get latest)
4. **Monitor** the new version's performance in traces

## Tying Prompts to Traces

When you fetch a prompt via the SDK and use it in an LLM call, OpenLIT can link the prompt version to the resulting trace. This means you can:

- Filter traces by prompt version ("show me all requests that used customer-support v2.0.0")
- Compare quality metrics across prompt versions
- Identify regressions quickly ("hallucination rate increased after prompt v2.1.0")

The meta_properties parameter helps with this:

```python
prompt = openlit.get_prompt(
    name="customer-support",
    version="2.0.0",
    should_compile=True,
    variables={...},
    meta_properties={
        "experiment": "prompt-v2-rollout",
        "traffic_percentage": "10%",
    },
)
```

## Prompt Management Best Practices

**Separate prompts from code.** Application logic shouldn't contain prompt strings. Fetch them from Prompt Hub at runtime. This decouples prompt iteration from code deployments.

**Use semantic versioning meaningfully.** Reserve major versions for structural changes. Use minor for new instructions. Use patch for wording tweaks. This helps your team communicate about changes.

**Test before deploying.** Use OpenGround to compare the new version against the current one. Check edge cases, not just the happy path.

**Monitor after deploying.** Watch hallucination rates, user satisfaction signals, and latency after a prompt change. The trace data tells you if the change helped or hurt.

**Keep variables minimal.** A prompt with 15 variables is hard to reason about. If you need that many dynamic parts, consider splitting into multiple prompts.

**Document your prompts.** Use the prompt name and version as documentation. A team should be able to look at `customer-support v2.1.0` and understand what it does without reading the full template.

## Storing Secrets Alongside Prompts

If your prompt workflow involves API keys (for the LLM provider, for eval models, etc.), store them in OpenLIT's **Vault** instead of environment variables or config files. The Vault:

- Encrypts secrets at rest
- Provides API access from the SDK
- Integrates with the evaluation config (for auto-eval API keys)

```python
secret = openlit.get_secrets(
    url="http://localhost:3000",
    api_key="your-openlit-api-key",
    key="openai-api-key",
)
```

This keeps your entire prompt management workflow — from drafting to testing to deploying to monitoring — within OpenLIT.

---

## FAQ

**Can I use Prompt Hub with LangChain?**

Yes. Fetch the prompt with `openlit.get_prompt()`, then pass the compiled content to your LangChain chain as a string. Prompt Hub is framework-agnostic — it returns a string that you can use anywhere.

**Is there an API for CI/CD?**

The `get_prompt` function works in CI/CD pipelines. You can write tests that fetch a prompt version, run it against test cases, and assert on output quality. If assertions fail, the pipeline fails.

**Can multiple teams manage different prompts?**

Yes. Each prompt is independent. Different teams can own different prompts. Access is controlled through the OpenLIT API key.

**What happens if Prompt Hub is down?**

The SDK call to `get_prompt` will fail. For production resilience, consider caching the last fetched prompt locally and using it as a fallback. You can also embed a default prompt in your code as a last resort.

**Can I export/import prompts?**

Prompts are stored in OpenLIT's database (SQLite by default, configurable). You can export them via the API and import them into another OpenLIT instance.
