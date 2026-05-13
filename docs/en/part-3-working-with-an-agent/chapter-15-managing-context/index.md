# 15. Managing context

You're three hours into a session. The agent is referencing a decision you reversed forty minutes ago. The reminder you set on turn one — *"don't touch the billing file"* — is gone in spirit. You've just installed a Shopify MCP and a Google Ads MCP, and you can't quite tell whether they're helping or quietly making the agent dumber. The work is *slowing down* and you can't say why.

Ch. 11 taught you what context *is*. This chapter is the working chapter: how you *manage* the context window across a real session that lasts longer than five prompts. There are levers you actually control — and ignoring them is the single most common reason a promising session goes sideways.

## Why position matters: lost in the middle

Modern context windows are large. Claude Sonnet 4.5 sits at 200K tokens; some models advertise a million or more. A natural assumption follows: if I can fit it, the model can use it. That assumption is wrong, and the literature has been clear about this for years.

The foundational result is [Liu et al.'s "Lost in the Middle"](https://arxiv.org/abs/2307.03172) (TACL 2024). They showed a **U-shaped recall curve**: a model's ability to retrieve a fact from its context is highest when the fact is near the start or near the end of the window, and significantly degrades when the fact is buried in the middle. Critically, this held even on models advertised as long-context. The window was big; the attention was not uniform.

The follow-up is more recent and more damning. [Du et al. (Oct 2025)](https://arxiv.org/abs/2510.05381), in a paper with the on-the-nose title *"Context Length Alone Hurts LLM Performance Despite Perfect Retrieval"*, ran the obvious next experiment: what if we *guarantee* the relevant information is in the context? They found accuracy still drops **13.9 % to 85 %** across five open- and closed-source LLMs as input length grows. Long context costs you performance even when retrieval is solved. The Chroma team's "Context Rot" technical report ([Hong, Troynikov, & Huber, July 2025](https://research.trychroma.com/context-rot)) replicated the effect on frontier models.

What this means in practice: **position is policy**. The rule you set near the top of the conversation is reliable. The rule you set in the middle, fifty turns ago, between two abandoned plans — that rule is gone for all practical purposes. The `CLAUDE.md` is uniquely well-placed because it always lives near the top; that is *why* it works.

## Equipped isn't free — every installed tool is context

Ch. 10 asked you to *equip first, then engage* — install the MCPs and skills for the domain before starting the task. That's still right. But it has a cost the earlier chapter glossed over: **every installed MCP server, every skill, every plugin you load costs tokens in the context window from turn zero.** A typical MCP server adds several thousand tokens of tool definitions. Ten installed servers burns 20–30K tokens before the agent has read a single file.

Anthropic's own engineering team [says it plainly](https://www.anthropic.com/engineering/writing-tools-for-agents) in the official tool-writing guide: *"Too many tools or overlapping tools can also distract agents from pursuing efficient strategies."*

The empirical numbers track. The [RAG-MCP paper](https://arxiv.org/abs/2505.03275) (Gan & Sun, May 2025) ran a stress test where the candidate pool of MCP tools grows. Baseline LLM tool-selection accuracy falls to **13.6 %**. With retrieval-augmented tool discovery — i.e. only loading the relevant tool's spec on demand — accuracy jumps to **43.1 %**. The follow-up paper [JSPLIT](https://arxiv.org/abs/2510.14537) (Oct 2025) restates the diagnosis: *"as the number of tools increases, the prompts become longer, leading to high prompt token costs, increased latency, and reduced task success resulting from the selection of tools irrelevant to the prompt."*

There's a quieter second effect, harder to measure but easy to feel. Once the agent has used a particular tool in the session, that tool call sits in recent context — exactly the region the model attends to most. The agent then biases toward reusing the same tool on the next sub-task, even when a different tool would be a better fit, because the alternative is buried mid-context and the recently-used one is right there. Anthropic's "distract from efficient strategies" phrasing is the cleanest term for this; in practice you watch the agent reach for the hammer it picked up an hour ago instead of the screwdriver that was always available. The empirical literature hasn't measured this directly yet, but the attention findings predict it and a long session demonstrates it.

The practical move is the discipline twin of *equip first, then engage*: **equip deliberately, not aspirationally.** Three MCPs you actually use beats ten you might use. If you need a tool occasionally, leave it uninstalled and add it for the session that needs it. And periodically — every few weeks — audit what you have loaded and uninstall what you haven't reached for. The "more is more" intuition from chatbot land does not survive the move to agents.

## The four levers you control

Step back from the panic and you actually have four ways to shape what the model is looking at. Each costs and buys you something different.

1. **Load.** What you put into the context, and *where*. Pinning the load-bearing rule near the top of the conversation isn't a stylistic choice — it's the only place attention is reliably high. If a rule absolutely cannot be forgotten, restate it in the prompt that needs it; don't trust the context window to carry it forward for fifty turns.
2. **Prune.** What you remove mid-session. *"Forget about the staging-DB exploration, we're not doing that anymore."* *"Close the Checkout.tsx file; we're done with it."* This is the cheapest of the four because it doesn't disrupt the working state — it just shrinks the noise. Most readers under-use it because they think of context as something the agent owns. It isn't; it's something you curate.
3. **Compact.** What most agent tools do automatically (or via `/compact`) when the window fills up: summarize older turns into a tighter representation. Compaction is necessary, but it's lossy. The summary the agent writes of "what we were doing earlier" will quietly flatten a one-line rule into a paraphrase, and that paraphrase will *also* slide toward the middle of the new context, where attention is worst. After compacting, re-pin anything critical.
4. **Clear.** Wipe the working conversation back to the persistent baseline — your `CLAUDE.md`, your skills, your memory layer. `/clear` in Claude Code; the equivalent exists in most tools. It's a session reset without losing your project setup. Cleanest reset short of opening a new session entirely.

The decision rule: **prune first, compact second, clear third, new session fourth.** Each lever is more disruptive than the one before it. Reach for the cheapest one that does the job.

## `/compact` vs `/clear` — when to use which

The two slash commands look similar and behave very differently.

- Use **`/compact`** when you want to *keep going on the same task* but the window is filling up. The agent summarizes earlier turns to free room. Continuity preserved, fidelity reduced.
- Use **`/clear`** when the *next* sub-task isn't a direct continuation of the last one. The conversation resets to your `CLAUDE.md` and skills; the agent has no memory of the previous task, but the persistent setup is still there.

A common mistake: compacting because you're afraid to clear. If your next task is *"now do the same audit on the other repo"*, you genuinely want a clean context — `/clear` is right, and the agent doesn't need the previous repo's exploration in its head. The previous run's noise will actively hurt you on the next one.

Another common mistake: compacting and then trusting the summary. After a compaction, the agent's representation of the rule you set ninety minutes ago is now *a model-written summary of that rule*, which has drifted to the middle of the new context. Re-state critical rules after compacting, the same way you'd re-state them after switching seats with a new colleague.

## Watch the meter, and write the handoff

Most agent tools surface context usage somewhere on screen — a percentage, a token count, a bar that fills up. Most users never look at it. Look at it.

A working heuristic: **at 60–70 % full, wrap up or compact**. At 80 %+, the agent's behavior is already drifting and you just haven't noticed yet. The agent will not warn you. The agent does not have a good model of its own context usage — asking *"are you still tracking the original goal?"* will usually get you a confident yes that doesn't match reality.

When you genuinely need to span sessions — a project that takes days, an investigation that pauses for a meeting — don't trust the long-running session to remember. Write a **handoff file**. One page of markdown: *what was decided, what was tried and rejected, which files were touched, what the next concrete step is.* Save it as `handoff.md` or `plan.md` in the project. The next session reads it first, before anything else. *"Read `handoff.md`. Continue from step 4."*

Two benefits beyond the obvious one. First, writing the handoff forces you to articulate what was *actually* decided, which surfaces the parts that were still vague. Second, the handoff is durable in a way the session isn't — a teammate can pick it up, you can pick it up a week later, the agent reads it identically each time. It is the only mechanism that genuinely scales context beyond a single working window.

## Sub-agents and starting fresh

Two more techniques worth naming.

**Sub-agents** are how you keep noisy side-quests out of the main thread. *"Research the difference between SQS standard and FIFO queues."* *"Audit every file under `lib/` for deprecated API usage."* *"Find me three vendors offering this thing."* Each of those is a research detour that could burn 30 % of your main session's context. Hand it to a fresh sub-agent (Claude Code's `Task` tool; analogues exist in Codex and OpenCode), let it burn its own context, and it comes back with a one-page report. Your main thread stays clean.

**Starting fresh** is the move most readers under-use because it feels wasteful. It isn't. When you finish a unit of work — a bug fixed, an article shipped, a campaign launched — close the session and open a new one for the next task. You inherit `CLAUDE.md`, your skills, your MCPs. You lose the cruft. Each new session is sharper than the one it replaced.

Heuristics for "time to start fresh": you've corrected the agent on the same misunderstanding twice; you're more than ninety minutes in and the work has wandered; the agent is referencing files or decisions in a way that feels off; or — flatly — you just finished one task and the next one isn't a continuation. Cheap, fast, no penalty.

## In other tools

The mechanics are similar across the major agent tools, though the slash commands differ.

- **Codex CLI** has its own `/compact` and `/clear` equivalents and surfaces context usage at the prompt; the lost-in-the-middle behavior is the underlying model's, so it shows up identically regardless of harness.
- **OpenCode** offers manual context trimming and per-session reset; the discipline of pruning aggressively is the same.
- **Cursor** auto-summarizes in long agent threads; treat its summaries with the same skepticism you'd apply to `/compact`.
- **Gemini CLI** has a famously long raw context window — but long isn't the same as attended-to, and Du et al.'s "performance degrades even with perfect retrieval" result applies just as much there as it does to Claude or GPT.
- **Anthropic's own prescription** in [Effective Context Engineering for AI Agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) (Sept 2025) lines up exactly with this chapter: a *"smallest possible set of high-signal tokens"* plus *progressive disclosure* (load context just-in-time rather than up front). The vocabulary differs slightly across vendors; the underlying advice is the same.

## The takeaway

- Position matters more than size: the U-shaped recall curve is real, and long context degrades performance even with perfect retrieval.
- Equipped isn't free — every MCP and skill costs tokens from turn zero. Install deliberately, audit periodically.
- You have four levers in escalating order: **load, prune, compact, clear**. Reach for the cheapest one that does the job.
- `/compact` preserves continuity; `/clear` resets to your persistent setup. New session beats both when the task changes.
- Watch the meter; 60–70 % is wrap-up time. Don't trust the agent's self-report.
- A `handoff.md` is the only thing that reliably spans sessions.

## Try it yourself

**Exercise 1.** Spend ~30 % of your context on a deliberate detour — read a long file, fetch a long web page, run a noisy command. Then ask the agent to recall, *verbatim*, a specific rule you set near the top of the conversation. Did it quote it exactly, or paraphrase? That's lost-in-the-middle in action.

**You'll know it worked when** the agent's recall is visibly less precise than the original — usually a paraphrase that softens or generalizes a constraint you had stated precisely.

**Exercise 2.** Audit your installed MCPs and skills right now. For each one, ask: *did I use this in the last two weeks?* Uninstall everything that fails that test. Open a fresh session and notice the difference — both in the perceived "alertness" of the agent and in the meter.

**You'll know it worked when** at least one of the uninstalled tools turns out to be something you don't miss for a full week.

**Exercise 3.** At the end of your next real working session, ask the agent: *"Write a one-page `handoff.md` capturing what we decided, what we tried and rejected, what files we touched, and what the next concrete step is."* Save it. Open a new session a day later with *"Read `handoff.md` and continue from the next step."*

**You'll know it worked when** the second session picks up the work at the same level of context the first one ended at, without you having to re-explain anything.

## What's next

You now have the full working loop — equip (Ch. 10), brief and context (Ch. 11), output (Ch. 12), review (Ch. 13), long work (Ch. 14), and managing the window across all of it (this chapter). Part IV opens at Ch. 16 with the layer above all of this: when you notice yourself re-prompting the same correction over and over, that's the signal to capture the workflow as a *skill*.
