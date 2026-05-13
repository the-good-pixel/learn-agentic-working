# 15. Growing your plugins and skills

You've been at this for a month. The agent feels slower than it used to, and you can't put your finger on why. You installed eight MCPs because a Twitter thread said to. You forked three skill packs from popular GitHub repos because they looked handy at the time. Last week, the agent reached for `summarize-doc` when you asked it to summarize an email — but you can't remember if `summarize-doc` was for docs, PDFs, or anything-with-text, and you can't remember whether `quick-summary` came from the same repo or a different one. Something is off, and the *more* you install, the more off it gets.

Ch. 10 sold you on the *equip first, then engage* habit. That advice still stands. This chapter is the discipline twin: how to equip *well* — without the agent (or you) drowning in the tools you've piled on.

## The strategy is reasonable; the model isn't ready

The strategy the industry has chosen is, in principle, reasonable. Rather than train a separate *vertical* model for finance, marketing, ops, or law, vendors ship a general-purpose model and steer it per domain with a stack of instruction files. Skill packs, plugin bundles, "200+ skills in one install" community repos on GitHub — same idea: pile on instructions instead of training a new model. Cheaper, more flexible, in principle sound.

**The mismatch is on the model side.** Today's foundational models can't yet navigate many tools, skills, and instructions in a single context window without losing accuracy. The strategy may catch up eventually; right now, the gap is real and *you* wear the cost. Anthropic's own engineering team [says it plainly](https://www.anthropic.com/engineering/writing-tools-for-agents) in the official tool-writing guide: *"Too many tools or overlapping tools can also distract agents from pursuing efficient strategies."*

The empirical numbers track. The [RAG-MCP paper](https://arxiv.org/abs/2505.03275) (Gan & Sun, May 2025) ran a stress test where the candidate pool of MCP tools grows. Baseline LLM tool-selection accuracy falls to **13.6 %**. With retrieval-augmented tool discovery — i.e. only loading the relevant tool's spec on demand — accuracy jumps to **43.1 %**. The follow-up paper [JSPLIT](https://arxiv.org/abs/2510.14537) (Oct 2025) restates the diagnosis: *"as the number of tools increases, the prompts become longer, leading to high prompt token costs, increased latency, and reduced task success resulting from the selection of tools irrelevant to the prompt."*

## Two costs of a bloated kit

There are two distinct costs to over-installing, and only the first is about the LLM.

**Cost one: the agent gets confused.** With thirty installed tools, it picks the wrong one, or doesn't pick one at all, or — the subtler effect — once it has used a particular tool once, that tool sits in recent context and the agent biases toward reusing it on the next sub-task even when a different tool would fit better. Anthropic's *"distract from efficient strategies"* phrasing is the cleanest term for this; in practice you watch the agent reach for the hammer it picked up an hour ago instead of the screwdriver that was always available.

**Cost two: *you* get confused.** Nobody warns you about this one. The more plugins and skills you install, the more *you* have to remember — which command does what, what each is named, which ones overlap. The user becomes the bottleneck. It's the slow regression to Microsoft Office and Adobe Creative Suite: hundreds of features per product, the user knows six, and the rest generate menu clutter. Forty installed skills named `summarize-doc`, `summarize-document`, `quick-summary`, `summarize-pdf` — and you can't remember which fires on what input. That's the failure mode agents were supposed to rescue you from.

## Equip deliberately

The practical move is the discipline twin of *equip first, then engage*: **equip deliberately, not aspirationally.** Three MCPs you actually use beats ten you might use. If you need a tool occasionally, leave it uninstalled and add it for the session that needs it. Periodically — every few weeks — audit what you have loaded and uninstall what you haven't reached for. The *"more is more"* intuition from chatbot land does not survive the move to agents.

## Grow your own skills organically

There's a better alternative to the install-everything-from-GitHub habit, and the rest of this book is built on it: **grow your own skills organically, from work you've actually done.** Ch. 18 and Ch. 19 are the full treatment, but the pattern is short enough to name here:

1. Pick a real task. Ask the agent to do it from scratch, with no skill installed. Brief it well; let it work.
2. The first attempt may hit walls. The agent may go down a wrong path. Correct it. Get the workflow right.
3. The moment it produces the correct result by the right workflow — before the session ends — say: *"package what we just did into a skill."* The agent reads the conversation back, picks out the steps and corrections, and writes the `SKILL.md` for you.
4. If your agent tool doesn't support skills yet, fall back to long-term memory: *"remember this workflow for next time."* Same idea, different storage layer.

Skills built this way capture *your* corrections and *your* working patterns — not somebody else's guess at what you might want. They install only the tools you actually used. And there's exactly one of each because you only made it once.

## Cherry-pick from upstream — don't install blindly

What about the GitHub skills that *do* look genuinely useful? Remember what most of them actually are — a `SKILL.md` plus a handful of code snippets, not real packages with dependencies. Don't install them blindly. Paste the URL into your agent and ask it to **read the repo, extract the parts you actually need, and rebuild them locally as your own skill.**

Two wins:

- You get the slice that matters rather than the whole bundle. The Twitter-hyped "200-skill mega-pack" might contain three skills that fit your work; pull only those.
- You've reviewed the code before it touches your machine. Supply-chain attacks on skill and plugin marketplaces are a real and growing concern — a popular repo is a fast path for a prompt injection or malicious post-install script straight into your agent's privileged context. Reading first is cheap insurance the agent does for you.

The kit grows as you grow into it, not as a bundle someone else thought you might need.

## In other tools

The same discipline applies across major agent tools. Codex CLI, OpenCode, and Cursor all let you install MCPs and skills/plugins similarly to Claude Code, and the bloat dynamics — both costs above — are the same in each, because the underlying constraint is the foundational model's attention, not the harness. Anthropic's [Effective Context Engineering for AI Agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) (Sept 2025) prescribes the same approach in vendor language: a *"smallest possible set of high-signal tokens"* plus *progressive disclosure* — load context just-in-time rather than up front.

## The takeaway

- The industry strategy — steer a general model with installable instruction files instead of training vertical models — is reasonable in principle, but today's models can't yet navigate many of those instructions in one context window without losing accuracy.
- Bloat costs you twice: the agent gets confused, *and* you become the bottleneck remembering which tool does what.
- Equip deliberately. Three you actually use beats ten you might.
- Build skills from your own work, not from someone else's GitHub bundle. The 4-step pattern: do the task → correct it → ask the agent to package it → fall back to memory if skills aren't supported.
- When an upstream skill *does* look useful, have the agent read the repo and extract only what you need — for both relevance and supply-chain safety.

## Try it yourself

**Exercise 1.** Audit your installed MCPs and skills right now. For each one, ask: *did I actually use this in the last two weeks?* Uninstall everything that fails that test. Open a fresh session and notice the difference — both in the perceived "alertness" of the agent and (if your tool shows it) in the context meter.

**You'll know it worked when** at least one uninstalled tool turns out to be something you don't miss for a full week.

**Exercise 2.** Pick a task you've recently done well by hand-prompting — one you'd be happy to do the same way next time. At the end of the next session in which you do that task, say: *"package what we just did into a skill."* Read what the agent drafts; tweak a line or two; save it. Next time you have the same task, invoke the skill instead of re-prompting.

**You'll know it worked when** the second invocation runs in one command instead of the multi-step conversation it took the first time.

**Exercise 3.** Find a popular GitHub skill repo that looks relevant to your work. *Don't install it.* Paste the URL into your agent and ask: *"read this repo, tell me which parts (if any) would actually be useful for the kind of work I do, and rebuild just those parts as a local skill."* Compare what the agent extracts to what installing the whole repo would have done.

**You'll know it worked when** the extracted skill is noticeably smaller than the original repo, and you can articulate what was dropped and why.

## What's next

Ch. 16 picks up the other half of the discipline: once you've got the right tools loaded, how do you manage what stays in the agent's working memory during a long session?
