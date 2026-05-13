# 5. Do you still need that "AI tool" for that?

Open your company's subscription dashboard. Or, if you don't have one, scroll through last month's credit card statement and look for anything with "AI" in the name. You'll probably find more than you remembered.

An AI analytics dashboard, $29/month. An AI sales-email writer, $49/month per seat. An AI resume screener, $79/month. An AI contract review tool, $99/month. An AI competitor-monitoring product, $39/month. An AI SEO writer, $59/month. Notion AI, $10/seat. Slack AI, $10/seat. The Gmail AI add-on. The Zoom AI summarizer. Each was a reasonable purchase at the time. Each costs less than a developer's hour. Stacked up, they're a meaningful line on your P&L — and most of them are doing the same thing in different costumes.

Here's the question this chapter is really about: now that you have a general-purpose agent, **how many of those subscriptions are you actually still using?**

## To be clear up front: this is not anti-SaaS

Before going further, the disclaimer that the rest of the chapter depends on. **This is not an argument that SaaS is dead.** Shopify is not in trouble. HubSpot is not in trouble. QuickBooks, Notion, Slack, Stripe, your bank, your CMS — all of those have great reasons to exist that have nothing to do with the AI wave. They are **systems of record**. They hold shared state. They run when you're not at your computer. They serve your customers directly. They handle persistence, multi-user collaboration, real-time updates, auth, audit logs, regulatory reporting. None of that goes away because an agent is now sitting next to you.

What this chapter is about is the **proliferating layer of point-solution "AI tools" sitting on top of those systems** — the wrappers, the dashboards, the screeners, the summarizers, the writers, the analyzers. Almost all of them exist to do **one-off or ad-hoc analytical and generative work**: summarize a thing, draft a thing, classify a thing, score a thing, compare two things. That work used to require either a human or a specialized tool. Now it's just *what an agent does*, in context, with no new subscription and no new data-handoff problem.

The reframe is:

> **Keep the system. Skip the AI wrapper layered on top of it.**

## Why the wrappers exist

These tools all came from a clean opportunity. In 2023, GPT-4 had just landed. A general-purpose chatbot was incredibly powerful in the abstract and incredibly cumbersome in practice — you had to copy data out of your tools, paste it into a chat, copy the answer, paste it back. That's the chatbot tax from Ch. 1. A startup could build a thin UI that did the copy-paste *for* a specific job — pull data from your warehouse, prompt GPT-4, render a chart — and charge for it. Reasonable business. Real value. Lots of them got built.

What changed is that **agents now do that copy-paste themselves**. The general-purpose agent you installed in Ch. 4 can:

- Open your data warehouse, your spreadsheet, your CRM, your billing tool — via MCPs (Ch. 9).
- Read the data, in context with everything else it knows about your work.
- Produce the analysis, the draft, the chart, the comparison.
- Write the result back where it belongs.

The dedicated wrapper used to be a substitute for the agent-shaped thing you didn't have yet. Now you have it.

## Concrete swaps

The most useful way to internalize this chapter is by example. For each of these, the **system stays**. Only the AI add-on or wrapper goes.

- **One-off analytics & ad-hoc reports.** Keep your data warehouse, your Sheet, your DB. Skip the AI-analytics SaaS that sits on top of it. Ask the agent: *"query the orders table for last month's revenue by region; chart it; put the chart in the weekly update."*
- **Market and competitive research.** Keep your browser, keep your Notion. Skip the $50/month AI research subscription. The agent browses, reads, summarizes, and files notes into Notion via the Notion MCP.
- **First-pass contract review.** Keep your contract repository and your lawyer. Skip the "legal AI" subscription that promised first-pass review. The agent reads the PDF and flags clauses against your template; the lawyer reviews the flags.
- **Marketing copy in your brand voice.** Keep your CMS. Skip Jasper / Copy.ai / the brand-voice AI tool. The agent learns your voice from a five-minute conversation, and that voice becomes a *skill* (Ch. 19) that fires every time you ask for copy.
- **Notion AI, Slack AI, Gmail AI add-ons.** Keep Notion, Slack, Gmail. Skip the per-seat AI upcharge on each. Your agent reads and writes those surfaces through their MCPs — same outcome, one subscription instead of three.
- **Meeting-notes AI summarizers.** Keep the transcription tool, if you need one (real-time multi-user transcription is a thing the agent doesn't replace). Skip the "AI summary" upsell layered on top. The agent summarizes the transcript whatever way you want.
- **Recurring business reports** for a small team. Keep your DB. Skip the BI dashboard subscription for a three-person team. A long-running agent (Ch. 14) runs the query each Monday and posts the chart to Slack.
- **AI lead enrichment / AI prospect researcher** for a small sales motion. Keep your CRM. Skip the per-record-enriched price. The agent browses public sources for each lead, fills the fields.

Notice the pattern. The thing being skipped is always **a layer that does one analytical or generative step**. The thing being kept is always **a system that holds state or talks to other people**.

## The actual question you should be asking

When you're tempted by yet another "AI [your job]" SaaS, the question stops being *"which AI tool should I subscribe to for this?"* and becomes:

> *"What's the thing I want to happen?"*

Then a follow-up:

> *"Could I get a general-purpose agent to do that, against the systems I already pay for?"*

If yes — and for most one-off analytical and generative work, the answer is yes — skip the wrapper.

This is also the prompt you give the agent itself. *"I'm thinking of subscribing to a $40/month AI tool that summarizes my Stripe data each week into a financial dashboard. Could you just do that on a schedule using the Stripe MCP? Show me what it would look like."* That conversation usually ends with a working scheduled report and a cancelled subscription, in about an afternoon.

## Where you genuinely still need a dedicated tool

This is the nuance that keeps the chapter honest. There are several categories where the dedicated tool is still right — and most of them are precisely *not* the "AI wrapper" pattern we just described. They are systems with reasons to exist independent of AI.

- **Real shared state.** The customers in your CRM, the orders in Shopify, the messages in Slack — these are systems with multiple writers, conflict resolution, and history. An agent acts *through* them; it doesn't replace them.
- **Real-time multi-user collaboration.** A Figma file with three people editing. A Google Doc during a meeting. Slack itself. None of these are "AI tools you'd skip"; they're collaboration surfaces.
- **Customer-facing UX.** Anything your users see and use directly — your storefront, your help center, your booking flow. Those are products, not wrappers.
- **Things that must run when your laptop is closed.** Payment processing, deliverability, monitoring, scheduled workflows the business depends on. An agent on your desktop is the wrong place for those.
- **Regulated workflows with audit obligations.** Payroll, accounting close, KYC, regulated trading. The audit trail and the controls are the point of the system; an agent collaborating *with* them is great, but the system stays.
- **Specialized models genuinely better than the general one.** The transcription engine that's two orders of magnitude better than a general-purpose model at meeting transcription. The OCR that handles your specific document format. These are the *narrow tools that are actually better*, not the wrappers that just call GPT under the hood.

The test is simple. Ask: *what would still be there if every AI model in the world disappeared tomorrow?* If the SaaS would still be useful — your bank, your CRM, your transcription tool, your CMS — keep it. If the SaaS would be a hollow UI with nothing inside — the "AI analytics" dashboard, the "AI screener", the "AI writer" — that's the layer this chapter is about.

## Practical: how to actually trim

If you want to do this for real this week, here is the cheapest possible audit, which you can largely hand to the agent:

1. **List your AI subscriptions** — anything billed under an AI / GPT / Copilot / Intelligence / Assistant brand, plus the AI upcharges on tools you already pay for (Notion AI, Slack AI, etc.).
2. **For each, write one line** describing the *single job* you actually use it for. If you can't write that line cleanly, you're not really using it.
3. **For each job, ask the agent**: *"could you do this against the system the data already lives in? Show me what it would look like."* Watch the demo.
4. **If the agent's version is acceptable**, cancel the subscription. If it isn't, keep the tool — but now you know *why* you're keeping it.

You'll usually trim 30–60% of the list and find one or two surprising keepers, where the dedicated tool is genuinely better than the agent for that specific job. That's a useful outcome both ways.

## The takeaway

- Keep the systems of record. Skip the AI wrappers layered on top.
- Most "AI [job]" SaaS exists to do **one-off analytical or generative work**. That's exactly what a general-purpose agent does, in context, with no new subscription.
- The rule of thumb: *one-off and ad-hoc → use your agent. Sustained, multi-user, shared-state → keep the SaaS.*
- The audit question stops being *"which AI tool should I buy?"* and becomes *"what do I want to happen, and could the agent do it against the systems I already pay for?"*
- The exceptions are real and small: real shared state, real-time collab, customer-facing UX, things that run while you're asleep, regulated audit trails, genuinely specialized models. Keep those.

## Try it yourself

Open your last month's company card statement, or your own. Pick **three** line items where the product has "AI" in its name or is an AI upcharge on a tool you already use.

If you don't have a statement handy right now (or you'd rather practice on safe data first), the book repo ships a fictional one at `examples/ch-05-ai-subscriptions/card-statement.pdf` — a one-month company card (2 pages, ~85 line items) including a planted teaching moment where an AI upcharge costs more than the underlying tool. Run the same audit against it before you run it against your real statement.

For each one, write:

```
What I use it for in one line: ____________________
The system the data lives in: ____________________
Could the agent do this against that system? Y / N
```

For at least one of the three, run the experiment: ask the agent to do the job for you, against the original system, in front of you. If it works, cancel the subscription.

**You'll know it worked when** you've cancelled at least one AI subscription you were paying for, *and* you can name one AI tool you decided to keep with a clear reason — not by default, but because the agent genuinely couldn't replace it. Both outcomes are wins; the goal is intent, not minimalism.

## What's next

That's the end of Part I. You now have the mental model (Ch. 2), the lay of the land (Ch. 3), a working first task under your belt (Ch. 4), and a clear-eyed view of where agents fit relative to the rest of your stack (this chapter). Part II is the 60 minutes of setup that turn this from a one-off into a daily habit — installing your agent properly, deciding how much to trust it by default, teaching it who you are, and equipping it with the right MCPs.
