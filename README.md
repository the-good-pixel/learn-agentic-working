# The Agentic Working Playbook

> A practical, open-source playbook for getting real work done with AI agents — for engineers, designers, analysts, PMs, marketers, operations, and anyone whose work touches a computer.

This is **not** another "prompt engineering" tutorial. It assumes you've already chatted with ChatGPT or Gemini, and you're ready for the next step: **letting an AI do the work, not just describe it**.

We use **Claude Code** as the primary running example because it's the tool the author uses daily, but the patterns apply equally to **Codex**, **OpenCode**, **Cursor agents**, **Gemini CLI**, and any future tool that fits the same shape. Where another tool has a notable equivalent feature, we cite it.

---

## Who this is for

- **Software engineers** who want to stop typing every line themselves.
- **Designers, PMs, analysts** who write Notion docs, Jira tickets, SQL, and the occasional script.
- **Operations, finance, HR, marketing** — anyone with spreadsheets, inboxes, recurring reports, and "could a computer just do this?" tasks.
- **Team leads** deciding how their team should adopt agents.

If your only experience with AI today is *typing a question into a chat box*, this book is for you. By the end you'll be **delegating tasks**, not asking questions.

---

## What you'll learn

```
Chat   →   Tool-using assistant   →   Agent that gets work done
(you do it after)   (it suggests)        (it does it, you review)
```

1. **What an agent actually is** — and why it's different from the chatbot you already know.
2. **The mental model**: User → Model → Orchestrator → MCP → Real tools (Gmail, Sheets, browsers, Jira, your own files). See [the architecture diagram](docs/architecture.md).
3. **Setup once, benefit forever** — installation, sensible defaults, permissions, and the configuration files (`CLAUDE.md`, `~/.claude/settings.json`, skills, hooks) that turn a generic agent into *your* agent.
4. **How to brief an agent like a colleague**, not a search engine — context, plans, scope, and review.
5. **Extending the agent** — MCP servers for Gmail, Google Drive, Linear, browsers; skills for repeatable workflows; sub-agents for parallel work.
6. **Real workflows**, mined from actual usage, for both technical and non-technical readers.
7. **Patterns, anti-patterns, and team norms** — when to trust it, when to babysit, how to review, how to share what you learn.

---

## Book structure

> Each chapter is a standalone Markdown file. The website is the same content, rendered by GitHub Pages.

### Part I — Foundations (everyone reads this)
1. **From Chatbot to Agent** — what changes when the AI can act, not just answer.
2. **The Agentic Architecture** — model, orchestrator, MCP, tools. (Anchored by [the architecture diagram](docs/architecture.md).)
3. **A 10-minute first win** — install Claude Code (or Codex / OpenCode), run one real task, feel the difference.

### Part II — Setup Once
4. **Installing your agent** — Claude Code, Codex, OpenCode side-by-side.
5. **Permissions and trust** — what to allow automatically, what to gate, sandboxing.
6. **`CLAUDE.md`, `AGENTS.md`, and the project memory pattern** — telling the agent who you are and how you work.
7. **MCP servers worth installing on day one** — Gmail, Google Drive/Sheets, Linear/Jira, GitHub, web browser, filesystem.
8. **Skills, slash commands, and hooks** — the three ways to make repeat tasks one-liners.

### Part III — Working With an Agent
9.  **Briefing**: how to write a task the way you'd brief a smart colleague.
10. **Planning before doing** — when to ask for a plan, when to just go.
11. **Context is everything** — files, screenshots, links, tickets, transcripts.
12. **Reviewing the agent's work** — trust but verify; reading diffs; what to never skip.
13. **Recovering from mistakes** — undo, revert, redirect mid-task.
14. **Long-running and background work** — let it cook while you do something else.

### Part IV — Workflows by Audience

Each workflow is a real case (paraphrased from real usage), with the prompt, the setup, and the outcome.

- **For engineers**: feature work from a Linear ticket; cross-repo bug hunts; codebase onboarding; large refactors; CI babysitting; security review.
- **For data & analytics folks**: "study this CSV and tell me what's weird"; ad-hoc folder/file diff scripts; spreadsheet-to-database imports; chart generation.
- **For PMs / business / ops**: turning client feedback into a punch list; drafting tickets from meeting notes; competitive research; recurring reports; investigating "why doesn't this thing work" on a third-party platform.
- **For everyone**: investigating a confusing bank statement; planning WiFi router placement from a floor-plan photo; cleaning up Downloads; setting up automations.
- **For team leads**: shared skills, shared CLAUDE.md conventions, code review bots, scheduled agents.

### Part V — Going Further
15. **Multi-agent workflows** — sub-agents, parallel exploration, one agent reviewing another.
16. **Scheduled & autonomous agents** — cron-like work that runs without you.
17. **Building your own MCP server** — for your team's internal tool.
18. **Team adoption playbook** — how to roll this out without chaos.
19. **Anti-patterns** — what not to do (and what we learned the hard way).

### Appendices
- A. Glossary (LLM, MCP, agent, skill, hook, sub-agent, tool call…)
- B. Tool comparison: Claude Code vs Codex vs OpenCode vs Cursor agent vs Gemini CLI.
- C. Recommended starter `CLAUDE.md` templates by role.
- D. A curated list of MCP servers.
- E. Further reading.

---

## How this book is written

Most examples are **drawn from real Claude Code transcripts** (anonymized where needed) — actual things the author and his team did to ship work. We deliberately avoid toy examples like "summarize this paragraph"; every workflow shown is something a reader could plausibly want to do at work tomorrow.

---

## Repository layout

```
/
├── README.md            ← you are here
├── CLAUDE.md            ← instructions for agents helping write this book
├── docs/                ← the book itself (Markdown, one file per chapter)
│   ├── index.md
│   ├── part-1-foundations/
│   ├── part-2-setup/
│   ├── part-3-working-with-agents/
│   ├── part-4-workflows/
│   ├── part-5-going-further/
│   └── appendix/
├── assets/              ← diagrams, screenshots, GIFs
├── examples/            ← starter templates (CLAUDE.md, settings.json, skills)
└── .github/workflows/   ← GitHub Pages deployment
```

The published site lives at: **(coming soon — GitHub Pages)**

---

## Contributing

This is open source under the MIT license. Contributions welcome — especially:

- **Real workflow stories** (with the prompt and what happened).
- **Tool parity notes** — "Codex / OpenCode also does this, but…".
- **Translations** and audience adaptations (e.g., "for accountants", "for lawyers").
- **Corrections** when a tool's behavior changes — agent tooling moves fast.

See `CONTRIBUTING.md` (coming soon) for the style guide.

---

## License

MIT. Use it, fork it, run an internal training off it, translate it. Just don't sell it back to the people who wrote the original prompts.
