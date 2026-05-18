# 19. Writing a good skill (and letting the agent write it for you)

You've decided you want a skill for the thing you keep redoing. Now what?

Here's the part most people get wrong. They open an empty `SKILL.md`, stare at it for a minute, and try to hand-author the procedure from memory — which steps, which gotchas, which triggers, what should *not* fire it. Twenty minutes in, the file is half-good and half-aspirational, and the agent invokes it at the wrong times or skips the gotchas because they're buried in prose.

Don't do that. **You almost never write a skill by hand.** There are two flows that produce a better skill in less time, and you should try both before reaching for the keyboard.

## Flow 1: search before you write

Half the time, someone already wrote the skill you're about to write. Ask first.

The order here is deliberate. *Flow 1 comes before Flow 2 on purpose* — it's the *equip first, then engage* habit from Ch. 10 applied at the skill layer. The reflex you want to build is: when you hit a task that looks skill-shaped, the first move is *"is there one for this already?"*, not *"let me write one."* Two reasons. First, a community-vetted or vendor-published skill has usually already absorbed the gotchas you'd have to discover yourself, so installing it is a shortcut past a week of corrections. Second, your skill-writing budget is finite — you'll write maybe ten skills that really matter this year; don't spend three of them re-doing what's on GitHub. Search first; write only what's missing.

The prompt is plain:

> *"Is there a published skill for shipping PRs / reconciling Stripe against invoices / drafting an investor update? Check my user-level skills, the team's project skills, and community lists on GitHub."*

The agent will look in the obvious places:

1. **Your user-level skills** (`~/.claude/skills/*`). Anything you've installed before.
2. **The project's skill library** (`.claude/skills/*` in the current repo). Skills your team committed for everyone to share.
3. **Community / "awesome" lists on GitHub.** People publish skills in repos like `awesome-claude-skills` or vendor-specific bundles. The agent can read them and tell you what's there.
4. **Vendor-published skills.** Some tool vendors ship `SKILL.md` files alongside their MCPs.

For common needs — *ship a PR, take notes in Linear, send mail through SendGrid, drive a browser session* — there's often a public answer already. Install it (the agent does this for you — copy the folder, restart the session) and move on. Save your skill-writing budget for the things that are actually about *your* work.

**A caveat on installing what you find.** Most public skills aren't real packages — they're a `SKILL.md` plus a handful of code snippets. Especially for highly-starred repos with hundreds of bundled skills, the safer move is to paste the URL and ask the agent to **read the repo, extract only the parts you actually need, and rebuild them locally as your own skill**. Two wins: you get the slice that matters rather than the whole bundle, and you've reviewed the code before it touches your machine.

Why bother? Because supply-chain attacks on skill marketplaces aren't theoretical. [Researchers recently demonstrated](https://arxiv.org/abs/2604.03081) that you can hide malicious logic inside the *code examples* in skill documentation — an agent doing what it normally does (reusing the example) ends up running the attacker's payload. Across four agent frameworks and five models, they bypassed safety defenses 12–34 % of the time. The fix isn't more paranoia about installing things; it's letting the agent read the source for you before anything lands on your machine.

## Flow 2: write from the conversation

When no published skill fits, the right move is *still* not to open an empty file. It's to **let the agent draft the skill from the session you just had**.

The flow:

1. You finish working on the task — successfully or messily, doesn't matter. The corrections you gave the agent along the way are *part of the material*.
2. You say: *"That was useful. Write a skill that captures what we just did, including the corrections I had to give you. Save it as `.claude/skills/<name>/SKILL.md`."*
3. The agent reads back over the conversation, picks out the steps you actually took, the tools you used, the things that went wrong, and the rules you gave it. It drafts the `SKILL.md` with a `description` (the trigger surface), the procedure, and a "won't do this" section.
4. You skim it. Tweak a line or two. Save.
5. **If your agent tool doesn't support skills yet**, fall back to long-term memory: *"remember this workflow for next time."* Same idea, different storage layer.

This is the same pattern as everything else in this book: **describe the outcome; the agent handles the mechanics.** You don't write configuration. You don't memorize Markdown frontmatter syntax. You don't have to know what fields a skill takes. The agent already knows; it reads the project's other skills as a reference if it's unsure.

For non-engineers this is the *only* flow you need. The conversation is plain English. The skill is plain English. Nothing about it requires you to write code.

> **In other tools.** The "skill" concept is still maturing across agents. Claude Code skills (the `SKILL.md` format used here) are the most fleshed-out at the time of writing. Codex and OpenCode have similar reusable-procedure mechanisms with different file formats; Cursor and Windsurf lean more on rules-files than on intent-triggered skills. The *pattern* — capture a named procedure from a conversation — transfers either way.

## Anatomy of a skill

You'll skim a lot of `SKILL.md` files. Knowing the parts helps you read and tweak them.

```markdown
---
name: ship-pr
description: Create or update a PR, then babysit it to green. Pushes
  pending changes, opens a PR if none exists, waits for CI, and
  iterates on AI code-review comments... Triggers on "ship this",
  "push and monitor the PR", "take this PR to green"...
---

# ship-pr

End-to-end PR shepherd: push → open/update PR → monitor CI → resolve
AI review comments → notify when mergeable.

## When to use
...

## When NOT to use
...

## Workflow
### Step 1 — ...
### Step 2 — ...
```

Four parts matter:

**The `description`** is the agent's matcher. When you type *"ship this PR"*, the agent reads every skill's description and picks the one whose trigger phrases overlap. A weak description (*"Helps with PRs"*) doesn't fire. A strong description names the trigger phrases explicitly, the way `ship-pr`'s does. If your skill never seems to load when you'd expect it to, the description is almost always the culprit.

**Instructions** are the procedure. Steps. Branches. Bash blocks. Whatever the agent needs to follow the path.

**Examples** make the procedure concrete. Real input, real output. Skills with at least one worked example fire more reliably than skills without one.

**"When not to use this"** is the part beginners skip and that does the most work. It tells the agent — and your future self — when *not* to load the skill. `ship-pr` says don't use it for local-only work or branches not meant for review. Without that, the skill fires on the wrong things and people stop trusting it.

The agent will draft all four sections from your conversation. Your one editing pass is mostly tightening the `description` (so it triggers right) and adding to "when not to use this" (so it doesn't over-fire).

## Two shapes of skill

People imagine all skills look the same. They don't. Two real shapes worth recognizing, with real examples on either side of the engineer/non-engineer line:

### Shape 1 — Procedure with hard rules

The most common shape: a step-by-step procedure interleaved with **explicit hard rules** that came from user feedback. Three real examples, one engineer-flavored and two business-flavored.

**`ship-pr`** (engineering). Steps: push the branch, open or update the PR, watch CI, resolve AI review comments, notify when mergeable. Hard rules from feedback: *"the AI reviewer thread is the audit trail; silent dismissal is forbidden — every comment gets a reply or a fix"*, *"never `--no-verify` unless the user explicitly asks"*, *"do not force-push to `main`/`master`"*. Triggers on *"ship this"*, *"take this PR to green"*, *"push and monitor the PR"*.

**`reconcile-stripe`** (finance ops). Steps: read the Stripe export from the `~/Downloads/stripe-<YYYY-MM>.csv` file, read every PDF invoice in `Drive/Finance/Invoices/<YYYY-MM>/`, match by customer and amount, produce `reconciliation-<YYYY-MM>.md` grouped by customer with mismatches at the top. Hard rules from feedback: *"a Stripe charge and an invoice can be matched if their dates are within ±2 days — anything wider, flag it"*, *"never auto-create a Stripe line for an invoice with no match — list it as 'unmatched invoice' and stop"*, *"the gross-amount column is 'Amount', not 'Net'"*. Triggers on *"reconcile this month"*, *"run the monthly reconciliation"*.

**`brand-voice`** (marketing). Loads on any drafting task — blog post, landing-page copy, social caption, Threads reply. Hard rules from feedback: *"no exclamation marks anywhere"*, *"never use 'leverage' as a verb — say 'use'"*, *"contractions are fine in Threads and email; never in board docs or investor updates"*, *"don't open a paragraph with 'In today's…'"*. Triggers on any draft request, but quietly — it loads alongside whatever else is happening, not as the main skill.

Notice that all three have the same shape, even though one ships code and two never touch a repo. A procedure plus the small list of *don't-redo-this* rules you accumulated the hard way. Leave the receipts in — *"(user feedback: …)"* — so the agent treats them as facts, not as suggestions it could helpfully improve on next time.

This is the shape most skills will end up being.

### Shape 2 — Policy as skill: `i18n-reviewer`

The `i18n-reviewer` skill at `.claude/skills/i18n-reviewer/SKILL.md` is a different beast: it encodes **policy**.

Some of the rules are technical (run the lint scripts, fail CI on missing keys). Others are not technical at all — they're legal and inclusivity decisions the company made:

> *Never use "State" alone in a US address form. Use "State/Territory" — the list must include Puerto Rico, Guam, the US Virgin Islands, American Samoa, and the Northern Mariana Islands.*
>
> *Any user-facing string must have a Spanish translation present before the build can ship to a market that includes Puerto Rico. Missing Spanish strings fail the review.*
>
> *Never use the term "master/slave" anywhere in UI copy, comments, or commit messages. Use "primary/replica" or "leader/follower".*

Those aren't coding rules. They're *business* rules — Puerto Rican users are US persons the product serves, "State/Territory" is what they expect to see, Spanish-language parity is what makes the product usable for them, and accessibility/inclusivity guidelines forbid the legacy terminology. Without the skill, the agent might fix a translation bug and accidentally introduce a label that gets the company a customer complaint or a regulator letter. With the skill, the agent loads the rule before it touches any region-related copy.

This shape is the strongest argument for skills as a serious part of how teams work, not just an engineering nicety. **Policy is enforceable.** A skill is the enforcement layer.

## Where skills should live

Two places. Choose deliberately.

**User-level (`~/.claude/skills/`)** — travel with you across every project on your machine. Good for skills that don't depend on a specific repo or workspace: `ship-pr`, `gemini-chat-and-search`, `brand-voice` (because your voice rules apply wherever you draft), generic research and PR-shepherding patterns.

**Project-level (`.claude/skills/` in the repo)** — committed alongside the code, or alongside the team's shared workspace. Travel with the team. Anyone who clones the repo (or opens the shared folder) gets the skill. Good for anything that's *about this codebase or this team's work*: `reconcile-stripe`, `i18n-reviewer`, `deployment` runbooks, the finance team's month-end procedures.

The rule of thumb: **if a teammate cloning the repo should inherit it, it's project-level. If only you should have it, it's user-level.** When in doubt, project-level — that's where the team's accumulated knowledge compounds.

## A short checklist for a skill that actually fires

After the agent drafts your skill, do a one-minute pass:

- **`description` names the trigger phrases.** Not "helps with X" — the actual things you'd say out loud when you want it.
- **A "when NOT to use" section exists.** Even if it's two lines.
- **The hard rules from your corrections are in there, with the receipts.** The "we tried, it didn't work, don't redo it" notes are the highest-value content.
- **It says where it lives** (user vs. project) and you committed it to the right place.
- **You ran it once and watched it fire.** A skill you never invoke is dead code.

That's it. You're done.

## The takeaway

- You don't hand-write skills. Two flows: **search first** (someone may have written it) and **write-from-conversation** (the agent drafts `SKILL.md` from your session).
- Four parts of a skill: a `description` that names trigger phrases, the procedure, examples, and "when *not* to use this". The last one is the one beginners skip and that does the most work.
- Two real shapes: *procedure with hard rules* (`ship-pr`, `reconcile-stripe`, `brand-voice`) and *policy as enforcement* (`i18n-reviewer`). Skills don't all look the same, but most of yours will fit the first shape.
- User-level for things that travel with you. Project-level for things that travel with the team. Project-level is the default.
- One-minute checklist before you call a skill done: trigger phrases named, "when not to" filled in, hard rules preserved with receipts, committed to the right place, invoked at least once.

## Try it yourself

Take the skill candidate you identified at the end of Ch. 18. In a session where you just did the task (or a fresh session after recreating it), say:

> *"Write me a skill that captures what we just did. Include the corrections I had to give you, and add a 'when not to use this' section. Save it as `.claude/skills/<name>/SKILL.md`."*

Read what it produces. Tighten the `description` so the trigger phrases match how you'd actually phrase the request. Run it once.

**You'll know it worked when** you can open a fresh session, say the trigger phrase, and watch the agent invoke the skill on its own — without you having to mention the skill's name.

*If you don't have a session of your own to mine*: the book repo ships a fake session transcript at [`examples/ch-17-session-transcript/`](/examples/ch-17-session-transcript/) where the agent got corrected four times while drafting a weekly team update. Drop it into a fresh agent and run *"I just had this session [paste]. Write me a skill that captures what we did, including the corrections."*

## What's next

Part V picks up the workflow stories by role — engineering, data, PM/design/ops, and personal. Pick the chapter that fits how you work; the patterns reinforce each other across roles.
