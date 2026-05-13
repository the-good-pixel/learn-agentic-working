# 20. For Software Engineers

*A note on how to read Part V.* Read only this chapter if its role matches yours — the other chapters in Part V exist as inspiration for what your colleagues in other roles are doing. The workflows below are real cases from working teams the rest of the playbook draws from. Pick one that sounds useful, drop the suggested files in front of your agent, and run it.

It's Tuesday morning. The Linear board has six tickets with your name on them. There's a flaky test on `main` that's been red since Friday. Someone in #bugs just pinged you about a customer in Malaysia whose inquiry emails aren't being forwarded. And the version of the framework you're on hit end-of-life last week, so somewhere in the back of your head you know there's a migration waiting.

A year ago, that list was a week of typing. Now it's mostly a day of *reviewing*. This chapter is a tour of the workflows that flipped — the ones where, if you let yourself, you'll find you mostly read and decide while the agent types.

## Feature work from a ticket

Before you open the ticket, run the move you read about in Ch. 10: *equip first, then engage*. In a fresh session on the repo, ask:

> *"What skills and MCPs are already installed for this project? Is there a `ship-pr`, a `local-dev`, a Linear or Jira MCP, anything for the testing stack? If something obvious is missing, suggest what I should install."*

Thirty seconds of inventory at the start of the day saves you re-teaching the agent your package manager, your deploy path, and your ticket tracker on every session. If a teammate has already committed skills to `.claude/skills`, you inherit them by being in the repo — but you should *know* what you inherited, so you trust the agent's first plan instead of second-guessing it.

You open a ticket. You drop the URL into the agent:

> *"Pick up `https://linear.app/acme/issue/ENG-1284`. Read the linked Figma comments. Check how we did the analogous flow in `src/settings/` before touching anything. Plan first, then ship."*

Three things happen by themselves. The agent fetches the ticket through your project-tracker connector (Linear, Jira — whichever you've equipped — see Ch. 9). It reads adjacent code so its first draft isn't a stranger to the codebase. And it comes back with a plan before touching anything: files it'll change, the shape of the diff, what it'll test.

That plan step is where you earn most of your savings. Two minutes of reading saves an hour of un-doing. If the plan is right, you say "go". If it's wrong, you redirect *now*, not after the diff exists.

For pure feature work, the rhythm that works for most people is: **plan → small diff → run tests → review → ship**. Don't let it run for forty minutes without checking in on day one; you're still calibrating trust (Ch. 7). After a week you'll know which kinds of tickets it nails on the first try and which need babysitting.

## Cross-repo bug hunts

The Malaysia-inquiries bug is the kind of thing that used to eat a half-day. Inquiries flow from a marketing site, through a webhook handler, into a backend service, into an email pipeline, and out via a third-party send. The bug could be anywhere.

You point the agent at all four repos at once:

> *"A customer in Malaysia submitted an inquiry on Friday — `inquiry_id=inq_8821`. No forwarding email went out. Trace it across `~/code/marketing-site/`, `~/code/webhooks/`, `~/code/inquiry-service/`, and `~/code/email-pipeline/`. Tail the logs, check the queue table, find where the row stopped moving."*

It greps logs. It tails the webhook handler. It checks the queue table. It finds the row, finds the broken country-code mapping (you call your Malaysia region `MY-1` in one service and `MY` in another), proposes the fix, and writes the regression test.

The win isn't that it found the bug — you would have found it too. The win is that it followed the trail across four repositories *while you were on a meeting*. Cross-repo work is where the chatbot mode dies and the agent mode shines, because there's no longer a context-window-shaped cliff between "reading code" and "running greps across five directories".

## Onboarding to an unfamiliar codebase

You just joined a project. There are 1,400 files. There's a stale `README`. The senior engineer has half an hour for you next Thursday.

Ask the agent before you ask the human:

> *Walk me through this codebase as if I were starting Monday. What are the top-level modules? Where does a request enter? Where do tests live? What's idiomatic here that I should not fight?*

It writes you a map. Then you ask follow-ups: *"how does auth work end-to-end?"*, *"what's `WorkflowDispatcher` actually for?"*, *"why are there two different cron systems?"* (and yes — sometimes there really are two; a good codebase has a skill that documents the choice, see Ch. 19).

You'll arrive at Thursday's onboarding meeting with sharper questions than the senior engineer was expecting. They'll think you read the whole thing over the weekend. You read about 4% of it; the agent read the rest with you.

## Large refactors and version migrations

The framework migration is the canonical *"sweep across the codebase"* job. React 18 → 19, Vue 2 → 3, an internal logger API changing shape, a deprecated SDK getting a new method signature in 200 files. Pre-agent, you did the first ten by hand to learn the pattern, wrote a codemod for the next hundred, and dealt with the last fifty by hand because they were weird.

Now:

> *"Upgrade this repo from React 18 to React 19. Read `https://react.dev/blog/2024/04/25/react-19-upgrade-guide` first. Make the changes in small, reviewable commits grouped by directory — start with `src/components/`, then `src/hooks/`, then `src/pages/`. Run `pnpm test` after each group. Stop and ask me if a test fails in a way that isn't an obvious rename."*

You watch the commits land. You skim each diff. Most are mechanical; a few are interesting; one of them was wrong and you push back with one line. Half a day instead of a week.

The pattern that doesn't work: *"upgrade us"* with no constraints. The agent will heroically rewrite everything in one giant unreviewable diff and you'll spend longer reviewing than the original work would have taken. The trick is forcing **small, sequential, reviewable steps**. That's not the agent's instinct yet; it's yours to enforce.

## CI babysitting — taking a PR to green

You opened a PR. The AI code-reviewer found four things. Two are real. Two are nitpicks born from incomplete context. The CI is partially red. There are merge conflicts.

You used to manage all of this manually — push, watch CI, address comments one at a time, push again, watch CI again. Now this whole job is a single skill the agent runs end-to-end: *push → open PR → monitor CI → fix what's real → reply to what isn't (with reasoning, not silent dismissal) → notify when mergeable*.

> *"This PR is green except for the `e2e` job, which is flaking on `auth.spec.ts`. Open the run log at <URL>, find the failing assertion, decide if it's a real bug or a flake, and either fix the test or re-run the job with a note in the PR explaining why."*

The hard rule worth stealing from real teams using this pattern: **every AI-reviewer comment gets a substantive reply**. If the comment is wrong, the agent says *why* it's wrong, in a public PR comment. Silent dismissal is forbidden, because that thread is the audit trail for why a change shipped. It's the same etiquette you'd use with a junior human reviewer.

On a typical week, this turns "PR is up, please babysit it" — a thing that fragmented your afternoon ten times — into *one* notification when it's actually ready to merge.

## Security and code review with a second pair of eyes

The agent that wrote the code is the wrong agent to review the code. So run a second one.

> *"Read the diff in this PR as if you were a security reviewer. Flag anything that touches user input, credentials, database queries, or auth tokens. For each flag, say what an attacker would have to do to exploit it, and what the fix looks like."*

The pattern: when a PR is up, fire a sub-agent (Ch. 15) with one job — *"review this PR for security holes, missed edge cases, and missing tests. Don't propose fixes. Just flag."* It comes back with a list. You read the list. You decide.

This is your **second pair of eyes** and it costs you a sentence to invoke. It catches the *"oh, we never check whether the user owns this resource before deleting it"* class of bug that the writing-agent missed because it was too deep in its own diff.

For security specifically, ask for a *focused* review pass — *"only look for auth, authorization, input validation, secret leakage, and injection. Ignore style."* Narrow scope, higher signal.

## Parallel work without losing the thread

If you're confident enough to run three tickets at once, the bottleneck is no longer typing — it's **not stepping on yourself**. Three sessions trying to bind to port 3000. Three sessions installing different package versions into the same `node_modules`. Three sessions racing against the same dev database.

The pattern that scales is **one working tree per ticket** (we use the word *worktree* — it's a git feature for having multiple working copies of the same repository side by side). One per ticket means each session has its own checkout, its own ports, its own environment file, its own state. They can't accidentally fight each other.

Two skills make this livable: one that creates a new worktree per ticket so each session is isolated by default; another that owns the *"is this port already taken? by whom?"* etiquette — refusing to kill processes it doesn't own, because *another agent of yours might be using them*.

You don't need this on day one. You'll know you need it the day you stomp on your own work and ask *"is there a pattern for this?"* — and there is.

## When a skill earns its keep

You'll notice, over a couple of weeks, that you keep correcting the agent on the same things. *"No, we use `pnpm` here, not `npm`."* *"No, our migrations live in `db/migrations`, not `prisma/migrations`."* *"No, we test with Vitest, not Jest."*

Each repeated correction is a signal. Write it down as a skill (Ch. 18, Ch. 19) — or rather, finish the session and say *"that was useful; write a skill from what we just did."* The agent reads back over the conversation, picks out the corrections and gotchas, and drafts the skill for you. You read it, save it. Next time, the correction isn't needed.

Some skills worth stealing from real codebases:

- **Local dev** — the one that documents the symlinked-package-folders saga that silently breaks the bundler, with the fix baked in. War-story-as-code.
- **End-to-end test audit** — given a diff, scan for the missing browser-automation tests and the missing entries in the PR-affected manifest.
- **Database query (scoped)** — a read-only connection to your dev database, with example queries, so the agent can answer *"do any users have on-demand reports turned on?"* without you opening a database client.
- **Deployment runbook** — the encyclopedic *"every service, every environment, every URL, every deploy branch"* document, captured as a skill the agent reads before any deploy talk.

The compound effect is that month two looks very different from month one, because half the corrections you used to give live in skills now.

## The takeaway

- Plan first, then small reviewable diffs. Do not let the agent run for forty minutes on day one.
- Cross-repo bug hunts and version migrations are where the biggest hours come back. Use them to convince yourself.
- Use a **second agent** to review the first agent's PR. Cheap, high signal.
- *Every* AI-reviewer comment gets a substantive reply. The PR thread is your audit trail.
- When you correct the agent on the same thing twice, you have a skill waiting to be written.

## Try it yourself

Engineering exercises work best against your own real code rather than mock data, so these point at *real* repos you own. (Other Part V chapters lean on the mock-data starter folders in `examples/` — engineers don't need them.)

1. **Run plan → diff → ship on a real ticket or a real bug.** Either pick a small Linear/Jira ticket from your own board, or clone an open-source repo you've never seen and pick an existing issue from its tracker. Drop the URL straight in:
   > *"Pick up `<your ticket or issue URL>` in `<repo path>`. Plan first, then small diffs, then open a PR — or, if it's a bug hunt, trace it and tell me which file the bug is in and why."*
   **You'll know it worked when** the agent points at a specific file and line with reasoning that holds up, and (for a ticket) the PR title isn't worse than one you'd write.

   *If you don't have a Linear ticket or open-source issue in mind*: the book repo ships a tiny mock repo at `examples/ch-18-mock-repo/` with a planted off-by-one bug and a `BUG.md` ticket. Clone it and run the plan → diff → ship rhythm against it.
2. **Run a second-pair-of-eyes review** on a PR you already wrote this week. Ask only for security, edge cases, and missing tests. **You'll know it worked when** it flags at least one thing you'd rather have caught before merging.
   If you don't have a PR ready, the book repo ships a mock one at `examples/ch-18-pr-review/` — a small fictional Node.js diff with planted issues (a SQL injection, a committed-looking secret, missing date validation, no integration test for the new route). Run your review-agent against it and see what it catches before peeking at the answer key.
3. **Capture one skill** from a session where you corrected the agent twice on the same convention. End the session with *"write a skill from this."* Save it. **You'll know it worked when** the correction stops happening on the next session.

   *If you don't have a session like that to mine*: the book repo ships a fake transcript at `examples/ch-17-session-transcript/` with four planted corrections — feed it to a fresh agent and ask it to write the skill.

## What's next

The next chapter is the analyst's equivalent — *"study this CSV and tell me what's weird"* and the small-tools-you'd-never-have-built work that quietly eats a week of someone's month.
