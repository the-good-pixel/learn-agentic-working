# 23. For Business / Ops

*A note on how to read Part V.* Read only this chapter if its role matches yours — the other chapters in Part V exist as inspiration for what your colleagues in other roles are doing. The workflows below are real cases from working teams the rest of the playbook draws from. Pick one that sounds useful, drop the suggested files in front of your agent, and run it.

It's 8:50 AM on a Monday. Pick the role that matches you. You're a finance lead with a board pack due Wednesday and a reconciliation that never quite balances. You're a customer-success manager staring at a queue of 47 unread tickets, three of them tagged "urgent" from last Friday. You're an ops lead with three vendor contracts to read, a quarterly headcount-plan to draft, and a finance question from the CEO that you don't yet know how to answer. You're a sales lead who needs a weekly progress report by lunch and has six "should follow up this week" deals nagging at the back of your mind.

You can't *not* do any of those things. Pre-agent, that's the whole week. This chapter shows what it looks like when most of that list moves from "I do it" to "I direct it."

A quick note as you read. Every time this chapter mentions *connecting* the agent to a tool or *capturing* a workflow as a reusable **skill** (a named, reusable procedure your agent invokes later from a short prompt), you don't set any of that up by hand. You ask. The agent installs the connector, prompts you for the one-click sign-in, and writes the skill from your conversation. The mechanics are not your problem. The only thing you can't outsource is *deciding what you want to happen*.

## Sales

Sales work is the most *information-asymmetry-collapsing* category in the business. The half-hour you used to spend prepping for a call is now five minutes. The half-day you used to spend writing a weekly status report is now ten minutes of review.

**Pre-call prospect briefs.** The flagship prep prompt:

> *"I have a 30-minute call at 11 with Sarah Chen, VP Ops at Hexagon Foods (`hexagonfoods.com`). Build me a brief at `~/Documents/sales/hexagon-foods-brief.docx` — company overview, recent news, recent funding, what they likely care about given their stack, mutual LinkedIn connections, and three questions I should ask."*

**Weekly sales progress report from email + CRM.** The end-of-week ritual:

> *"Read my Sent and Inbox emails from this week, plus the deals I've updated in HubSpot. Draft a one-page weekly sales report for our team meeting: deals progressed, deals stalled, expected close this month, blockers I should flag. Save as `weekly-sales-<date>.pptx` ready to drop into the slide deck."*

The first time you do this you'll spot one or two things you'd actually forgotten about. By the third week the report writes itself in your voice.

**Deal status summary from email + CRM.** When you wake up on Tuesday and can't remember which deals need a nudge:

> *"For each active deal in HubSpot 'Negotiation' stage, find the most recent email thread with that customer, summarize what stage of the conversation it's at, and tell me which deals need a follow-up this week. Save as `negotiation-deal-status.xlsx`."*

**AI prioritization of who to reach out to.** The Monday-morning "where do I aim my hours" question:

> *"Given my pipeline in Salesforce, my recent email threads, and last week's call notes in `~/Documents/sales-calls/`, give me a ranked list of the 5 prospects I should reach out to this week, with a one-sentence reason and a suggested opening line for each. Save as `priority-outreach-<date>.docx`."*

The pattern across all four is the same: the agent reads *across* email + CRM + your notes folder simultaneously, which no human salesperson can do quickly. The synthesis is the win, not the writing.

## Customer success & support

Support inboxes are *ideal* agent work, because every ticket has a long history that no human is paid to remember in full.

**Triaging the inbound queue.** The flagship daily prompt:

> *"Triage today's inbound queue in Zendesk. Route account questions to me, technical questions to engineering, billing to ops. For each ticket, draft a personalized reply that pulls in the customer's full history from `customers` table and their last 5 tickets. Leave the drafts in Zendesk; don't send."*

**Bug reproduction via browser.** The single most-valuable agent move on the support team:

> *"A user (ticket #4421) reported they can't apply a discount code on the checkout page. Reproduce the issue using a browser on our staging site (`staging.example.com`), step-by-step. Investigate what's actually broken, propose a workaround I can give them right now, and write up the root-cause for the engineering team to fix. Save the writeup as `ticket-4421-rootcause.docx`."*

The agent drives a real browser (see Ch. 26), reproduces the steps, takes screenshots, and comes back with both *"here's what to tell the customer in the next 10 minutes"* and *"here's the bug ticket for engineering"*. You used to alt-tab between Zendesk, staging, and Slack for an hour for this. It's now one prompt.

**Reviewing last week's tickets for follow-ups.** The hygiene pass nobody has time for:

> *"Pull all tickets from our help desk closed last week. For each one, decide if the resolution was complete or if it needs a follow-up (customer didn't confirm, fix was a workaround not a real fix, root-cause ticket was never filed). Save the follow-up list as `tickets-needing-followup-<date>.xlsx`."*

**Per-customer QBR generation.** The dreaded quarterly chore:

- *"This week we got the same question from seven customers — see tickets tagged `topic:export-timing` in Zendesk. Draft a help-center article from the best of our seven replies. Save as `~/Documents/help-center/export-timing.docx`."*
- *"For each of my top 10 customers (list in `~/Documents/cs/top-10-customers.csv`), generate a QBR: usage trend, top features, ticket volume and themes, expansion opportunities. One Word document per customer in `~/Documents/cs/qbrs/2024-Q4/`."*

The QBR one is the most underrated. You used to dread it; now it's twenty minutes per customer instead of two hours.

## Finance & ops

Reconciliation, categorization, and recurring summaries are *the* finance-ops shape, and they are now agent shapes.

**Flagship — reconcile invoices vs Stripe.** The one every finance-ops person ends up running monthly:

> *"Match the invoices in `~/Downloads/Nov-invoices/` against `stripe-nov.xlsx` in the same folder. Flag any invoice without a matching Stripe transaction, and any Stripe transaction that isn't for an invoice. Write the reconciliation result as `reconciliation-nov.xlsx` in the same folder."*

**Generating financial analysis reports.** The annual deep-dive that used to mean a week of building tables in Excel by hand:

> *"Read our last 12 months of monthly P&L statements in `~/Documents/finance/monthly-pl/` (PDFs from the accounting software). Produce a year-over-year analysis report covering revenue trends, gross margin shifts, expense category changes, and three things our CFO should focus on next quarter. Save as `annual-analysis-2026.docx`."*

The PDFs are the part that used to make this hard. The agent reads them directly — no re-keying, no scanning. You read its draft, push back on any numbers that look wrong, and ship.

**Dynamic dashboards.** The "I need this for the board meeting and I have an hour" workflow:

> *"Take the data in `q3-financials.xlsx` and build me a self-contained HTML dashboard with revenue by segment, margin by product line, monthly burn vs plan, and runway projection. I'll double-click it open before the board meeting. Save as `board-dashboard-q3.html`."*

A single `.html` file you double-click and open in your browser — no servers, no dependencies, no "where do I deploy this?" — is one of the most underrated agent outputs. It looks like a real BI dashboard and you didn't pay for one.

**The rest of the recurring grind.** Same shape, different deliverables:

- *"Categorize the line items in `~/Downloads/expenses-nov.csv`. Flag anything that doesn't fit our usual buckets (see `~/Documents/finance/expense-categories.docx`). Save as `expenses-nov-categorized.xlsx`."*
- *"Draft this month's P&L summary, burn, and runway at current pace from `~/Documents/finance/2024-11/`. Save as `pnl-nov-2024.docx`."*
- *"Compare the three vendor quotes in `~/Downloads/quotes/` and tell me what they're really charging for vs. what's bundled. Save as `quotes-comparison.xlsx`."*

Same as paid ads — *monitor, don't block*. Categorizing expenses is reversible. Approving a wire transfer isn't. Let the small stuff run.

## HR & people

HR work is *grounded writing* — JDs, screening, onboarding lists, review skeletons, training plans. The grounding bit is what changes.

**Screening résumés.** The flagship prompt:

> *"Score the CVs in `~/Documents/hr/senior-backend-2024-11/cvs/` against `~/Documents/hr/senior-backend-2024-11/jd.docx`. Rank them 1–N with a one-sentence reason each, naming the must-have each candidate hits or misses. Save as `ranking.xlsx` in the same folder."*

**Drafting JDs and onboarding checklists.**

- *"Draft a JD for a senior engineer on the data team. Read the existing data-team role docs in `~/Documents/hr/role-docs/data/` first so it sounds like one of theirs, not a generic posting. Save as `senior-data-engineer.docx` in the same folder."*
- *"Build an onboarding checklist for a new ops hire based on `~/Documents/hr/onboarding-history/ops-hire-2024-03.docx` and `ops-hire-2024-08.docx`. Save as `onboarding-ops.docx`."*

**Internal training program design.** The shape that used to require an L&D consultant:

> *"We're hiring 3 new junior backend engineers. Propose a 6-week internal onboarding-and-training program: what they should learn each week, which existing teammates should mentor, what artifacts they should produce, and how we'd measure they're ready to be on-call by week 7. Save as `backend-junior-training-program.docx`."*

The same shape works for any role — junior sales reps, new customer-success hires, design-team interns. You hand the agent your team's existing materials, name the bar you want them to clear, and it drafts a structured plan you edit.

## Legal & compliance

Not a replacement for your lawyer. *Is* a replacement for the "first pass" the lawyer would charge for. The flagship prompt:

> *"Read `~/Documents/contracts/acme-vendor-msa-2024.pdf`. Flag anything unusual: auto-renewal traps, broad data rights, indemnity asymmetries, exclusivity language. Save as `acme-vendor-msa-flags.docx` next to the contract."*

Related asks:

- *"Diff `~/Documents/contracts/dpa-v2.pdf` against `~/Documents/contracts/dpa-v1.pdf`. Show me what changed clause-by-clause. Save as `dpa-diff.docx`."*
- *"`~/Documents/legal/gdpr-deletion-req-2024-11-12.eml` is a GDPR deletion request. Draft a response and a list of internal systems we need to touch. Save the response as `gdpr-response.docx` and the system list as `gdpr-systems.xlsx` in `~/Documents/legal/responses/`."*

## Cross-cutting

Two more things that don't belong to any sub-team but matter to all of them:

**Operating tools that don't have an obvious connector** — vendor portals, internal tools, older platforms. Even when no neat plug-in exists, the agent can *drive your browser* directly (Ch. 26). It opens the page, looks at it, clicks the buttons, fills the form. You watch it work.

**Long-running recurring reports** — the *"every Friday, email me X"* shape. Long-running agents (Ch. 15) let you build small reports that would never have justified a BI subscription.

## The takeaway

A Monday-morning ops or finance or CS lead has at least six distinct workflows in this chapter that turn from days of work into minutes of review. The throughline is the same as the rest of the book: **decide what you want to happen, equip the agent for the systems involved, then let it act and watch the result.** None of it requires you to write code or configure anything by hand. You ask; the agent builds.

## Try it yourself

The book repo ships starter folders so you can run the two highest-leverage exercises against real (mock) data before doing them against your own. Clone the repo and point your agent at the paths below.

1. **Flagship — reconcile invoices against Stripe.** Run the finance-ops flagship against `examples/ch-20-finance-ops/`:
   > *"Match the invoices in `examples/ch-20-finance-ops/invoices/` against `examples/ch-20-finance-ops/stripe-nov.xlsx`. Flag any invoice without a matching Stripe transaction, and any Stripe transaction that isn't for an invoice. **State the matching tolerances you're using** (date window, vendor-name fuzziness, sign convention). Write the result as `reconciliation-nov.xlsx` in that folder."*
   **You'll know it worked when** the report has three sections — matched, unmatched invoices, unmatched Stripe — the agent has written out its tolerances so you can sanity-check them (e.g. *"±3 days, vendor substring/token match, negative Stripe amounts = outflows to vendors"*), and the matches survive a quick spot-check. Bonus: a careful agent will flag the two partial-pay invoices as "needs follow-up" (Stripe row roughly half the invoice total) rather than confidently mark them unpaid, and will avoid matching the trap transaction that falls outside the invoice's date window.
2. **Resume screening.** Run the HR flagship against `examples/ch-20-hr/`:
   > *"Score the CVs in `examples/ch-20-hr/cvs/` (PDFs) against `examples/ch-20-hr/jd.docx`. Rank them 1–5 with a one-sentence reason each. Save as `ranking.xlsx`."*
   **You'll know it worked when** the ranking is defensible — each candidate's reason names a must-have hit or missed, not a vibes-based score.
3. **Then run it for real, end to end.** Pick one repetitive ops or finance or CS task from this week — a recurring report, a follow-up sweep, a categorization. Start with the equip-first move (*"is there a connector for the system I'm about to touch? any pre-built workflows I should install?"*), then run the task, then close the session by asking *"write a skill from what we just did"* so the next instance is one ask. **You'll know it worked when** you don't open the underlying tool's UI at all *and* you have a named skill you can call next week.

   *If nothing repetitive comes to mind, try one of these*: (a) reconcile your fictional credit-card statement against a folder of receipts as `.xlsx`; (b) draft this month's vendor-spend roll-up from a fictional accounting export as `.pptx`; (c) put together an onboarding checklist for a fictional new ops hire as `.docx`.
