# The Agentic Working Playbook

**A practical, open-source playbook for getting real work done with AI agents.**

For engineers, designers, analysts, PMs, marketers, operations — anyone whose work touches a computer.

---

## Why this book exists

You've already chatted with ChatGPT or Gemini. You've asked it questions, copy-pasted its answers, maybe even gotten it to draft an email or explain a piece of code.

That's the **chatbot** mode. The AI talks; you do.

There's a different mode now: the **agent** mode. You tell it what you want done, and *it does it* — reads your files, edits them, runs commands, opens browsers, sends emails, queries databases, picks up where it left off, and shows you the result.

This book is about that mode. Not the theory of it; the daily practice of it.

We use **Claude Code** as the main running example because that's what the author uses every day. The patterns work the same way in **Codex**, **OpenCode**, **Cursor agents**, **Gemini CLI**, and whatever ships next month. Where another tool has a notable equivalent, we cite it.

---

## Who this is for

| You are… | What you'll get out of it |
|---|---|
| A **software engineer** | Stop typing every line. Delegate feature work, bug hunts, refactors, code review. |
| A **PM, designer, or analyst** | Turn tickets, meeting notes, and client feedback into shipped artifacts without waiting on a developer for every small thing. |
| In **operations, finance, HR, marketing** | Automate the spreadsheet/inbox/report grind. Build small tools you'd never have asked a developer to build. |
| **Curious but new** | Go from "I've used ChatGPT" to "I run agents that do my work" in one weekend. |

**Prerequisites:** you've used a chat AI like ChatGPT, Gemini, or Claude.ai. That's it. We'll cover everything else.

> **One promise to non-technical readers, up front.** You do not need to learn to code to get value out of this book. You do not need to write configuration files. You do not need to install things by hand. The agent does almost all of that *for* you. The throughline of the whole book is: **if you can describe what you want, you can ask the agent to do it — including setting itself up.** This is true for the agent's installation, for the files that teach it who you are, for the tools it connects to, for the reusable workflows ("skills") that it learns over time. You ask; it builds. The only piece you can't outsource is *deciding what you want to happen*.

---

## How to read this book

> **Don't try to learn all of this before you start.** Looking at a 28-chapter table of contents can be intimidating — sub-agents, parallel worktrees, multi-agent workflows, vibe coding, autonomous schedules, custom MCP servers — and the natural reaction is to think *"I need to understand all of that first."* You don't. The fastest readers do this: **read Part I, do the 10-minute first win in Ch. 4, pick one workflow from Part V that matches your day job, and just *start*.** Everything else is opt-in. You'll grow into sub-agents the day you wish you had one. You'll discover scheduled agents when a report becomes annoying. The advanced patterns will pull *you* — you won't need to push toward them. This book is a reference you can come back to, not a textbook you have to finish first.

Reading paths, depending on who you are:

- **If you're brand new**: read Part I and Part II in order, then jump to the workflow in Part V that matches your role. Skip everything else for now.
- **If you want to see what an agent can actually do first** (the "convince me before I invest in setup" path): read Part I, then skip ahead to **Part III** and your **Part V** chapter. Loop back to Part II once you're sold.
- **If you've used Claude Code or Codex a bit**: skim Part I, settle in for Part II (most people miss the setup that makes the rest easy), and treat Parts III–VI as a reference.
- **If you're rolling this out across a small team**: Part I, then Ch. 7 (trust / monitor-don't-block) and Ch. 17–18 (skills as shared institutional knowledge), then come back for the rest.

Every chapter is standalone. Code is copy-pasteable. Examples are real — drawn from actual work, not invented.

---

## Table of Contents

### Part I — Foundations

> *Read this no matter who you are. ~30 minutes.*

- **1. What changes when AI can *act*, not just *answer*?**
  The line between chatbot and agent, in three sentences. Why this shift matters as much for a marketing manager as for a senior engineer. The chapter closes by naming the **three throughlines** that run through the rest of the book:
  1. **If you can describe what you want, you can ask the agent to do it — including setting itself up.** You will not be asked to write code, edit config files, or install anything by hand. You will be asked to *decide what you want to happen*.
  2. **Equip first, then engage.** Before starting any task in an unfamiliar domain, the first move is *not* "how do I do this?" — it's "what MCPs and skills already exist for the tools involved? Install them." An equipped agent makes the work cheap; an improvising agent makes it mediocre.
  3. **Monitor, don't block.** Let the agent take real action by default and watch what it does, rather than gating every step. The exception is the small set of *big and irreversible* actions.

- **2. How does an agent actually work?**
  The single diagram that explains every agent tool: **User → Model → Orchestrator → MCP → Real tools**. We unpack each box and refer back to it throughout the book.

- **3. What's out there right now?**
  A snapshot of the landscape: terminal agents (Claude Code, Codex, OpenCode, Gemini CLI), IDE agents (Cursor, Windsurf), web/computer-use agents (Claude for Chrome, ChatGPT Agent/Operator). What each is actually good at, and where the field is heading.

- **4. A 10-minute first win**
  Install one agent, run *one* real task end-to-end, and feel the difference. No theory in this chapter — just doing. **A note before you start**: you'll see later chapters mention sub-agents, parallel worktrees, multi-agent workflows, vibe coding. **Ignore all of that for now.** You don't need any of it to get value from your first day with an agent — or your first month. The advanced patterns pull you in when you need them; they're not gates you have to walk through first. **If you have no command-line experience, read this section** — a short tutorial on what a terminal is, how to type a prompt to the agent, how to read its output, how to interrupt it, and how to quit. Five paragraphs. No prior experience assumed.

- **5. Do you still need that "AI tool" for that?**
  The thesis chapter. To be clear up front: this is **not** an argument against SaaS. Keep your Shopify, your HubSpot, your QuickBooks, your Notion, your bank — those are systems of record, with shared state, persistence, and multi-user workflows you genuinely need. What you probably *don't* need is the **proliferating layer of point-solution "AI tools"** sitting on top of each one — the $20/month AI analytics dashboard, the AI report writer, the AI brand-voice copywriter, the AI lead enricher, the AI SEO writer. A general-purpose agent, pointed at the systems of record you already pay for, replaces almost all of those. **Keep the system; skip the AI wrapper.**

  The cleaner reframe: most of those "AI tools" exist to do **one-off or ad-hoc analytical and generative work** — generate a report, summarize a thing, draft a thing, score a thing. That is exactly what your agent is for, *in context*, with no new subscription, no new login, and no new data-handoff problem.

  Concrete swaps:
  - **One-off analytics & reports** → no "AI analytics" SaaS. Agent queries your existing data warehouse / Sheet / DB and draws the chart on demand.
  - **Market & competitive research** → no $50/mo AI research subscription. Agent browses, reads, summarizes, files into Notion.
  - **First-pass contract review** → no "legal AI" subscription. Agent + the PDF.
  - **Marketing copy in your brand voice** → no Jasper / Copy.ai. Agent + a brand-voice skill (see Ch. 19).
  - **Notion AI / Slack AI / Gmail AI add-ons** → keep Notion / Slack / Gmail; skip the per-seat AI upcharge. Your agent reads and writes those surfaces through MCPs.
  - **Recurring business reports** → no BI dashboard subscription for a 3-person team. Agent runs the query and gives you the chart whenever you ask.
  - **Meeting notes "AI summarizer"** → keep the transcription tool if you need it; skip the AI summary upsell. Agent summarizes the transcript however you want.

  The question the reader walks away with: *"what's the thing I want to happen?"* — instead of *"which AI tool should I subscribe to for this?"*. We also draw the **boundary** — where you *genuinely* still need a dedicated tool (real shared state, real-time multi-user collab, customer-facing UX, anything that must run when you're not at your computer).

### Part II — Setup Once

> *The 60 minutes that save you 600. Skip at your peril — but the impatient reader can jump to Part III and come back.*

- **6. Installing your agent**
  Claude Code, Codex, OpenCode side-by-side. How to pick one (or run two). What each costs. For non-technical readers, the only step you do by hand is the *first* install — after that, **the agent does its own setup**: dotfiles, aliases, shell config, even installing additional agents if you want them. "Set yourself up nicely for me" is a valid prompt.

- **7. How much should you trust the agent by default?**
  Permissions, auto-allow, sandbox modes — but with a deliberate stance: **monitor, don't block.** Most agent guidance trains you to under-utilize your tools by gating every action; this chapter argues the opposite. Let the agent take real action by default, watch closely, and interrupt when it's going wrong. Save explicit approval gates for the small set of actions that are genuinely **big and irreversible** (prod DB writes, mass-customer sends, large financial transfers). The right heuristic isn't "could this cost money?" — it's "is this reversible? is the blast radius bounded?". Worked example: handing the agent a *readonly* Postgres role instead of an admin one (scoped credentials), so you can let it loose on queries without gating each one. **The chapter also walks through the permission types each major agent ships with**, so you know which to pick: Claude Code's `default` / `acceptEdits` / `bypassPermissions` / `plan` modes (link to Anthropic's docs); Codex's approval-prompt modes (link to OpenAI's); OpenCode's analogous settings. With recommendations on which mode to live in by default for which kind of work.

- **8. Teaching the agent who you are: `CLAUDE.md`, `AGENTS.md`, and project memory**
  The single highest-leverage setup step — and you do **not** write the file yourself. Have a five-minute conversation with the agent about your role, what you work on, what you care about, what conventions matter, and let *it* draft the `CLAUDE.md`. You read it, tweak a line or two, save it. Includes long-term cross-session memory features (same pattern: the agent writes its own memory; you confirm what it remembers).

- **9. What is MCP, and which servers should you install on day one?**
  The Model Context Protocol is the standard that lets your agent reach out of its own process and touch real systems. Think of MCPs as **apps installed on your agent's phone**: each one gives it a new capability. We unpack the User → Model → Orchestrator → MCP → Real-tool flow from Ch. 2, walk through one round-trip end-to-end, and explain why MCP being an *open* protocol matters (the same Gmail MCP works for Claude, Codex, and any future agent). Then we get practical: **the day-one MCP servers everyone should install** — Gmail, Google Drive/Sheets, Linear/Jira, GitHub, web browser, Notion, Slack. (Filesystem is already built in to every major agent — you don't install one.) And critically — **you do not edit configuration files to install these**. Tell the agent *"install the Gmail MCP and connect it to my Google account"*; it does the install, prompts you for the one-click OAuth grant, and confirms it works. The same discovery prompt works for any tool you've ever used: *"is there an MCP for Shopify? for Stripe? for Salesforce?"* — the agent searches the Anthropic registry, vendor sites, and community lists, and installs what it finds. This **"equip first, then engage"** habit is the subject of Ch. 10. The chapter also clears up the question new readers always ask: **"MCPs vs skills vs slash commands vs plain prompting — which is which?"** Short answer: an MCP gives the agent a new *tool*; a skill gives it a new *procedure* (which often composes multiple MCPs). The fuller story comes in Ch. 18.

### Part III — Working With an Agent

> *The craft. How to brief, review, recover, and stay in control.*

- **10. Equip first, then brief**
  The single most important habit change the book asks for. **Before starting any task, the first move is not "let me think about how to do this" — it is "what MCPs and skills already exist for the tools and platforms involved? Equip the agent before engaging."** A reader heading into ecommerce + ads work installs the Shopify MCP, looks for a Google Ads MCP and skill, loads them — *then* briefs the agent on the actual task. The chapter also promotes the **canonical working rhythm** the rest of the book assumes: **ask the agent to study the problem first → it comes back with a plan → you read the plan and edit it → you tell it to go → you monitor the run (grab a cup of coffee while it works) → you review the results.** Five steps, one of which is a coffee. This rhythm shows up everywhere from a 10-minute task to a multi-hour autonomous run. We close on when to brief like a colleague, when to ask for a plan vs. just go, and when to let the model **think longer**.

- **11. Why is context everything?**
  Files, screenshots, links, tickets, transcripts. What changes when the agent can *see* a screenshot vs. just read text. The single biggest under-used habit: **give the agent the actual files** — "match these invoices against `stripe.csv` in `/Downloads`", not "match my invoices against Stripe". Context windows, compaction, and why long sessions go sideways.

- **12. What should the agent actually produce?**
  Output is the deliverable, and most people under-specify it. We walk through six output forms and when each is right: **Markdown** (default — readable, diff-able, lives anywhere); **HTML** (when the output should be interactive or look polished — standalone reports a non-technical reader will open in a browser, with charts and clickable sections); **PDF** (when typography is the deliverable — papers, contracts, formal reports); **Video** (when motion or timing carries meaning — demos, walkthroughs, marketing); **Image** (a single visual fact — diagrams, charts, screenshots); **Direct action via MCP** (no document at all — a Linear ticket, a Sheets row, a Slack message, a PR, a calendar event). The chapter's spine is a decision framework with one cardinal question: **is the deliverable an *artifact* or an *action*?**

- **13. Reviewing and recovering**
  Trust but verify. Review applies to **whatever the agent produced** — a draft article, a created Linear ticket, a filled-in spreadsheet, a scheduled email, a launched ad campaign, a new entry in your CRM, and yes, code if you're an engineer. The non-engineer's playbook: read the *summary* of what the agent did, spot-check the actual artifacts, and ask the agent to undo or redo anything that's off. **A second pattern this chapter promotes hard: ask the agent to audit its own work, on criteria *you* supply.** "Check that the report includes the three KPIs the boss asked for." "Re-add the amount column and confirm it sums to the total you reported." "Re-read the email — is the tone formal enough for a board-level recipient?" The agent is genuinely good at this, and it costs you one sentence. When things go sideways: undo, revert, redirect mid-task. Recognizing the "doom loop" early. *(For engineers, a section on reading diffs and using Git as your safety net.)*

- **14. Letting it cook: long-running and parallel work**
  Background tasks, side-by-side sessions, worktrees. Doing four things at once without losing the thread. The "worktree-per-ticket" pattern. **Replacing scheduling with the loop prompt**: most people don't need cron at all — the right move is *"keep doing X until Y"*, and the agent will work the long task until done. **Engineer-only deep-dive section: running three worktrees in parallel without them fighting each other** — port collisions, shared DB state, `node_modules` lockfile fights (and the symlinked-`node_modules`-breaks-Vite-sandbox war story), `.env` drift, build-cache collisions. Two practical tips for engineers: use `claude -w <path>` to start a session in a specific worktree, and once you've felt the pain of conflicts, **ask the agent to write a skill that launches your dev servers with all these issues considered** — the conflict-handling becomes one command. Brief note on **multi-agent / sub-agent** workflows: useful when one agent can fan out work, but **even Anthropic doesn't have a settled answer on when specialized sub-agents beat one strong agent — try it, but don't feel obliged**. The author rarely uses sub-agents in daily work.

- **15. Growing your plugins and skills**
  The discipline twin to *equip first, then engage* (Ch. 10): how to equip *well* without drowning the agent — or yourself — in installed tools. The industry strategy of steering a general-purpose model with stacks of skill packs and plugin bundles is, in principle, reasonable; the mismatch is that today's foundational models can't yet navigate many tools and instruction files in one context window without losing accuracy. Anthropic's own engineering team [warns plainly](https://www.anthropic.com/engineering/writing-tools-for-agents) that *"too many tools or overlapping tools can also distract agents from pursuing efficient strategies."* The [RAG-MCP paper](https://arxiv.org/abs/2505.03275) (May 2025) puts numbers on it: baseline tool-selection accuracy collapses to **13.6 %** as the pool grows, and [JSPLIT](https://arxiv.org/abs/2510.14537) (Oct 2025) replicates the finding. Bloat costs you twice: the agent gets confused, *and* you become the bottleneck (Microsoft Office / Adobe Creative Suite — hundreds of features, the user knows six). The alternative is **organic skill growth**: do the task once with the agent, then ask it to package what worked into a skill — full treatment in Ch. 18–19. And when an upstream skill *does* look useful, paste the GitHub URL and have the agent **extract only the parts you actually need** rather than installing the bundle — bloat-free *and* a defense against supply-chain attacks on plugin marketplaces.

- **16. Managing context**
  The working chapter for sessions that last longer than five prompts. Why **position** matters more than size: the U-shaped recall curve from [Liu et al. (TACL 2024)](https://arxiv.org/abs/2307.03172), and the follow-up showing performance degrades **13.9–85 %** as input grows *even with perfect retrieval* ([Du et al., Oct 2025](https://arxiv.org/abs/2510.05381)). The user-actionable takeaway from that finding is simple — when the task changes, **start a new context** (a new chat / `/clear`, or a sub-agent that gets only partial context). The four levers you actually control — **load, prune, compact, clear** — in escalating order of disruption. `/compact` vs `/clear` and when to use which. Watching the meter (60–70 % = wrap up). The **handoff file** as the only thing that reliably spans sessions. Lines up with Anthropic's [Effective Context Engineering for AI Agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) (Sept 2025): smallest set of high-signal tokens, progressive disclosure.

### Part IV — Skills: Teaching Your Agent New Tricks

> *Skills are the single biggest force multiplier. They get their own part for a reason.*

- **17. Skills, slash commands, and MCPs — what's the difference?**
  A skill is a reusable, named procedure your agent invokes by intent ("ship this PR", "research this on Gemini", "do the Monday morning report"). Picking up from Ch. 9: an **MCP adds a tool** (a new capability); a **skill adds a procedure** (a new *way of using* tools, often composing multiple MCPs). Alongside skills sit **slash commands** (single-shot named invocations). We lay out the three layers — **prompt → slash command → skill (with MCPs underneath)** — and when to reach for each. Throughout, the examples mix technical (ship-a-PR) and non-technical (run-the-monthly-investor-update, draft-the-customer-welcome-email, reconcile-this-month's-invoices).

- **18. When should you stop re-prompting and write a skill?**
  The single most important rule in this book: **if you find yourself doing the same task often, or correcting the agent on the same task repeatedly, that's the signal — make it a skill.** Three anchor stories, deliberately spanning the audience: (1) **technical** — manually directing the agent through two product demo videos, noticing the same corrections every time ("no spring animations", "caption belongs in the bottom band"), and turning the whole pipeline into a `demo-video` skill — the third video was one command. (2) **business** — a marketing manager who kept correcting the agent's brand voice on every blog draft turns the tone rules into a `brand-voice` skill; from then on, every draft comes out in voice. (3) **operational** — a finance ops person reconciles Stripe transactions against PDF invoices every month, the agent keeps re-asking which column is the amount, and the answer becomes a `reconcile-stripe` skill that just *does* it on the next month's files. **A skill is your war-story-as-code.**

- **19. Writing a good skill (and letting the agent write it for you)**
  **You almost never write a skill from scratch by hand.** Two flows lead to a new skill, and you should try both before doing anything manually. First flow — **search before you write**: ask the agent *"is there a published skill for X?"* and let it look (your local skills, the team library, GitHub community lists, vendor-published bundles). Half the time someone has already written what you need; you install it and move on. Second flow — **write from the conversation**: you finish a session — successful or messy — and you say *"that was useful; write a skill that captures what we just did, so next time it's one command."* The agent reads back over the conversation, picks out the triggers, the steps, the gotchas, and the corrections *you* gave it along the way, and writes the `SKILL.md` for you. You read it, tweak a line or two, save it. Done. Both flows work for non-coders just as well as for engineers — the conversation is in plain English; so is the skill. We walk through this end-to-end with four real skills mixing engineer- and business-side examples: `ship-pr`, `gemini-chat-and-search`, `reconcile-stripe`, and `brand-voice`. Then **anatomy**: triggers, instructions, examples, "when *not* to use this", failure modes — why some skills fire at the right time and others sit unused. Two different *shapes* of skill dissected: a **procedure with hard rules** (the `demo-video` skill), and a **policy-encoder** (a skill that flags any geopolitically-sensitive wording in the product UI before a release — *"use 'Country/Region' not 'Country' when the list includes Taiwan/HK"*). Finally, **where skills should live**: user-level (travel with you across projects) vs. project-level (live in the repo, travel with the team).

### Part V — Workflows by Audience

> **Read only the chapter that matches you.** The other chapters in this part are there as inspiration if you're curious about what your colleagues in other roles are doing — they're real workflows the author and his team actually use day-to-day, not invented scenarios. **Every workflow shows the actual prompt as a quotable block, and emphasizes giving the agent the files, folders, and data it needs to work on** (e.g. *"match the invoices in `~/Downloads/Nov-invoices/` against `stripe-nov.csv` in the same folder; flag anything unmatched"* — not *"match my invoices against Stripe"*). Hands-on exercises at the end of each chapter come with starter files in the `examples/` folder of this repo, so you can actually run the tasks, not just read about them.

- **20. For Software Engineers**
  Feature work from a Linear/Jira ticket; cross-repo bug hunts; onboarding to an unfamiliar codebase; large refactors and version migrations; CI babysitting / "take this PR to green"; security and code review with a second-pair-of-eyes agent. Each workflow includes the exact prompt used and which files were dropped in front of the agent.

- **21. For Data & Analytics People**
  The widest set of practical wins for someone who lives in spreadsheets. *"Read `sales-q3.xlsx`, find the three lines where the formula broke and the totals are wrong, and tell me what they should be."* *"Take this raw export of 14,000 transactions, decode the messy `memo` column into clean categories, write the cleaned version back as `cleaned.csv`, and produce a one-page HTML report with the top 10 categories charted."* *"Pull last month's ad spend from the GA export I just dropped in this folder, cross-check against `revenue.xlsx`, and tell me where we're underwater."* The chapter centers on three patterns: **interrogate a spreadsheet** ("tell me what's weird"), **extract structured fields from messy real-world data** (PDFs, free-text columns, scanned receipts), and **produce a dynamic HTML report** the agent generates and you open in your browser. Light ETL between sheets, databases, and charts; reproducible analysis without the notebook.

- **22. For PMs, Designers, and Business / Ops**
  A tour of business-side workflows, organized by sub-role. **You don't need to write any code to use any of this**, and you don't need to set anything up by hand — every "skill" or "tool connection" mentioned below is something you can ask the agent to install and write *for* you, from a five-minute conversation. The workflows use a combination of existing tool connections (Gmail, Sheets, Linear, Notion, Slack, the browser — see Ch. 9) and a few skills the agent has written based on how you actually work (see Ch. 19). **Every workflow shows the exact prompt as a quotable block and explicitly names the files / folders / docs you hand the agent.**

  - **Product & design** — turning meeting notes and client feedback into a punch list (*"read `customer-feedback-Nov.docx` and `support-tickets-Q4.csv`, group recurring complaints into 5 themes, file each as a Linear ticket in the `Inbound` project"*); drafting specs and PRDs with the codebase as context; synthesizing user-research transcripts into themes; translating Figma comments into actionable tickets; auditing the product for **policy compliance** (a skill that flags geopolitically-sensitive wording before a release).
  - **Marketing & growth** — **turning your product into marketing assets**: product demo videos, screenshots, and feature walkthroughs straight from your live app, with the agent doing the recording and editing; **updating live marketing assets** like the welcome email template, without ever opening your email service's UI; **end-to-end event launches** handled by the agent from one instruction; **content repurposing** — long blog post → Threads / X / LinkedIn / newsletter variants in your brand voice; SEO keyword research; **brand-voice enforcement** captured as a reusable skill (which the agent writes for you the first time it sees you correct its tone — see Ch. 19). **Flagship workflow 1 — closing the paid-ads loop end-to-end**. **First step (the habit the whole book is asking you to adopt — see Ch. 10): equip the agent before engaging.** Ask: *"is there an MCP for Shopify? for Google Ads? are there any published skills for ecommerce-to-ads workflows?"* — the agent searches, surfaces what exists, and installs them with your blessing. *Now* you begin the actual task: point the agent at your storefront; it walks through every product, clusters the catalog, identifies ad-worthy items, proposes a campaign strategy (audiences, keywords, ad copy angles, daily budgets), and **creates the actual campaigns in Google Ads** — directly, no manual export. Then it pulls performance reports back, diagnoses what's working, and proposes budget reallocations — *the agent owns the full audit → strategize → execute → measure → optimize loop*. The same pattern generalizes to **Meta Ads, TikTok Ads, Amazon Sponsored Products, Shopee / Lazada SEM**. This is the cleanest demonstration of agentic working in the book, and a direct application of the *"monitor, don't block"* stance from Ch. 7 — let the agent run the campaigns and watch the dashboard. **Flagship workflow 2 — owning the organic-SEO loop**: same starting point, but instead of paid ads the agent writes **SEO-targeted blog articles** mapped to product clusters and search-intent keywords, and **publishes them to your blog automatically**. It pulls Google Search Console / Analytics data to see which articles drove traffic and conversions, identifies content gaps, and writes the next batch.
  - **Sales** — pre-call prospect briefs (*"prep me on this LinkedIn profile + this company's last 3 funding rounds + any news this week, into a one-pager"*); personalized outreach sequences at scale; CRM hygiene runs (*"read `call-notes-Nov.docx`, find any deal where the next-step field in HubSpot is older than 14 days, and draft a follow-up email per deal"*).
  - **Customer success & support** — triaging the inbound queue and routing tickets; drafting personalized replies with the customer's full history as context; rolling repeated questions up into a help-center article draft.
  - **Finance & ops** — **the flagship "give the agent the data" workflow.** *"Match this month's invoices against our Stripe transactions. The invoices are PDFs in `~/Documents/invoices-Nov/`; the Stripe export is `stripe-nov.csv` in the same folder. Flag anything unmatched, and write the result to `reconciliation-nov.xlsx`."* Same pattern for monthly P&L summaries, burn-rate / runway recalcs, vendor-quote comparison, expense categorization. The agent does the work; you read the result.
  - **HR & people** — drafting JDs from a clear role brief; screening résumés against a JD (*"score the CVs in `~/Downloads/cvs/` against `jd.md`, top 5 with reasons"*); onboarding checklists; quarterly-review feedback skeletons.
  - **Legal & compliance** — first-pass contract review for red-flag clauses (*"read `vendor-contract.pdf`, flag any clause around liability cap, auto-renewal, or IP ownership that looks unusual"*); diffing ToS / privacy-policy changes across vendor updates; GDPR / data-deletion request responses.
  - **Founder / strategy** — **GTM and pricing sparring** with a second agent as devil's advocate; **competitor-monitoring** digests; investor-update drafts from current metrics (*"using `metrics-Nov.xlsx` and last month's update at `investor-update-Oct.md`, draft this month's update in the same structure"*); quarterly board-meeting prep.
  - **Cross-cutting** — investigating "why doesn't this thing work?" on third-party platforms (your bank, your CMS, your analytics tool); **operating vendor portals that have no API** by letting the agent drive your browser (see Ch. 25).

- **23. For Everyone (Personal Workflows)**
  Taming Downloads; decoding a confusing bank statement; planning WiFi router placement from a floor-plan photo; learning a new tool by having the agent do the homework alongside you; **agents as a personal investing terminal** — live broker positions, ticker news aggregated from multiple sources, your shell as a Bloomberg-lite.

### Part VI — Going Further

- **24. Talking and showing: voice and vision as input**
  Dictation instead of typing. Feeding the agent screenshots, PDFs, photos, even video frames. What changes when the agent can *see* the thing you're describing instead of guessing from your words. When voice is genuinely faster, and when it's a novelty.

- **25. Letting the agent drive your browser**
  The browser is the most universal action surface in business — almost every internal tool, vendor portal, CMS, and analytics dashboard runs in one. Letting the agent drive it directly is a force multiplier, especially when no MCP exists for the system you're touching. Two modes: **headed real-browser driving** (Claude for Chrome, computer-use APIs, ChatGPT Agent/Operator) and **headless scripted-browser driving** (Playwright/Puppeteer through skills). The canonical loop: **navigate → snapshot → interact → re-snapshot**. Rich scenarios from real work: making a product demo video (the `demo-video` skill); recon-then-author for writing Playwright specs; dogfooding / exploratory QA; investigating third-party platforms ("why doesn't my Threads post show a link preview?"); filling auth-gated forms; visual bug reproduction across viewports; operating vendor portals with no API (Stripe console, SendGrid UI, HRIS).

- **26. Running agents responsibly: cost, quality, and what to never feed them**
  Three operational concerns that decide whether agentic working actually sticks at a company. **Quality** — lightweight evals for non-researchers; spotting when the agent is silently getting worse; logging, replaying, and A/B-ing prompts and skills; using one agent to regression-test another (`test-assistant-capacity` skill). **Cost** — big model vs. small; prompt caching; token economics for daily users; how to tell when you're overpaying — and when paying more is the right call. **Security & privacy** — practical rules for business and regulated environments; local vs. cloud; redaction patterns; what your security team will actually ask, and how to have a good answer.

- **27. What we got wrong, and what's next**
  The mistakes we made so you don't have to. **The biggest one is the opposite of what most people warn about**: it's not "agent did too much", it's **over-gating** (treating every tool call like a nuclear launch and training yourself to under-use the agent) and **under-monitoring** (firing-and-forgetting without watching the run). Other traps: the "agent as oracle" trap (asking instead of delegating); the "let it cook for an hour with no plan" trap; the "I'll just keep re-prompting" trap (you should've written a skill). Then a short look ahead: deeper computer use, persistent agents, skill marketplaces, agent-to-agent protocols (A2A), and what stays the same no matter what ships.

### Appendices

- **A. Glossary** — LLM, agent, MCP, tool call, skill, slash command, sub-agent, context window, plan mode, in plain English.
- **B. Tool Comparison** — Claude Code vs Codex vs OpenCode vs Cursor agent vs Gemini CLI, feature by feature.
- **C. Starter `CLAUDE.md` Templates** — by role (engineer, PM, analyst, ops).
- **D. Recommended MCP Servers** — curated, with what each is good for.
- **E. A Library of Real Skills** — annotated `SKILL.md` files you can copy and adapt, organized by theme:
  - *Workflow*: `ship-pr` (PR to green), `worktree` (paired FE+BE worktrees per ticket), `gemini-chat-and-search` / `gemini-search` (multi-turn vs quick research).
  - *Local dev & infra*: `local-dev` (with the symlinked-`node_modules` war story), `local-dev-launcher` (port-conflict etiquette), `deployment` (encyclopedic runbook).
  - *Data & testing*: `railway-db-query` (ad-hoc BI for the product team), `dev-backend-tester` (scoped readonly DB role), `test-assistant-capacity` (agent regression-tests agent), `audit-missing-e2e-tests`.
  - *Content & policy*: `sendgrid-template-manager`, `event-setup`, `i18n-reviewer` (policy-as-skill).
  - *Production marketing*: `demo-video` (Playwright + Remotion).
  - *Domain*: `portfolio-info`, `ticker-news`, `quant-dev` (personal-finance terminal).
  - *Meta*: `claude-code-guide`, `uv-python-package-manager`, `agent-browser`.
- **F. Further Reading** — papers, posts, and other books worth your time.

---

## A note on examples

Every workflow shown in this book comes from **real, paraphrased usage** — actual things the author and his team did to ship work. We deliberately avoid toy examples like "summarize this paragraph"; if a workflow is in here, it's something you could plausibly do at work tomorrow.

Names, ticket IDs, and client details are anonymized. The shape of the work is real.

## How chapters are written

Each chapter follows the same shape, modeled loosely on [Learn Harness Engineering](https://github.com/walkinglabs/learn-harness-engineering):

- **~2,000–2,500 words.** Long enough to be useful, short enough to read in one sitting.
- **Opens with a relatable scenario** and a counterintuitive premise — not a definition.
- **Conversational but authoritative.** Direct address ("you"), concrete metaphors, casual asides where they help.
- **Closes with a short wrap-up and a "try it yourself" exercise or two.** No mandatory "further reading" block — links are woven in where they're useful. A "what's next" pointer appears only when the next chapter is a real dependency.
- **Conceptual chapters get question titles** ("When should you let the model think longer?"); setup, reference, and workflow chapters use declarative titles.

The site is rendered with VitePress and is structured for multilingual translation from day one.

---

## Start here

→ **[Chapter 1: What changes when AI can act, not just answer?](en/part-1-foundations/chapter-01-what-changes-when-ai-can-act/index.md)**

Or, if you'd rather just *try it*:

→ **[Chapter 4: A 10-minute first win](en/part-1-foundations/chapter-04-a-10-minute-first-win/index.md)**
