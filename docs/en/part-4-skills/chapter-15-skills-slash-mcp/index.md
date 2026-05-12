# 15. Skills, slash commands, and MCPs — what's the difference?

You open a fresh terminal in your project and ask the agent to ship a PR. It pushes, opens the PR, watches CI, fixes a flaky test, replies to a code-review comment, and pings you when it's green. Forty minutes later you come back and merge.

The next morning you ask the agent to do the same thing in a different repo. It does — but worse. It misses a step. It doesn't reply to the review comments. It marks the PR ready and walks away.

Same agent. Same model. Why?

Because in the first repo, the agent had a *skill* called `ship-pr` sitting on disk. In the second one, it didn't. The skill is the difference between a colleague who's done this before and one who hasn't.

This chapter unpacks the three ways you give an agent more capability — **prompt, slash command, skill (with MCPs underneath)** — and when to reach for each.

## The three layers, in one picture

Think of it as three concentric rings around your agent, from light to heavy:

| Layer | What it is | When to use |
|---|---|---|
| **Prompt** | Plain English in the chat | One-off requests |
| **Slash command** | A named, parameterized prompt | Same prompt you keep retyping |
| **Skill** | A named *procedure* the agent invokes by intent | A task you do repeatedly, with steps and gotchas |

And underneath all three, the capability layer:

| **MCP** | A new *tool* the agent can call | A new system to connect to (Gmail, Linear, your DB) |

A prompt, a slash command, or a skill all *use* whatever tools the agent has. MCPs are how the agent gets more tools.

Read on for what makes each one different, and how to tell which one you actually want.

## Prompt: you, talking

The base case. You type a request, the agent does it.

> *"Pull the staging logs from the last hour and tell me why orders are failing."*

A prompt is the right answer most of the time. Don't reach for a slash command or a skill for a task you'll only ever do once.

The reflex to watch for: when you find yourself **typing the same prompt for the third time**, with only one word different — that's the moment to graduate it. Either to a slash command (if it's a one-shot template) or to a skill (if it has steps and lessons learned).

## Slash command: the prompt with a name

A slash command is a saved prompt you invoke with `/<name>`. Think of it as a keyboard shortcut for a request you keep making.

> `/review my last PR for security issues`

Slash commands are stored as a Markdown file (in Claude Code, under `.claude/commands/<name>.md`; in Codex, similar). The file is *literally just the prompt template*, with placeholders. There's no logic. No conditional steps. No "if this then that". It's a frozen prompt with a handle.

That makes them perfect for:

- A canned investigation: `/triage-bug`, `/explain-this-error`
- A canned writing task: `/draft-pr-description`, `/summarize-this-thread`
- A canned report: `/weekly-status`

And a bad fit for anything that needs to *decide* between approaches based on what it sees. The moment your prompt starts saying *"if the test is flaky, do X; if it's a real failure, do Y"* — you've outgrown a slash command. That's skill territory.

> **In other tools.** Codex calls them custom commands (`AGENTS.md` references). OpenCode supports slash-style commands directly. Cursor has its own "Rules for AI" entries that overlap somewhat. The mechanics differ; the shape — *named, saved prompt template* — is universal.

## Skill: the procedure with a name

A skill is the agent's version of a runbook. It's a Markdown file (`SKILL.md`) that describes a *named procedure* — when to use it, what tools it needs, the steps to follow, and the gotchas that bit you the last time.

Crucially, skills are invoked **by intent**, not by an explicit handle. You don't type `/ship-pr`. You type *"ship this"* — and the agent recognizes the intent, looks at its available skills, and loads the right one. The skill's `description` field is the matching surface; the agent reads it the way you'd read a tool tooltip.

`ship-pr` (which you may already have under `~/.claude/skills/ship-pr/SKILL.md`) is a great example. Its description says it triggers on phrases like *"ship this"*, *"take this PR to green"*, *"push and monitor the PR"*. You say one of those; the agent loads the full procedure — push, open PR, monitor CI, resolve AI review comments, notify when mergeable — and follows it.

Skills handle three kinds of things a slash command can't:

1. **Multi-step procedures** with branches. *"If CI fails, read the log; if it's a flake, retry once; if it's real, fix and push again."*
2. **Accumulated gotchas.** The `demo-video` skill on the product's repo includes hard rules like *"no spring animations"* and *"chyron owns the bottom band"* — bits of feedback we had to give the agent twice before turning them into a rule.
3. **Composing multiple tools.** The agent uses git, the GitHub MCP, the CI checker, and the file system *together*, all inside one skill invocation.

We'll get into when something becomes worth turning into a skill in Ch. 16, and how to write one (or rather, how to let the agent write one *for you*) in Ch. 17.

## MCP: the new tool underneath

If a skill is a new *procedure*, an MCP server is a new *capability*. It's the difference between "here's how we ship PRs" and "the agent didn't have GitHub before, and now it does".

MCP — Model Context Protocol — is the standard that lets your agent reach out of its own process and touch real systems. Each MCP server is a small program (running locally or remotely) that exposes a set of *tools* the agent can call. Install the Gmail MCP and your agent can read and send mail. Install the Linear MCP and it can create and update tickets. Install the Shopify MCP and it can walk your product catalog.

You met the basics in Ch. 9. The thing to internalize for this chapter:

- A **skill** is a *procedure that uses tools the agent already has*. It composes existing capabilities.
- An **MCP** is a *new tool the agent didn't have before*.

A useful test: if the missing piece is *"the agent doesn't know how we ship PRs at this company"* — that's a skill. If the missing piece is *"the agent can't talk to Linear at all"* — that's an MCP.

You'll often want both. Install the Linear MCP (the capability), then later add a `triage-inbox` skill (the procedure your team follows on top of it). The MCP is generic; the skill is your team's.

This is also where the *equip first, then engage* habit from Ch. 10 earns its keep. The first move when you enter an unfamiliar domain — a new vendor portal, a new system of record, a new platform your team just adopted — is not to start prompting. It's to ask the agent: *"is there an MCP or a skill for this? Check my user-level skills, this project's `.claude/skills`, the vendor's published servers, and the community lists."* Half the time, the answer is yes, and you save yourself a week of teaching the agent things it could have inherited. Only after that search comes up empty do you reach for a prompt — or, better, ask the agent to draft a minimal skill or MCP wrapper so the *next* person doesn't have to search.

## A worked decision: "I want my agent to always X"

You catch yourself wishing the agent would *always* do something. Walk down the ladder:

1. **Is it a one-time thing?** Just say it in the prompt. Done.
2. **Is it the same prompt every time?** Slash command. Save the template, give it a name.
3. **Is it a procedure with steps and lessons learned?** Skill. Let the agent draft the `SKILL.md` from your last session (Ch. 17).
4. **Does it need a tool the agent doesn't have?** MCP. Install one if it exists; if not, ask the agent to wrap the API.

Most of the time the right answer is one rung up the ladder from where you started. Don't reach for an MCP when a skill would do; don't reach for a skill when a slash command is enough.

## Where each layer lives

Quick reference for Claude Code (Codex and OpenCode use similar but not identical layouts — check the docs):

| Layer | Lives at | Scope |
|---|---|---|
| Prompt | The chat | One message |
| Slash command | `.claude/commands/<name>.md` | Project (committed) or user-level (`~/.claude/commands/`) |
| Skill | `.claude/skills/<name>/SKILL.md` | Project or user-level (`~/.claude/skills/`) |
| MCP server | `.mcp.json` or user MCP config | Project or user-level |

The pattern repeats: project-level travels with the repo (anyone who clones gets it); user-level travels with you (every project you open inherits it). `ship-pr` is a great user-level skill — it's the same procedure no matter which repo you're in. `local-dev` is the opposite — it captures *this* project's quirks and belongs in the repo.

## The takeaway

- **Prompt** for one-offs. **Slash command** for repeated prompts. **Skill** for repeated *procedures*. **MCP** for new *tools* underneath.
- Skills are invoked by **intent**, not by name. Their `description` field is what the agent matches against your phrasing.
- An MCP gives the agent a capability it didn't have. A skill teaches it *how your team uses* a capability. You usually want both.
- You don't hand-write any of this. Describe what you want; the agent writes the slash command, the skill, the MCP install.
- Project-level travels with the repo. User-level travels with you. Choose deliberately.

## Try it yourself

Pick something you've corrected the agent on more than once this week — a tone, a step it keeps skipping, a check it forgets to run. On paper, decide which layer fits:

```
The behavior I want: ____________________
The right layer:     prompt / slash / skill / MCP
Why that one:        ____________________
```

**You'll know it worked when** you can defend your choice in one sentence — *"it's a skill because it has three steps and a gotcha"*, not *"a skill, I guess, because it sounds skill-shaped"*.

*If you can't think of a correction of your own*: the book repo ships six plausible repeated corrections at `examples/ch-15-corrections/common-corrections.md` — pick one and run the layer-decision on it.

## What's next

Ch. 16 takes the question one level deeper: out of all the things you do every week, which ones cross the line from "just keep prompting" to "this should be a skill"? A few real stories, drawn from both engineering and non-engineering work, draw the line.
