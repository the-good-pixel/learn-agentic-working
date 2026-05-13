# 15. Managing context

You're three hours into a session. The agent is referencing a decision you reversed forty minutes ago. The reminder you set on turn one — *"don't touch the billing file"* — is gone in spirit. The agent is repeating itself, contradicting things it said an hour ago, and the work is *slowing down* in a way you can't quite name.

Ch. 11 taught you what context *is*. This chapter is the working chapter for what happens *during* the session: the levers you have when the window starts filling up. Ch. 16 (the first chapter of Part IV) picks up the sibling discipline — what to load (and *not* load) *before* the session begins, since every installed MCP and skill is itself loaded context.

## Why position matters: lost in the middle

Modern context windows are large. Claude Sonnet 4.5 sits at 200K tokens; some models advertise a million or more. A natural assumption follows: if I can fit it, the model can use it. That assumption is wrong, and the literature has been clear about this for years.

The foundational result is [Liu et al.'s "Lost in the Middle"](https://arxiv.org/abs/2307.03172) (TACL 2024). They showed a **U-shaped recall curve**: a model's ability to retrieve a fact from its context is highest when the fact is near the start or near the end of the window, and significantly degrades when the fact is buried in the middle. Critically, this held even on models advertised as long-context. The window was big; the attention was not uniform.

The follow-up is more recent and more damning. [Du et al. (Oct 2025)](https://arxiv.org/abs/2510.05381), in a paper with the on-the-nose title *"Context Length Alone Hurts LLM Performance Despite Perfect Retrieval"*, ran the obvious next experiment: what if we *guarantee* the relevant information is in the context? They found accuracy still drops **13.9 % to 85 %** across five open- and closed-source LLMs as input length grows. Long context costs you performance even when retrieval is solved. The Chroma team's "Context Rot" technical report ([Hong, Troynikov, & Huber, July 2025](https://research.trychroma.com/context-rot)) replicated the effect on frontier models.

A quick honesty note about who this finding gives leverage to. If you're *building* an agent yourself, the U-shape is a design constraint — you can decide what goes where in the window and pin load-bearing rules near the start. If you're *using* an agent tool — which is most readers of this book — you have very little of that fine-grained control. The "middle of the window" isn't a fixed place you can avoid; it's a drifting region that opens up as the session grows, swallowing whatever you wrote half an hour ago. Your `CLAUDE.md` survives because the tool reliably places it near the top for you. The thing you typed in turn fourteen of fifty does not.

So the user-actionable takeaway from the lost-in-the-middle finding is genuinely just one move: **when the task changes, start a new context.** There's no token-placement trick available to you; there's only the choice of whether to keep adding to the current window or open a fresh one. Two ways to do that, both routine:

1. **A new session, or `/clear`.** Close the chat and open a new one — or use your tool's reset command (Claude Code's `/clear`, Codex's session reset, OpenCode's equivalent). You inherit your `CLAUDE.md`, skills, and MCPs; you drop the cruft.
2. **A sub-agent or a separate local agent.** Hand a side-quest (research, a long audit, an investigation) to a fresh agent instance that gets only the partial context it needs to do *that* sub-task. Claude Code's `Task` tool does this; Codex and OpenCode have equivalents. The sub-agent's middle isn't your middle — and when it returns a one-page summary, that summary lands at the *end* of your main context, where attention is high.

Both methods do the same fundamental thing: they sidestep the U-shape rather than try to outwit it.

## The four levers you control

Step back from the panic and you actually have four ways to shape what the model is looking at. Each costs and buys you something different.

1. **Load.** What you put into the context. As a *user* of an agent tool, you don't control where individual tokens land inside the window — but you do control what's in your **current turn**, which is always at the end of the context, where attention is reliably high. If a rule absolutely cannot be forgotten, restate it in the prompt that needs it; don't trust the window to carry it forward for fifty turns. `CLAUDE.md` is the one exception — the tool keeps it near the top for you.
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

Two benefits beyond the obvious one: writing the handoff forces you to articulate what was *actually* decided (which surfaces the parts that were still vague), and the handoff is durable in a way the session isn't — a teammate or future-you can pick it up, and the agent reads it identically each time.

## In other tools

The mechanics are similar across the major agent tools, though the slash commands differ.

- **Codex CLI**: `/compact` and `/clear` equivalents; context-usage indicator at the prompt. The lost-in-the-middle behavior is the underlying model's, so it shows up identically regardless of harness.
- **OpenCode**: manual context trimming and per-session reset. Same pruning discipline applies.
- **Cursor**: auto-summarizes long agent threads. Treat its summaries with the same skepticism as `/compact`.
- **Gemini CLI**: famously long raw window — but long isn't the same as attended-to. Du et al.'s "even with perfect retrieval" result applies there too.
- **Anthropic's own prescription** in [Effective Context Engineering for AI Agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) (Sept 2025) names the same advice: *"smallest possible set of high-signal tokens"* plus *progressive disclosure*.

## The takeaway

- Position matters more than size: the U-shaped recall curve is real, and long context degrades performance even with perfect retrieval.
- You have four levers in escalating order: **load, prune, compact, clear**. Reach for the cheapest one that does the job.
- `/compact` preserves continuity; `/clear` resets to your persistent setup. New session beats both when the task changes.
- Watch the meter; 60–70 % is wrap-up time. Don't trust the agent's self-report.
- A `handoff.md` is the only thing that reliably spans sessions.

## Try it yourself

**Exercise 1.** Spend ~30 % of your context on a deliberate detour — read a long file, fetch a long web page, run a noisy command. Then ask the agent to recall, *verbatim*, a specific rule you set near the top of the conversation. Did it quote it exactly, or paraphrase? That's lost-in-the-middle in action.

**You'll know it worked when** the agent's recall is visibly less precise than the original — usually a paraphrase that softens or generalizes a constraint you had stated precisely.

**Exercise 2.** At the end of your next real working session, ask the agent: *"Write a one-page `handoff.md` capturing what we decided, what we tried and rejected, what files we touched, and what the next concrete step is."* Save it. Open a new session a day later with *"Read `handoff.md` and continue from the next step."*

**You'll know it worked when** the second session picks up the work at the same level of context the first one ended at, without you having to re-explain anything.

**Exercise 3.** Run a session deliberately past 70 % of the context meter. Then ask the agent to recall a specific decision from the first ten minutes of the session, verbatim. Compare that to running `/compact` and asking the same question, and then to opening a fresh session and giving it a one-line summary of the decision. Which produces the sharpest follow-on answer?

**You'll know it worked when** you can articulate, from your own experiment, when `/compact` is worth it and when starting fresh is genuinely better.

## What's next

Part IV opens at Ch. 16 with the definitional ground for the skills, slash commands, and MCPs we've been referring to throughout — followed by when to write your own (Ch. 17) and how (Ch. 18).
