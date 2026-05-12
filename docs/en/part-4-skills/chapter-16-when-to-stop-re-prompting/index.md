# 16. When should you stop re-prompting and write a skill?

The first product demo video takes an afternoon.

You're shipping a feature on your product — an investing app, say — and you want a 20-second clip showing a new feature page for Threads. You brief the agent: drive the page with a browser-automation tool, record it, composite it with a caption bar and a synthetic cursor. The agent does it. You watch it back and give a dozen corrections — *"no spring animations, they look dated"*, *"don't put callouts in a corner card, use a full-width caption bar"*, *"don't redesign the chrome, copy what we already have"* — and after a few rounds, you have a video you can ship.

A week later you want a second video, this time for the watchlist feature. Same setup. Same corrections, *almost word for word*. The spring animations creep back in. The corner card comes back. The caption-bar font drifts.

That's the signal. You stop re-prompting and say:

> *"Write me a skill that captures this. Read what we just did. Include the rules I had to give you twice."*

The agent drafts a `SKILL.md`. You tweak two lines and save it as `.claude/skills/demo-video/SKILL.md`. The third video — the one for another feature — is one prompt: *"make a demo video for that page."* The agent picks up the skill, follows it, produces the video, doesn't need a single correction about spring animations or caption-bar placement.

That's the rule of this whole part of the book: **if you find yourself doing the same task often, or correcting the agent on the same task repeatedly, that's the signal — make it a skill.** A skill is your war-story-as-code.

This chapter is about how to spot the signal earlier than the third try.

## Three signals you've outgrown re-prompting

You don't need a perfect detector. You need three obvious tells.

**Signal 1: You've corrected the same mistake twice.**

The clearest tell. If you've ever typed *"no, I told you last time, don't do X"* — that's a skill waiting to be written. The agent isn't going to remember between sessions. The conversation ends, the context dies, and the next session starts blank. A skill is the only durable place that lesson can live.

**Signal 2: You've explained the same context twice.**

You opened a new session, briefed the agent on the project (*"we use uv not pip, our staging DB is at this host, our deploys go through Railway"*), and got going. A week later you open another new session and brief it on the *same* things. That setup briefing is a skill (often a `CLAUDE.md` entry, sometimes a domain-specific skill like `deployment` or `local-dev`).

**Signal 3: You can describe the task as a procedure with branches.**

If you can write down *"first do A, then check B; if B is X go to C, otherwise go to D"* — you have a procedure. Procedures want to be skills. Prompts are for things that aren't quite that crisp yet.

If any of those are true, stop re-prompting. Spend ten minutes on the skill. You'll get the time back the next time you need to do the thing.

## The second story: the day you lost to symlinked node_modules

You're working on a frontend project, using paired git worktrees — one for frontend, one for backend — so you can work on a ticket while another branch is still in progress. You do what feels clever: you symlink `node_modules` from the main checkout into the worktree, to avoid a five-minute `npm install`.

The dev server starts up. The page loads. But every icon renders as an empty square.

You spend a day on it. Inspect the page. Check the icon library. Suspect a font issue. Reproduce it in a smaller project. Eventually you trace it to Vite's filesystem sandbox: Vite locks itself to the project root for security, and the symlink crosses that boundary, so the icon-font asset resolution silently breaks.

Painful day. But here's the part that matters: you don't just fix it. You write a `local-dev` skill in the repo that documents the saga and instructs the agent — *and any teammate's agent* — never to symlink `node_modules` across worktrees, with a one-paragraph explanation of why.

The agent will never lose that day again. Neither will any teammate who clones the repo.

This is the **second shape** of when to write a skill. Not *"I'm doing this often"*, but *"I just lost a day to something subtle, and I never want anyone — human or agent — to lose it again."* The skill is the bug report's permanent home. Notion would lose it. Slack would lose it. A comment in the code might survive, but the agent doesn't read every comment. A skill, in the project, is the one place a passing agent will reliably find it.

## The third story: the monthly Stripe reconciliation

You work in finance ops. Every month you reconcile Stripe transactions against the PDF invoices the sales team filed in a shared Drive folder. The first month, you ask the agent to help. It does — but you spend half the session re-answering the same questions. *Which column in the Stripe export is the gross amount?* (The fourth one, "Amount", not "Net".) *Where do the invoices live?* (`Drive/Finance/Invoices/<YYYY-MM>/`.) *What should the output look like?* (A markdown report named `reconciliation-<YYYY-MM>.md`, grouped by customer, with mismatches called out at the top.) You eventually get a clean report and move on.

Month two. New session. The agent asks the same three questions. You re-answer them, a little more annoyed this time. The reconciliation gets done.

Month three, you've had enough. Before you start, you tell the agent: *"Write me a skill that does this reconciliation. Use what we did the last two months — the column names, the folder path, the report format. Include the rule that a Stripe charge and an invoice can be matched if their dates are within two days of each other, and never auto-create a Stripe line for an invoice that has no match — flag it instead."* The agent drafts `reconcile-stripe`. You read it, fix one path, save it.

Month three's reconciliation is one prompt: *"reconcile this month."* It runs. The report lands in the right folder. You spot-check it and send it on.

This is the same shape as `demo-video`, just on the other side of the building. Same signal — *"I keep re-answering the same questions"* — same fix.

## Skill as war-story-as-code

Hold those three stories next to each other:

- `demo-video` — *I caught myself making the same corrections every time. The skill is the cumulative feedback.*
- `local-dev` — *I lost a day to a subtle bug. The skill is the postmortem, lived where the next agent will trip on the same thing.*
- `reconcile-stripe` — *I kept re-answering the same setup questions every month. The skill is the briefing that should have lived somewhere permanent.*

All three are war stories. All three got encoded.

This is the angle to internalize: **skills are how an agent inherits the things you learned the hard way.** They aren't "best practices guides". They aren't "documentation". They're the small, scarred, opinionated knowledge that a teammate who's been on the project for a year has, and a new hire doesn't.

The agent is always the new hire. Every session starts fresh. A skill is what makes the new hire show up already knowing the gotchas.

## Before you write: search for one that already exists

One step worth running before you draft anything. When you've decided a task is skill-shaped, the *first* move isn't to open an empty `SKILL.md` — it's to ask the agent whether somebody already wrote the skill you're about to write. This is the *equip first, then engage* habit from Ch. 10 applied at the skill layer. The prompt is plain: *"is there a published skill for shipping PRs / drafting weekly newsletters / handling i18n in a Vue project? Check my user-level skills, this project's `.claude/skills`, and community lists on GitHub."* Half the time, the answer is yes — someone shipped a `ship-pr` or a `gemini-chat-and-search`, and you install it in one sentence. Save your skill-writing budget for the things that are *actually* about your work. Ch. 17 walks through this *search before you write* flow in full.

## "But I'm not sure it's worth a skill"

Common hesitation. Resolve it like this:

**The cost of writing the skill is low.** You don't hand-write it. You finish a session, say *"write me a skill that captures what we just did, including the corrections I had to give you"*, and the agent drafts it. You read it, tweak a line, save it. Total time: 5–10 minutes. We'll cover the exact flow in Ch. 17.

**The cost of *not* writing it is sneaky.** The same correction next week. The same lost hour debugging a thing you already debugged. The next teammate who hits the same wall. None of those are a disaster on their own; they add up.

**The risk of an over-eager skill is small.** If the skill turns out to fire too often, you edit one line in its `description` to narrow the trigger. If it turns out to be wrong, you delete the folder. There's no production risk.

The asymmetry favors writing skills. When in doubt, write it.

## What *isn't* skill territory

It's worth saying what skills *aren't*, because people over-reach:

- **Things you do once.** Don't pre-emptively write skills for tasks you haven't done yet. Skills emerge from real work, not from planning.
- **Things that change every time.** A skill captures stable patterns. If the "procedure" is different on every invocation, you don't have a skill yet — you have a one-off prompt.
- **Things that belong in `CLAUDE.md`.** Project-wide conventions (*"we use TypeScript strict mode", "all DB migrations go through this tool"*) live in `CLAUDE.md`. Skills are for *named procedures* invoked by intent, not for ambient context.
- **Things that need a new tool.** If the missing piece is *"the agent can't reach Linear at all"*, that's an MCP, not a skill.

If you remember one filter: **a skill is a thing the agent does — with steps, gotchas, and a name**. If it isn't that shape, it's something else.

## Spot the signal in real time

A practical habit: keep a one-line note in your head — or in a scratch file — labeled *"things I caught myself re-explaining"*. Add to it during the day. At the end of the week, glance at it. The items that have a tally mark next to them are skill candidates.

Don't try to write all of them. Write the one that hurt most. The next week, write the next one. Six months in, you'll have ten or fifteen skills doing real load-bearing work, and you'll have stopped re-prompting things you used to re-prompt three times a week.

For non-engineers, the signal is identical: you wrote four follow-up emails this week and the agent kept missing the "always sign off with 'best, X'" rule; the welcome-email template lives in SendGrid and you keep explaining to the agent how to find it. Each of those is a skill waiting to be written. The conversation that produces it is the same — *"write a skill that captures what we just did, in plain English"*.

## The takeaway

- The rule: **if you're doing the same task often, or correcting the agent on the same task repeatedly, write a skill.**
- Three real stories, three shapes: `demo-video` is *accumulated feedback turned procedure*; `local-dev` is *war story turned permanent warning*; `reconcile-stripe` is *the briefing that should have lived somewhere permanent*. Engineering or ops, the signal is the same.
- Skills are war-story-as-code — the small, scarred knowledge a senior teammate has that a new hire doesn't. The agent is always the new hire.
- Cost to write a skill: ~10 minutes, the agent does the drafting. Cost not to: the same correction, every week.
- Not everything is a skill. One-offs stay prompts; project-wide conventions go in `CLAUDE.md`; missing tools become MCPs.

## Try it yourself

Look back at your last week or two of work — your last few agent sessions, your sent mail, your calendar. Find one task you did *more than once* this month — even at a rough match. For that task, write down:

```
Task I repeated:                 ____________________
Corrections I gave the agent:    ____________________ (any that repeated?)
Steps with real branches:        ____________________
Verdict (skill / not skill yet): ____________________
```

**You'll know it worked when** the verdict isn't a 50/50 — you can point at one of the three signals and say *"yes, that one fired"*, or honestly say *"none of them, this is still a one-off"*.

## What's next

Ch. 17 takes you through the two flows that produce a skill — search before you write, then write-from-conversation — and dissects real skills with different *shapes*, so you can recognize which shape your candidate fits.
