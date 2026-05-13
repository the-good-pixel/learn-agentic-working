# Appendix A — Glossary

A plain-English glossary of the terms this book uses. If you've bounced off a chapter and just want the term defined, you're in the right place. Definitions are short on purpose — one or two sentences each, plus context where it helps. Where a term lives in a particular chapter, there's an italicized pointer at the end so you can jump back into the body.

The glossary is alphabetical. A few entries have a "see also" line when two terms are easier to understand side by side. If you're new to the space, the entries to read first are **Agent**, **MCP**, **Skill**, and **Throughline** — together those four hold up most of the rest of the vocabulary.

---

### **Action vs. artifact**

The two shapes an agent's output can take. An **artifact** is something it produces and hands back to you — a Markdown report, a PDF, an HTML page, a video, a chart. An **action** is something it *does* in a real system — files a Linear ticket, updates a Sheet, sends an email, creates a Google Ads campaign, opens a pull request. Most tasks resolve to one or the other, and asking "is the deliverable an artifact or an action?" is the cleanest way to decide what to ask for. The mistake is leaving it implicit: "summarize last month's sales" can mean a Markdown summary in your terminal, an HTML page you open in a browser, or a row added to the team's weekly report Sheet — three very different deliverables. Naming the shape up front saves a round trip.
*→ Ch. 12*

### **Agent**

An AI model with access to tools — your files, your browser, your email, your calendar, your databases, anything you connect it to — that can read those tools, write to them, and take real actions on your behalf. The line between a chatbot and an agent is what the AI is *allowed to reach for*. A chatbot talks; an agent acts. Same underlying model, often the same vendor — what differs is the access. Everything else in the book — skills, MCPs, sub-agents, scheduled workflows — is just more sophisticated versions of "AI model plus tools plus the ability to run a multi-step loop until the task is done."
*→ Ch. 1, Ch. 2*

### **AGENTS.md**

A plain-text file (Markdown, despite the `.md` extension being the only required convention) that tells the agent who you are, what you work on, and what conventions matter. Some tools read `CLAUDE.md`, some read `AGENTS.md`, and some read both — the contents are the same idea either way. You do **not** write this file by hand: you have a five-minute conversation with the agent and it drafts the file for you. You skim, tweak a line, save.
*See also: CLAUDE.md.*
*→ Ch. 8*

### **Approval gate**

A point in an agent's run where it stops and waits for you to say "yes, proceed" before doing something. Modern agents let you configure which actions require a gate — sometimes per tool, sometimes per command pattern, sometimes globally. The book's stance — see "Monitor, don't block" — is that approval gates should be reserved for **big and irreversible** actions (production database writes, mass-customer sends, large financial transfers), not used as a default reflex for every tool call. Over-gating is one of the most common mistakes new readers make: it trains you to under-utilize the agent and to ignore the prompts when they finally do matter.
*→ Ch. 7*

### **Background task / running in background**

Letting the agent work on something while you do something else — either by starting a long-running task and stepping away, or by spawning a sub-agent to chase a side question while the main thread keeps moving. A background task is observable: you can check on it, read its progress, interrupt it. It is the agentic equivalent of saying *"work on this; I'll come back in twenty minutes."* The book leans on this pattern hard: most of the time, the right next move after kicking off a task is not "watch the screen" but "grab a coffee, come back, review." Long autonomous runs are where agents pull ahead of chatbots most dramatically.
*→ Ch. 14*

### **Browser agent / computer use**

An agent that drives a real browser (or, in the more general case, a real computer) — navigating to pages, clicking buttons, filling forms, taking screenshots, and reading what's on screen. Useful when a system has no API or MCP and the only way in is the same interface a human would use: a vendor portal, an internal admin tool, an analytics dashboard. The canonical loop is **navigate → snapshot → interact → re-snapshot**. Examples in current use: Claude for Chrome, the computer-use APIs from Anthropic and OpenAI, ChatGPT Agent / Operator, and headless-browser skills built on Playwright or Puppeteer. The browser is the most universal action surface in business; teaching the agent to drive it is a force multiplier.
*→ Ch. 23*

### **Chatbot tax**

The minutes you spend shuttling between a chatbot's answer and your actual tools — copying a draft email from ChatGPT into Gmail, hunting for the right address, retyping a bullet list from a chat reply into a Slack message. The chatbot does the easy part (putting words together); the chatbot tax is everything else. Agents collapse this tax by reaching into the tools themselves. If you've felt that "this is faster than nothing, but I'm still the one doing all the clicking" frustration with chat AIs, you've felt the chatbot tax. Once you start delegating the whole loop to an agent, the tax disappears and the difference is hard to unsee.
*→ Ch. 1*

### **CLAUDE.md**

Claude Code's project- and user-level instructions file. Lives at the root of a project (or in `~/.claude/`) and tells the agent the things you'd otherwise repeat in every prompt: who you are, what stack you use, what conventions matter, what to never do. Like `AGENTS.md`, you don't write it by hand — you talk to the agent about your work and it drafts the file. Other agents read different files (Codex and OpenCode read `AGENTS.md`; some tools read both); the idea is the same. A good `CLAUDE.md` is one of the highest-leverage setup steps in the book — it's the difference between explaining your context for the hundredth time in this session's prompt and never explaining it again.
*See also: AGENTS.md.*
*→ Ch. 8*

### **Compaction**

When a session has been running long enough that the agent's working memory (its **context**) is filling up, modern agents will "compact" — summarizing older parts of the conversation into a shorter form so newer work still fits. Compaction is usually automatic and usually fine, but it's also why a session that started precise can drift over hours: the summary is lossy. When precision matters, start a fresh session.
*See also: Context / context window, Context bloat.*
*→ Ch. 11*

### **Connector**

The plain-English term this book uses for an **MCP server** — the little software bridge that lets your agent reach a specific outside system (Gmail, Google Drive, Linear, Shopify, your database). The mental image: connectors are **apps installed on your agent's phone** — each one gives it a new capability, and you can install more whenever you need them. You don't "configure" a connector by editing a config file; you ask the agent to install it, click through the OAuth prompt, and you're done. The technical term in the documentation will usually be "MCP server"; the everyday term in this book, especially in non-engineering chapters, is "connector."
*See also: MCP, MCP server.*
*→ Ch. 9*

### **Context**

Everything the agent currently "knows" in this session — the prompt you typed, the files it has read, the screenshots you pasted, the prior turns of the conversation, the system instructions, the tool definitions. Context is the agent's working memory for this task. Giving the agent more (and better) context is the single biggest under-used habit: hand it the actual file, not a description of the file.
*→ Ch. 11*

### **Context bloat**

What happens when a session has accumulated so much material — long file dumps, large tool outputs, many turns — that the agent starts losing the thread, missing details, or getting slow and expensive. Bloat is the disease; **compaction** is one treatment, and starting a fresh session is the other.
*See also: Compaction.*
*→ Ch. 11*

### **Context window**

The hard limit on how much text the model can "see" at once, measured in tokens. Every model has one. Bigger windows are not a license to dump everything in — large contexts also get expensive and slower, and quality can degrade well before the window is full. The practical rule: give the agent the *right* context, not the most.
*→ Ch. 11*

### **Doom loop**

The pattern where an agent gets stuck on a problem, tries the same wrong fix, fails, tries a slight variant, fails again, and you keep nudging it without ever stepping back. The doom loop is the moment to **stop**: clear the context, change the approach, re-prompt with better framing, or do the part by hand. Recognizing the loop early — usually after two failed iterations on the same sub-problem — is the skill. The tell is repetition without convergence: the agent's third attempt is not visibly closer to working than its first.
*→ Ch. 13*

### **Equip first**

One of the book's three throughlines. Before starting any task in an unfamiliar domain, the first move is not *"how do I do this?"* — it's *"what MCPs and skills already exist for the platforms I'll touch?"* Install them, then begin the work. An equipped agent makes the work cheap; an improvising agent makes it mediocre. The discovery question itself ("is there an MCP for Shopify?") is a prompt you give the agent — it'll search the Anthropic registry, vendor sites, GitHub community lists, and your team's shared skill library, and surface candidates. Pre-equipping is a one-time cost that pays out across every future task in that domain.
*See also: Throughline, Monitor don't block.*
*→ Ch. 10*

### **Hook**

A configuration in some agents (notably Claude Code) that runs a small script automatically at certain points — for example, before every tool call, or after a session ends. Hooks let you wire in custom checks, logging, or guardrails. **This book intentionally does not cover hooks** — they are a power-user feature for a small audience, and treating them as core would muddy the throughline that *you don't have to learn everything before you start*. Mentioned here only so the term doesn't catch you off guard if you see it elsewhere.

### **IDE agent**

An agent embedded inside a code editor — Cursor, Windsurf, Zed, GitHub Copilot in its agent modes. You interact with it inside your IDE, with the editor itself as the surface for reviewing diffs and accepting changes. Contrast with a **terminal agent**, which lives in a shell prompt and tends to feel more like commanding a colleague than driving a tool.
*See also: Terminal agent.*
*→ Ch. 3*

### **LLM**

Large language model — the underlying AI model that generates text. Claude, GPT, Gemini, Llama, and so on are LLMs. The model alone is just a chatbot; it becomes an **agent** when paired with an orchestrator and a set of tools it can reach. The book assumes you've used at least one LLM through a chat interface before — that's the only prerequisite. You do not need to understand how LLMs work internally to work with agents productively, any more than you need to understand internal combustion to drive a car.
*→ Ch. 2*

### **MCP**

The **Model Context Protocol** — an open standard, originally introduced by Anthropic in late 2024 and now broadly adopted, that defines how agents talk to outside systems. Because it is open, the same Gmail MCP works for Claude, Codex, OpenCode, Cursor agents, and any future tool that speaks the protocol. MCP is a *standard*, not a product: when this book says "install the Gmail MCP", it means installing a specific MCP server that implements the Gmail capabilities. The "open" part is what matters — your investment in connecting the agent to your tools carries forward as the agent landscape evolves.
*See also: MCP server, MCP client, Connector.*
*→ Ch. 9*

### **MCP server**

A specific software bridge between your agent and one outside system — the **Gmail MCP server**, the **Linear MCP server**, the **Shopify MCP server**. Each server lists the things it can do (read messages, send a draft, create a ticket) and the agent decides when to call them. In everyday language the book uses **"connector"** for this. You install MCP servers; you do not edit JSON to do so — you ask the agent.
*See also: MCP, MCP client, Connector.*
*→ Ch. 9*

### **MCP client**

The other half of the MCP conversation: the part **inside the agent tool** that knows how to talk to MCP servers. You don't install or configure the client directly — it ships with your agent (Claude Code, Codex, etc.). The useful distinction: the *client* is your agent reaching out; the *server* is the system at the other end of the line. As a user, you spend your time choosing and installing servers; the client is just there.
*See also: MCP, MCP server.*
*→ Ch. 9*

### **Monitor, don't block**

One of the book's three throughlines. Let the agent take real action by default; *watch* what it does; *interrupt* when it's going wrong. The opposite of the default-restrictive stance most agent guidance pushes ("require approval everywhere, gate every tool call"). The heuristic isn't *"could this be expensive if wrong?"* — it's *"is this reversible? is the blast radius bounded?"* Spending $50 on a wrong ads campaign and pausing it ten minutes later is reversible; sending $50,000 to a fraudulent vendor isn't. The shorthand the book uses again and again: *let it cook and watch.* Interruption in modern agent tools is cheap and instant — use that, not prior restraint.
*See also: Throughline, Approval gate.*
*→ Ch. 7*

### **Orchestrator**

The piece of software that sits between the LLM and the outside world. The model decides *what* it wants to do next ("read this file", "call this MCP"); the orchestrator actually *does* it — runs the tool, hands the result back to the model, manages the conversation state, handles errors, decides when to compact. When you run `claude` or `codex` in your terminal, that running program is the orchestrator; the model itself runs in the cloud. The architecture diagram the whole book builds on is: **User → Model → Orchestrator → MCP → Real tools.** Almost every "what is X" question about agents resolves to "which box of that diagram are we in?"
*→ Ch. 2*

### **Plan mode**

A mode in Claude Code (with rough equivalents in other tools) where the agent thinks through a task and proposes a plan *without* taking any action — no edits, no tool calls with side effects. You read the plan, edit it, and then tell the agent to execute. Plan mode is the cleanest way to invoke the canonical working rhythm: **study → plan → review the plan → go → monitor → review.** Useful when the task is complex enough that a wrong first step would be expensive, or when you want to negotiate scope with the agent before any work begins.
*→ Ch. 10*

### **Prompt**

What you type to the agent — the instruction, the question, the description of the task. A prompt can be one sentence ("summarize this PDF") or several paragraphs (a full brief with files, links, constraints, and acceptance criteria). The single most consequential skill in working with agents is writing prompts that include the *right* context: the actual files, the actual data, the actual links — not vague descriptions of them. *"Match the invoices in `~/Documents/invoices-Nov/` against `stripe-nov.csv` in the same folder"* beats *"match my invoices against Stripe"* by orders of magnitude in the quality of the result.
*See also: Re-prompting.*
*→ Ch. 16*

### **Re-prompting**

Following up on the agent's previous response with a new instruction, correction, or clarification. Re-prompting is normal and healthy — the first response is rarely the last. But if you find yourself making the *same* correction across many sessions ("no spring animations", "use formal tone", "the amount column is column D"), that is the signal to stop re-prompting and **write a skill** that captures the correction once.
*See also: Skill.*
*→ Ch. 16*

### **Sandbox / sandbox mode**

A restricted environment that limits what the agent (or a specific command) is allowed to touch — which files it can read or write, which network hosts it can reach, which shell commands it can run. Sandboxes let you give the agent real capability without giving it the keys to the whole machine: it can edit code in this project, but not your `~/.ssh` folder; it can reach `github.com`, but not arbitrary outbound hosts. Claude Code, Codex, and OpenCode all ship with some form of sandboxing; the names and defaults differ. The book treats sandbox mode as a tool for keeping the **blast radius bounded**, not as a substitute for monitoring. Combine the two: a tight sandbox plus active watching beats either alone.
*→ Ch. 7*

### **Skill**

A reusable, named procedure the agent invokes by intent — *"ship this PR"*, *"reconcile this month's invoices"*, *"draft a brand-voice blog post"*. Where an MCP adds a new tool, a skill adds a new *way of using* tools — often composing several of them. Skills live as folders containing a `SKILL.md` (the instructions) plus any helper scripts, templates, or examples the procedure needs. You almost never write a skill from scratch by hand: after a successful session you tell the agent *"write a skill that captures what we just did"*, and it does. Skills are the single biggest force multiplier in this book — the war story you wasted a day on once, captured as code, never wasted on again. They're also how teams accumulate institutional knowledge: a project-level skill committed to a repo is shared with every teammate and every future agent that touches the codebase.
*See also: SKILL.md, Slash command, MCP.*
*→ Ch. 15, Ch. 16, Ch. 17*

### **SKILL.md**

The Markdown file at the heart of a skill. It contains the skill's **triggers** (when the agent should invoke it), **instructions** (the steps to follow), **examples**, **failure modes**, and any **hard rules** the user has learned the hard way ("no spring animations", "never push to main without a PR"). The file has a small **YAML frontmatter** block at the top declaring the skill's name, description, and a few other fields. The agent reads `SKILL.md` exactly the way it would read any other instruction — so writing a skill is essentially writing a short, well-organized prompt.
*See also: Skill, YAML frontmatter.*
*→ Ch. 17*

### **Slash command**

A single-shot, named invocation you type in the agent's prompt — `/init`, `/review`, `/ship-pr`. Slash commands feel like menu items; they're best for quick, repeatable operations that don't need a full multi-step procedure. The mental hierarchy in this book is **prompt → slash command → skill** — each layer is more reusable and more opinionated than the last.
*See also: Skill.*
*→ Ch. 15*

### **Sub-agent / multi-agent workflow**

Running more than one agent at the same time, usually with one agent (the parent) delegating work to others (sub-agents). Useful when a task can fan out — *"go research these five companies in parallel and bring back a one-pager each"* — or when you want a side-question chased while the main thread keeps moving. The book is deliberately measured about multi-agent workflows: they're powerful when the work genuinely parallelizes, but a single strong agent handles most tasks more cleanly than a fleet of specialized ones, and the coordination overhead is real. Try it; don't feel obliged. The author rarely uses sub-agents in daily work.
*→ Ch. 14*

### **Terminal agent**

An agent that runs in your shell — Claude Code, Codex, OpenCode, Gemini CLI. You interact through a text prompt in a terminal window. Terminal agents tend to feel like commanding a capable colleague: you type what you want, they go off and do it, they report back. Contrast with **IDE agents**, which live inside a code editor and feel more like driving a tool.
*See also: IDE agent.*
*→ Ch. 3*

### **Throughline**

A book term, not an industry one. The **three throughlines** are the principles that run through every chapter and that you can apply on your own once you've internalized them: (1) *if you can describe what you want, you can ask the agent to do it — including setting itself up*; (2) *equip first, then engage*; (3) *monitor, don't block*. Most chapters are a worked example of one or more of these three. If you remember nothing else from the book, remember those three sentences — the rest is patterns and tool-specific syntax that will keep moving, but the throughlines won't.
*See also: Equip first, Monitor don't block.*
*→ Ch. 1*

### **Tool call**

A single action the model decides to take — read a file, run a shell command, query an MCP server, click a button in a browser. Under the hood, every "thing the agent does" is a tool call. The model proposes the call; the orchestrator executes it; the result comes back into context; the model decides the next step. A long task is just many tool calls in a row. When you read a transcript of a session, the tool calls are usually the most informative line items — they tell you what the agent actually did, as opposed to what it said it was going to do.
*→ Ch. 2*

### **Vibe coding**

A term, coined by Andrej Karpathy in early 2025, for the style of working where you let the agent write nearly all the code from a high-level description, accepting most of what it produces without reading line by line — going on "vibes." It works for prototypes, demos, throwaway scripts, weekend projects, and the kind of one-off tool you'd otherwise never build. **This book mentions vibe coding for completeness but does not promote it as a default working style** — for code that will live in production, be read by teammates, or carry data that matters, the book recommends reviewing what the agent produces (see Ch. 13) and capturing recurring corrections as skills (see Ch. 16). Vibe coding is a tool in the kit; it isn't the kit.

### **Worktree**

A Git feature that lets you have multiple working copies of the same repository checked out at the same time, each on a different branch, in separate folders. Engineers use worktrees to run several agents in parallel — one per ticket — without them stepping on each other's branches, build caches, or `node_modules` folders. The canonical pattern is **"worktree-per-ticket"**: one agent in one folder works on one Linear ticket from start to PR. **This is engineer-only**; non-engineers can safely skip it. If you're not a developer and you saw the term in Ch. 14, the relevant thing to know is that engineers have a clean way to run agents in parallel; the mechanics aren't yours to worry about.
*→ Ch. 14*

### **YAML frontmatter**

A small block of structured metadata at the top of a Markdown file, fenced by `---` lines, used to declare fields like a title, a name, or a description. Skills use YAML frontmatter at the top of `SKILL.md` so the agent can scan many skills quickly and know which one to invoke. You will not hand-write YAML; the agent writes it when it writes the skill. If you've ever edited a Notion database property, you've already met the same idea.
*See also: SKILL.md.*

---

*Missing a term? Open an issue on the repo.*
