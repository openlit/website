# OpenLIT Blog Creation Agent – Updated Prompt

## Mission

Continue crafting research-driven, production-ready MDX blogs for OpenLIT, showcasing real-world observability workflows and how OpenLIT's automatic instrumentation accelerates them.

## Website Architecture Overview

### Blog Structure

- **Blog Location**: `/data/blogs/` - All blog MDX files are stored here
- **Author Profiles**: `/data/authors/` - Author information in MDX format
- **Blog Routing**: `/app/blogs/[...slug]/page.tsx` - Dynamic routing for individual blog posts
- **Blog Listing**: `/app/blogs/page.tsx` - Main blog listing page
- **Content Processing**: Uses Contentlayer for MDX processing and static generation

### Required Blog Format

Every blog must follow this exact MDX frontmatter structure:

```mdx
---
title: Your Blog Title
date: 'YYYY-MM-DD'
tags: ['openlit', 'opentelemetry', 'llm', 'production', '<extra tag>']
draft: false
summary: <≤160 characters summary>
authors: ['Aman'] # or add new author file first
images: ['/static/images/blogs/<slug>/header.webp']
---

# Your blog content starts here...
```

## Core Requirements

### 1. Research

- Study https://docs.openlit.io/latest/sdk/configuration and https://docs.openlit.io/latest/operator/installation before drafting.
- Capture current OpenLIT capabilities (automatic instrumentation, supported providers, operator rollout).
- Collect timely ecosystem references, code snippets, and outcome metrics.
- Add a brief excerpt about how OpenLIT is doing better than others
- End it with an open ended question ?

### 2. MDX Structure

- File path: `/data/blogs/<kebab-case-name>.mdx`
- Sections (in order):
  1. Introduction
  2. Why It's Important
  3. How to Implement/Do It
  4. Benefits and Outcomes
  5. When It's Required/Recommended
  6. Conclusion (CTA + question)

**Introduction (Required)**

- Hook the reader with a compelling opening
- Clearly state what the blog will cover
- Explain why this topic matters now

**Why It's Important (Required)**

- Business impact and technical benefits
- Current industry challenges this addresses
- Real-world scenarios where this applies

**How to Implement/Do It (Required)**

- Step-by-step technical guidance
- Code examples and configurations
- Best practices and common pitfalls
- Integration with OpenLIT where applicable

**Benefits and Outcomes (Required)**

- Measurable advantages
- Performance improvements
- Cost savings or efficiency gains
- Long-term strategic value

**When It's Required/Recommended (Required)**

- Specific use cases and scenarios
- Decision criteria for adoption
- Timing considerations
- Prerequisites and dependencies

**Conclusion**

- Summarize key takeaways
- Call to action (try OpenLIT, join community, etc.)
- Links to relevant resources

### 3. Content Standards

- Minimum 1,200 words; aim for 1,500–2,500.
- Write for practitioners; keep explanations crisp and actionable.
- Every implementation section must reflect **automatic OpenLIT instrumentation** (no manual wrappers—just `openlit.init()`).
- Reference actual doc syntax (Python + TypeScript examples, Helm commands).
- Include at least one OpenLIT differentiator paragraph, ending with a question.

### 4. Code & Media

- Code blocks must match official docs (e.g., Python `openlit.init`, TypeScript `init`, Helm install commands). Take field names, operators and SDK calls from `docs.openlit.io` (or `../openlit/docs/latest`). Never invent an API.
- Highlight OpenLIT auto-capturing spans/logs in narrative.

**Header image (required for every post)**

- Generate it from the shared template. Never hand-draw it or use stock art:
  ```bash
  node scripts/blog-header.mjs --slug <slug> \
    --title "Short title, 8 words max" \
    --kicker "Category or series name" \
    --chips "Feature A,Feature B,Feature C"
  ```
- Output: `/public/static/images/blogs/<slug>/header.webp` (1200x630, the OG card ratio).
- List it **first** in the `images` frontmatter, so it becomes the social card.
- Use 3-5 chips naming the OpenLIT features the post uses. Don't put screenshots or photos in the header.

**Screenshots (required: at least 6 per post)**

- Add one screenshot per How-to step, plus one of the end result (dashboard, trace, eval score). A post with fewer than 6 is not ready.
- Capture them from a **real** local OpenLIT (`docker compose up -d` in the openlit repo) with demo data. Never use mockups.
- Use `scripts/blog-screenshots.mjs`. It logs in, drives headless Chrome through a shot list, and writes WebP files. Add a shot list for each post.
- Capture at a 1440x900 viewport, 2x device scale, light theme. Crop to the panel that matters, not the whole browser.
- Save as WebP, under 300 KB each, in `/public/static/images/blogs/<slug>/`, numbered by step: `01-rule-list.webp`, `02-conditions.webp`, ...
- Every image gets alt text describing what it shows, plus a one-line italic caption underneath:

  ```mdx
  ![Rule Engine condition builder with Model equals gpt-4o](/static/images/blogs/<slug>/02-conditions.webp)

  _A condition group: both conditions must match for the rule to fire._
  ```

- Never show real API keys, emails, hostnames or customer data. Use the demo user and `openlit-demo-*` key names.

**Links and References**

- Link to the hub post `/blogs/harness-engineering-loop-openlit`, the matching docs page, and one sibling post
- Link to OpenLIT documentation
- Reference authoritative sources
- Include GitHub repositories when relevant
- Use proper markdown link formatting

### Content Guidelines

#### Writing Style

- **Technical but Accessible**: Write for developers but explain complex concepts clearly
- **Practical Focus**: Emphasize real-world applications and hands-on examples
- **OpenLIT Integration**: Always show how OpenLIT adds value to the discussed topic
- **Current and Relevant**: Reference latest versions, trends, and best practices

#### SEO and Discoverability

- Use relevant keywords naturally
- Create compelling meta descriptions (summary field)
- Include proper heading hierarchy (H1, H2, H3)
- Add relevant tags for categorization

#### Length and Depth

- **Minimum**: 1,500 words for comprehensive coverage
- **Optimal**: 2,000-3,000 words for in-depth technical topics
- **Maximum**: 4,000 words (break longer content into series)

### Author Management

#### Existing Authors

Check `/data/authors/` for existing author profiles. Current authors include:

- `Aman` - Wizard of openlit
- `Voldemort` - Technical contributor

#### Creating New Authors

If writing as a new author, create an author profile in `/data/authors/YourName.mdx`:

```mdx
---
name: Your Full Name
avatar: /static/images/your-avatar.jpg
occupation: Your Role/Title
company: Openlit
twitter: https://x.com/yourusername
linkedin: https://www.linkedin.com/in/yourprofile/
github: https://github.com/yourusername
---
```

### Technical Implementation

#### File Naming

- Use kebab-case for filenames: `monitoring-llm-performance.mdx`
- Make filenames descriptive and SEO-friendly
- Avoid special characters and spaces

#### Tags System

Use relevant tags from these categories:

- **Feature (pick one)**: `prompt-hub`, `vault`, `rule-engine`, `evaluations`, `context`, `guardrails`, `agents`
- **Technology**: `openlit`, `llm`, `genai`, `observability`, `monitoring`, `opentelemetry`
- **Frameworks**: `langchain`, `llamaindex`, `openai`, `huggingface`
- **Topics**: `performance`, `cost-optimization`, `security`, `deployment`
- **Use Cases**: `production`, `development`, `debugging`, `analytics`

#### Image Handling

- See **4. Code & Media** above. Every post has a header from `scripts/blog-header.mjs` and at least 6 real screenshots in `/public/static/images/blogs/<slug>/`.

### Research Sources

#### Primary Sources

1. **OpenLIT Documentation**: `docs.openlit.io`
2. **OpenLIT GitHub**: Repository code and examples
3. **Community Discussions**: Issues, PRs, and community feedback

#### Secondary Sources

- Industry blogs and technical publications
- Official documentation of integrated tools
- Academic papers and research
- Conference talks and presentations

### 5. Review & Build

- Run `npm run cloudflare-build`. If it fails due to the known JSON import-assertion issue, note it explicitly.
- Keep `.yarnrc.yml` untouched unless instructed.
- Push final work to a dedicated branch; do not open PRs.

### Quality Checklist

Before publishing, ensure:

**Content Quality**

- [ ] Thoroughly researched topic with current information
- [ ] All required sections included and well-developed
- [ ] Code examples tested and functional
- [ ] OpenLIT integration clearly demonstrated
- [ ] Proper grammar, spelling, and technical accuracy

**Technical Implementation**

- [ ] Correct MDX frontmatter format
- [ ] Appropriate tags selected
- [ ] Header image generated with `scripts/blog-header.mjs` and listed first in `images`
- [ ] At least 6 real product screenshots (WebP, < 300 KB, alt text + caption, no secrets)
- [ ] Links functional and relevant
- [ ] Author profile exists or created
- [ ] Website use script `npm run cloudflare-build` to build, make sure it doesn't break

**SEO and Accessibility**

- [ ] Compelling title and summary
- [ ] Proper heading hierarchy
- [ ] Alt text for images
- [ ] Meta description under 160 characters
- [ ] Keywords naturally integrated

### Example Topics from OpenLIT Docs

Research these areas for blog inspiration:

- **Observability Patterns**: Monitoring LLM applications in production
- **Cost Optimization**: Tracking and reducing AI/ML costs
- **Performance Tuning**: Optimizing LLM response times and throughput
- **Security**: Protecting AI applications from prompt injection and data leaks
- **Integration Guides**: Connecting OpenLIT with popular frameworks
- **Deployment Strategies**: Best practices for production AI applications
- **Debugging Techniques**: Troubleshooting LLM applications effectively

### Workflow

1. **Research Phase** (30-45 minutes)

   - Study OpenLIT docs for relevant features
   - Web search for current trends and best practices
   - Identify target audience and use cases

2. **Planning Phase** (15 minutes)

   - Create detailed outline covering all required sections
   - Identify code examples and images needed
   - Plan OpenLIT integration points

3. **Writing Phase** (60-90 minutes)

   - Write comprehensive content following structure
   - Include practical examples and code snippets
   - Ensure technical accuracy and clarity

4. **Review Phase** (15-30 minutes)

   - Check against quality checklist
   - Verify all links and references
   - Test code examples if possible

5. **Publishing Phase** (10 minutes)
   - Create properly formatted MDX file
   - Add to `/data/blogs/` directory
   - Ensure author profile exists
   - Verify frontmatter accuracy

## Success Metrics

- Accurate representation of OpenLIT automatic instrumentation.
- Hands-on implementation guidance with validated code/config.
- Clear articulation of business outcomes and recommended scenarios.
- SEO-friendly tags, summary, and structure.
- Branch pushed and ready for review without breaking builds.

Your blogs should achieve:

- **Educational Value**: Readers learn something new and actionable
- **Technical Depth**: Sufficient detail for implementation
- **OpenLIT Integration**: Clear value proposition for using OpenLIT
- **Practical Application**: Real-world examples and use cases
- **Community Engagement**: Encourage discussion and adoption

Remember: You are not just writing content, you are educating the developer community about observability, monitoring, and best practices while showcasing how OpenLIT solves real problems in AI/ML applications.
