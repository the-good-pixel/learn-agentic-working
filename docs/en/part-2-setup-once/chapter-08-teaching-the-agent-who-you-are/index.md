# 8. Teaching the agent who you are: `CLAUDE.md`, `AGENTS.md`, and project memory

You ask your shiny new agent to *"draft a quick update for the team about this week's progress"*. It produces a six-paragraph corporate memo, opens with *"In today's fast-paced environment…"*, signs off with *"Best regards,"* and uses the word *leverage* three times.

You correct it. *"Less formal. We use Slack, three bullets, no preamble. Don't say 'leverage'. The team is six people, all engineers, they hate fluff."*

It rewrites. Good.

Next day, different folder, different task: *"draft a quick update for the team"*. You get the same six-paragraph memo. Same *leverage*. Same *Best regards*.

This is the most underrated tax in the whole agent experience: **re-explaining yourself, every session, forever.** The agent has no memory of yesterday's correction. Each new chat starts from scratch — knows nothing about your role, your team, your conventions, your taste.

The fix is a small file the agent reads automatically every time it starts a session in your project. In Claude Code it's called `CLAUDE.md`. In Codex and OpenCode it's `AGENTS.md` — a community-converged name several tools now share. Cursor uses `.cursorrules`. Same idea, different filename. From here on, "the file" means whichever your agent reads.

You do **not** write this file by hand.

## What goes in it

Think of the file as a one-page brief you'd hand a new contractor on their first day. *"Here's who I am. Here's what I work on. Here's how we do things around here. Here's what I'll get annoyed by."*

The shape that works:

- **Who you are and what your role is.** *"I'm a PM at a 30-person fintech. I work in Linear and Notion. I don't write code; I read it sometimes."* Or *"I'm a senior backend engineer on the platform team. Mostly Python, some Go."*
- **What this project / folder is.** *"This is the marketing-ops repo for our newsletter."* Or *"This folder is my personal Downloads dumping ground; I'm organizing it."*
- **Conventions that matter.** Style preferences, terminology, file naming, formatting. *"Slack messages, three bullets max, no preamble."* *"Tickets always start with the user-facing symptom, not the cause."* *"For SQL, prefer CTEs over subqueries."*
- **What to never do.** *"Don't run migrations against prod without showing me the plan first."* *"Don't suggest we 'leverage synergies'."* *"Don't write a Notion doc; write Markdown and I'll paste."*
- **Where the bodies are buried.** Project-specific traps. *"`yarn dev` doesn't work in worktrees — there's a known issue with symlinked `node_modules`."* *"Our `staging` env is actually production traffic mirrored; treat it as prod."*
- **Tool and skill pointers.** *"Use the `gemini-chat-and-search` skill for any research that involves checking facts online."* *"The Shopify MCP is installed; use it for any product-catalog question."*

Not what goes in it: a wall of text trying to anticipate every situation. The file is a *brief*, not a manual. A page is plenty; two is a lot. If you find yourself writing the third page, stop — that material probably belongs in a **skill** (Ch. 18), which is the right place to teach the agent a specific *procedure*.

## The five-minute conversation

Here is the actual workflow. You do not open an editor. You do not stare at a blank file.

You start a session in the folder where the file will live (your project, or your home directory for a user-level one), and you say:

> *"I want to write a `CLAUDE.md` for this project so you have context every time we work together. Interview me. Ask me five to ten questions about who I am, what this project is, how I work, what I care about, and what mistakes I'd want you to avoid. After we're done, draft the file and show it to me. Keep it under a page."*

The agent asks. You answer in plain language, in the chat, the same way you'd answer a new hire over coffee. Five minutes. Then it writes the file.

You read it. You'll change one or two lines — a phrasing that's too stiff, a convention it misheard. You save. Done.

That's the whole authoring flow. You never typed in Markdown. You never picked between bullets and prose. You decided *what's true about how you work*, which is the only thing only you can do.

A few prompts worth knowing once you have a file:

- *"Update my `CLAUDE.md` — I just realized I hate when you start responses with 'Great question!'. Add that."*
- *"Read back my `CLAUDE.md` and tell me what's redundant or out of date."*
- *"I started a new project. Reuse the relevant bits of my user-level `CLAUDE.md` and add what's specific to this folder."*

The file is alive. You evolve it the same way you wrote it — by talking.

## Two layers: user-level and project-level

There are two places this file can live, and you'll likely have both.

**User-level** (`~/.claude/CLAUDE.md`, `~/.config/codex/AGENTS.md`, etc.) — applies to *every* session, in any folder. Put here: who you are, your global tastes ("commit messages are short; no emoji"), tools you always want available, languages/frameworks you don't want surprise opinions about.

**Project-level** (`./CLAUDE.md` in the repo or folder) — applies only when you're working in that folder. Put here: what *this* project is, its conventions, its traps, the team's house rules.

Project-level overrides and *extends* user-level for that session. You don't have to think about the priority rules; the agent handles them. You just keep each file scoped to what it should say.

If you work on a team, project-level files get **committed to the repo**, the same way you'd commit a README. Your teammate clones the repo, their agent reads the same `CLAUDE.md`, and now both agents work the same way. This is how team standards spread — one file, version-controlled, evolving with the codebase. Ch. 25 goes into team adoption; for now, just know that this is the surface where it happens.

## Cross-tool: `CLAUDE.md`, `AGENTS.md`, and the convergence

Three years ago every agent invented its own filename. Things are converging.

- **Claude Code** reads `CLAUDE.md` (project and user level), and supports `@`-imports — one file referencing another (`@./docs/conventions.md`) so you can keep modular pieces.
- **Codex** and **OpenCode** read `AGENTS.md` — the same idea, a community-converged name. Most tools that ship after 2025 honor it.
- **Cursor** uses `.cursorrules`.
- **Gemini CLI** has its own (`GEMINI.md`); it follows the same shape.

If you use multiple agents, the practical move is: keep one canonical file, and *symlink* (or copy) the others to point at it. Or — and this is the easier version — ask the agent: *"I have a `CLAUDE.md`. Make sure Codex and OpenCode also pick up the same context, however they expect it."* It handles the cross-tool plumbing.

## Memory: what the agent remembers across sessions

Beyond the file, modern agents have a *memory* system — a place they accumulate notes about you over time, automatically, across sessions.

Claude Code has user-level memory at `~/.claude/projects/<project>/memory/`. Codex stores ChatGPT-style memories tied to your account. OpenCode has a per-model story you configure yourself.

The pattern is the same as `CLAUDE.md`: **the agent writes its memories; you confirm them**. When you tell it something durable — *"remember that all our DB migrations go through the `tools/migrate` script"* — it adds a memory. You can later say *"show me what you remember about this project"* and it'll print the list. Edit, prune, evolve.

A working rule we use, and recommend: **project-shaping guidance lives in `CLAUDE.md`** (because it's committed, auditable, survives memory pruning, travels to teammates). **Cross-project personal preferences live in memory** ("the user's email is X", "the user prefers short commit messages"). Don't put project-specific direction in private memory — it's invisible to teammates and disappears if the memory system changes.

Same flow applies to **slash commands**, **hooks**, and **settings.json** edits — anything that customizes the agent's behavior. You say *"every time a session ends, show me a one-line summary of what we did"*, and the agent writes the hook. You don't open the JSON.

## A starter file by role

The appendices have full templates (Appendix C). Here's a 30-second version of what you'd say in the interview, by role, to seed the conversation:

- **Engineer.** *"I'm a backend engineer on a 4-person team, mostly Node/Python. We use Linear for tickets, PostgreSQL in prod, deploy via GitHub Actions. Commit messages are short. Tests run on every PR. I hate it when AI writes comments that just restate the code."*
- **PM.** *"I'm a PM at a SaaS company. I live in Linear, Notion, Figma, and Slack. I don't code but I read it. I write specs as bullets, not prose. I want tickets that lead with the user-facing problem."*
- **Marketer.** *"I run growth for a B2B startup. Tools: HubSpot, Google Ads, Notion, Figma, Webflow. Brand voice is concise and direct — no buzzwords, no 'unleash', no exclamation marks. I write in Markdown; I paste into the CMS."*
- **Analyst.** *"I do BI for the ops team. SQL against our Postgres warehouse. Charts in Metabase. Reports as Notion docs. I want SQL written with CTEs, not nested subqueries. Always show me the query before running it."*

You don't memorize these. You read whichever is closest to you, paraphrase it into the chat in your own words, and let the agent take it from there.

## The takeaway

- The single highest-leverage setup step after install is teaching the agent who you are.
- You do **not** write the file yourself. You have a five-minute conversation; the agent drafts it.
- Keep two layers: **user-level** (you, everywhere) and **project-level** (this folder, this team).
- Project-level files get committed and shared. That's how team standards spread.
- Use **memory** for personal cross-project preferences; use the **file** for project-shaping guidance.

## Try it yourself

**Exercise.** In any folder where you'll be working repeatedly — your main project, your home directory, anywhere — start a session and paste this:

> *"Interview me for a `CLAUDE.md` (or `AGENTS.md`, whichever you read). Ask me 5–10 questions. Cover: who I am, what this project is, conventions I care about, things you should never do, and any project-specific traps. Then draft the file under one page and show it to me before saving."*

**You'll know it worked when** the next session you start in the same folder picks up on the conventions without you re-explaining — your "less formal, three bullets, no leverage" rule shows up unprompted in the first draft.

## What's next

You've told the agent *who you are*. Next: how you give it *hands on real systems* — Gmail, Linear, your database, Notion — through MCPs. Ch. 9.
