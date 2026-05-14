# 3. What's out there right now?

You're sold on the idea. You can picture the five-box diagram. You open a browser tab to figure out which agent to actually install, and within ninety seconds you have eighteen tabs open — Claude Code, Codex, Cursor, Windsurf, Cline, OpenCode, Aider, Gemini CLI, Devin, Replit Agent, ChatGPT Agent, Claude for Chrome — and a faint feeling that maybe you should just go to bed.

This chapter is the map. By the end of it you'll know which kind of agent you actually want, why there are so many of them, and roughly where each one shines. We aren't going to rank them. The field moves too fast — by the time you read this, at least one tool listed here will have a new headline feature, and at least one will have been quietly surpassed. The *categories*, though, will be stable.

## Three families

Agents today fall into three rough families, organized by **where you run them** and **what they can reach**:

1. **Terminal agents** — they live in your command line. Strongest at touching files, running commands, talking to APIs, and operating on a project folder. The most powerful family today, and the one this book primarily uses.
2. **IDE agents** — they live inside your code editor. Strongest at code-specific work where you want to stay in your editor's UI and see diffs inline.
3. **Browser and computer-use agents** — they live in or alongside a web browser (sometimes the whole desktop). Strongest at clicking around UIs that don't have APIs — vendor portals, SaaS admin panels, anything that's only reachable through a webpage.

Most professionals end up using one from each family for different jobs. You don't have to pick one. But you should *start* with one, learn the muscle, then add the others when you hit a wall.

## Family 1: terminal agents

A terminal agent is a program you run in a shell. You launch it inside a folder. It looks at the files in that folder, holds a conversation with you, and acts — editing files, running commands, calling MCPs.

The big names today:

- **Claude Code** (Anthropic). The running example throughout this book — and the daily driver behind almost every workflow you'll see here. Strong agent loop, good MCP support, an active skills ecosystem. Subscription billing through Claude.ai plans, with API-key usage as an alternative.
- **Codex** (OpenAI). The official OpenAI CLI agent, paired with their GPT family of models. Mature, well-funded, occasionally faster on long autonomous runs. Strong choice for teams already on ChatGPT Enterprise.
- **OpenCode** (open-source). Model-agnostic — you can point it at Claude, GPT, Gemini, or local open-weight models. The right pick if you want to avoid vendor lock-in or if your security posture requires self-hosting the orchestrator while keeping the model API the only outbound call.
- **Gemini CLI** (Google). Strong on Google Workspace integration, generous free tier as of writing, deep ties to Gemini's long-context window and Google Search grounding.
- **Aider** (open-source). Older, narrower, very respected. Focused on disciplined Git-aware code editing — small surface area, but high quality. A good complement to the broader agents rather than a replacement.

If you're a non-technical reader, the word *terminal* may have just made you flinch. Hold on a second. Once a terminal agent is installed, the entire interaction is **typing sentences in English** into a black window. You will type more English than you've ever typed into a chatbot, and fewer commands than you've ever typed into a shell. The terminal is the *home* for these agents because that's where the file system, the running processes, and every developer tool live — but the *interface* you'll use is plain language. Skim the install steps in Ch. 6; the agent does the rest of its own setup.

**When to reach for a terminal agent**: any task that touches files on your computer, runs commands, talks to APIs, or stitches together several apps via MCPs. That is most of the work in this book.

## Family 2: IDE agents

An IDE agent lives inside a code editor. The editor itself becomes the chat surface. You see proposed file changes as inline diffs, you accept or reject them with a keystroke, and you stay in the editing flow you already know.

The big names:

- **Cursor**. A fork of VS Code with an agent baked in. The most popular IDE agent at the time of writing. Excellent at the *"chat with your codebase, propose a multi-file edit"* loop. Subscription-based.
- **Windsurf** (formerly Codeium). Similar premise to Cursor, with a different default UX around long-running agent actions ("Cascade"). Strong free tier.
- **GitHub Copilot Agent**. The agent successor to the original Copilot autocomplete. Deepest integration with GitHub itself — issues, PRs, Actions.
- **Cline** and **Roo Code**. Open-source agents that run as extensions inside VS Code, BYO model API key. The right pick if you already live in VS Code and don't want to switch editors.
- **Zed**, **JetBrains AI Assistant**, and others. Every serious editor now ships some flavor of agent.

The IDE family is *narrower* than the terminal family — it shines at code work and feels awkward at general business workflows. If you're an engineer, an IDE agent and a terminal agent together is a great pair: the IDE agent for tight in-editor edits where you want the visual diff, the terminal agent for cross-repo, multi-tool, end-to-end work.

If you're a non-engineer, you can skip this family entirely. The terminal and browser families cover almost everything you'll want.

## Family 3: browser and computer-use agents

The third family is the newest and the most visually striking. Instead of reading files or calling APIs, these agents *operate a real browser* — they see screenshots of webpages, move a cursor, click, type, scroll, fill forms.

Today the field includes:

- **Claude for Chrome** (Anthropic). A Chrome extension that lets Claude see and act on the active tab. Best for working alongside you in a browser you already have open.
- **ChatGPT Agent** (the successor to OpenAI's earlier "Operator"). A managed environment where the agent drives a virtual browser on OpenAI's infrastructure. Best for tasks you want running while your own laptop is closed.
- **Gemini in Chrome**. Google's equivalent, leaning on Google's account ecosystem.
- **Computer-use APIs** from Anthropic and others. Lower-level: the model receives screenshots of an entire desktop and emits mouse and keyboard actions. The building block underneath the consumer-facing products above.
- **Browser-driving skills** built on **Playwright** or **Puppeteer**. The agent writes scripted browser interactions, runs them, and reads the results back. Less interactive, much more reproducible.

**When to reach for this family**: any tool that has no API, no MCP, and lives only as a webpage. Vendor portals. Internal admin tools. Government sites. SaaS settings pages your team uses once a month. Also useful for testing a product you've built — *dogfooding* the way a real user would. Ch. 25 is a deep dive on this family with concrete scenarios.

A practical truth: today, browser agents are slower and flakier than terminal agents, because reading a screenshot is more brittle than reading an API response. They will get faster and more reliable. They are already useful enough to keep one installed.

## Where these blur

The families are useful as a map, but the borders are soft.

- Terminal agents can call MCPs that drive a browser, so a terminal agent can *also* operate a webpage when it needs to.
- IDE agents increasingly embed terminal agents inside them — Cursor and VS Code both let Claude Code or Codex run in a panel.
- Browser agents are picking up file-system and MCP capabilities over time.

The strongest setups in 2026 combine one terminal agent (for the file-system, API, and orchestration core), one IDE agent if you're an engineer (for in-editor work), and one browser agent for the long tail of UI-only tools.

## What about Devin, Replit Agent, and "autonomous" branded products?

A few products market themselves as **autonomous** software engineers — Devin, Replit Agent, Codex's longer cloud sessions, and a growing list of competitors. Mechanically, they are still the same five-box diagram: a model, an orchestrator, tools, real systems. What's different is **how long they run unattended** and **how much you're meant to watch them**.

These can be useful for long-horizon tasks where you genuinely want to step away (the *let it cook* pattern from Ch. 15). They are *not* a different category of agent; they are an orchestrator tuned for longer leashes. Treat them as a special case of family 1.

## How fast is this changing?

Fast. Be calibrated about that. New tools ship weekly; existing tools change defaults monthly; pricing and model-routing change quarterly. By the time this paragraph reaches you, at least three things in this chapter will be slightly out of date.

This is fine, because the **five-box diagram from Ch. 2** is the part that doesn't churn. A new tool from a vendor you've never heard of will, almost certainly, be a model plus an orchestrator plus a way to call connectors. Drop it into your existing mental model and ask: *which box is this competing in? what does it do better?* That question answers most "should I switch?" debates faster than any review article.

## So which one should you install first?

If you're brand new and want one defensible default: **install Claude Code**. It's what this book teaches against, the skills ecosystem is the deepest, and once you've learned one terminal agent, learning a second is a weekend.

If you live on ChatGPT Enterprise already, **Codex** removes one billing relationship.

If you're privacy-sensitive or want to run open-weight models locally, **OpenCode**.

If you're already deep in VS Code and don't want a separate window, **Cline** or **Cursor**.

If you're a non-engineer and the terminal genuinely scares you off, install **Claude for Chrome** alongside a terminal agent. The terminal agent does the hard work; the Chrome extension is your training-wheels view of an agent acting *visibly* in a window you already understand.

The next chapter has you installing one of these and running a first task in ten minutes. Don't agonize over the choice. You can have a second one running by Sunday.

## The takeaway

- Three families: **terminal agents** (the workhorses), **IDE agents** (in-editor code work), **browser/computer-use agents** (for UI-only tools).
- All of them are variations on the **five-box diagram** from Ch. 2 — model, orchestrator, connectors, real apps, you. New tools slot into that diagram without changing it.
- The field churns fast. Pick a default, learn the muscle, swap when a real task pulls you to.
- A reasonable starter set: one terminal agent (Claude Code is the book's default), plus a browser agent for the long tail of UI-only tools.

## Try it yourself

Open the websites of two terminal agents — say, [Claude Code](https://www.claude.com/product/claude-code) and [Codex](https://openai.com/codex/) — and read each one's homepage for two minutes.

Write down, in one line each:

- What kind of work each tool seems most proud of doing.
- One thing that's the *same* across both.
- One thing where they disagree (pricing, model choice, default permissions, ecosystem).

**You'll know it worked when** the homepage marketing copy starts to feel transparent — you can see straight through it to "this is a terminal orchestrator with these models and these connectors", instead of getting swept up in adjectives.

## What's next

Enough surveying. The next chapter has you install one agent and run one real task end-to-end. Theory off, hands on.
