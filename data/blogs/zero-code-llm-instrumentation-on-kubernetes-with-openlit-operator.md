---
title: Zero-Code LLM Instrumentation on Kubernetes with the OpenLIT Operator
date: '2026-03-29'
lastmod: '2026-03-29'
tags: ['openlit', 'kubernetes', 'operator', 'opentelemetry', 'auto-instrumentation', 'llm']
draft: false
summary: Auto-instrument Python LLM applications on Kubernetes without code changes using the OpenLIT Operator. Add a label, get full OpenTelemetry traces for every LLM call.
authors: ['OpenLIT']
images: ['/static/images/zero-code-k8s-llm-instrumentation.png']
---

# Zero-Code LLM Instrumentation on Kubernetes with the OpenLIT Operator

**TL;DR:** Add the label `openlit.io/instrument: "true"` to your Kubernetes pods and the OpenLIT Operator automatically injects LLM instrumentation — no code changes, no redeployments, no SDK installation. Every OpenAI, Anthropic, or LangChain call in your Python services starts producing OpenTelemetry traces.

---

## The Problem: Instrumenting Dozens of Services Is Tedious

You have 15 microservices. Seven of them make LLM calls. Three use OpenAI, two use Anthropic, one uses LangChain, and one uses LiteLLM.

The normal approach: go to each service, add `pip install openlit`, add `openlit.init()` to the entry point, configure the OTLP endpoint, test it, deploy it. Seven PRs, seven code reviews, seven deployments.

The operator approach: deploy the operator once, add a label to each service's pod spec, done.

## How the Operator Works

The OpenLIT Operator runs as a Kubernetes controller with a mutating admission webhook. When a pod with the `openlit.io/instrument: "true"` label is created, the operator:

1. **Injects an init container** that installs the OpenLIT Python SDK into a shared volume
2. **Sets up `sitecustomize.py`** so that Python automatically runs `openlit.init()` when the application starts
3. **Configures environment variables** for the OTLP endpoint, application name, and environment

Your application code doesn't change. It doesn't even know it's being instrumented.

```
┌────────────────────────────────────────────────┐
│                  Pod Creation                   │
│                                                 │
│  kubectl apply deployment.yaml                  │
│       ↓                                         │
│  Admission Webhook intercepts                   │
│       ↓                                         │
│  OpenLIT Operator mutates pod spec:             │
│    - Adds init container (installs SDK)         │
│    - Adds shared volume                         │
│    - Sets PYTHONPATH + env vars                 │
│    - Sets sitecustomize.py                      │
│       ↓                                         │
│  Pod starts → Python auto-imports openlit       │
│       ↓                                         │
│  All LLM calls are traced via OTLP             │
└────────────────────────────────────────────────┘
```

## Step-by-Step Setup

### 1. Deploy the Operator

```bash
kubectl apply -f https://raw.githubusercontent.com/openlit/openlit/main/operator/deploy/openlit-operator.yaml
```

This creates:

- The operator deployment in the `openlit-system` namespace
- A `MutatingWebhookConfiguration` that watches for labeled pods
- The necessary RBAC roles and service accounts
- TLS certificates for webhook communication

### 2. Create an AutoInstrumentation Resource

The `AutoInstrumentation` custom resource tells the operator what to instrument and where to send the data:

```yaml
apiVersion: openlit.io/v1alpha1
kind: AutoInstrumentation
metadata:
  name: openlit-instrumentation
  namespace: default
spec:
  selector:
    labels:
      openlit.io/instrument: "true"
  otlp:
    endpoint: "http://openlit.monitoring.svc.cluster.local:4318"
  python:
    image: ghcr.io/openlit/openlit-python-init:latest
  resource:
    environment: "production"
```

### 3. Label Your Deployments

Add the label to any deployment that makes LLM calls:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-chatbot
spec:
  template:
    metadata:
      labels:
        app: my-chatbot
        openlit.io/instrument: "true"   # <-- this is all you add
    spec:
      containers:
        - name: chatbot
          image: my-chatbot:latest
```

Apply it:

```bash
kubectl apply -f deployment.yaml
```

The next time a pod starts for this deployment, it will be auto-instrumented.

### 4. Verify It's Working

Check the pod's init containers:

```bash
kubectl describe pod -l app=my-chatbot
```

You should see an init container like `openlit-init` that ran successfully. Then check your OpenLIT dashboard or OTLP backend for incoming traces.

## What Gets Instrumented

The operator injects the full OpenLIT Python SDK, which means everything that `openlit.init()` normally instruments gets covered:

- **LLM Providers:** OpenAI, Anthropic, Cohere, Mistral, Groq, Bedrock, Ollama, vLLM, and 30+ more
- **Agent Frameworks:** LangChain, LangGraph, LlamaIndex, CrewAI, Pydantic AI, OpenAI Agents
- **Vector Databases:** Pinecone, Chroma, Qdrant, Milvus
- **Web Frameworks:** FastAPI, Flask, Django (if your service uses them)

The operator detects which libraries are imported at runtime and instruments only what's present.

## Configuring the Operator

The operator supports several configuration options via environment variables:

| Variable | Description | Default |
|---|---|---|
| `OPENLIT_OTLP_ENDPOINT` | Where to send OTLP data | `http://localhost:4318` |
| `OPENLIT_DEFAULT_ENVIRONMENT` | Default environment label | `default` |
| `WEBHOOK_PORT` | Webhook server port | `9443` |
| `WEBHOOK_FAILURE_POLICY` | What happens if webhook fails (`Fail` or `Ignore`) | `Ignore` |
| `CERT_VALIDITY_DAYS` | TLS cert validity | `365` |

Setting `WEBHOOK_FAILURE_POLICY` to `Ignore` is recommended for production — if the operator is down, pods still start normally without instrumentation rather than failing to schedule.

## Excluding Specific Services

Maybe you want to instrument everything in a namespace except one sensitive service. Use the `ignore` field in your `AutoInstrumentation` resource:

```yaml
spec:
  selector:
    labels:
      openlit.io/instrument: "true"
  ignore:
    labels:
      openlit.io/instrument: "false"
```

Or simply don't add the label to services you want to skip.

## Running OpenLIT on Kubernetes Too

If you're deploying the OpenLIT platform itself on Kubernetes, the natural setup is:

```
┌─────────────────────────────────────┐
│           Your K8s Cluster          │
│                                     │
│  ┌──────────┐   ┌───────────────┐  │
│  │ OpenLIT  │   │  ClickHouse   │  │
│  │ Platform │◄──│  (storage)    │  │
│  │ :3000    │   │               │  │
│  │ :4317/18 │   └───────────────┘  │
│  └──────────┘                      │
│       ▲                             │
│       │ OTLP                        │
│       │                             │
│  ┌────┴─────┐  ┌──────────┐       │
│  │ Service A │  │ Service B│       │
│  │ (labeled) │  │ (labeled)│       │
│  └──────────┘  └──────────┘       │
└─────────────────────────────────────┘
```

The OpenLIT Helm chart makes this straightforward:

```bash
helm repo add openlit https://openlit.github.io/helm-chart
helm repo update
helm install openlit openlit/openlit
```

Then point your `AutoInstrumentation` resource's OTLP endpoint to the OpenLIT service.

## Real-World Example: Instrumenting a FastAPI + LangChain Service

Here's a typical scenario. You have a FastAPI service that uses LangChain for RAG:

```python
# app.py — no OpenLIT code anywhere
from fastapi import FastAPI
from langchain_openai import ChatOpenAI
from langchain.chains import RetrievalQA

app = FastAPI()
llm = ChatOpenAI(model="gpt-4o")

@app.post("/ask")
async def ask(question: str):
    chain = RetrievalQA.from_chain_type(llm=llm, retriever=my_retriever)
    result = chain.invoke(question)
    return {"answer": result}
```

Deploy it on Kubernetes with the label:

```yaml
metadata:
  labels:
    openlit.io/instrument: "true"
```

Without touching `app.py`, you now get:

- Full trace of the `/ask` HTTP request (via FastAPI instrumentation)
- LangChain chain execution spans
- Individual OpenAI chat completion spans with tokens, cost, latency
- Retriever spans showing what documents were fetched

All stitched together in a single distributed trace.

## When to Use the Operator vs. the SDK

| Scenario | Use the Operator | Use the SDK |
|---|---|---|
| Many services, don't want to modify code | Yes | |
| Need fine-grained control over what's traced | | Yes |
| Platform team managing observability centrally | Yes | |
| Single service, quick setup | | Yes |
| Non-Python services (TypeScript, Go) | | Yes |
| Brownfield codebase you can't easily modify | Yes | |

The operator currently supports Python services. For TypeScript or Go, use the SDK directly.

---

## FAQ

**Does it work with non-Python services?**

The operator currently supports Python auto-instrumentation. TypeScript and Go support is on the roadmap. For those languages, use the OpenLIT SDK directly.

**Can I configure which providers to instrument?**

Yes. You can set `disabled_instrumentors` via environment variables in the `AutoInstrumentation` resource to exclude specific libraries from instrumentation.

**What happens if the operator is down?**

With the default `Ignore` failure policy, pods continue to start normally — they just won't be instrumented. No impact on your application availability.

**Does it add latency to pod startup?**

The init container adds a few seconds to pod startup (it installs the SDK). Once the pod is running, the instrumentation overhead is negligible — the same as running `openlit.init()` directly.

**Can I use it with an existing OTel Collector?**

Yes. Point the `otlp.endpoint` in the `AutoInstrumentation` resource to your existing OTel Collector. The data format is standard OTLP.
