---
title: 'GPU Monitoring for LLM Inference: What to Track and Why It Matters'
date: '2026-03-27'
lastmod: '2026-03-27'
tags: ['openlit', 'gpu', 'nvidia', 'opentelemetry', 'infrastructure', 'llm']
draft: false
summary: Learn which GPU metrics matter for LLM inference workloads and how to collect them as OpenTelemetry signals using OpenLIT's GPU collector. Supports NVIDIA and AMD.
authors: ['OpenLIT']
images: ['/static/images/blog/gpu-monitoring-llm-inference.png']
---

# GPU Monitoring for LLM Inference: What to Track and Why It Matters

**TL;DR:** GPUs are the most expensive part of your AI stack, but most teams have zero visibility into how they're being used. OpenLIT's OTel GPU collector exports utilization, memory, temperature, and power metrics as standard OpenTelemetry signals — so you can correlate GPU health with inference performance in the same dashboard.

---

## Your GPU Bill Is Probably Your Biggest AI Cost

If you're running LLM inference — whether it's a self-hosted vLLM instance, an Ollama setup, or a fine-tuned model on a GPU cluster — the GPU is where most of your money goes.

And yet, most LLM observability tools completely ignore the GPU layer. They'll tell you that an inference call took 3 seconds, but not that the GPU was already at 95% utilization when the request came in, or that thermal throttling kicked in because the fans weren't keeping up.

If you're not monitoring GPUs, you're flying blind on the most expensive component of your stack.

## The Metrics That Actually Matter

Not all GPU metrics are equally useful. Here's what to focus on for LLM inference workloads:

### Utilization

**`gpu.utilization`** — Percentage of time the GPU's compute cores are active. This is your primary indicator of whether the GPU is doing work or sitting idle.

- **Below 30%:** You're over-provisioned. Consider a smaller GPU or batching more requests.
- **70-90%:** Healthy range for inference workloads.
- **Above 95%:** You're saturated. Requests are likely queuing and latency is climbing.

### Memory

**`gpu.memory.used`** and **`gpu.memory.available`** — LLM inference is memory-bound. A 7B parameter model in FP16 needs ~14GB of VRAM just to load. If you're running out of GPU memory, you'll hit OOM errors or fall back to CPU offloading (which destroys performance).

Track the ratio of used to available memory. If it's consistently above 85%, you're one large batch away from trouble.

### Temperature

**`gpu.temperature`** — GPUs thermal-throttle when they get too hot. NVIDIA GPUs typically start throttling around 83-90°C depending on the model. When throttling kicks in, your inference latency spikes unpredictably.

If you see temperature climbing over time, it usually means cooling is insufficient — bad airflow, dust buildup, or an undersized cooling solution.

### Power

**`gpu.power.draw`** and **`gpu.power.limit`** — Power draw correlates directly with compute load. Watching power usage helps you:

- Estimate electricity costs per inference request
- Detect power throttling (when draw hits the limit, clocks get reduced)
- Right-size your power budget for capacity planning

### Encoder/Decoder Utilization

**`gpu.enc.utilization`** and **`gpu.dec.utilization`** — These are relevant if your pipeline involves video or media processing alongside LLM calls. For pure text inference, these will usually be near zero.

## NVIDIA vs AMD: What's Available

OpenLIT supports both NVIDIA and AMD GPUs, but the metric coverage differs slightly:

| Metric | NVIDIA (NVML) | AMD (SMI) |
|---|---|---|
| GPU utilization | Yes | Yes |
| Memory used/available | Yes | Yes |
| Temperature | Yes | Yes |
| Power draw | Yes | Yes |
| Fan speed | Yes | Yes |
| Encoder/decoder utilization | Yes | No |

NVIDIA provides the most complete telemetry through NVML (NVIDIA Management Library). AMD support comes through ROCm SMI and covers the essentials.

## How OpenLIT's GPU Collector Works

OpenLIT gives you two ways to collect GPU metrics:

### Option 1: Standalone OTel GPU Collector (Docker)

Run it as a sidecar or standalone container on any machine with GPUs:

```bash
docker run -d \
  --gpus all \
  -e GPU_APPLICATION_NAME="my-inference-service" \
  -e GPU_ENVIRONMENT="production" \
  -e OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4318" \
  ghcr.io/openlit/otel-gpu-collector:latest
```

This container continuously collects GPU metrics and exports them via OTLP. It works alongside whatever inference server you're running — vLLM, TGI, Ollama, or a custom setup.

The exported metrics include:

| Metric Name | Description | Unit |
|---|---|---|
| `gpu.utilization` | GPU compute utilization | percent |
| `gpu.enc.utilization` | GPU encoder utilization | percent |
| `gpu.dec.utilization` | GPU decoder utilization | percent |
| `gpu.temperature` | GPU temperature | Celsius |
| `gpu.fan_speed` | GPU fan speed | percent |
| `gpu.memory.used` | GPU memory used | bytes |
| `gpu.memory.available` | GPU memory available | bytes |
| `gpu.power.draw` | Current GPU power draw | watts |
| `gpu.power.limit` | GPU power limit | watts |

Each metric includes attributes like `gpu_index`, `gen_ai.application_name`, and `gen_ai.environment` so you can filter and group across multi-GPU setups.

### Option 2: In-Process Collection (Python SDK)

If you're running Python code on the same machine as the GPU, you can collect GPU metrics directly from the OpenLIT SDK:

```python
import openlit

openlit.init(
    collect_gpu_stats=True,
    application_name="my-inference-service",
    environment="production",
    otlp_endpoint="http://localhost:4318",
)
```

Setting `collect_gpu_stats=True` starts a background thread that periodically samples GPU metrics and exports them alongside your LLM traces. This is the simplest setup — one `init()` call gives you both LLM observability and GPU monitoring.

## Putting It Together: Correlating GPU Health with Inference Performance

The real power of GPU monitoring comes when you correlate it with your LLM metrics. Here's what to look for:

### Latency Spikes + High GPU Utilization

If inference latency suddenly jumps and GPU utilization is above 95%, you've hit a bottleneck. Solutions:

- Scale horizontally (more GPU instances)
- Enable request batching to improve throughput
- Use a more quantized model (e.g., INT8 instead of FP16)

### Latency Spikes + Normal GPU Utilization

If latency is high but GPU utilization is moderate, the bottleneck is elsewhere — probably network I/O, CPU preprocessing, or memory bandwidth. GPU monitoring just saved you from chasing the wrong problem.

### Memory Usage Climbing Over Time

A slowly increasing `gpu.memory.used` suggests a memory leak in your inference server or that KV cache isn't being properly evicted. This is common with long-running vLLM or TGI instances.

### Thermal Throttling Pattern

If you see `gpu.temperature` hit the throttle threshold and `gpu.utilization` drop at the same time, the GPU is protecting itself by reducing clock speeds. Your inference latency will be unpredictable until you fix the cooling.

## Sending GPU Metrics to Your Existing Stack

Because OpenLIT exports everything as standard OTLP, your GPU metrics go to the same backend as your LLM traces:

**Grafana Cloud:** GPU metrics land in Prometheus/Mimir. Build dashboards alongside your LLM cost and latency panels.

**Datadog:** GPU metrics show up as custom metrics. Set up monitors for utilization thresholds.

**Self-hosted OpenLIT:** GPU metrics are stored in ClickHouse alongside traces. The OpenLIT dashboard shows them in the monitoring section.

**Prometheus + Grafana:** Point the OTLP endpoint to an OTel Collector that exports to Prometheus. Import a Grafana dashboard for GPU metrics.

## A Practical Setup for vLLM

Here's a real-world example: monitoring a vLLM inference server with GPU metrics.

```yaml
# docker-compose.yml
services:
  vllm:
    image: vllm/vllm-openai:latest
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]
    command: ["--model", "meta-llama/Llama-3-8B"]
    ports:
      - "8000:8000"

  gpu-collector:
    image: ghcr.io/openlit/otel-gpu-collector:latest
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]
    environment:
      GPU_APPLICATION_NAME: "vllm-llama3"
      GPU_ENVIRONMENT: "production"
      OTEL_EXPORTER_OTLP_ENDPOINT: "http://openlit:4318"

  openlit:
    image: ghcr.io/openlit/openlit:latest
    ports:
      - "3000:3000"
      - "4317:4317"
      - "4318:4318"
```

Now you have inference traces (via `openlit.init()` in your client code) and GPU metrics (via the sidecar collector) landing in the same place.

---

## FAQ

**Can I send GPU metrics to Prometheus?**

Yes. Use an OpenTelemetry Collector between the GPU collector and Prometheus. The OTel Collector can receive OTLP and export to Prometheus remote write.

**Does it work with vLLM?**

Yes. The GPU collector runs as a sidecar container alongside vLLM (or any other inference server). It reads GPU metrics directly from the hardware drivers, so it's agnostic to the inference framework.

**What about multi-GPU setups?**

Each GPU is identified by a `gpu_index` attribute on every metric. You can filter and aggregate by GPU index in your dashboards.

**Do I need NVIDIA drivers installed?**

Yes, for NVIDIA GPUs. The collector uses NVML, which requires NVIDIA drivers. For AMD, ROCm drivers are needed.

**How often are metrics collected?**

The collector samples metrics at a configurable interval (default is a few seconds). This is usually sufficient for infrastructure monitoring — you don't need sub-second GPU telemetry for inference workloads.
