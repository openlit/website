---
title: 'How to Monitor AI Agents in Production: Tracing CrewAI, LangGraph, and Pydantic AI'
date: '2026-04-01'
lastmod: '2026-04-01'
tags: ['openlit', 'agents', 'crewai', 'langgraph', 'pydantic-ai', 'observability']
draft: false
summary: Trace multi-step AI agent workflows in production using OpenLIT. Auto-instrument CrewAI, LangGraph, Pydantic AI, OpenAI Agents, and more with one line of code.
authors: ['OpenLIT']
images: ['/static/images/blog/monitor-ai-agents-production.png']
---

# How to Monitor AI Agents in Production: Tracing CrewAI, LangGraph, and Pydantic AI

**TL;DR:** AI agents fail in ways that look like success — they return a plausible answer, but took the wrong path, called the wrong tool, or looped unnecessarily. OpenLIT auto-instruments CrewAI, LangGraph, Pydantic AI, OpenAI Agents, AG2, Browser Use, and more. One `openlit.init()` call gives you full traces of every agent step, tool call, and LLM interaction.

---

## Agents Are Harder to Debug Than You Think

A simple LLM call is easy to debug: you sent a prompt, you got a response, you can look at both.

An agent is different. An agent:

- Decides which tool to call (and sometimes picks the wrong one)
- Calls tools in a loop until it decides it's done (and sometimes loops forever)
- Chains multiple LLM calls together (each with different context)
- May delegate to sub-agents (adding another layer of nesting)
- Makes retry decisions based on intermediate results

When an agent gives a wrong answer, you need to trace through the full decision chain to figure out where things went sideways. Was it a bad tool selection? Bad retrieval? An LLM that hallucinated in step 3 of a 7-step workflow?

Without tracing, you're debugging by print statements and prayer.

## One Line of Code, Full Agent Traces

```bash
pip install openlit
```

```python
import openlit
openlit.init(otlp_endpoint="http://localhost:4318")
```

That's it. OpenLIT auto-detects which agent frameworks are installed and instruments them. No decorators, no wrappers, no manual span creation.

## Framework-by-Framework Examples

### CrewAI

```python
import openlit
from crewai import Agent, Task, Crew

openlit.init(application_name="research-crew")

researcher = Agent(
    role="Researcher",
    goal="Find relevant information about the topic",
    backstory="You are a thorough researcher.",
    llm="gpt-4o",
)

writer = Agent(
    role="Writer",
    goal="Write a clear summary based on the research",
    backstory="You write concise, accurate summaries.",
    llm="gpt-4o-mini",
)

research_task = Task(
    description="Research the latest developments in LLM observability",
    agent=researcher,
)

writing_task = Task(
    description="Summarize the research findings in 200 words",
    agent=writer,
)

crew = Crew(agents=[researcher, writer], tasks=[research_task, writing_task])
result = crew.kickoff()
```

OpenLIT captures:

- The crew execution as a parent span
- Each task as a child span
- Each agent's LLM calls as nested spans with prompts, completions, tokens, and cost
- Tool calls (if agents use tools) as separate spans

### LangGraph

```python
import openlit
from langgraph.graph import StateGraph, MessagesState
from langchain_openai import ChatOpenAI

openlit.init(application_name="support-agent")

model = ChatOpenAI(model="gpt-4o")

def route_query(state: MessagesState):
    # routing logic
    ...

def handle_billing(state: MessagesState):
    response = model.invoke(state["messages"])
    return {"messages": [response]}

def handle_technical(state: MessagesState):
    response = model.invoke(state["messages"])
    return {"messages": [response]}

graph = StateGraph(MessagesState)
graph.add_node("router", route_query)
graph.add_node("billing", handle_billing)
graph.add_node("technical", handle_technical)
# ... add edges ...

app = graph.compile()
result = app.invoke({"messages": [{"role": "user", "content": "My invoice is wrong"}]})
```

OpenLIT traces:

- The graph execution as a parent span
- Each node execution as a child span
- Each LLM call within a node as a nested span
- The routing decision (which node was selected and why)

### Pydantic AI

```python
import openlit
from pydantic_ai import Agent

openlit.init(application_name="pydantic-agent")

agent = Agent(
    "openai:gpt-4o",
    system_prompt="You are a helpful customer support agent.",
)

result = agent.run_sync("What's your return policy?")
print(result.data)
```

### OpenAI Agents SDK

```python
import openlit
from openai import OpenAI
from openai.types.beta import AssistantTool

openlit.init(application_name="openai-agent")

client = OpenAI()

# OpenLIT auto-instruments the Agents SDK
# Tool calls, run steps, and message creation are all traced
```

### Browser Use

```python
import openlit
from browser_use import Agent as BrowserAgent

openlit.init(application_name="browser-agent")

agent = BrowserAgent(
    task="Go to the OpenLIT docs and find the quickstart guide",
    llm="gpt-4o",
)

result = await agent.run()
```

Browser Use agents are particularly hard to debug without tracing — they involve LLM decisions about which elements to click, what to type, and when to stop. OpenLIT captures every browser action as a span.

## What Agent Traces Look Like

A typical agent trace in OpenLIT looks like this:

```
Crew Execution (parent span, 12.4s)
├── Task: Research (5.8s)
│   ├── LLM Call: gpt-4o (2.1s) — 1,200 input / 450 output tokens — $0.0165
│   ├── Tool: web_search("LLM observability trends") (1.2s)
│   ├── LLM Call: gpt-4o (1.8s) — 2,400 input / 300 output tokens — $0.0090
│   └── Tool: web_search("OpenTelemetry GenAI") (0.7s)
├── Task: Write Summary (4.2s)
│   ├── LLM Call: gpt-4o-mini (1.5s) — 800 input / 200 output tokens — $0.0002
│   └── LLM Call: gpt-4o-mini (0.9s) — 600 input / 180 output tokens — $0.0002
└── Total Cost: $0.0259
```

Each span includes:

- **Timing:** start time, duration, time-to-first-token
- **Tokens:** input count, output count
- **Cost:** auto-calculated per call and aggregated
- **Content:** prompt, completion, tool inputs/outputs (configurable)
- **Model:** which model was used at each step
- **Status:** success, error, or timeout

## Agent-Level Metric Attribution

A recent addition to OpenLIT (v1.38.0+) is **agent-level metric attribution**. This means metrics like token usage, cost, and latency are tagged with the agent that generated them — not just the model or service.

This is particularly useful for multi-agent setups where different agents have different cost profiles:

```python
# The "researcher" agent uses gpt-4o and costs more
# The "writer" agent uses gpt-4o-mini and costs less
# Agent-level attribution lets you see this breakdown clearly
```

In your dashboard, you can now answer questions like:

- "The research agent costs 10x more than the writer agent — is that justified?"
- "The router agent makes 3x more LLM calls than expected — is it stuck in a loop?"
- "Agent B's latency doubled this week — what changed?"

## Debugging Common Agent Failures

### Infinite Loops

An agent that keeps calling the same tool or making the same LLM call is stuck in a loop. In the trace, you'll see a repeating pattern of identical spans. Fix: add a max iteration limit or improve the stopping condition.

### Wrong Tool Selection

The agent had access to `search_database` and `search_web` but picked `search_web` when the answer was in the database. The trace shows the tool call and the LLM's reasoning (if captured). Fix: improve the tool descriptions or add few-shot examples.

### Context Window Overflow

As agents accumulate conversation history, they can exceed the context window. The trace will show increasing input token counts on successive LLM calls, eventually hitting the model's limit. Fix: implement conversation summarization or sliding window.

### Cascading Failures

Agent A calls Agent B, which calls a tool that times out, which causes Agent B to retry, which makes Agent A think Agent B failed. The trace tree shows the full cascade. Fix: add timeout handling and fallback logic at each level.

## Combining Agent Tracing with Evals and Guards

The real power comes from using all of OpenLIT's features together:

```python
import openlit
from openlit.evals import Hallucination
from openlit.guard import PromptInjection

openlit.init(otlp_endpoint="http://localhost:4318")

injection_guard = PromptInjection(provider="openai", model="gpt-4o-mini")
hallucination_detector = Hallucination(provider="openai", model="gpt-4o-mini")

def run_agent_with_safety(user_input: str):
    guard_result = injection_guard.detect(user_input)
    if guard_result["verdict"] == "yes":
        return "Input blocked by safety system."

    agent_output = my_agent.run(user_input)

    eval_result = hallucination_detector.measure(
        prompt=user_input,
        contexts=agent_output.get("retrieved_docs", []),
        text=agent_output["response"],
    )

    return {
        "response": agent_output["response"],
        "hallucination_check": eval_result,
    }
```

Now your agent pipeline has:

1. **Guards** before the agent runs (block injection)
2. **Traces** during the agent run (full visibility)
3. **Evals** after the agent run (quality check)

All in one SDK, all exported as OpenTelemetry.

## Supported Agent Frameworks

| Framework | Python | TypeScript | Auto-instrumented |
|---|---|---|---|
| CrewAI | Yes | — | Yes |
| LangGraph | Yes | — | Yes |
| LangChain | Yes | Yes | Yes |
| LlamaIndex | Yes | Yes | Yes |
| Pydantic AI | Yes | — | Yes |
| OpenAI Agents | Yes | — | Yes |
| AG2 (AutoGen) | Yes | — | Yes |
| Browser Use | Yes | — | Yes |
| Haystack | Yes | — | Yes |
| Agno | Yes | — | Yes |
| Dynamiq | Yes | — | Yes |
| MCP | Yes | — | Yes |
| Mem0 | Yes | — | Yes |

All of these are auto-detected and instrumented when you call `openlit.init()`. No extra configuration.

---

## FAQ

**Does it capture tool call inputs and outputs?**

Yes. Tool call arguments and return values are captured as span attributes by default. You can disable content capture with `capture_message_content=False` if you need to keep tool data private.

**Can I trace MCP (Model Context Protocol) tool usage?**

Yes. MCP is in the list of auto-instrumented frameworks. Tool calls made through MCP are traced just like any other tool call.

**What about long-running agents?**

OpenLIT handles long-running agent sessions. Spans are emitted as they complete, so you get visibility into the agent's progress even while it's still running (assuming you're using batch export, which is the default).

**How do I trace a custom agent framework?**

If your framework isn't in the auto-instrumentation list, you can use OpenTelemetry's manual instrumentation alongside `openlit.init()`. Create spans for your agent's decision points and tool calls. They'll automatically appear as part of the trace tree.

**Is there a trace size limit?**

OpenTelemetry doesn't impose a hard limit on trace size. However, very deep traces (hundreds of spans) can be slow to render in dashboards. If your agent creates extremely deep traces, consider using `detailed_tracing=False` to capture only workflow-level spans.
