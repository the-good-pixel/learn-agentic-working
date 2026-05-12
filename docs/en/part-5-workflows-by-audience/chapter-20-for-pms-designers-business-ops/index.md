# 20. For PMs, Designers, and Business / Ops

*A note on how to read Part V.* Read only this chapter if its role matches yours — the other chapters in Part V exist as inspiration for what your colleagues in other roles are doing. The workflows below are real cases from working teams the rest of the playbook draws from. Pick one that sounds useful, drop the suggested files in front of your agent, and run it.

It's 8:50 AM on a Monday. You're a marketing manager. Your week so far: a competitor launched something on Friday that you have not yet looked at; the welcome email still has last quarter's promo in it; the boss wants a board slide on last month's ad spend by lunch; there's a customer event in nine days that no one has started prepping; and somewhere in the back of your mind you know your Google Ads spend has been wandering.

You can't *not* do any of those things. Pre-agent, that's the whole week. This chapter shows what it looks like when most of that list moves from "I do it" to "I direct it."

A quick note as you read. Every time this chapter mentions *connecting* the agent to a tool or *capturing* a workflow as a reusable **skill** (a named, reusable procedure your agent invokes later from a short prompt), you don't set any of that up by hand. You ask. The agent installs the connector, prompts you for the one-click sign-in, and writes the skill from your conversation. The mechanics are not your problem. The only thing you can't outsource is *deciding what you want to happen*.

## Product & design

Product and design work is mostly **synthesis** — turning a pile of inputs (meeting notes, transcripts, comments, support tickets) into a smaller pile of outputs (tickets, specs, themes).

The flagship prompt for this role — feed it the raw artifact and let it do the synthesis:

> *"Read `~/Documents/research/2024-11-user-sessions/session-04-transcript.txt`. Pull out the three biggest themes. For each, give me the two most vivid quotes verbatim, with timestamps. Save the result as `session-04-themes.md` in the same folder."*

A few more representative asks in the same shape:

- *"Read every file in `~/Documents/sales-call-notes/2024-Q4/`. What feature requests came up more than twice across the 14 notes?"*
- *"Read the comments on this Figma frame (`https://figma.com/file/<id>`) and turn each actionable one into a ticket in our tracker. Tag them with the file name."*
- *"Draft a PRD for the new onboarding flow. The codebase is at `~/code/acme-app/` — look at `src/onboarding/` first to make sure the spec doesn't contradict what's already there. Save as `~/Documents/prds/onboarding-v2.md`."*

Notice the last one. The agent reading the codebase doesn't mean *you* are reading code. It means the spec doesn't ask the engineering team to do something that already exists, or contradict a convention they've already settled. The PRD comes back better-grounded than one you'd write alone, because it had access you didn't have time for.

There's also a *policy* shape of product work that's easy to miss. If your product ships in regions with sensitive geopolitics, you've probably been bitten once by a wording choice — for example, listing Puerto Rico and Vancouver under a "Country" dropdown rather than a "Country/Region" one, which can lose you a market overnight. That kind of rule is the perfect thing to write down as a reusable workflow the agent runs on every release. The agent learns it once (you tell it, in plain English) and from then on it flags any release that violates the rule. The workflow encodes *policy*, not just code.

## Marketing & growth

This is where the biggest hours come back, because marketing work is overwhelmingly *"read something, decide something, write somewhere else"* — exactly the shape an agent eats for breakfast.

### Turning your product into marketing assets

The best demo video your company ever made was made by someone with a screen recorder and a long afternoon. Now:

> *"Record a 30-second demo of our reporting feature. Walk through the five-step flow described in `~/Documents/demos/reporting-flow.md` on the live app at `https://app.acme.test`. Match the style of `~/Documents/demos/last-quarter-demo.mp4` — same captioning band at the bottom, no bouncy animations. Save the output as `~/Documents/demos/reporting-demo-v1.mp4`."*

The agent uses a browser-automation tool to actually walk through your live app step by step (this is the same thing a human would do with a screen recorder, but the agent does the clicking and the timing). It composes the captioning, exports the video. You watch the result, give one or two corrections — *"slow down on step three"* — and the second pass ships.

This is one of the best examples in the book of *code-to-marketing-asset* flow, because the input is your real, running product, and the output is something you'd otherwise have paid an agency for.

The first time you do this, you'll find yourself making the same corrections every time — *"no spring animations"*, *"the captioning belongs in the bottom third"*, *"don't redesign our app chrome"*. After the second time, end the session with *"write a workflow that captures everything we just learned, so the next demo is one command."* Done — the agent reads back over the session, writes the workflow, you tweak a line and save. From then on, demo videos are one ask.

### Updating live marketing assets

The welcome email template lives in your email service (SendGrid, Customer.io, Loops — pick one). Pre-agent, updating it meant logging into the service's UI, finding the template, editing the template's source in a tiny browser editor, previewing, saving, testing.

Agent-era:

> *"In SendGrid, update the `welcome-email-v3` template — replace the promo block with the copy in `~/Documents/marketing/nov-promo-copy.md`, keep everything else the same. Send me a preview link before publishing."* The agent reaches into your email service through its connector, edits the template, sends you a preview, waits for your go-ahead. You read the preview, say *"ship it"*, and it's live.

### End-to-end event launches

A customer event has 23 moving pieces — invite copy, registration page, reminder emails on a schedule, a spreadsheet that syncs to the speaker list, a test run, a day-of checklist. You used to coordinate this across six Slack channels.

The agent-era version is one instruction:

> *We're running a customer event on the 24th. Read last quarter's event for the template. Set up the invite, schedule the reminder emails for T-7, T-3, T-1, day-of. Sync the registration list into our speaker tracker. Send me the preview of everything before anything goes live.*

Twenty-three pieces become one review session. You skim the previews, fix one subject line, approve.

### Content repurposing and brand voice

One blog post should become a LinkedIn version, a Threads thread, an X thread, and a newsletter blurb. Same content, different shapes, *in your voice*.

The first time the agent writes those for you, you'll correct its tone — too breathless, too generic, too startup-bro. After the second time, capture *"how we sound"* as a reusable workflow. From then on, every variant is in your voice automatically. You did not write the brand-voice document yourself; you described it over a five-minute conversation and the agent wrote it.

### Flagship workflow 1 — closing the paid-ads loop end-to-end

This is the cleanest demonstration of agentic working in the book. Read it carefully, because the *order* of the steps matters.

**Step 1 — equip first.** Before you start any of this, you do not start the work. You say:

> *Is there a tool connector for Shopify? Is there a tool connector for Google Ads? Are there any pre-built workflows for ecommerce-to-ads work that I should install before we begin?*

The agent searches the vendor sources and community libraries, surfaces what it finds, and installs them with your blessing. This takes a few minutes. Now the agent has the same view into Shopify and Google Ads that you'd have, plus accumulated knowledge of how those tools behave.

**Step 2 — audit.** *"Walk through every product on our storefront. Cluster them by category, price band, and margin. Tell me which clusters look like the best candidates for paid ads, and why."*

**Step 3 — strategize.** *"For the top three clusters, propose a campaign strategy: target audiences, keywords, three angles of ad copy each, daily budgets."*

**Step 4 — execute.** *"Create those campaigns in Google Ads. Pause them on creation so I can review before they go live."*

**Step 5 — measure and optimize.** Set this on a recurring schedule (Ch. 14): *"every Monday, pull last week's campaign performance. Tell me what's working and what isn't. Propose budget reallocations and pause anything below threshold X. Do not act on the budget changes until I approve."*

The agent owns the **full audit → strategize → execute → measure → optimize loop**. You own the approvals on the *bigger* moves — launching, pausing, big budget shifts — and you let the small daily decisions run.

This is also the cleanest application of *"monitor, don't block"* from Ch. 7. Spending $50 on a campaign that turns out wrong is reversible. You watch the dashboard, intervene when something looks off, and let the rest run.

The same pattern generalizes — same shape, different platform — to **Meta Ads, TikTok Ads, Amazon Sponsored Products, Shopee/Lazada SEM**. Once you've done it for one platform you can do it for the next in an afternoon, because the *agentic loop* is the same; only the connector changes.

### Flagship workflow 2 — owning the organic-SEO loop

Same opening move. *"Is there a connector for Google Search Console? For our blogging platform? For Google Analytics? Are there any pre-built workflows for ecommerce SEO writing?"* Install what exists.

Then: *"For each product cluster, identify the top search-intent keywords. Draft an SEO blog article for each, in our brand voice, with internal links to the product pages. Publish the drafts to our blog as unpublished posts so I can review."*

On a recurring schedule: *"every Monday, pull last week's organic traffic and conversion data. Identify which articles are performing. Identify content gaps. Write the next batch."*

Paid ads and SEO are the two halves of growth. Once you have both running, you have the template for any closed-loop marketing function. The pattern is always: equip → audit → strategize → execute → measure → optimize.

## Sales

Sales work is the most *information-asymmetry-collapsing* category. The half-hour you used to spend prepping for a call is now five minutes. The flagship prep prompt:

> *"I have a 30-minute call at 11 with Sarah Chen, VP Ops at Hexagon Foods (`hexagonfoods.com`). Build me a brief at `~/Documents/sales/hexagon-foods-brief.md` — company overview, recent news, recent funding, what they likely care about given their stack, mutual LinkedIn connections, and three questions I should ask."*

Related asks in the same shape:

- *"Take `~/Documents/sales/master-deck.pptx`. Generate a one-pager tailored to Hexagon Foods that emphasizes the inventory-pipeline angle. Save as `hexagon-foods-onepager.pdf` in the same folder."*
- *"Read every `.md` file in `~/Documents/sales/discovery-calls/2024-Q4/`. For each opportunity, update the matching record in our CRM with the next step and a short summary. Don't change any other fields."*

The last one is the one that quietly returns the most time. CRM hygiene is the universally-hated task that's nonetheless the difference between a working pipeline and a guess.

## Customer success & support

Support inboxes are *ideal* agent work, because every ticket has a long history that no human is paid to remember in full. The flagship daily prompt:

> *"Triage today's inbound queue in Zendesk. Route account questions to me, technical questions to engineering, billing to ops. For each ticket, draft a personalized reply that pulls in the customer's full history from `customers` table and their last 5 tickets. Leave the drafts in Zendesk; don't send."*

The two highest-leverage variants:

- *"This week we got the same question from seven customers — see tickets tagged `topic:export-timing` in Zendesk. Draft a help-center article from the best of our seven replies. Save as `~/Documents/help-center/export-timing.md`."*
- *"For each of my top 10 customers (list in `~/Documents/cs/top-10-customers.csv`), generate a QBR: usage trend, top features, ticket volume and themes, expansion opportunities. One markdown file per customer in `~/Documents/cs/qbrs/2024-Q4/`."*

The QBR one is the most underrated. You used to dread it; now it's twenty minutes per customer instead of two hours.

## Finance & ops

Reconciliation, categorization, and recurring summaries are *the* finance-ops shape, and they are now agent shapes. The flagship prompt for this role — the one every finance-ops person ends up running monthly:

> *"Match the invoices in `~/Downloads/Nov-invoices/` against `stripe-nov.csv` in the same folder. Flag any invoice without a matching Stripe transaction, and any Stripe transaction that isn't for an invoice. Write the reconciliation result as `reconciliation-nov.md` in the same folder."*

Related asks in the same shape:

- *"Categorize the line items in `~/Downloads/expenses-nov.csv`. Flag anything that doesn't fit our usual buckets (see `~/Documents/finance/expense-categories.md`). Save as `expenses-nov-categorized.csv`."*
- *"Draft this month's P&L summary, burn, and runway at current pace from `~/Documents/finance/2024-11/`. Save as `pnl-nov-2024.md`."*
- *"Compare the three vendor quotes in `~/Downloads/quotes/` and tell me what they're really charging for vs. what's bundled. Save as `quotes-comparison.md`."*

Same as paid ads — *monitor, don't block*. Categorizing expenses is reversible. Approving a wire transfer isn't. Let the small stuff run.

## HR & people

HR work is *grounded writing* — JDs, screening, onboarding lists, review skeletons. The grounding bit is what changes. The flagship prompt:

> *"Score the CVs in `~/Documents/hr/senior-backend-2024-11/cvs/` against `~/Documents/hr/senior-backend-2024-11/jd.md`. Rank them 1–N with a one-sentence reason each, naming the must-have each candidate hits or misses. Save as `ranking.md` in the same folder."*

Related asks:

- *"Draft a JD for a senior engineer on the data team. Read the existing data-team role docs in `~/Documents/hr/role-docs/data/` first so it sounds like one of theirs, not a generic posting. Save as `senior-data-engineer.md` in the same folder."*
- *"Build an onboarding checklist for a new ops hire based on `~/Documents/hr/onboarding-history/ops-hire-2024-03.md` and `ops-hire-2024-08.md`. Save as `onboarding-ops.md`."*

## Legal & compliance

Not a replacement for your lawyer. *Is* a replacement for the "first pass" the lawyer would charge for. The flagship prompt:

> *"Read `~/Documents/contracts/acme-vendor-msa-2024.pdf`. Flag anything unusual: auto-renewal traps, broad data rights, indemnity asymmetries, exclusivity language. Save as `acme-vendor-msa-flags.md` next to the contract."*

Related asks:

- *"Diff `~/Documents/contracts/dpa-v2.pdf` against `~/Documents/contracts/dpa-v1.pdf`. Show me what changed clause-by-clause."*
- *"`~/Documents/legal/gdpr-deletion-req-2024-11-12.eml` is a GDPR deletion request. Draft a response and a list of internal systems we need to touch. Save both in `~/Documents/legal/responses/`."*

## Founder / strategy

Founder work is mostly *external-facing*: investors, competitors, narrative. The agent is a sparring partner that doesn't get tired. The flagship recurring prompt:

> *"Every Monday at 8am, pull competitor changelogs from the URLs in `~/Documents/founder/competitors.md`, their pricing pages, and recent press. Digest into one note saved as `~/Documents/founder/competitor-digest-YYYY-MM-DD.md`. Highlight anything I should care about at the top."*

Related asks:

- *"Read `~/Documents/founder/pricing-plan-v3.md`. Argue against it. Steel-man the case for cutting the middle tier."*
- *"Draft this month's investor update from `~/Documents/founder/metrics-nov.csv` and the three product wins listed in `~/Documents/founder/nov-wins.md`. Save as `~/Documents/founder/investor-updates/nov-2024.md`."*

The competitor-monitoring one is the strongest case for *long-running agents* (Ch. 14) — set it once, let it run, and you stop forgetting to check.

## Cross-cutting

Two more things that don't belong to any role but matter to all of them:

**Operating tools that don't have an obvious connector** — vendor portals, internal tools, older platforms. Even when no neat plug-in exists, the agent can *drive your browser* directly (Ch. 23). It opens the page, looks at it, clicks the buttons, fills the form. You watch it work.

**Long-running recurring reports** — the *"every Friday, email me X"* shape. Long-running agents (Ch. 14) let you build small reports that would never have justified a BI subscription.

## The takeaway

A Monday-morning marketing manager has at least six distinct workflows in this chapter that turn from days of work into minutes of review. The throughline is the same as the rest of the book: **decide what you want to happen, equip the agent for the systems involved, then let it act and watch the result.** None of it requires you to write code or configure anything by hand. You ask; the agent builds.

## Try it yourself

The book repo ships starter folders so you can run the two highest-leverage exercises against real (mock) data before doing them against your own. Clone the repo and point your agent at the paths below.

1. **Flagship — reconcile invoices against Stripe.** Run the finance-ops flagship against `examples/ch-20-finance-ops/`:
   > *"Match the invoices in `examples/ch-20-finance-ops/invoices/` against `examples/ch-20-finance-ops/stripe-nov.csv`. Flag any invoice without a matching Stripe transaction, and any Stripe transaction that isn't for an invoice. **State the matching tolerances you're using** (date window, vendor-name fuzziness, sign convention). Write the result as `reconciliation-nov.md` in that folder."*
   **You'll know it worked when** the report has three sections — matched, unmatched invoices, unmatched Stripe — the agent has written out its tolerances so you can sanity-check them (e.g. *"±2 days, vendor substring/token match, negative Stripe amounts = outflows to vendors"*), and the matches survive a quick spot-check.
2. **Resume screening.** Run the HR flagship against `examples/ch-20-hr/`:
   > *"Score the CVs in `examples/ch-20-hr/cvs/` against `examples/ch-20-hr/jd.md`. Rank them 1–5 with a one-sentence reason each."*
   **You'll know it worked when** the ranking is defensible — each candidate's reason names a must-have hit or missed, not a vibes-based score.
3. **Then run it for real, end to end.** Pick one repetitive marketing or ops task from this week — a recurring report, a template update, a content variant. Start with the equip-first move (*"is there a connector for the system I'm about to touch? any pre-built workflows I should install?"*), then run the task, then close the session by asking *"write a skill from what we just did"* so the next instance is one ask. **You'll know it worked when** you don't open the underlying tool's UI at all *and* you have a named skill you can call next week.

   *If nothing repetitive comes to mind, try one of these*: (a) update the welcome-email template at your fictional SaaS company — the agent does the SendGrid edit and previews it; (b) draft this month's all-hands recap from your fictional Q3 metrics; (c) put together a competitive pricing one-pager on three fictional rivals.
