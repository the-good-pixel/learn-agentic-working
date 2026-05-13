# Appendix B — Tool Comparison

*Current as of May 2026.*

Chapter 3 mapped the landscape in prose; Chapter 6 walked you through installing one agent. This appendix is the reference table the rest of the book points back to when you need to look something up — *does Codex have a plan mode? does OpenCode load skills? what's the install command for Gemini CLI?*

A warning before the tables: this space changes monthly. Pricing tiers shift, feature flags graduate, and at least one tool listed here will have shipped a release-note headline between when this is written and when you read it. Where a feature is unclear or unannounced as of writing, the table says so explicitly rather than guessing. Treat this as a calibrated snapshot, not a spec sheet.

The comparison is grouped into three sections, mirroring the three families from Ch. 3: **terminal agents** (the deepest table, since most of the book's examples use them), **IDE agents**, and **browser / computer-use agents**. A short *How to pick* section closes the appendix.

---

## Terminal agents

The terminal-agent table is the most important one in this appendix. These are the workhorses — file-system access, MCP support, skills, long autonomous runs. Most of the patterns elsewhere in the book have a column in here.

### Identity, install, pricing

| Tool | Vendor | Model family | Install command | Pricing model | Free tier |
|---|---|---|---|---|---|
| **Claude Code** | Anthropic | Claude (Opus, Sonnet, Haiku) | `npm install -g @anthropic-ai/claude-code` | Subscription (Claude Pro $20/mo, Max $100–$200/mo) **or** pay-per-token via Anthropic API | None for the CLI itself; trial credit on a fresh Anthropic API account |
| **Codex** | OpenAI | GPT (GPT-5 family, o-series) | `npm install -g @openai/codex` | Subscription (included in ChatGPT Plus $20/mo, Pro $200/mo, Enterprise) **or** OpenAI API key | Limited use on the free ChatGPT tier; meaningful caps start at Plus |
| **OpenCode** | Community / Sourcegraph-adjacent (open source) | Model-agnostic — Claude, GPT, Gemini, local | `npm install -g opencode-ai` (also Homebrew, curl-installer) | Tool is free; you pay the model provider you point it at | Yes — the tool is free; pair with any free model tier (Gemini's free tier, local Llama, etc.) |
| **Gemini CLI** | Google | Gemini (1.5 Pro, 2.x family) | `npm install -g @google/gemini-cli` | Free tier through a personal Google account; Vertex AI / API billing for higher limits | Yes — generous free tier as of writing (rate-limited but workable for daily use) |
| **Aider** | Open source (Paul Gauthier and contributors) | Model-agnostic; defaults to Anthropic / OpenAI APIs | `pip install aider-chat` (or `pipx install aider-chat`) | Tool is free; you pay the model provider | Yes — the tool is free; pair with any model tier |

### Capabilities

| Tool | MCP support | Skills support | Plan / preview mode | Permission modes | Worktree / multi-session |
|---|---|---|---|---|---|
| **Claude Code** | Yes — first-class. `claude mcp add`, registry of community + official servers, OAuth where supported | Yes — `~/.claude/skills/<name>/SKILL.md` (user) and `.claude/skills/<name>/SKILL.md` (project). Auto-discovered; surfaced via the Skill tool | Yes — `Shift+Tab` cycles through *normal → auto-accept → plan*. Plan mode is read-only until you approve | `--permission-mode default | acceptEdits | bypassPermissions | plan`, plus per-tool allow/deny in `settings.json` | Strong. Native git-worktree workflow, plus user-built `worktree` skills for paired FE/BE checkouts. Multiple `claude` instances in different folders is the canonical pattern |
| **Codex** | Yes — `codex mcp` subcommand, config via `~/.codex/config.toml`. Smaller community registry than Claude Code's but growing | Partial — Codex supports `AGENTS.md` for project context and custom tools, but a dedicated "skill" primitive equivalent to Claude Code's SKILL.md *as of writing* is not the same shape. Closest equivalent: custom tools and prompt files | Yes — Codex has a "plan" / preview behavior; defaults are conservative and ask before edits | Approval flags around auto-edit / auto-run. Codex defaults are more conservative than Claude Code's out of the box | Supported via running multiple `codex` instances in separate folders; less native worktree tooling than Claude Code's ecosystem |
| **OpenCode** | Yes — MCP is a first-class concept in the config. You declare servers in `~/.config/opencode/` or project config | Partial — OpenCode supports custom agents and instructions; a Claude-Code-style `SKILL.md` registry equivalent *as of writing, no published direct equivalent* — verify on the OpenCode docs before relying on this | Yes — has a plan/preview mode; specifics differ by version | Configurable per-tool; designed to be model-agnostic, so permission semantics are uniform across providers | Multiple instances in separate folders. Good fit for tmux-based workflows |
| **Gemini CLI** | Yes — MCP is supported; documented in the Gemini CLI repo. Coverage of community servers is thinner than Claude Code's | *As of writing, no published equivalent* to Claude Code's SKILL.md system. Gemini CLI relies more on its long context window and Google Search grounding than on a skill registry | Has a confirmation flow before edits; the exact UX differs from Claude Code's plan-mode keystroke | Per-tool approval; YOLO-style auto-approve flags exist but defaults are cautious | Multiple instances per folder; no native worktree primitive beyond what git provides |
| **Aider** | Limited — Aider's design pre-dates MCP. It can shell out to MCP-aware tools, but MCP is not the native extension model. *Verify current status* — community PRs have added MCP support, but it is not the primary pattern | No skill system; Aider's extension surface is its own command set and a `CONVENTIONS.md` file you can `/read` | Aider's `--no-auto-commits` and `/ask` give a similar effect — propose, then confirm | Per-edit confirmation by default; `--yes` for autonomous runs | Aider is designed to operate one repo at a time. Multiple sessions = multiple shells |

### Autonomy, stability, fit

| Tool | Background / autonomous runs | Stability as of writing | Best for |
|---|---|---|---|
| **Claude Code** | Yes — `claude -p` for one-shots, hooks/subagents/long runs supported. Anthropic-hosted *Managed Agents* / scheduled routines extend this off your laptop | Mature and actively shipped; releases multiple times a week. The most stable terminal agent ecosystem at time of writing | Engineers and ops who want the deepest skills/MCP ecosystem and the strongest tool-use loop |
| **Codex** | Yes — `codex exec` for headless runs; OpenAI also offers longer cloud-side sessions tied to ChatGPT accounts | Mature; well-funded; ships frequently | Teams already on ChatGPT Enterprise; readers who want OpenAI's model family in a terminal loop |
| **OpenCode** | Yes — supports headless/one-shot modes. Specifics depend on configured model provider | Stable but smaller community than the vendor-backed agents; releases are frequent | Readers who want zero vendor lock-in, BYO model, or self-host the orchestrator while keeping a single outbound API call to the chosen model |
| **Gemini CLI** | Yes — non-interactive mode supported | Stable; younger than Claude Code and Codex in terms of ecosystem maturity | Google Workspace–heavy teams, long-context tasks (massive codebase reads), Search-grounded research |
| **Aider** | Yes — `--yes` and scripting support are first-class | Mature, narrow surface area, very low bug rate for what it does | Disciplined Git-aware code editing on a single repo. Excellent complement to a broader agent rather than a replacement |

### Notes on the terminal-agent table

- **MCP support** is moving fast across all five tools. The interesting axis is no longer *do they support MCP?* but *how easy is it to install one and how good is the community registry?* Claude Code leads on registry depth at time of writing; the others are closing.
- **Skills** as a primitive (a markdown file with frontmatter that the agent auto-loads) is Anthropic-led. The other tools have *something* analogous — Codex's `AGENTS.md`, Aider's `CONVENTIONS.md`, custom-tool registries — but the shape and discovery story differ. Don't assume your `SKILL.md` files port over byte-for-byte.
- **Plan mode** is the feature most often confused across tools. The shared idea is *"propose changes before making them"*. The UX differs (Claude Code's `Shift+Tab` toggle, Codex's approval prompts, Aider's `/ask` command). Functionally equivalent for most purposes.
- **Permission modes** all collapse to a spectrum from *ask-on-every-edit* to *auto-everything*. The book's recommendation in Ch. 7 is to live near the middle of that spectrum and lean toward more autonomy as trust accumulates — *monitor, don't block*.

---

## IDE agents

IDE agents are narrower than terminal agents — they shine at code work where you want to stay in the editor and see diffs inline. If you're not an engineer, you can skip this section.

| Tool | Editor / fork | Model choice | Inline-diff UX | Pricing | Free tier | Best for |
|---|---|---|---|---|---|---|
| **Cursor** | A fork of VS Code (separate app) | Multi-model: Claude, GPT, Gemini, others. You can switch per-request | Excellent — multi-file diffs, "Composer" / agent mode for cross-file edits, fast tab-completion | Hobby free tier (rate-limited); Pro $20/mo; Business $40/mo | Yes — limited daily fast requests | Engineers who want the deepest in-editor agent UX and don't mind running a separate editor app |
| **Windsurf** (formerly Codeium) | A fork of VS Code (separate app) | Multi-model with hosted defaults; *Cascade* is the agent surface | Strong — Cascade is built around long-running, multi-step agent actions in-editor | Free tier; Pro tier (priced similarly to Cursor — *verify current pricing*) | Yes — historically generous; verify current limits | Engineers who like Cursor's premise but want Windsurf's defaults around longer agent runs |
| **GitHub Copilot Agent** | Inside VS Code (and JetBrains, Visual Studio) as an extension | OpenAI (GPT family) and increasingly Claude. Model picker varies by tier | Solid — diffs inline; deep integration with GitHub itself (issues, PRs, Actions). The agent can open PRs from the editor | Bundled with GitHub Copilot subscriptions — Individual $10/mo, Business $19/user/mo, Enterprise tier | Limited free for verified students / OSS maintainers | Teams already paying for Copilot through GitHub; deep GitHub-PR-centric workflows |
| **Cline** | VS Code extension (open source) | BYO key — Anthropic, OpenAI, OpenRouter, Bedrock, local | Strong inline diffs; designed for agent-mode workflows | Extension is free; you pay model provider | Yes — extension is free | Engineers who live in stock VS Code and don't want a separate editor; cost-visible BYO-key setups |
| **Roo Code** | VS Code extension (open source, fork of Cline) | BYO key — same surface as Cline plus added modes | Similar to Cline with extra "modes" (Architect, Code, Ask, etc.) | Free | Yes | Engineers who liked Cline and want more configurable agent modes |

A few notes for the IDE column:

- **Stay-in-VS-Code vs separate fork**: Cursor and Windsurf are separate apps. Cline and Roo Code are extensions in the VS Code you already have. This is the biggest practical choice once you've decided you want an IDE agent at all.
- **Model-agnostic**: Cline, Roo Code, and Cursor (to a degree) let you swap models per request. Copilot Agent is more vendor-bound, though it has been opening up to Claude.
- **When to skip**: if you do half-engineering / half-PM work, a terminal agent plus your normal editor usually beats adopting a whole agentic IDE. The IDE agent is most valuable when *every* task is code and you want diffs in-context.

---

## Browser and computer-use agents

The newest family and the most visually striking. These agents drive a real browser (or a real desktop), see screenshots, and emit clicks and keystrokes. Useful precisely when there is no API and no MCP — vendor portals, internal admin tools, SaaS settings buried five clicks deep.

| Tool | What it is | Headed vs headless | Where it runs | Pricing | When it's the right answer |
|---|---|---|---|---|---|
| **Claude for Chrome** | Chrome extension that gives Claude vision and action on your active tab | Headed — uses your real Chrome window | Locally, in your browser | Included in eligible Claude.ai plans (rollout / availability varies — *verify on claude.com*) | When the tool you need to drive is already open in a tab and you want Claude to work alongside you visibly. Best beginner browser agent |
| **ChatGPT Agent** (successor to Operator) | Managed environment where an agent drives a virtual browser | Headless from your perspective — runs on OpenAI's infra | OpenAI cloud | Included in ChatGPT Pro/Plus tiers (availability varies) | When you want a task running while your laptop is closed; longer, multi-step jobs on a remote browser |
| **Gemini in Chrome** | Google's Chrome-side agent, leaning on the Google account ecosystem | Headed; runs against your active Chrome session | Locally, in your browser | Tied to Google AI / Gemini Advanced subscription (*verify current bundling*) | Google Workspace–centric workflows; Gmail, Calendar, Drive interactions where SSO matters |
| **Anthropic Computer Use API** | API-level building block: the model sees a screenshot of a desktop or browser and emits mouse/keyboard actions | Either, depending on how you wire it up | You provide the environment (a VM, a Docker container, a real desktop) | Pay-per-token via Anthropic API | When you're *building* an agent that needs UI control — e.g., a custom skill, a Playwright-style wrapper, an internal automation |
| **OpenAI / others computer-use APIs** | Same building-block idea from other vendors | Either | You provide the environment | Pay-per-token | Same as above, with the model family you prefer |
| **Playwright / Puppeteer skills** | Not an agent — a deterministic browser automation library that the agent writes scripts against | Headless or headed | Local | Free (libraries are open source) | When you want reproducibility over flexibility — the agent writes a Playwright script, runs it, reads results. Slower to author, much faster and more reliable to re-run |

A practical truth from Ch. 3 worth restating here: today's browser agents are slower and flakier than terminal agents because reading a screenshot is harder than reading an API response. They are useful enough to keep one installed for the long tail of UI-only tools, but you don't want them in the hot path of work that has an API alternative. Try the API first; reach for the browser agent when there isn't one.

---

## A note on what's *not* in these tables

A few products you might expect to see and why they aren't given their own column:

- **Devin, Replit Agent, and similar "autonomous" branded products.** As Ch. 3 notes, these are not a distinct family — they're orchestrators tuned for longer leashes around models you can also use directly. Use the terminal-agent table and assume a longer-running configuration.
- **Zed AI, JetBrains AI Assistant, IntelliJ-side agents.** Every serious editor now ships some flavor of agent. Functionally they slot into the IDE-agent table; the columns above would all read "similar to Copilot Agent" or "similar to Cline". Verify against the editor's current docs.
- **ChatGPT, Claude.ai, Gemini web apps.** These are chat interfaces, not agents in the sense this book uses. They can call tools and increasingly drive browsers (ChatGPT Agent), but the bare chat surface lives a layer above the agent loop the book teaches. Use them for ideation; use the agents for execution.
- **n8n / Zapier / Make AI nodes.** Useful for sustained, multi-trigger workflows; not interchangeable with an agent. Ch. 5's thesis covers this distinction.

---

## How to pick

You do not need to find the *best* tool. You need to find the one whose pricing you already pay for, install it, and start. Switching costs are low: skills and `CLAUDE.md`-style files port across with minor edits, MCP configs are largely portable, and the muscle you build on one terminal agent transfers to the next in a weekend.

A loose decision tree:

- **You already pay for ChatGPT (Plus, Pro, Enterprise).** Install **Codex**. One billing relationship, your existing model preferences, same login.
- **You already pay for Claude (Pro or Max).** Install **Claude Code**. Same logic in reverse, and you get the deepest skills/MCP ecosystem at time of writing.
- **You want zero vendor lock-in, or you need to self-host the orchestrator.** Install **OpenCode** and point it at the model API key you already have. Pay the model provider, not the tool.
- **You live in VS Code all day and don't want to leave the editor.** Install **Cursor** (if you'll switch to the fork) or **Cline** / **Roo Code** (if you want to stay in stock VS Code). Pair it with a terminal agent for the cross-repo, multi-tool work that doesn't fit cleanly in an editor.
- **You're a non-engineer and the terminal still feels intimidating.** Install a terminal agent anyway — Ch. 6 walks you through the only manual step. Add **Claude for Chrome** alongside so you have a visible, in-browser view of an agent acting in a window you already understand.
- **You want a second opinion / research partner alongside your primary agent.** Install **Gemini CLI** for its long context window, Search grounding, and free tier, and call it from your primary agent (the `gemini-chat-and-search` skill pattern).

Pick one in the next five minutes. Have a second one installed alongside by Sunday. The book's chapters will work against any of them; the patterns travel.
