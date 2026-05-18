# 22. For PMs and Designers

*A note on how to read Part V.* Read only this chapter if its role matches yours — the other chapters in Part V exist as inspiration for what your colleagues in other roles are doing. The workflows below are real cases from working teams the rest of the playbook draws from. Pick one that sounds useful, drop the suggested files in front of your agent, and run it.

It's 8:50 AM on a Monday. You're a product manager (or a designer — most of this chapter applies to both). Your week so far: research from last week's five user sessions is sitting as raw transcripts you have not yet read; a competitor launched something on Friday that you have not yet looked at; the welcome email still has last quarter's promo in it; the boss wants a board slide on last month's ad spend by lunch; there's a customer event in nine days that no one has started prepping; and the design review on the new onboarding flow is Thursday, with a PRD that still has three TBDs.

You can't *not* do any of those things. Pre-agent, that's the whole week. This chapter shows what it looks like when most of that list moves from "I do it" to "I direct it."

A quick note as you read. Every time this chapter mentions *connecting* the agent to a tool or *capturing* a workflow as a reusable **skill** (a named, reusable procedure your agent invokes later from a short prompt), you don't set any of that up by hand. You ask. The agent installs the connector, prompts you for the one-click sign-in, and writes the skill from your conversation. The mechanics are not your problem. The only thing you can't outsource is *deciding what you want to happen*.

## Product & design

Product and design work is mostly **synthesis** — turning a pile of inputs (meeting notes, transcripts, comments, support tickets) into a smaller pile of outputs (tickets, specs, themes).

The flagship prompt for this role — feed it the raw artifact and let it do the synthesis:

> *"Read `~/Documents/research/2024-11-user-sessions/session-04-transcript.docx`. Pull out the three biggest themes. For each, give me the two most vivid quotes verbatim, with timestamps. Save the result as `session-04-themes.docx` in the same folder."*

A few more representative asks in the same shape:

- *"Read every file in `~/Documents/sales-call-notes/2024-Q4/`. What feature requests came up more than twice across the 14 notes? Save the summary as `feature-request-themes.docx`."*
- *"Read the comments on this Figma frame (`https://figma.com/file/<id>`) and turn each actionable one into a ticket in our tracker. Tag them with the file name."*
- *"Draft a PRD for the new onboarding flow. The codebase is at `~/code/acme-app/` — look at `src/onboarding/` first to make sure the spec doesn't contradict what's already there. Save as `~/Documents/prds/onboarding-v2.docx`."*

Notice the last one. The agent reading the codebase doesn't mean *you* are reading code. It means the spec doesn't ask the engineering team to do something that already exists, or contradict a convention they've already settled. The PRD comes back better-grounded than one you'd write alone, because it had access you didn't have time for.

There's also a *policy* shape of product work that's easy to miss. If your product ships across regions with their own legal and inclusivity rules, you've probably been bitten once by a wording choice — for example, labelling a US address form's region field "State" instead of "State/Territory" (excluding Puerto Rico, Guam, and the US Virgin Islands), or shipping into Puerto Rico without Spanish-language strings. Either can lose you customers or earn you a complaint. That kind of rule is the perfect thing to write down as a reusable workflow the agent runs on every release. The agent learns it once (you tell it, in plain English) and from then on it flags any release that violates the rule. The workflow encodes *policy*, not just code.

## Marketing & growth

This is where the biggest hours come back, because marketing work is overwhelmingly *"read something, decide something, write somewhere else"* — exactly the shape an agent eats for breakfast.

### Turning your product into marketing assets

The best demo video your company ever made was made by someone with a screen recorder and a long afternoon. Now:

> *"Record a 30-second demo of our reporting feature. Walk through the five-step flow described in `~/Documents/demos/reporting-flow.docx` on the live app at `https://app.acme.test`. Match the style of `~/Documents/demos/last-quarter-demo.mp4` — same captioning band at the bottom, no bouncy animations. Save the output as `~/Documents/demos/reporting-demo-v1.mp4`."*

The agent uses a browser-automation tool to actually walk through your live app step by step (this is the same thing a human would do with a screen recorder, but the agent does the clicking and the timing). It composes the captioning, exports the video. You watch the result, give one or two corrections — *"slow down on step three"* — and the second pass ships.

This is one of the best examples in the book of *code-to-marketing-asset* flow, because the input is your real, running product, and the output is something you'd otherwise have paid an agency for.

The first time you do this, you'll find yourself making the same corrections every time — *"no spring animations"*, *"the captioning belongs in the bottom third"*, *"don't redesign our app chrome"*. After the second time, end the session with *"write a workflow that captures everything we just learned, so the next demo is one command."* Done — the agent reads back over the session, writes the workflow, you tweak a line and save. From then on, demo videos are one ask.

### Updating live marketing assets

The welcome email template lives in your email service (SendGrid, Customer.io, Loops — pick one). Pre-agent, updating it meant logging into the service's UI, finding the template, editing the template's source in a tiny browser editor, previewing, saving, testing.

Agent-era:

> *"In SendGrid, update the `welcome-email-v3` template — replace the promo block with the copy in `~/Documents/marketing/nov-promo-copy.docx`, keep everything else the same. Send me a preview link before publishing."* The agent reaches into your email service through its connector, edits the template, sends you a preview, waits for your go-ahead. You read the preview, say *"ship it"*, and it's live.

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

**Step 2 — audit.** *"Walk through every product on our storefront. Cluster them by category, price band, and margin. Tell me which clusters look like the best candidates for paid ads, and why. Save the cluster analysis as `product-cluster-audit.xlsx`."*

**Step 3 — strategize.** *"For the top three clusters, propose a campaign strategy: target audiences, keywords, three angles of ad copy each, daily budgets. Save the strategy as `paid-ads-strategy.docx`."*

**Step 4 — execute.** *"Create those campaigns in Google Ads. Pause them on creation so I can review before they go live."*

**Step 5 — measure and optimize.** Set this on a recurring schedule (Ch. 15): *"every Monday, pull last week's campaign performance. Tell me what's working and what isn't. Propose budget reallocations and pause anything below threshold X. Save the weekly report as `paid-ads-weekly-<date>.xlsx`. Do not act on the budget changes until I approve."*

The agent owns the **full audit → strategize → execute → measure → optimize loop**. You own the approvals on the *bigger* moves — launching, pausing, big budget shifts — and you let the small daily decisions run.

This is also the cleanest application of *"monitor, don't block"* from Ch. 7. Spending $50 on a campaign that turns out wrong is reversible. You watch the dashboard, intervene when something looks off, and let the rest run.

The same pattern generalizes — same shape, different platform — to **Meta Ads, TikTok Ads, Amazon Sponsored Products, Shopee/Lazada SEM**. Once you've done it for one platform you can do it for the next in an afternoon, because the *agentic loop* is the same; only the connector changes.

### Flagship workflow 2 — owning the organic-SEO loop

Same opening move. *"Is there a connector for Google Search Console? For our blogging platform? For Google Analytics? Are there any pre-built workflows for ecommerce SEO writing?"* Install what exists.

Then: *"For each product cluster, identify the top search-intent keywords. Draft an SEO blog article for each, in our brand voice, with internal links to the product pages. Publish the drafts to our blog as unpublished posts so I can review."*

On a recurring schedule: *"every Monday, pull last week's organic traffic and conversion data. Identify which articles are performing. Identify content gaps. Save the analysis as `seo-weekly-<date>.xlsx`. Write the next batch."*

Paid ads and SEO are the two halves of growth. Once you have both running, you have the template for any closed-loop marketing function. The pattern is always: equip → audit → strategize → execute → measure → optimize.

## Cross-cutting

Two more things that don't belong to a single sub-section but matter for the whole role:

**Operating tools that don't have an obvious connector** — vendor portals, internal tools, older platforms. Even when no neat plug-in exists, the agent can *drive your browser* directly (Ch. 26). It opens the page, looks at it, clicks the buttons, fills the form. You watch it work.

**Long-running recurring reports** — the *"every Friday, email me X"* shape. Long-running agents (Ch. 15) let you build small reports that would never have justified a BI subscription.

## The takeaway

A Monday-morning PM or designer has at least six distinct workflows in this chapter that turn from days of work into minutes of review. The throughline is the same as the rest of the book: **decide what you want to happen, equip the agent for the systems involved, then let it act and watch the result.** None of it requires you to write code or configure anything by hand. You ask; the agent builds.

## Try it yourself

The book repo ships starter folders so you can run high-leverage exercises against real (mock) data before doing them against your own. Clone the repo and point your agent at the paths below.

1. **Research synthesis.** Drop a folder of meeting-notes or transcript files (`.docx`, `.txt`) in front of the agent and ask:
   > *"Read every file in this folder. Pull out the three biggest themes across all of them. For each, quote two specific lines verbatim. Save as `themes.docx`."*
   **You'll know it worked when** the themes name something specific (a feature, a pain, a moment), not generic categories ("usability"), and each one has a real quote backing it.
2. **PRD-with-codebase-as-context.** Pick a feature you're about to spec. Point the agent at the relevant folder of your codebase *and* at any existing PRD template, and ask:
   > *"Draft a PRD for [feature]. Read `src/<area>/` first so the spec doesn't contradict existing behavior. Match the structure of `~/Documents/prds/template.docx`. Save as `~/Documents/prds/<feature>.docx`."*
   **You'll know it worked when** the PRD names at least one existing component or convention from the codebase — proof the agent actually read it — instead of writing in a vacuum.
3. **Then run it for real, end to end.** Pick one repetitive marketing or product task from this week — a recurring report, a template update, a content variant. Start with the equip-first move (*"is there a connector for the system I'm about to touch? any pre-built workflows I should install?"*), then run the task, then close the session by asking *"write a skill from what we just did"* so the next instance is one ask. **You'll know it worked when** you don't open the underlying tool's UI at all *and* you have a named skill you can call next week.

   *If nothing repetitive comes to mind, try one of these*: (a) update the welcome-email template at your fictional SaaS company — the agent does the SendGrid edit and previews it; (b) draft this month's all-hands recap from your fictional Q3 metrics as a `.pptx`; (c) put together a competitive pricing one-pager on three fictional rivals as a `.pdf`.
