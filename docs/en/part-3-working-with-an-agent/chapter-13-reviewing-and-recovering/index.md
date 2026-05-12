# 13. Reviewing and recovering

You handed the agent a real task. Twenty minutes later it comes back: *"Done. I filed 14 Linear tickets, updated three spreadsheet rows, and sent a summary email to the team. Anything else?"*

Pause. That sounds like a lot just happened. Did the right thing happen?

This is the moment most readers either over-react (panic, undo everything, vow never to delegate again) or under-react (skim the summary, hit OK, move on, discover three days later that one of the tickets went to the wrong team). The craft is in the middle.

## Trust until proven wrong — and verify

The stance is the *"monitor, don't block"* stance from Ch. 7, applied to the moment of review. You let the agent do the work because gating every step trains you to under-use the tool. But once the work lands, you owe the output a *quick, specific look* — not a rubber-stamp, not a paranoid audit.

The pattern works in three layers, from cheapest to most thorough. Most tasks only need the first two.

1. **Read the agent's summary.** What does it claim it did?
2. **Spot-check the actual artifacts.** Open the things and look. Not all of them — a sample.
3. **Ask the agent to walk you through anything that smells off.** It can show its work.

That's it. We'll unpack each.

## Layer 1: read the summary like a manager, not a stenographer

When the agent reports back, it tells you what it did. Read this the way a manager reads a status update from a junior who just got back from a task: not word-by-word, but for *anomalies*.

You're looking for:

- **Numbers that don't match what you asked for.** You said "around twenty tickets" and the summary says "forty-three." Why?
- **Scope creep.** You asked for one thing; the summary mentions three. Did the extras need doing, or did the agent invent work?
- **Hedging language.** *"I think I…"*, *"this should be…"*, *"I assumed…"* — every one of those is a flag to check.
- **Silent skips.** *"I processed 12 of the 14"* — what happened to the other two?
- **Wrong tools.** It used the Linear MCP to file tickets, when you wanted them in Jira.

If the summary reads clean and the numbers match, you're 80% of the way to "this is fine." Move to spot-checks.

## Layer 2: spot-check, don't audit

Whatever the agent produced, **open it in the place it lives** and look at one or two examples in full.

- Drafted 8 follow-up emails? Open the first one and read it end-to-end. Then open the last one (anchoring effect — agents sometimes pace themselves and get sloppier toward the end of a batch).
- Filed 14 Linear tickets? Open three at random. Check the description, the labels, the assignee, the priority. Look at one that went to a team you weren't expecting.
- Updated 47 spreadsheet rows? Sort by `updated_at` descending and eyeball the top dozen.
- Wrote a draft blog post? Read the intro and the conclusion in full. Scan the middle for paragraphs that feel hollow or generic.
- Launched an ad campaign? Open Google Ads, look at the actual campaign — budget, targeting, ad copy, status.
- Updated your welcome email template in SendGrid? Open the SendGrid UI and look at the rendered template.

Two anchors are usually enough — the first example and the most anomalous-looking one in the summary. If both are fine, the batch is almost certainly fine. If one of them is off, escalate.

This is not paranoia. This is the part of "monitor, don't block" that's still *monitor*. You watched the agent run; now you confirm what landed.

## Layer 3: ask the agent to show its work

If something looks off — or you can't tell — the next move is not to dig through logs yourself. It's to ask the agent.

> *"Why did you assign the migration ticket to the data team instead of the platform team?"*
> *"Walk me through how you decided which products to cluster in the second campaign."*
> *"That third email has a sentence about pricing — where did that come from? I never mentioned pricing."*

Modern agents keep enough of the recent context to answer these honestly, including admitting when they were guessing. The honest answers fall into a few buckets:

- **Reasonable judgment call.** Sometimes the agent made the right call from limited information. You learn what to put in the prompt next time.
- **A misread of your instruction.** A specific word triggered a different interpretation than you intended. Easy fix: clarify and ask for a redo.
- **A hallucinated detail.** The agent invented something. This is the most important one to catch, and it's why you spot-check.
- **Missing context you didn't supply.** The agent did the best it could without knowing X. Hand it X and ask it to redo.

The agent telling you *"I assumed Y because you didn't mention it"* is a gift. It surfaces the implicit assumption so you can correct it.

## Ask the agent to audit its own work — and tell it what to check

There's a move most readers miss for far too long: **review isn't only you reading the output. You can hand the agent a checklist and let *it* check itself.** The agent is genuinely good at this, and it costs you one sentence.

The trick is that *you* still have to know what the audit is. The agent won't invent the right checklist on its own — it doesn't know that your boss asked for three specific KPIs, or that this email is going to a board member, or that the source CSV had a row that looked suspicious. Your job is to name the standard. The agent's job is to apply it.

Concrete examples, across very different kinds of work:

- **Report writing.** *"Check that this report includes the three KPIs the boss asked for (DAU, NPS, churn rate). If any of them is missing, add it. If you can't find the underlying data, tell me which one."*
- **Calculations.** *"Re-add the `amount` column from the source CSV and confirm it sums to the total you reported in the summary. If the two numbers don't match, find the row that's wrong and fix it."*
- **Tone and style.** *"Re-read the email you just drafted. Is the tone formal enough for a board-level recipient? Flag any contraction or hedging language ('I think', 'maybe', 'just wanted to') that doesn't fit a board email, and rewrite those sentences."*
- **Logical coherence.** *"Read the proposal you just drafted as if you're a skeptical investor seeing it for the first time. What's the weakest claim in it? Make that claim stronger with a concrete number — or, if you can't, remove it."*
- **Coverage.** *"Compare your summary against the source document. List anything in the source that you didn't cover in the summary. For each one, tell me whether you think it should be in the summary or not, and why."*

Notice the shape. You hand the agent a *yardstick* it can hold up to its own work — "the three KPIs", "sums to the total", "tone formal enough for a board", "weakest claim", "anything you didn't cover". The agent applies the yardstick honestly because it doesn't have an ego about the work it just produced. In a fresh re-read, with a specific objective, it catches its own misses.

This is the rule worth carrying: **you don't have to do the audit yourself. You have to know what the audit *is*. Then hand the audit to the agent.**

A hands-on warm-up for this lives in `examples/ch-13-self-audit/` — a `sales-q3.xlsx` with three sheets (Orders, Customers, Product Catalog) and several deliberately wrong things planted in it. Drop the file in front of your agent and ask it to summarize. Then ask it to re-check itself against the source. Watch what happens on the second pass.

## When something is wrong — undo, revert, redirect

Modern agentic work is reversible far more often than people expect, and the right reflex when something's off is **interrupt, look, fix** — not panic.

Most agent tools give you these primitives:

- **Stop the run.** Ctrl-C, Esc, or the in-UI stop button. Free, cheap, no penalty. If the agent is going somewhere you don't want it to go, stop it. You can always resume.
- **Undo the last few turns.** Claude Code, Codex, OpenCode all support rewinding the conversation. You scrub back to before the misunderstanding and re-prompt from there.
- **Ask the agent to reverse what it did.** *"You filed those 14 tickets — close them all with a comment saying 'agent error, refiling'."* The agent does it. The MCP that wrote the data can usually unwrite it.
- **For engineers specifically: Git is your safety net.** The agent works in a git repo; every change is a diff you can `git restore` or `git checkout` away from being gone. Set up your workflow so the agent commits frequently and you can always reset to the last known-good state. *(More on this in the engineer section below.)*

A real example: the agent updated a SendGrid template and shipped a typo to the welcome email. You open SendGrid, see the bad version. You say *"revert the welcome template to the version from yesterday, then re-apply just the subject-line change."* Two minutes. Done. The blast radius was bounded; the action was reversible; you fixed it in the system it lived in.

The stance is the same: **reversible is the default, gates are the exception.** Save approval gates for the irreversible (Ch. 7).

## The doom loop, and how to recognize it

Sometimes you'll be deep in a session and the agent is making a fix, and the fix has a problem, and the next fix has a different problem, and three iterations later you have *more* breakage than you started with. The agent is confident and apologetic in equal measure. It's *trying*. It's also looping.

This is the **doom loop**, and recognizing it early saves hours.

Symptoms:

- The same kind of error keeps reappearing in different forms.
- The agent's explanations are getting longer and less specific.
- You're past the third "let me try a different approach" of the session.
- The diff (or the change-set) is bigger than the original problem warranted.
- You feel like you're managing the agent more than the work.

When you spot it, the cure is brutal and effective: **stop, throw the session away, and start fresh.**

You're not throwing away your work — you're throwing away the *confused conversation*. Save what's salvageable (the diff that was actually correct, the draft that was almost there). Close the session. Open a new one. In the new session, you state the problem cleanly, hand the agent the inputs (Ch. 11), and try again with a clear head.

Nine times out of ten, the second attempt — with a clean context window — succeeds in a fraction of the time the doom loop was eating.

## The non-engineer's playbook, end to end

If you're reviewing a draft article, a created Linear ticket, a filled-in spreadsheet, a scheduled email, a launched ad campaign, a new CRM entry — the playbook is the same:

1. **Read the agent's summary.** Note anything that doesn't match what you expected.
2. **Open the actual thing in its actual home.** Linear, Sheets, your email client, Google Ads, your CMS, your CRM.
3. **Look at one or two examples in full.** The first one and the weirdest-looking one from the summary.
4. **If something's off, ask the agent why.** Don't dig through dashboards on your own.
5. **If it needs fixing, ask the agent to fix it.** Don't open the UI and start hand-editing — that's the chatbot tax (Ch. 1).
6. **If the whole thing is wrong, ask the agent to undo it and start over with better instructions.**

Nothing about that requires you to be technical. Nothing about it requires you to read code, edit JSON, or understand what's happening under the hood. You are operating as the *editor* of the work, not the producer.

## *(For engineers: reading diffs as the safety net)*

If you're reading this as an engineer reviewing code, you have one extra tool that everyone else doesn't: the diff.

A diff makes the agent's work *legible* in a way few other deliverables are. Every line it added, removed, or changed is in front of you. Read it like you'd read a junior dev's PR:

- Scan the file list first. Is the agent changing files it had no reason to touch?
- Read the actual logic changes carefully. Skim the boilerplate.
- Look for over-correction. The agent loves to add defensive checks, type guards, and "while I'm here" refactors. Most of those are noise; some are useful. Push back on the noise.
- Run the tests. Run the build. If the agent claims it ran them, run them yourself anyway — verify, don't trust.
- Commit frequently. `git add -p` is your friend for keeping commits focused. If the diff has three unrelated changes, split them.

`git restore`, `git reset`, and `git stash` are your undo buttons. Use them liberally. There is no penalty for letting the agent try three approaches, picking the best diff, and discarding the rest.

The harder review case is when the diff is large *and correct in places, wrong in others*. The move there is not to merge-or-reject the whole thing; it's to **selectively stage** the parts that are right and ask the agent to redo the parts that aren't, with the staged context as a constraint.

## The takeaway

- Trust until proven wrong, then verify in three cheap layers: read the summary, spot-check the artifacts, ask the agent to show its work.
- Open the deliverable in its actual home (Linear, Sheets, the CMS, the inbox), not just in the chat window.
- Most agent work is reversible. Stop, undo, revert, redirect — none of these are expensive.
- The doom loop is real. When you spot it, throw the session away and start fresh.
- Engineers have an extra tool — the diff. Read it like a PR; use git as your undo.

## Try it yourself

**Exercise 1.** Hand the agent the planted-error dataset shipped with the book at `examples/ch-13-self-audit/sales-q3.xlsx` and run the two-step self-audit pattern:

> *"Summarize this workbook. Then re-check your summary against the source: per-customer anomalies, formula-consistency on `line_total`, date-format consistency, cross-sheet referential integrity between Orders, Customers, and Product Catalog — anything you'd want to double-check before sending this to the boss."*

**You'll know it worked when** the agent's *first* summary reads fine on its own — and the *second* pass surfaces multiple planted issues: Halcyon's anomalous ~$2,750 order (≈2× their typical), three rows where `line_total` is hardcoded and disagrees with `quantity * unit_price`, one row with a US-style `MM/DD/YYYY` date among ISO dates, an orphaned customer record in `Customers` with no orders, and two product names in `Orders` that don't exist in `Product Catalog`. All are invisible to a fast first-pass summary; each surfaces only when the agent applies a specific audit lens. (If the agent catches them on the first pass without prompting, that's a sharp agent — note that the *technique* still applies to longer, messier real reports.)

**Exercise 2.** The next time the agent reports back on a *real* batch task, before reading the summary in detail, open the system it acted on and look at two of the outputs in full. Then read the summary. Notice whether the summary matched what you saw.

**You'll know it worked when** you catch at least one small discrepancy (a label that didn't quite fit, a sentence that drifted from your tone, a row that was almost-but-not-quite right) that you would have missed by reading the summary alone.

*If you don't have a real batch task waiting*: brief the agent with *"create 5 throwaway Linear tickets in my personal scratch project with realistic-sounding feature requests"*, then spot-check the summary against the tickets it actually created.

**Exercise 3.** Deliberately let a session go too long until you feel friction. Save the salvageable parts, close the session, and re-run the next task in a fresh one. Time both.

**You'll know it worked when** the fresh session takes noticeably less wall-clock time than the next step of the long session was about to take.

*If you can't think of how to trigger the friction*: simulate it — pile 6+ unrelated tasks into one session ("rename these files, then draft this email, then summarize this doc, then refactor this function, then…") and feel the slowdown by the fifth.

## What's next

You can review and recover. Now we raise the stakes: Ch. 14 is about letting the agent cook for longer — background tasks, parallel work, multiple agents at once. The trust philosophy you just used here scales up to those patterns, with care.
