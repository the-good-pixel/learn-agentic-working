# 28. What we got wrong, and what's next

By now you've seen a lot of patterns. Some of them will work on the first try. Some of them will feel wrong in your hands and you'll quietly drop them. And some — the ones this chapter is about — will feel *right* and still steer you off a cliff, because they encode a default that the broader agent conversation has gotten wrong.

This chapter is the honest part of the book. It's where we name the anti-patterns we keep watching smart teams fall into — including the ones our own early drafts leaned toward — and look briefly at where the tooling is headed underneath us. It's the closer, so we end where we started: with the three things that won't change, no matter what ships next.

> **You don't need this chapter to start.** Skip it on first read. Come back after a few months of real use, when you're trying to figure out why some weeks felt great and others felt like fighting your tools.

## The anti-pattern almost nobody warns you about

Most agent guidance — including the early drafts of this book — leans cautious. *Always require confirmation. Never let the agent X. Money is at stake, so gate it. Production is sacred, so gate it. The agent could be wrong, so gate it.*

We don't think this is right anymore. Or rather: we think it's right for a small set of actions and wrong for everything else, and the failure mode of *blanket* caution is much worse than people admit.

The biggest mistake we see — bigger than any of the runaway-agent horror stories — is **over-gating combined with under-monitoring**. Two halves of the same dysfunction:

**Over-gating** is the team that requires confirmation on every tool call. Every file write, every API call, every browser click. After a week, you've trained yourself to mash *yes* without reading. The gate has become noise. The agent is functionally autonomous *and* you've stopped paying attention to what it's doing — the worst possible combination. People also use over-gating as a substitute for thinking about which actions are genuinely high-stakes; if everything is gated, nothing is.

**Under-monitoring** is the other half: you fire off a long-running task, close the tab, and come back two hours later to "done." You didn't watch. You don't actually know what happened. You scan the summary, see "shipped" or "complete," nod, and move on. The first time this bites you, it bites hard — usually in a place you weren't watching because *that part wasn't supposed to break*.

The healthy alternative is what we've been calling **monitor, don't block**: let the agent take real action by default, watch what it does in something like real time (streamed output, dashboards, sub-agent reports), and step in when something's wrong. Reserve explicit approval gates for the small set of actions that are **big and irreversible** — production DB writes, mass customer sends, large financial transfers, anything that touches regulated data in regulated contexts.

The heuristic that ages well is *"is this reversible? is the blast radius bounded?"* — not *"could this cost money?"*. A $50 Google Ads campaign that turns out wrong is reversible; you pause it. A wire transfer to a fraudulent vendor isn't. Spend your caution budget where it matters.

## Other traps worth naming

A handful of patterns we keep watching people walk into, and the move out of each one.

**The "agent as oracle" trap.** You ask the agent a question and read the answer, instead of asking it to *do the thing*. *"How do I update this email template?"* — and you take notes, switch to SendGrid, do it by hand. The right prompt was *"update this email template to say X."* If you find yourself reading instructions from your agent, that's almost always a sign you should be handing it the task.

**The "let it cook for an hour with no plan" trap.** The opposite failure of over-gating. You give the agent a vague, ambitious request — *"refactor the auth system"*, *"make the dashboard better"* — and let it run unsupervised. An hour later it's produced a confident-looking diff that doesn't quite do what you wanted and touches three files you didn't expect. The fix isn't more gating; it's a *plan*. Ask for a plan first (Ch. 10), agree on it, *then* let it run. Long autonomous runs are great when they're executing a plan; they're a coin flip when they're inventing one as they go.

**The "I'll just keep re-prompting" trap.** You correct the agent. It re-does the work. Next week, same task, same correction. Two weeks later, same task, same correction. That's the moment you should have stopped re-prompting and written a skill (Ch. 18). The cost of writing the skill is almost always less than the cumulative cost of the corrections you're about to make.

**The "more context is always better" trap.** Stuffing the prompt with every adjacent file, every linked doc, the entire codebase. After a certain point, the model is searching for the signal in your noise. Curated context beats exhaustive context — point at the *right* files, not all of them. The agent can pull more if it needs to.

**The "one giant model call" trap.** Trying to get the agent to do everything in a single mega-prompt. The work that actually compounds happens in *loops* — the agent reads a thing, thinks, acts, reads the result, acts again. Briefing for the loop is different from briefing for a one-shot. (And it's much cheaper — see Ch. 27 on token economics.)

**The "I'll roll my own agent harness" trap.** Reasonable on a Saturday afternoon. Painful by month three when you're maintaining your own tool-call retry logic, prompt caching, MCP loader, and approval prompts instead of doing the work the agent was supposed to do for you. Use Claude Code, Codex, OpenCode, Cursor, Gemini CLI — even if imperfect, they're all moving faster than you can. Save the build-your-own energy for skills and MCPs that actually encode your team's knowledge.

## Where this is heading

The patterns in this book will outlast the specific tools. The tools themselves are moving fast enough that any specific claim about what's possible *today* is half-stale by the time you read it. A few directions to watch, with the caveat that any of them could land sooner or later than expected:

**Deeper computer use.** Browser-driving (Ch. 26) is the first taste; full desktop computer use is in early but real shape. The same loop — *navigate, snapshot, interact, re-snapshot* — extended from the browser to the whole OS. The agent reads your screen, moves your mouse, types into any app. The boring corporate desktop apps that have outlived their APIs become reachable. Reliability is the open question, not capability.

**Persistent agents.** The agent that remembers across sessions — your preferences, your projects, your past failures, the thing it learned about your codebase last Tuesday. Long-term memory features are landing in most major tools, with different tradeoffs. The agentic working playbook becomes less about *teaching the agent who you are each session* and more about *curating what it remembers about you over time*. The CLAUDE.md and skills patterns we taught are early forms of this; the next version is closer to ambient.

**Skill marketplaces.** Right now, skills travel by GitHub repo, by copy-paste, by friends-sharing. The path to a real marketplace — searchable, versioned, reviewed, signed — is open. The first one to ship at scale changes the equipping-first reflex (Ch. 10) from *"is there a skill for this?"* to *"which of the seven published skills for this is highest-rated?"* in a way that's good for everyone.

**Agent-to-agent protocols (A2A).** Right now, when two agents need to cooperate, they do it through the human in the middle, or through a shared tool, or by one driving the other as a sub-agent. Open A2A protocols — agents that discover each other's capabilities, hand off tasks, negotiate — are early. When they land, the unit of work shifts from *"my agent does this"* to *"my agent coordinates with my vendor's agent to do this."* This is also where the security and identity questions get genuinely interesting, in ways nobody has fully worked out.

**Smaller, cheaper, faster.** Less glamorous than the above, but probably the biggest practical lever. The cost-per-token of work the agent does today drops 5-10x per year on current trends. Things that aren't economical at *this* token cost — running an evaluator on every output, replaying every failure on three models, A/B testing every prompt change — become trivial when tokens cost a tenth of what they cost now. A lot of *good practice* over the next two years will be "things you should have always been doing, but couldn't afford to."

What stays the same in all of this is the *shape* of the work: a human deciding what they want, an agent doing it, a deliverable that gets reviewed, a habit that gets captured. The tools will change. The shape won't.

## The three things that don't change

The book opened with three principles. We'll close on them, because they're what we'd want a reader to carry out the door:

**Ask the agent to do it for you — including the setup.** The single most important promise to a non-technical reader, and the most-skipped move by technical readers who default to typing the keys themselves. If you can describe what you want, the agent can do it — and that includes installing itself, writing its own CLAUDE.md, connecting to your tools, writing its own skills. The piece you can't outsource is *deciding what you want to happen*. Everything else, you can hand off.

**Equip first, then engage.** Before starting any task in a new domain, the first move isn't *"how do I do this?"* — it's *"what MCPs and skills already exist for the tools I'll touch?"* An equipped agent makes the work cheap; an improvising agent makes it mediocre. The discovery question — *"is there an MCP or skill for X?"* — is itself a prompt you give the agent. The minutes you spend equipping pay back a hundred times across every future task in that domain.

**Monitor, don't block.** Let the agent take real action by default. Watch what it does. Step in when something's wrong. Reserve explicit gates for the small set of *big and irreversible* actions — production writes, mass sends, large financial transfers. Most agent guidance leans the other way, and most teams who follow it end up under-using the very tool they paid for. Capability over caution, when the consequence is bounded.

If you forget every specific pattern in this book — sub-agents, worktrees, plan mode, prompt caching, scoped credentials, all of it — and you remember those three, you'll figure out the rest as the tools change underneath you. They have so far. They will again.

## The takeaway

- The biggest mistake we see isn't *agent did too much*. It's **over-gating combined with under-monitoring** — gating becomes noise, monitoring drops to zero, and the agent runs unsupervised behind a wall of "yes" prompts.
- Other traps: agent as oracle (ask vs. delegate), let-it-cook-with-no-plan, I'll-just-keep-re-prompting (write the skill), exhaustive context, one giant model call, rolling your own harness.
- The future is more capability per dollar, deeper computer use, persistent agents, skill marketplaces, and agent-to-agent protocols. The *shape* of the work — describe, do, review, capture — stays the same.
- The three things that don't change: *ask the agent · equip first · monitor, don't block*. Carry those out the door.

## Try it yourself

**One.** Look at your own setup right now. Find one place you're over-gating — a confirmation prompt you mash *yes* on every time without reading. Either drop the gate, or restore the *reading*. Pick one; don't keep both.

**You'll know it worked when** the next time that prompt appears, you actually pause and read it — *or* you've already removed it and stopped pretending you were checking.

*If nothing comes to mind, common over-gates other readers catch themselves on*: file-write confirmations, git-commit confirmations, "the agent is about to read a file" prompts. Pick one.

**Two.** Find one workflow where you've been re-prompting the agent more than three times with the same correction. Write the skill. Or — better — ask the agent to write it from the conversation (Ch. 19).

**You'll know it worked when** the next run of that workflow is one command, and you didn't have to make the correction.

*If you can't think of a recurring correction*: common ones — *"stop using contractions in board docs"*, *"stop adding 'feel free to reach out' to every email"*, *"stop reading the venv folder"*. Pick one and turn it into a skill.

**Three.** Close the book. Pick the most annoying recurring task on your plate this week — the one you've been putting off because the SaaS UI is bad, or the form is long, or the report is tedious. Brief the agent. Watch it work. Capture what you learn.

**You'll know it worked when** the agent did the task, *and* you have a one-line note on what to capture as a skill before you do this again.

*If nothing annoying jumps to mind, try one of these*: (a) the monthly expense reimbursement upload; (b) drafting Friday team updates; (c) the weekly competitor-newsletter scan.
