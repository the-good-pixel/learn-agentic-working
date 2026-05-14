# 15. Letting it cook — long-running, parallel, and multi-agent work

> **You need this chapter when…** you've started a long-running task — a big research dive, a multi-file refactor, an end-of-quarter analysis — and found yourself sitting there watching the agent work, unable to start the next thing because you're worried you'll lose the thread. Or when a colleague has shipped three things in the time it took you to ship one, and you suspect they're not actually typing faster.
>
> **You do not need this on day one.** Skip this chapter until you have at least one task that genuinely wants to run longer than you want to sit and watch it. The patterns here pull *you* in when a real problem makes you wish you had them — don't push toward them out of FOMO.

The first time you delegate a real piece of work to an agent, the natural thing is to watch it. Every tool call, every file read, every line written. It's interesting. It's also a waste of your time after about the third one.

Eventually you'll think: *"this is going to take fifteen minutes. I have other things to do."* That's the moment this chapter is for.

## Letting one agent cook in the background

Most agent tools support some form of **backgrounding**: starting a long task, switching away to something else, and being notified when the agent is done (or wants your attention). Claude Code has streaming output you can leave running in a terminal pane. Codex and OpenCode have similar primitives. Some tools (Claude Code's "Claude on the web", Cursor's background agents) run the agent on a remote machine entirely, so you can close your laptop.

The trust model is the same one from Ch. 7 and Ch. 13: *monitor, don't block*. You let the agent run, you watch the stream periodically, and you interrupt if it goes somewhere you didn't expect. You do not need to baby-sit each tool call. You do need to glance at the stream every few minutes and form an opinion.

A useful rhythm:

- Brief the agent on a 15–45 minute task.
- Move to a second window and do something else (another task, email, a meeting).
- Glance back when you notice a quiet moment, or when the tool pings you.
- Read the summary when it's done; review per Ch. 13.

This alone, with no other patterns, will roughly double your throughput on agent-suitable work.

## Sub-agents: keeping the main thread clean

We mentioned sub-agents in Ch. 11. Here's the full picture.

A **sub-agent** is a fresh agent instance, with its own context window, that you spawn to handle a side-quest. It runs to completion (or fails), comes back with a short summary, and disappears. Its context — all the files it opened, all the noise it generated — never enters your main session.

This is the right move whenever you're about to do something *noisy* in the middle of a focused task. Examples:

- *"Investigate why the staging build has been flaky this week. Look at the last 30 CI runs, group by failure mode, summarize."*
- *"Read every file under `src/lib/` and tell me which ones still import from the deprecated `@old-utils` package. List the file paths, no code."*
- *"Research the three closest competitors to our product. Their pricing pages, their recent announcements, their hiring pages for hints about strategy. One paragraph each."*
- *"Pull the last 14 days of performance from Google Ads for every active campaign and tell me which ones are below their target CPA."*

Each of these would burn thousands of tokens of context if you did them in your main session. Hand them to a sub-agent and you get the answer without the bloat.

In Claude Code, this is the `Task` tool — you can invoke it directly, or other skills will use it internally for you. Codex and OpenCode have their own primitives; the mental model is identical.

## Specialized sub-agents: the "agent reviewing another agent" pattern

A particularly useful flavor of sub-agent is the *specialist*. You configure a sub-agent with a narrow purpose — "security reviewer", "API reviewer", "performance reviewer", "brand-voice editor", "fact-checker" — and invoke it as the second pair of eyes on something the main agent produced.

The pattern that works:

1. Main agent does the work — writes the code, drafts the article, builds the campaign.
2. Specialist sub-agent reviews the work against its narrow checklist.
3. Specialist comes back with a short list of issues.
4. Main agent (in your original thread) addresses the issues.

This is **agent regression-testing agent**, and it's surprisingly effective. The specialist isn't smarter than the main agent — it's the same model — but it comes to the work *with fresh context* and a *single objective*, which catches things the main agent missed during its longer journey.

Concrete example: the `test-assistant-capacity` skill (in some teams' repos) walks every documented capability of a production AI assistant and checks tool selection and safety-rail wording — because no CI job runs the agent end-to-end. The reviewer is itself an agent.

## "Explore in parallel, synthesize at the end"

When you have an open-ended question with multiple promising angles, the pattern that works is **fan out, then fan in.**

> *"Spawn three sub-agents in parallel. Agent A: research how three competitors approach onboarding. Agent B: read our last six months of support tickets tagged `onboarding` and find recurring complaints. Agent C: skim the last 20 onboarding-related session recordings and note friction points. When all three are done, synthesize the findings into one Markdown doc with a 'next experiments to run' section."*

Three sub-agents work in parallel. The main thread waits on all of them, then does the synthesis. Total wall-clock time is roughly the slowest sub-agent, not the sum. The synthesis is grounded in three independent investigations rather than one rambling exploration.

This pattern shines for research, audits, refactor planning, and any "look at it from three angles" question.

## Side-by-side sessions and worktrees

Sometimes you don't want sub-agents. You want **multiple full sessions** running concurrently, each owning its own task end-to-end. Different terminals, different windows, different work.

The friction here is that two agents working on the same codebase at the same time will step on each other — the same files, the same ports, the same dev servers. The solution that engineering teams have converged on is the **worktree-per-ticket** pattern: each parallel task gets its own git worktree (a separate checkout of the repo, sharing the same `.git`), so two agents can edit two copies of the same codebase without conflicts.

For non-engineers, the equivalent is simpler: each parallel task gets its own *session* with its own context. Different chat windows. Different agent invocations. Don't try to multitask within one session — that's where things get confused.

A useful upper bound: most people can productively oversee **two to three** parallel agent sessions before quality starts to suffer. You're not typing the work; you're directing it, and direction has its own cognitive cost.

---

## Engineer-only deep-dive: running three worktrees without them fighting each other

> *Non-engineers — you can skim this section or skip to "Multi-agent workflows" below. The idea matters more than the syntax.*

This is the section where the "two to three parallel agents on the same repo" pattern actually has to work in practice. If you've tried it without preparation, you've already hit some of these.

### Use your agent's built-in worktree support — don't drive `git worktree` by hand

The good news first: **modern agents have grown built-in worktree commands**, and you should use them. The pattern *"open a terminal, type `git worktree add ../foo -b feature/foo main`, `cd` into it, launch a fresh agent session, repeat for the second worktree"* still works, but it's slower than it needs to be and it makes you the one responsible for keeping the three trees from stomping on each other.

In **Claude Code**, the right entrypoints are:

- **`claude -w <path>`** on launch — points a fresh session at a specific worktree path. Useful when the worktree already exists; you just want a parallel session in it.
- The **`/worktrees`** slash command (and related `/worktree` create/list/remove variants) — manages worktrees from inside an existing Claude Code session. The agent creates the worktree, branches off the right base, copies the necessary untracked files (like `.env`), and offers to spawn a fresh session pointed at the new tree. One slash command instead of three terminal commands.
- **Just ask in plain English**: *"spawn a new worktree off `main` for ticket LIN-100; copy `.env` over; install dependencies; then drop me into a fresh agent session pointed at it."* The agent runs the equivalents of the commands above, plus the housekeeping.

**Codex, OpenCode, and Gemini CLI** all have similar shapes; check each tool's worktree / project-switching docs (Appendix B has the current links).

The collision modes below still exist as **failure shapes that can happen** between any two checkouts of the same repo running side-by-side, regardless of how the worktree got created. Treat the rest of this section as the mental model your agent should already have when it sets up your second worktree — and when you ask it to *"write me a `local-dev` skill that handles all the worktree collision modes"*, this list is what it should encode.

### The collision modes

#### 1. Port collisions

Two dev servers cannot both bind to port 3000. The first one to start wins; the second one crashes or fails silently.

The fix is to make ports a per-worktree variable, not a hardcoded constant. A `local-dev-launcher` skill (real example in some teams' repos) inspects which PID owns a busy port and *refuses to kill it unless the path matches the current repo* — so an agent in worktree A cannot accidentally murder the dev server of worktree B. The same skill assigns ports based on a worktree-derived hash, so each worktree gets a stable, unique set of ports.

If you don't have such a skill: at minimum, parameterize the port via env var and pass a different one per worktree.

#### 2. Shared database state

If both worktrees connect to the same local Postgres, an agent in one will see and modify the rows the agent in the other just created. Test fixtures collide. Migrations run twice. Foreign keys explode.

Options, from cheapest to cleanest:

- **Schema-per-worktree.** Same database, different schemas. Cheap; needs the app to honor a schema env var.
- **Database-per-worktree.** Each worktree gets its own DB (named like `myapp_lin100`, `myapp_lin101`). Best balance for most teams.
- **Container-per-worktree.** Each worktree spins up its own Postgres container on its own port. Heaviest, cleanest, only worth it for serious isolation needs.

Whatever you pick, encode it in a setup script (or a skill) so the agent gets it right automatically.

#### 3. `node_modules` lockfile fights

Two `npm install` / `pnpm install` / `yarn install` runs against the same `node_modules` directory at the same time will corrupt it. Even when worktrees have *separate* `node_modules`, there are gotchas. A famous one (preserved as a war-story-skill in at least one team's repo): if you symlink `node_modules` across worktrees to save disk space, Vite's sandbox quietly rejects the symlinked paths and icons render as empty squares. The fix is in a `local-dev` skill that documents the trap and refuses to set up the symlink. Don't share `node_modules` across worktrees, even when it seems cheap.

For Python: `uv` and modern poetry are much better-behaved than pip; each worktree gets its own `.venv`. Don't reuse virtualenvs across worktrees.

#### 4. `.env` drift

The `.env` file is usually gitignored. Which means: when you create a fresh worktree, *it has no `.env`*. The agent starts work, can't connect to the database, makes confused guesses about why, and burns 20 minutes before you notice.

The fix is to either (a) symlink `.env` from the main checkout into each worktree at creation time, or (b) have a `.env.example` that the agent copies and fills in from a known source. A worktree-creation skill is the right home for this — *"create a paired FE+BE worktree off main for ticket LIN-100, with `.env`s linked"* in one phrase. (Claude Code's `/worktrees` command can do this copy for you if you configure which untracked paths it should bring along.)

#### 5. Build cache collisions

`.next/`, `dist/`, `target/`, `__pycache__/`, `.turbo/`, `node_modules/.cache/` — every modern build system has a cache directory, and most assume they own it exclusively. Two worktrees writing to the same cache at the same time is undefined behavior.

The fix is that each worktree has its own cache because it has its own working tree. The trap is when a tool's config points at a *shared* cache directory (some monorepo setups do this on purpose for cross-worktree caching speedups). If you see weird build behavior across worktrees, suspect the cache.

#### 6. Browser session state

If the agent drives a real browser (Ch. 25), two worktrees both opening Chrome with the same profile will share cookies, localStorage, and login state. Worktree A logs in as the test user; worktree B's test now thinks it's also that test user.

The fix is a per-worktree browser profile directory. Modern browser-automation tools support this with a single flag.

#### 7. File-watcher limits

On Linux/macOS, each running dev server adds inotify/fsevents watchers for every file it cares about. Three Next.js dev servers in three worktrees can hit the OS file-watcher limit and start silently dropping change events. Symptom: HMR randomly stops working.

The fix is to raise the limit (`fs.inotify.max_user_watches`) or kill the servers you're not actively using.

### Just ask the agent to write the skill

You don't have to solve all eight of the problems above by hand — and you definitely don't have to remember them. The right move, the first time you hit two or three of them in the same week, is to **ask the agent to write a skill that launches your dev servers with all these collision modes considered**. Something like:

> *"The worktree dev-server collisions in Ch. 15 — write me a `local-dev` skill in this repo that picks free ports automatically, won't kill ports owned by other repos, copies `.env` from the main checkout on first run, and warns me before doing anything to `node_modules`. Document the symlink-`node_modules`-breaks-Vite gotcha so future-me doesn't fall into it again."*

Once written, every future worktree session in this repo just calls the skill instead of debugging collisions from scratch. Combined with Claude Code's `/worktrees` for the *creation* step, the whole flow is "one slash command, one skill invocation, parallel agent running." The skill turns into the living memory of every collision you've already paid for once. (Ch. 18 unpacks skills in detail — this is a worked-in-advance preview of why you'll want them.)

#### 8. CI artifact and PR number drift

Less mechanical, more workflow: when three worktrees are landing PRs at the same time, your CI queue is busy, your PR numbers are out of order, and your reviewers get pinged on three threads at once. The `ship-pr` skill pattern (push → open PR → monitor CI → resolve AI review comments → notify when mergeable) shines here, because the agent can babysit each PR independently while you focus on the highest-priority one.

---

## Multi-agent workflows: agents talking to agents

The frontier of all this is **multi-agent workflows** — explicit pipelines where one agent's output feeds another agent's input, often with different roles.

Common patterns:

- **Planner → executor.** One agent (sometimes a different, smaller model) breaks the task into steps; another executes them.
- **Producer → reviewer.** Main agent writes; specialist reviews; producer revises. (Same as the sub-agent specialist pattern, made explicit.)
- **Researcher → writer.** One agent gathers; another synthesizes. The handoff is a single Markdown doc; the writer never has to do the noisy research.
- **Cross-tool consensus.** You ask Claude *and* Gemini for opinions on a hard decision, then have your main agent reconcile them. The `gemini-chat-and-search` skill is a small worked example — multi-turn consensus is required, and the rule is *"never treat Gemini's first response as final."*

For most readers, multi-agent workflows are not day-one material. They become useful when a task is *big enough* that splitting it across specialized roles produces noticeably better output than one agent doing it all. You'll know you want this pattern when your single agent keeps almost-getting-there but losing the thread on long, multi-step work.

A note of honesty here, because the multi-agent space is full of architecture diagrams that look more settled than they are. Even Anthropic doesn't have a definitive answer on when specialized sub-agents beat one strong agent with good context. In practice I rarely reach for multi-agent setups; one focused session with the right files in front of it usually wins, and the overhead of orchestrating multiple agents often eats the gains. Try sub-agents when you genuinely have parallel work to fan out — explore three options at once, run two reviewers against the same draft — but don't feel obliged to architect a team of agents for normal work. A single agent, well-equipped and well-briefed, is the boring answer that ships.

> **In other tools.** Codex, OpenCode, and Cursor all support multi-agent and sub-agent flavors with their own naming. The patterns translate directly.

## "Keep doing X until Y" — the long-running loop

A lot of readers, when they hear *"long-running, background, autonomous"*, immediately reach for **cron**: schedule the agent to run every hour, every morning, every Monday. That's the wrong reflex for most cases.

Most people don't need cron at all. The right move, almost always, is **`keep doing X until Y`** — the agent works the long task continuously until the stopping condition is met, then comes back. No schedule. No timing. Just a loop with a clear exit.

A few worked examples:

- *"Keep extending test coverage on this module until every public function has at least one test. Commit after each function. When you're done, summarize what you added."*
- *"Keep generating ad-copy variants for this campaign until I tell you to stop. Each batch of five, show me; I'll thumbs-up the ones to keep."*
- *"Keep watching for new replies on this Linear ticket until someone marks it resolved. Summarize each new reply and tag me only if a customer is involved."*
- *"Keep refactoring components in `src/legacy/` to the new pattern, one per commit, until none remain that match the old shape."*

The shape is always the same: a clear *X* (the unit of work) and a clear *Y* (the stop condition). The agent runs the loop, you do something else, you come back to a finished pile or a question the agent couldn't answer on its own.

This pattern subsumes most of what people *think* they need a scheduler for. You wanted "run this every morning"? Usually what you actually wanted was "keep handling these as they come in, ping me if something's weird." Same outcome, no cron, no missed runs, no time zones.

Cron and explicit schedules still exist, and there are real cases for them (a daily report at 7am sharp, a weekly digest on Mondays). But reach for them last, not first. *Keep doing X until Y* is the everyday tool; scheduling is the special-occasion one.

## The takeaway

- Letting the agent cook in the background is the cheapest doubling of throughput available to you.
- Sub-agents keep your main thread clean by handling noisy side-quests with their own context window.
- "Fan out, fan in" — parallel sub-agents on different angles, synthesized at the end — is the right pattern for open-ended exploration.
- Multiple full sessions in parallel work, with a cap of two to three before quality drops.
- Engineers running parallel worktrees on the same repo need to handle ports, DB state, `node_modules`, `.env`, caches, browser profiles, file watchers — encode the lot into a `local-dev` skill once and stop debugging collisions from scratch.
- Multi-agent workflows are a real frontier, but they're opt-in. One well-equipped agent usually beats a team of them; reach for multi-agent only when you genuinely have parallel work to fan out.
- For long-running work, default to **`keep doing X until Y`** rather than scheduling. The loop with a clear stop condition replaces most cases people reach for cron for.

## Try it yourself

**Exercise 1.** Pick a task that you'd normally watch the agent do start-to-finish, that takes at least 10 minutes. Brief it, then *deliberately walk away* and do something else for ten minutes. Come back and review per Ch. 13.

**You'll know it worked when** the work was substantively done and you didn't lose anything by not watching.

*If you can't think of one, try this*: (a) brief the agent to read every README in an open-source repo you've cloned and write a one-paragraph summary of each; (b) brief it to rename and organize the photos in a folder of 100+ images. Both run 10+ minutes and are safe to walk away from.

**Exercise 2.** Take a research question with three independent angles. Spawn three sub-agents, one per angle. Have your main agent synthesize when they return.

If you don't have a real question handy, the book repo ships a ready-made one at `examples/ch-14-parallel/research-brief.md` — a fictional CEO's brief asking for three parallel deep-dives on a Vietnam launch decision (competitive landscape, regulatory, talent). Drop it in front of your agent and let it fan out.

**You'll know it worked when** the synthesized output is grounded in concrete findings from each sub-agent (with details you didn't supply) and the total wall-clock time was close to the slowest of the three, not the sum.

## What's next

The agent ran for fifteen minutes. Part IV picks up the next layer: when you notice yourself re-prompting the same correction over and over, that's the signal to capture the workflow as a *skill*. Ch. 17 starts there — skills vs. slash commands vs. MCPs, and when to reach for each.
