# 14. Don't micromanage: the cost of fighting the grain

Your `CLAUDE.md` has grown to 80 lines. You added a rule last week ("never use exclamation marks in any output"), and three weeks before that ("always cite the source file when summarizing"), and a month before that a long list of opinions about how to phrase commit messages. The agent's behaviour is *less consistent* than it was when the file was 20 lines. It ignores some rules outright. Others it follows, then forgets two turns later. You've started adding emphasis ("**IMPORTANT**", "**YOU MUST**") to the rules it keeps missing, but that hasn't helped either.

You're not doing it wrong. You're hitting a real ceiling: **the more you ask the agent to track, the more it skips.** And the rules most likely to get skipped are the ones least similar to how the model already wants to behave.

This chapter is about recognizing the line between *briefing the agent* (good) and *fighting the model's grain* (costly), and what to do about it once you spot it.

## Why this happens

A language model is, at its core, a next-token predictor. It was trained on an enormous corpus of text and code, and it produces fluent, accurate output most reliably when the answer it's reaching for looks similar to what it saw during training. Riding that grain costs nothing. Fighting it costs.

There are *two distinct ways* an over-managed prompt fails — useful to keep them apart because the fix differs.

**Failure mode 1: attention dilution (bloat).** Every rule you stack into `CLAUDE.md` competes for the agent's attention against every other rule. At some count, the load-bearing rules get crowded out by the cosmetic ones, and the agent silently skips them. Anthropic's own engineering documentation [says this plainly](https://code.claude.com/docs/en/best-practices): *"Bloated CLAUDE.md files cause Claude to ignore your actual instructions!"* and *"important rules get lost in the noise."* They list "the over-specified CLAUDE.md" as a named failure pattern. The fix isn't more emphasis. It's pruning.

**Failure mode 2: grain-fighting.** Some rules don't just take up space — they actively contradict patterns the model learned during training. A homegrown ORM with naming conventions opposite to Django's. A brand voice that bans common English connectors. A reconciliation workflow with fourteen prescribed intermediate steps when the model would naturally take three. The model can follow these — it just spends capacity *not* drifting back to its defaults, and the output gets near-miss-y. Recent research backs the mechanism: [*When Thinking Fails* (Li et al., May 2025)](https://arxiv.org/abs/2505.11423) tested 15 models on instruction-following benchmarks and found that forcing extra reasoning *"diverts attention away from instruction-relevant tokens."* [*Scaling Reasoning, Losing Control* (Fu et al., May 2025)](https://arxiv.org/abs/2505.14810) reports a *"consistent tension between scaling up reasoning capacity and maintaining controllability."* Same shape, different angle: the harder you push the model off its grain, the more it slips on the basics.

## The grain vs the rule

Here's the test the chapter wants you to internalize. There are two kinds of "rules" you might write down, and they behave very differently.

**Context that rides the grain.** You're telling the agent something that's already true about the world it's in. Your project uses Django. Your tone is "warm but not chirpy." Your test command is `make test`. Your customer base is global, so dollar amounts get currency labels. These narrow the model's enormous latent space to a fluent sub-region it already knows well. They cost almost nothing in attention, and they pull the output toward outputs that were already plausible. **More of this is fine.**

**Rules that fight the grain.** You're telling the agent to do something that runs against its trained instincts. Use this homegrown utility instead of the standard library function. Phrase every paragraph in this specific staccato voice. Never use the word *"leverage"* as a verb, *"streamline"* anywhere, or *"in today's…"* as an opener. These force the model to suppress its defaults on every token, and they trade off against the rest of the task's quality. **More of this hurts, and the hurt compounds.**

The distinction is operational: when you add a line to `CLAUDE.md`, ask *"is this something the agent would already do if it knew the basic facts, or am I asking it to do something different?"* The first is cheap. The second has a cost you should be willing to pay.

## What Anthropic's own engineers say

This isn't an academic worry. Anthropic — who builds Claude — explicitly tells Claude Code users to write less, not more. Direct quotes from their [best-practices documentation](https://code.claude.com/docs/en/best-practices):

- *"Keep it concise. For each line, ask: 'Would removing this cause Claude to make mistakes?' If not, cut it."*
- *"If Claude keeps doing something you don't want despite having a rule against it, the file is probably too long and the rule is getting lost."*
- The fix for over-specification: *"Ruthlessly prune. If Claude already does something correctly without the instruction, delete it or convert it to a hook."*

This last move — *convert it to a hook* — matters. We'll come back to it under compliance.

## What to include in `CLAUDE.md`, what to cut

Anthropic's own include/exclude split, adapted for this book's two audiences:

**Include:**
- Bash commands the agent can't guess (your test runner, your build script, your linter)
- Code style rules that *differ from defaults* (your team uses ES modules not CommonJS; your team uses Tailwind not Bootstrap)
- Project-specific gotchas you debugged once and don't want to debug again (the `local-dev` skill you wrote in Ch. 18 lives in skill files for the same reason)
- Repo etiquette: branch naming, PR conventions, commit-message style if it's genuinely non-standard
- Architectural decisions specific to your project that aren't visible in the code

For non-engineering work, the same shape:

- Tools the agent uses that aren't obvious (the CRM you actually use; the inbox folder structure; the spreadsheet column names)
- Brand-voice rules that *differ from neutral business writing* — a handful, not forty
- One or two anchor examples of good output, instead of long lists of *"never do this"*
- Domain context: who the audience is, who the customer is, what the agent is *not* allowed to disclose

**Cut:**
- Anything the agent will already do correctly without being told (standard language conventions, basic safety, common politeness)
- Detailed API documentation — link to the docs instead and let the agent fetch
- Long tutorials or explanations of the system itself — the agent can read the code or the docs
- Information that changes frequently (deploy URLs, current sprint goals, this-week-only constraints — these belong in your message, not in the project's persistent file)
- Self-evident practices like *"write clean code"* or *"be polite to the customer"*

When in doubt, *delete* and watch the next session's output. If something gets worse, add the rule back. If nothing changes, you found a line that wasn't earning its weight.

## When fighting the grain is right

Some rules are non-negotiable even at a quality cost. Safety policy. Legal compliance. Regional naming (the `i18n-reviewer` skill in Ch. 19 says *"never use 'State' alone in a US address form — use 'State/Territory' so Puerto Rico, Guam, and the other territories fit"* — that's a business rule the company cannot afford to soft-enforce). Accessibility requirements. Brand-trademark spellings the legal team insists on.

For these, the chapter's advice flips: **don't try to enforce them with paragraph-long prompt rules.** That puts a non-negotiable rule in the same fragile attention budget as your style preferences, and the rule will sometimes lose. Instead, push the rule outside the prompt entirely:

- **Hooks**: a deterministic script that runs at every file edit, blocks the commit on violation. Anthropic's own recommended fix for must-hold rules.
- **Tools or MCP servers with permission scopes**: a deletion tool the agent can't call without an explicit confirm; a publish action gated by a check.
- **Structured-output schemas**: when the output must be JSON in a specific shape, enforce it at the API level, not by adding a long natural-language description.
- **A dedicated review step**: a sub-agent or a CI check that audits the output for the specific non-negotiable rule, not the main agent trying to remember it mid-flow.

This is the *monitor, don't block* posture from Ch. 7 applied at the rule layer. You let the agent ride its grain on the bulk of the work, and you put deterministic enforcement on the small set of things that actually have to hold.

## In other tools

Codex CLI's `AGENTS.md` follows the same pattern as `CLAUDE.md` — less is more, prune aggressively, prefer hooks for hard rules. OpenCode's instruction file has similar guidance. Cursor's "Rules for AI" sit closer to slash-commands and benefit from the same minimalism. The mechanism (next-token prediction over an internet-scale corpus) is the model's, not the harness's, so the principle generalizes. None of these tools reward stuffing the system prompt.

## The takeaway

- The more rules you stack, the less attention each one gets. Eventually the load-bearing ones get crowded out by the cosmetic ones.
- Two distinct failure modes: **bloat** (too many static rules → important ones lost in noise) and **grain-fighting** (rules contradicting the model's training → near-miss outputs).
- *Context that rides the grain* (your stack, your tone, your test command) is cheap. *Rules that fight the grain* (proprietary methodology, hard style overrides) are costly — pay deliberately.
- For non-negotiable rules (compliance, safety, geopolitical naming): don't enforce them via prompt paragraphs. Use **hooks, tools with permission scopes, or structured-output schemas.**
- Anthropic's own advice on `CLAUDE.md`: *"Ruthlessly prune. For each line, ask: 'Would removing this cause Claude to make mistakes?' If not, cut it."*

## Try it yourself

**Exercise 1: The 50% cut.** Open your project's `CLAUDE.md` (or the equivalent in Codex / OpenCode). Read every line and ask: *"Would the agent do the wrong thing without this rule?"* If you can't answer yes confidently, mark the line for deletion. Aim to cut roughly half. Save, open a fresh session, give the agent a task you've done before, and compare the output quality.

**You'll know it worked when** the agent's output is at least as good as before — usually sharper, sometimes noticeably so — and any rules that *were* load-bearing reveal themselves quickly because the next task surfaces a behaviour you actually wanted constrained.

**Exercise 2: Spot the grain-fight.** Find one rule in your `CLAUDE.md` or a skill that's been *"emphasized"* (uppercase, "IMPORTANT", "YOU MUST", or pleading language). That emphasis usually means the rule has been ignored at least once. Now ask: *am I telling the agent something it would already do (riding the grain), or asking it to override its defaults (fighting the grain)?* If it's the second, you have three choices: accept the cost and keep the rule, soften the rule to align closer to the model's instincts, or push it outside the prompt as a hook / tool / schema.

**You'll know it worked when** you can identify at least one rule in your file that's been buried under "**IMPORTANT**" emphasis precisely because it's a grain-fight — and you have a concrete plan to either soften it or move it to a hook.

## What's next

Ch. 15 turns to long-running and parallel work — what happens when one well-briefed agent is doing the right things, but you want *four* of them doing it at once.
