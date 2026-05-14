# 7. How much should you trust the agent by default?

Your agent is running. You ask it to clean up a folder of CSVs. It says:

> *"I'd like to run `ls Downloads/*.csv` — approve? (y/n)"*

You hit `y`.

> *"I'd like to read `Downloads/transactions-march.csv` — approve? (y/n)"*

You hit `y`.

> *"I'd like to read `Downloads/transactions-april.csv` — approve? (y/n)"*

By the fifth prompt you've stopped reading them. You're just hitting `y` like you mash *Accept Cookies*. By the twentieth, you wonder why you bothered installing an agent at all — this is slower than doing it yourself.

This is the failure mode most new readers fall into, and it isn't the agent's fault. It's the *default permissions* posture. Out of the box, most agent tools ask before every action, because that's the safe-looking thing to ship. Safe-looking and *useful* are not the same.

This chapter is about resetting that posture. The book's stance, stated up front: **monitor, don't block.** Trust until proven wrong. Capability over caution. Let it cook and watch.

## Two failure modes, and the one most guidance gets wrong

There are two ways agent trust goes badly.

**Over-gating.** You configure the agent so it asks before every single tool call. You train yourself to rubber-stamp. The agent is slow, you're tired, and worse — you've stopped *reading* the prompts, so the gates aren't actually protecting you. They've become noise.

**Under-monitoring.** You give the agent full autonomy, walk away to make coffee, and come back to find it spent forty minutes trying to fix a problem in the wrong direction. No prompts went unrubber-stamped because there were no prompts. The damage isn't catastrophic, but it's a lot of wasted tokens and an angry afternoon.

Most agent documentation warns you about the second, so it leans hard into the first. The result is the rubber-stamp problem above, plus an agent that under-performs because it's been gated into a polite assistant.

The right posture sits between them, and it leans toward action: **the agent acts; you watch.** You don't pre-approve every step. You see the stream of what's happening in real time, and you interrupt when something looks wrong. Interruption is cheap in every modern agent — press Esc (the universal soft-interrupt), type "stop", or as a last resort Ctrl-C. Use *that*, not prior restraint.

## The heuristic: reversible vs. irreversible

There's exactly one question that matters when deciding what needs an approval gate:

> **Is this action reversible? Is the blast radius bounded?**

Not "could this be expensive if it's wrong?" Not "is there money involved?" Not "is this a real system, not a sandbox?" Those framings sound prudent and produce bad defaults.

Reversibility is the right axis.

**Reversible, bounded — don't gate.** The agent reads files, writes code, edits a draft document, queries a database read-only, opens browser tabs, posts to a Slack channel *you* monitor, creates a Linear ticket you can close, runs a $20 ad campaign for an hour that you can pause. Wrong outcomes here are recoverable in minutes. Watch the stream; if it's headed somewhere weird, interrupt.

**Irreversible or wide blast radius — gate explicitly.** Production database writes (especially deletes). Mass-sending to a customer list. Wiring money to a vendor. Pushing to your main git branch. Deleting cloud infrastructure. Anything regulated — PII in HIPAA/GDPR contexts, financial reporting, healthcare records. *These* deserve a "are you sure?" — because the cost of being wrong isn't "five minutes to undo" but "an apology email to 80,000 customers" or "a four-hour incident".

The list of genuinely irreversible actions in a typical day is short. Most of what the agent will do for you isn't on it.

Concrete example: spending $50 on a wrong Google Ads campaign and pausing it ten minutes later is *reversible*. Sending a $50,000 wire to a fraudulent vendor isn't. Both involve money. Only one needs a gate.

## How this looks in Claude Code (and the others)

Every modern agent tool exposes some version of these controls. Names differ; the moves are the same.

**Claude Code** uses a `settings.json` file (project- or user-level) where you list permissions: which bash commands the agent can run without asking, which MCPs are available, which paths it can write to. There's also a *plan mode* (the agent describes what it would do without doing it) and *interactive mode* (the agent acts, asks when uncertain). For most work, run interactive. For a sensitive task you haven't done before, use plan mode for the first turn, then switch.

**Codex** ships with three modes: *suggest* (asks before every action), *auto-edit* (edits files freely, asks before running commands), and *full-auto* (does everything, in a sandboxed working directory). The default leans conservative; you'll likely want auto-edit or full-auto in most working folders.

**OpenCode** exposes a similar `permission` block in its config — a per-tool allow/deny list.

You don't need to hand-edit any of these. As with everything in Part II: **tell the agent what posture you want and let it edit the config**. Try:

> *"I want a 'trust by default' setup. Let yourself run any read-only command without asking, edit any file in this repo without asking, and run any test or build command without asking. Still ask me before: `git push`, deleting files outside the repo, anything that writes to a production database, anything that sends email or messages, anything that costs money. Update my settings to match."*

Read what it changes. Save. Done. This is a five-minute decision that will save you hundreds of rubber-stamps over the next month.

## The permission modes each agent ships with, and how to pick one

Every major terminal agent ships a small set of named permission modes. The names differ; the shape is the same. Here's the quick reference.

**Claude Code** has four modes you'll actually use. `default` asks for confirmation on risky actions (running shell commands, writes outside the project). `acceptEdits` auto-accepts file edits and still asks before running commands — this is the sweet spot for most working sessions. `bypassPermissions` runs without any prompts; it's sandbox-aware, so use it in a working directory you can throw away if things go wrong. `plan` is read-only: the agent investigates and produces a written plan but doesn't change anything. Full reference: [docs.claude.com/en/docs/claude-code/iam](https://docs.claude.com/en/docs/claude-code/iam).

**Codex** organizes the same idea around two axes — approval for shell commands and approval for file edits. The modes (`suggest`, `auto-edit`, `full-auto`) escalate from "ask before everything" to "act freely inside a sandboxed working directory". The shape is the same as Claude Code; the names are different. See the project README: [github.com/openai/codex](https://github.com/openai/codex).

**OpenCode** takes a configuration-based approach. You set a `permission` block in `~/.config/opencode/` listing which tools the agent may use without asking and which require a prompt. There aren't named "modes" the way Claude Code has them, but the resulting postures look identical: a permissive default with explicit gates on a small list of actions. See [opencode.ai](https://opencode.ai) or the project on GitHub.

**Which to pick.** Most readers should live in **the auto-accept-edits-but-confirm-commands posture** as their default — `acceptEdits` in Claude Code, `auto-edit` in Codex, the equivalent allow-list in OpenCode. File edits in a tracked repo are reversible (`git diff`, `git restore`); shell commands sometimes aren't. Use `plan` mode when you want the agent to think before doing — a new codebase, a destructive-sounding task, a sensitive area. Use `bypassPermissions` / `full-auto` only when you're running in a sandboxed or throwaway directory, or when you genuinely trust the agent on this specific task and you're going to watch it.

This ties back to the chapter's whole stance: **monitor, don't block**. Pick the most permissive mode you can monitor effectively, not the most restrictive mode you can tolerate. A rubber-stamp loop is worse than no gate; an unwatched `full-auto` run is worse than a slow one. The middle is where the leverage lives.

## Scoped capability instead of approval gates

Here's a pattern that beats both over-gating and under-monitoring: instead of asking the agent *whether* it may do a thing, *limit what it can do in the first place*. Then let it run wide open within those limits.

The cleanest example is database access. You want the agent to be able to answer questions about your production data — *"how many active users signed up in March?"*, *"which customers have on-demand reports turned on?"*. You do **not** want it to be able to issue a `DELETE` or an `UPDATE` against prod.

The wrong move is to give it your admin DB credentials and gate every query. You'll get tired and rubber-stamp; eventually something bad happens.

The right move is to **create a readonly Postgres role**, hand the agent *those* credentials, and let it loose. It can query anything, summarize anything, generate any chart — and physically *cannot* write. No gate needed because no gate is possible. This pattern is captured in a real skill called `dev-backend-tester` in an internal product repo: a skill file that includes the scoped readonly DSN and tells the agent *"use this connection for any DB question."* Five minutes of setup; thousands of unfettered queries afterwards.

Generalize the move:

- **Production data?** Readonly role. Or a staging replica.
- **Cloud account?** A scoped IAM role with the permissions the task actually needs, not your admin user.
- **Money?** A spending cap on the ad account, not approval per campaign.
- **Email sending?** A test SMTP server (Mailpit or similar) for local; the real one only when you've reviewed the draft.
- **Code repo?** Branch protection on `main`, so the agent literally cannot force-push to it. PRs become the audit surface.

This is *capability over caution* in concrete form: you don't restrain the agent's intent; you bound its physical reach. Inside the bounds, it runs free. Outside the bounds, it can't, so nobody has to gate anything.

A related skill from the same project library, `local-dev-launcher`, encodes a smaller version of the same idea: before killing a process on a busy port, the agent must check which path owns it and refuse if the path doesn't match the current repo. The "rule" is permanent and lives in the skill, not in the agent's manners. That's the move.

## What "monitor" actually looks like

You're not pre-approving. You're *watching*. In practice:

- **Stream output by default.** Don't ask the agent to "go away and come back when done" for a task you've never seen it do before. Watch the first few minutes; you'll catch a wrong direction in 30 seconds, not 30 minutes.
- **Side-by-side, not full-screen.** Keep the agent visible while you do something else. You catch a lot just from peripheral vision: a long-running command you didn't expect, repeated retries, a wandering plan.
- **Skim the recap.** When the agent finishes a multi-step task, it summarizes what it did. *Read the summary.* It's the single most underused habit. Ten seconds; catches 80% of "the agent did something subtly wrong" moments.
- **Use undo, revert, and Esc without hesitation.** They're cheap. There's no penalty for interrupting an agent. There's a big penalty for letting a wrong direction continue for ten minutes because you didn't want to "waste" the tokens already spent.

The non-engineer's version of monitoring is the same shape: *read the summary of what the agent did, spot-check the actual artifacts* — open the Linear ticket it created, look at the spreadsheet row it updated, scan the draft email. Reviewing a created ticket is the same skill as reviewing a code diff. Ch. 13 goes deeper.

## The exception list, written down

A small list of moves that *do* deserve an explicit approval gate, on most setups:

1. `git push` to `main` / `master` / `production` / any protected branch.
2. Running anything that writes to a production database.
3. Sending email or messages to anyone other than yourself.
4. Spending money above a threshold *you* set (e.g. ad-spend changes over $X, infrastructure provisioning above a cost line).
5. Deleting cloud resources, S3 buckets, deployed services.
6. Anything touching regulated data — PII under HIPAA/GDPR/PCI without an explicit go-ahead.

That's the list. Everything else can run.

## The takeaway

- The default-restrictive posture trains rubber-stamping, which is worse than no gating at all.
- The right axis is **reversibility and blast radius**, not "is money involved".
- Prefer **scoped capability** (a readonly DB role, a budget cap) over **approval gates**. Inside the scope, let it run.
- The human stays in the loop by **watching**, not by approving. Stream output, skim the recap, interrupt fast.
- Keep a short, written list of irreversible actions that *do* require approval. Everything not on the list, the agent can do.

## Try it yourself

**Exercise.** Ask your agent:

> *"Look at my current permission settings. Propose a 'trust by default' configuration with explicit gates only for: git pushes to protected branches, prod DB writes, sending email, and spending over $20. Show me the diff before applying."*

**You'll know it worked when** the next five tasks you give it run without a single rubber-stamp prompt, and the *first* time you ask it to do something on the gate list, it pauses and asks.

*If you can't think of a setup to try this against*: (a) make a throwaway sandbox with `mkdir ~/trust-sandbox && cd ~/trust-sandbox && git init` and run the trust-config conversation there with nothing important at risk; (b) run it against an open-source repo you've cloned and don't mind regenerating.

## What's next

A trust posture without context is half a setup. The agent needs to know *who you are*, *what you work on*, and *what conventions matter to you* before it can decide well within the trust you've given it. That's Ch. 8 — and you don't write that file yourself, either.
