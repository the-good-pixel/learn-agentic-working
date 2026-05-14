# CLAUDE.md — Instructions for agents working on this book

You are helping write **Learn Agentic Working** — an open-source book that teaches teams how to use AI coding agents (Claude Code, Codex, OpenCode, etc.) to do real work, for both technical and non-technical audiences.

Read `README.md` first for the full vision, structure, and audience. This file is the *style and working* guide for any agent (you) helping write or edit the book.

---

## The reader

Default to writing for **two audiences side-by-side**:

1. **The technical reader** — engineer, data analyst, devops. Comfortable with CLI, git, JSON.
2. **The non-technical reader** — PM, marketer, ops, designer, founder. Comfortable with Notion, Google Sheets, Slack. Has chatted with ChatGPT or Gemini before, but has never used a CLI tool or an "agent".

**Rules of thumb:**
- Assume they know what an LLM is. Don't assume they know what an "agent", "MCP", "tool call", "skill", or "hook" is — introduce each on first use.
- When something is CLI-only, say so plainly, and tell the non-technical reader "you can skim this section, the idea matters more than the syntax."
- Every concept is taught **with a runnable example**. No abstract definitions without a concrete task next to them.
- Bias toward **"here's a thing you'd actually do at work"** over toy examples.

---

## Tone & voice

- Conversational, second-person ("you"), opinionated but humble.
- Short sentences. Active voice. No corporate hedging.
- It's okay to say "this is the part that always trips people up" or "skip this if you don't care about X."
- No marketing speak. No "unleash the power of." No "in today's fast-paced world."
- No emojis in the book content (the audience is international and many corporate readers find them unserious). Diagrams and screenshots are fine.

---

## Tool-neutrality policy

The book is **Claude-Code-led but not Claude-only**.

- Primary running examples use **Claude Code** because that's what the author uses.
- Every chapter that teaches a Claude-Code feature must include a short **"In other tools"** call-out noting the equivalent in **Codex**, **OpenCode**, **Cursor agent**, and **Gemini CLI** where one exists. If no equivalent exists, say so.
- Never claim a feature is unique to Claude Code without checking. Agent tooling moves fast — when in doubt, hedge ("at the time of writing…").

---

## Sourcing examples — use real history

When you need an illustrative use case, **prefer real, paraphrased examples from the author's actual Claude Code usage** over invented ones. The author's transcripts live at:

```
/Users/darrenchiu/.claude/projects/
```

Each subdirectory corresponds to a working directory; each `.jsonl` file is a session. The **first user message** in a session is usually the cleanest statement of intent.

Good real categories already mined (use these freely, vary which you cite):

- **Engineering**: feature work from a Linear ticket; cross-repo bug hunts ("Malaysia inquiries aren't being forwarded"); memory-leak hunt in a browser extension; compiling an unfamiliar repo on Mac+iOS.
- **DevOps/Infra**: scaffolding a new AliCloud backend; retrieving a UAT DB password from an IaC repo; investigating a prod incident with SQL only, no writes.
- **Data**: "study my TransactionHistory.csv — why does my balance keep dropping?"; folder-diff script for Downloads; spreadsheet-image extraction feasibility.
- **Research/Learning**: "why doesn't this Threads post show a link preview?"; debating GTM strategy with Gemini as a sparring partner; asking a codebase questions instead of changing it.
- **Automation/Tooling**: installing an MCP server; installing a skill from a GitHub PR; sweeping a model-version upgrade across configs.
- **Product/Business**: turning client feedback into code changes; auditing for UX bugs from a user complaint; adding analytics to find what features are actually used.
- **Everyday**: planning mesh-WiFi placement from a floor-plan photo; diagnosing a strange TLS cert error.
- **Bridging engineering and marketing**: generating product demo videos directly from a running app via a Playwright + Remotion pipeline (the `demo-video` skill on `dipping.ai`) — a key example for chapters that need to land for non-technical readers.

### Real skills to reference as worked examples

When a chapter needs a concrete skill, prefer these (paths are the source of truth — **read them before writing about them**). Skills are grouped by what they *teach*, not by what they technically do.

**Workflow & PR shepherding**
- **`ship-pr`** (user-level, `~/.claude/skills/ship-pr/SKILL.md`) — push → open PR → monitor CI → resolve AI review comments → notify when mergeable. The "AI reviewer thread is the audit trail; silent dismissal is forbidden" rule is quotable. Best for: Ch. 25 (engineers), Ch. 16 (long-running work), the book's "agents close loops, not just open them" thesis.
- **`worktree`** (project-level, `/Users/darrenchiu/Development/hkbu/.claude/skills/worktree/SKILL.md`) — creates paired FE+BE worktrees off `main` for one Linear ticket. The canonical "worktree-per-ticket" pattern. Best for: Ch. 16.

**Local dev & infra (the most-repeated pattern across all projects)**
- **`local-dev`** (project-level, `/Users/darrenchiu/Development/hkbu/.claude/skills/local-dev/SKILL.md`) — *war-story-as-skill*: documents the symlinked-`node_modules`-breaks-Vite-sandbox saga. **Use this for Ch. 20** as the second anchor anecdote (alongside `demo-video`) for "skill = the bug you wasted a day on once".
- **`local-dev-launcher`** (project-level, `/Users/darrenchiu/Development/buy-the-dip/.claude/skills/local-dev-launcher/SKILL.md`) — inspects PID owning a busy port, refuses to kill unless path matches the current repo. Teaches "don't trample other agents on a shared machine" etiquette. Best for: Ch. 6 (trust), Ch. 16 (parallel work).
- **`deployment`** (project-level, `/Users/darrenchiu/Development/tl-mono/.claude/skills/deployment/SKILL.md`) — encyclopedic runbook: every service, every env, every URL, every deploy branch. Teaches "skill as living runbook, the place Notion would otherwise lose to". Best for: Ch. 22.

**Permissions, credentials & scoped access**
- **`dev-backend-tester`** (project-level, `/Users/darrenchiu/Development/miles-loyalty/.claude/skills/dev-backend-tester/SKILL.md`) — readonly Postgres role with embedded creds. The "scoped credentials for agents" pattern. Best for: Ch. 6.
- **`railway-db-query`** (project-level, `/Users/darrenchiu/Development/buy-the-dip/.claude/skills/railway-db-query/SKILL.md`) — multi-env DB queries with sample tasks like "check if any users have on-demand reports" — agent doubles as ad-hoc BI for the PM. Best for: Ch. 21B (data folks), Ch. 27 (PMs).

**Testing & QA**
- **`test-assistant-capacity`** (project-level, `/Users/darrenchiu/Development/tl-mono/.claude/skills/test-assistant-capacity/SKILL.md`) — walks every documented capability of a production AI assistant and verifies tool selection / safety-rail wording, because "no CI job runs the agent end-to-end". **Agent regression-tests agent.** Best for: Ch. 17 (multi-agent), Ch. 31 (evals).
- **`audit-missing-e2e-tests`** (project-level, `/Users/darrenchiu/Development/tl-mono/.claude/skills/audit-missing-e2e-tests/SKILL.md`) — audits a diff for missing Playwright specs *and* missing entries in the PR-affected manifest. Best for: Ch. 25.
- **`backend-api-tester`** (project-level, `/Users/darrenchiu/Development/tl-mono/.claude/skills/backend-api-tester/SKILL.md`) — end-to-end including DB verification, outbound email via Mailpit, Sentry checks. Teaches "end-to-end means crossing service boundaries". Best for: Ch. 25.

**Scheduling & background work**
- **`cron-task`** (project-level, `/Users/darrenchiu/Development/tl-mono/.claude/skills/cron-task/SKILL.md`) — documents two coexisting cron systems and when to use each. Skill as architectural decision record. Best for: Ch. 18.
- **`task-system`** (project-level, `/Users/darrenchiu/Development/tl-mono/.claude/skills/task-system/SKILL.md`) — SQS FIFO + Postgres advisory locks + DLQ retry. Same pedagogical role for async work. Best for: Ch. 18.

**Content, comms & policy — strong material for non-technical readers**
- **`sendgrid-template-manager`** (project-level, `/Users/darrenchiu/Development/tl-mono/.claude/skills/sendgrid-template-manager/SKILL.md`) — CRUD on SendGrid dynamic templates via API. PM/marketer says "update the welcome email", agent does it. **Top pick for Ch. 27.**
- **`event-setup`** (project-level, `/Users/darrenchiu/Development/tl-mono/.claude/skills/event-setup/SKILL.md`) — event launch SOP: templates, reminders, Google Sheets sync, testing. A 6-Slack-channel coordination collapsed to one invocation. Best for: Ch. 27.
- **`i18n-reviewer`** (project-level, `/Users/darrenchiu/Development/tl-mono/.claude/skills/i18n-reviewer/SKILL.md`) — audits the frontend for missing translation keys *and* enforces geopolitical naming (e.g. "Country/Region" not "Country" when Puerto Rico/HK are in the list, for mainland-investor sensitivity). **Skill encoding policy, not just code.** Best for: Ch. 22, Ch. 27.

**Production marketing assets**
- **`demo-video`** (project-level, `/Users/darrenchiu/Development/buy-the-dip/.claude/skills/demo-video/SKILL.md`) — Playwright + Remotion. Carries explicit "hard rules" learned from user feedback ("no spring animations", "chyron owns bottom band", "don't redesign the chrome"). Best for: Ch. 20 (first anchor anecdote), Ch. 22 (anatomy), Ch. 27 (code → marketing).

**Domain-specific (showing the breadth)**
- **`portfolio-info`** (`/Users/darrenchiu/Development/shared-investment-claude-skills/.claude/skills/portfolio-info/SKILL.md`) — live broker positions, P&L, margin across HK/US/JP via local OpenD daemon. Best for: Ch. 28 (personal/everyone — "Bloomberg-lite").
- **`ticker-news`** (`/Users/darrenchiu/Development/shared-investment-claude-skills/.claude/skills/ticker-news/SKILL.md`) — parallel-fetches Polygon + Alpaca + Yahoo, merges timelines, per-ticker sentiment. Multi-source aggregation as skill primitive. Best for: Ch. 28.
- **`sorter-pipeline`** (`/Users/darrenchiu/Development/diamond-ckw-control/.claude/skills/sorter-pipeline/SKILL.md`) — pure reference doc: end-to-end ASCII diagram of a diamond-sorting hardware pipeline (camera → ONNX → blow command, with latencies). **Non-procedural skill: an architecture map.** Best for: Ch. 22 (showing skills aren't always step-by-step).
- **`build-sorter`** (`/Users/darrenchiu/Development/diamond-ckw-control/.claude/skills/build-sorter/SKILL.md`) — cross-platform .NET build with ONNX/HALCON/CUDA verification. "The build script the README always lies about". Best for: Ch. 22.

**Meta — skills about the agent itself**
- **`claude-code-guide`** (project-level, `/Users/darrenchiu/Development/tl-mono/.claude/skills/claude-code-guide/SKILL.md`) — reference for CLAUDE.md precedence, `@`-import syntax, settings.json, hooks, skills. Onboarding-as-skill. Best for: Ch. 29 (team leads).
- **`uv-python-package-manager`** (project-level, `/Users/darrenchiu/Development/tl-mono/.claude/skills/uv-python-package-manager/SKILL.md`) — aggressively normative ("ALWAYS `uv add`, NEVER `uv pip install`"). **Skill as enforcement layer for team tooling decisions.** Best for: Ch. 29.
- **`agent-browser`** (project-level, `/Users/darrenchiu/Development/tl-mono/.agents/skills/agent-browser/SKILL.md`) — canonical navigate → snapshot → interact → re-snapshot loop with `@e1` element refs. Best for: Ch. 30 (voice/vision/computer use).

**Research patterns**
- **`gemini-chat-and-search`** (user-level, `~/.claude/skills/gemini-chat-and-search/SKILL.md`) — multi-turn consensus required ("never treat Gemini's first response as final"). Best for: Ch. 11, Ch. 17.
- **`gemini-search`** (project-level, `/Users/darrenchiu/Development/buy-the-dip/.claude/skills/gemini-search/SKILL.md`) — single-shot quick variant. Pair with `gemini-chat-and-search` to teach **deliberate skill-versioning for different tradeoffs**.

**When citing**: paraphrase, never quote verbatim. Strip any client names, internal hostnames, ticket IDs, credentials, or personal data. If a real example would require too much anonymization, invent a parallel one and label it as illustrative.

---

## The architecture diagram

The book's backbone diagram (in `assets/`, source in the project root) shows:

```
You → Orchestrator → Model → Connector → Real app
        ↑              ↓
        └── loops back ──┘
```

- **You** type into the **Orchestrator** (Claude Code, Codex, OpenCode, Cursor) — not into the model directly.
- The **Orchestrator** owns the agent loop. It packages your prompt with system prompt, tool definitions, file context, and `CLAUDE.md`, then *consults* the **Model**.
- The **Model** writes back either prose or a tool call.
- Tool calls are dispatched through a **Connector** to the matching **Real app**. **MCP** is the dominant connector protocol; built-in tools (file Read/Write, Bash) are also connectors in this architectural sense.
- The result feeds back into the model's next turn — the orchestrator runs that loop until the task is done.

This is the **single mental model** the whole book builds on. Refer back to it any time you introduce a new concept — say which box of the diagram you're zooming into. Two recurring framings to watch for and correct in drafts: (a) "the user talks to the model and Claude Code is a wrapper around it" — wrong, the user talks to the *orchestrator*, which consults the model; (b) "MCP is the connector layer" — close, but **connector** is the umbrella term and **MCP** is the most common kind.

---

## Writing rules

Modeled on [Learn Harness Engineering](https://github.com/walkinglabs/learn-harness-engineering) — read a lecture from that repo before drafting a chapter here to calibrate.

**File layout**
- One chapter per folder under `docs/en/<part>/chapter-NN-slug/index.md`. Optional `code/` subfolder for runnable examples.
- Kebab-case slugs derived from the chapter title (e.g. `chapter-20-when-to-write-a-skill/`).
- The site is rendered with **VitePress**, structured for multilingual translation (`en/`, eventually `zh/` etc.).

**Chapter titling**
- **Conceptual chapters get question titles** ("Why is context everything?", "When should you let the model think longer?"). The question creates intrigue and frames the chapter as an investigation.
- **Setup, reference, and workflow chapters use declarative titles** ("Installing your agent", "For PMs, Designers, and Business / Ops").

**Length**
- **Target 2,000–2,500 words per chapter.** Long enough to be useful; short enough to read in one sitting. If a chapter starts blowing past 3,000, split it.

**Chapter shape (every chapter follows this)**
1. **Opening hook** — a relatable scenario in 2–4 sentences, ending on a counterintuitive premise. Direct second-person ("You consider yourself…"). Do *not* open with a definition.
2. **Body**: 4–7 named sections with `##` headings. Lead with concrete examples, then generalize. Use metaphors (saddle/horse, restaurant kitchen, doctor's diagnosis). Quote real numbers and real sources where you can. Weave external links **inline** at the point they're relevant — do not save them for a "Further Reading" block at the end.
3. **Wrap-up** — pick the form that serves the chapter, don't default to bullets:
   - *The takeaway* — 3–5 bullets, one tight sentence each. Best for conceptual chapters.
   - *A recap in one paragraph* — prose. Best for narrative/workflow chapters where bullets would feel mechanical.
   - *A checklist* — items the reader should now have done. Best for setup chapters.
4. **Try it yourself** — **1–3 hands-on exercises**, count chosen by the chapter (a setup chapter may only need one; an advanced chapter may want three escalating ones). Each exercise includes a "You'll know it worked when…" success criterion. No forced easy/medium/hard grading — only grade them when the chapter actually has three.
5. **What's next** *(optional)* — one line pointing to the natural follow-up chapter, only when there's a real dependency. Skip it on chapters that don't need it; do not pad.

**Voice**
- Conversational yet authoritative. Direct address ("you"). Active voice. Short sentences.
- Casual asides are welcome where they help ("I'm not joking", "skip this if you don't care about X").
- No marketing speak. No "unleash". No emojis in chapter content.
- It's okay — encouraged — to show the agent failing, getting redirected, getting it wrong the first time. The book is about working *with* an imperfect collaborator, not selling magic.

**Concrete content rules**
- **Lead with a scenario, not a definition.** Definitions go in the glossary; chapters teach through situations.
- **Code blocks are copy-pasteable.** Annotate non-obvious flags inline (`# this flag does X`).
- **Screenshots and GIFs** live in `assets/` and are referenced relatively. Prefer GIFs for "this is what it looks like when it works."
- **Cite real numbers** when you have them (session length, cost per task, token counts). Vague claims weaken the book.
- **"In other tools" callout**: every chapter that teaches a Claude-Code-specific feature includes a short note on Codex / OpenCode / Cursor / Gemini CLI equivalents, or explicitly says none exists.

**Files you should not create**
- No `.md` files outside `docs/`, `assets/`, `examples/`.
- No planning docs, decision logs, or "summary.md" files unless the user explicitly asks.

---

## Working norms for the agent (you)

- This repo will be **published on GitHub** as a free open-source resource. Treat every file as something strangers will read.
- **Never commit or push** on this project without explicit, in-the-moment user confirmation. Staging changes is fine; running `git commit` or `git push` is not — even when the user has approved several commits earlier in the same session, treat the next one as needing fresh approval. When work is ready, *show the diff and ask*, don't act. The user deploys manually; when deployment is needed, provide the commands.
- **Commit messages are short** (one line). No `Co-Authored-By` trailer, no "Generated with Claude Code" trailer — the user has asked to skip those to save tokens.
- When the user asks for a new chapter, **draft an outline first** and confirm before writing the full chapter. Chapters are expensive to rewrite once they exist.
- When in doubt about a tool's current behavior (Codex syntax, OpenCode config, an MCP server's capabilities), **verify with WebSearch or WebFetch** rather than relying on memory — this space changes fast.
- Diagrams: prefer Mermaid for anything embedded in Markdown so it renders on GitHub Pages without an image pipeline. Reserve raster images for screenshots and the hero architecture diagram.

---

## Writing principle: "don't intimidate — start small, advanced is opt-in"

A new reader who looks at the full TOC will see *sub-agents, parallel worktrees, multi-agent workflows, autonomous schedules, custom MCP servers, vibe coding* and reasonably conclude *"I have to learn all of this before I can use an agent."* That conclusion is wrong, and the book must actively counter it everywhere it could form.

**The shape of competence we're teaching is:**

```
Start with: brief the agent → one task → ship it
Add over time, only when pulled: skills, MCPs, scheduling,
                                  sub-agents, parallel worktrees,
                                  multi-agent workflows…
```

You grow into advanced patterns *when a real task makes you wish you had them*, not before. The book is a reference, not a textbook you have to finish first.

**When writing any chapter that introduces an advanced pattern** (Ch. 14 multi-agent/parallel work, Ch. 15 scheduled, Ch. 19 custom MCP server, anything in Part VI):

- Open with a *"you need this when…"* trigger that names the concrete pain that makes the pattern worth learning. Example: *"You'll know you want a sub-agent the day you wish a long research detour could happen in the background while you keep working on the main thread."*
- Explicitly say: *"You do not need this on day one."* / *"Skip this chapter until [the trigger] is true for you."*
- Don't lead with the cool-factor or the technical complexity. Lead with the pain it solves.

**When writing for non-engineers** in particular, take extra care not to plant the "I need to learn N hard things first" worry. A Part V audience chapter should be readable as a complete unit, even by a reader who has never opened Part III.

Avoid language that implies prerequisite knowledge: *"now that you understand sub-agents…"*, *"as we covered in Ch. 14…"*. Make every chapter survivable by a reader who hasn't read the others.

---

## Working principle: "equip first, then engage"

**Before starting any task, audit what MCPs and skills already exist for the tools, platforms, and systems involved. Install / load them *first*. Only then begin the work.**

This is a behavior change the book asks of every reader. The old reflex: *"OK, new task — let me think about how to do this."* The new reflex: *"OK, new task — what tools and platforms are involved? Are there MCPs or skills for them? If yes, equip the agent. If no, write a quick one (or ask the agent to). Then start."*

Why it matters:
- An agent improvising against a tool it has never seen produces lower-quality work than an agent that inherits a pre-built MCP or skill. The MCP packages up *how* to use the tool; the skill packages up *how the team uses the tool*.
- Pre-equipping is a one-time cost that pays out across every future task in that domain — install the Google Ads MCP once, use it forever.
- It is also a *discovery loop*: the question *"is there an MCP or skill for this?"* is itself a prompt you give the agent. It will search, surface candidates (Anthropic registry, GitHub, vendor-published, community), and install the right one with your blessing.

Sources of pre-built equipment to look for, in order:
1. **Your own user-level skills** (already installed)
2. **Your team's shared skill library** (project-level skills committed to a repo)
3. **Vendor-published MCP servers** (Shopify, Linear, Stripe, GitHub, Google Workspace, etc. — official, maintained, reliable)
4. **Community / awesome-MCP lists and the Anthropic MCP registry**
5. **Search for a community skill on GitHub** (someone has often written `awesome-claude-skills/<vendor>`)
6. **If none exists, ask the agent to write a minimal skill or MCP wrapper** — it's usually cheaper than expected

When you write a chapter that introduces a new domain (ecommerce, ads, support, finance, …), the first paragraph of the *workflow* should follow this reflex: "first, equip — what MCPs and skills exist for this domain? Install them. Then proceed." Don't show readers diving into a task without equipping; that trains the wrong reflex.

When you write about a workflow that calls for a tool the agent doesn't yet know, the language should be **"install the X MCP"** (one phrase from the reader, one action by the agent) — not "configure X" or "set up X" (which suggest manual technical work).

---

## Meta-thesis: "if you can describe it, you can ask the agent to do it — including the setup"

The book's single most important promise to non-technical readers is: **you do not need to write code, write configuration files, or install anything by hand.** The agent can do almost all of that *for* you, if you just ask.

This must be a live thread throughout the book — not a single chapter mentioning it once, but a reminder at every point where a non-technical reader might otherwise think *"oh, this requires coding, I'll bounce."* Concretely:

- **Installing the agent itself** (Ch. 6) — once one Claude/Codex/OpenCode is on the machine, the agent can install other agents, set up shells, configure aliases, edit dotfiles. The reader's only required keystrokes are the first install.
- **CLAUDE.md / AGENTS.md** (Ch. 8) — the reader does **not** hand-author these. They have a 5-minute conversation with the agent about what they do, who they are, what they care about, and the agent writes the file.
- **MCP servers** (Ch. 9) — the reader does **not** edit JSON configs. They say "install the Gmail MCP and connect it to my Google account" and the agent does it, prompting for the OAuth grant.
- **Skills** (Ch. 18) — already covered: skills are written *by the agent*, from the conversation. Reinforce this everywhere skills come up, not just in the skill-writing chapter.
- **Slash commands, hooks, settings.json** — same pattern. "I want this to happen automatically when X" → agent writes the hook.
- **Connecting the agent to a new system** (a vendor portal, an internal tool, a database) — the reader describes the system in English; the agent figures out the connection.

**Language to use when a non-technical reader might balk**:
- *"You don't write this yourself — you ask the agent to."*
- *"Describe the outcome you want; the agent handles the mechanics."*
- *"You don't need to know what JSON looks like."*

**Code-talk audit rules for non-engineering chapters (Part V Ch. 22, 23; parts of Ch. 13, 24)**:
- Don't use unexplained engineering jargon: `Playwright`, `Remotion`, `Postgres`, `MCP config`, `API`, `JSON`, `branch`, `diff`, `repo`, `worktree`, `dotfile`. If the concept matters, name it in plain English and parenthesize the technical term once.
- Frame technical tools as **things the agent uses, not things the reader configures**. "The agent records the flow with a browser-automation tool" beats "you'll write a Playwright script".
- Never imply the reader is the one writing code, configs, or specs unless the chapter is explicitly for engineers.
- "Reviewing the agent's work" applies to **any** output (a draft email, a created ticket, a spreadsheet update, an ad campaign, a published blog post) — not just code diffs. Code diffs are one case among many.

---

## Thesis nuance: "skip the AI tool, keep the SaaS"

The Ch. 5 thesis is **not** anti-SaaS. Be careful in any chapter that touches this idea:

- **Keep**: systems of record and sustained multi-user workflows — Shopify, HubSpot, QuickBooks, Notion, Slack, your bank. These exist for good reasons: shared state, persistence, real-time collaboration, customer-facing UX, things that must run when you're not at your computer.
- **Skip**: the point-solution **"AI tools"** layered on top of those systems — the AI analytics wrapper, the AI report writer, the AI resume screener, the AI contract reviewer, the AI copywriter, the AI lead enricher, the Notion AI / Slack AI / Gmail AI upcharge. A general-purpose agent does that work in context, against the systems the reader already pays for.

The rule of thumb: **one-off and ad-hoc analytical/generative tasks → use your agent. Sustained, multi-user, shared-state workflows → keep the SaaS.**

When writing, never frame this as "you don't need apps anymore" or "SaaS is dead". The frame is: *"keep the system; skip the AI wrapper layered on top of it."*

## Guiding philosophy: monitor, don't block

> **When in doubt, side with capability, not caution.**

The book's stance on agent autonomy is **encourage real action, watch closely, intervene when wrong** — not "gate every tool call out of caution". This is a deliberate counter-position to most agent guidance, which leans default-restrictive and trains readers to under-utilize their agent. The user's words: *agents can usually do more than people expect; the book's job is to push readers from "asking questions" to "delegating work".*

When you write any chapter that touches trust, permissions, safety, deployment to production, or money-handling:

1. **Let the agent take real action by default.** Connecting it to live Google Ads, real Shopify, the actual CMS, a non-prod DB with real data — that's the *point* of agentic working, not the danger.
2. **Watch what it does.** Streamed output, dashboards, notifications, sub-agent reports — the human stays in the loop by *observing*, not by approving every step.
3. **Stop it when something's wrong.** Interruption is cheap and easy in modern agent tools; use *that*, not prior restraint.
4. **The exception** is when the consequence is **big and irreversible**: production DB writes, irreversible deletes, large financial transfers, mass-sending to customers, anything that touches PII in regulated contexts. *Those* deserve explicit approval gates. Not everything else.

**The heuristic** is **"is this reversible? is the blast radius bounded?"** — *not* "could this be expensive if wrong?". Spending $50 on a wrong Google Ads campaign and pausing it 10 minutes later is reversible. Sending a fraudulent payout to a vendor isn't.

**Language to use:** *"let it cook and watch"*, *"trust until proven wrong"*, *"capability over caution"*, *"monitor, don't block"*.
**Language to avoid:** *"always require confirmation"*, *"never let the agent X"*, *"money is at stake → must gate"*, and similar default-restrictive framings.

This applies to the anti-patterns chapter too: **the anti-pattern is over-gating** (treating every tool call like a nuclear launch) and **under-monitoring** (firing-and-forgetting), *not* "agent does too much".

---

## Working preference: project guidance lives here, not in memory

The user prefers durable, book-shaping guidance to live **explicitly in this `CLAUDE.md`** rather than in the private auto-memory system at `~/.claude/projects/.../memory/`. Reasons:

- This file is committed to the repo, so teammates and translators inherit the same direction.
- It survives memory pruning, machine moves, and changes in tooling.
- It's auditable — anyone can read it and see exactly what the book is supposed to be.

When the user says "remember X" or gives feedback that should shape future drafting sessions on this project, write it **here** as a new bullet under the relevant section (or a new section), not as a memory file. Reserve the memory system for cross-project user preferences, never for project-specific guidance about this book.

## Things to actively avoid

- **"Just ask the AI"** as advice. Every section should show the *how*, not the *whether*.
- **Pretending agents are magic.** Show the failures, the mid-course corrections, the moments where you have to step in.
- **Single-tool tribalism.** If Codex or OpenCode does something better, say so.
- **Coding-only examples** in chapters that are meant for non-technical readers. Test: would a marketing manager finish this chapter and know what to do tomorrow?
- **Hypothetical features.** Only document what shipped and works today.

---

## Site / publishing

- Hosted on **GitHub Pages**, source = Markdown in `docs/`.
- Theme: minimal, readable, code-friendly. (To be picked — keep it boring.)
- The site URL and Pages workflow will be set up by the user; don't push or configure deployment without explicit instruction.

---

## When the user gives you a task

1. If it's "write chapter X", start with an outline (h2-level bullet list), confirm, then draft.
2. If it's "find a real example for Y", mine `/Users/darrenchiu/.claude/projects/` before inventing one.
3. If it's "add a tool-neutrality note", check Codex and OpenCode docs via the web before writing.
4. Default to **editing existing files** rather than creating new scaffolding ones.
