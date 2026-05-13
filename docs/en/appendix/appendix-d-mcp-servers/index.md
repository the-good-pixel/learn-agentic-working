# Appendix D — Recommended MCP Servers

*Current as of May 2026; the MCP ecosystem moves fast — when in doubt, ask your agent to search the Anthropic registry and vendor sites.*

This appendix is a curated reference of MCP servers — the connectors that give your agent hands into the systems you already use — organized by category. It supports Ch. 9, where we introduced MCP and the "is there an MCP for X?" discovery loop. Use this as a starting map, not a complete catalogue.

A few honesty notes before the list:

- **Official** means the vendor (Google, Stripe, Linear, GitHub, etc.) publishes and maintains the server themselves. These are the most reliable.
- **Community** means a third party — often Anthropic, often an enthusiast — wrote and maintains it. Quality varies; popular ones are usually fine, niche ones go stale.
- **Hypothetical** means a server *should* exist for this system and the agent ecosystem will produce one soon, but at time of writing nothing dependable was found. Treat as a placeholder.

You do not install MCPs by editing JSON. You tell your agent *"install the X MCP and connect it to my account"* and let it do the work, per Ch. 9. The names below are what you say in the prompt.

---

## Communication and email

Most knowledge work starts in an inbox. The connectors below give the agent the ability to read, search, draft, and send across the major mail and chat platforms.

**Gmail MCP.** Official Google Workspace MCP support arrived in late 2025; before that the popular implementation was the Anthropic-maintained community server. Either way the capability surface is the same — read your inbox, search by query, list and apply labels, create drafts, send mail, fetch attachments. OAuth flow on first connect, scoped to whichever Google account you authorize. Starter prompt: *"Find the latest five emails from anyone at stripe.com, summarize what each is asking, and draft replies where one is needed — do not send."*

**Outlook / Microsoft 365 MCP.** Microsoft has shipped an official Graph-based MCP that covers Outlook mail, Calendar, OneDrive, Teams chat, and SharePoint in one connector. OAuth via Microsoft Entra (formerly Azure AD); enterprise tenants may require admin consent — your IT will know. The community alternative is narrower (mail and calendar only) but easier to install on personal accounts. Starter prompt: *"Show me every unread mail from external senders in the last two days, grouped by domain."*

**Slack MCP.** Slack ships an official server with read access to channels and DMs the bot user is invited to, plus write access for posting and reactions. Auth is via a Slack app you install in your workspace (admin approval typical). The "read" half is the underrated win — let your agent triage your morning unreads while you make coffee. Starter prompt: *"Summarize anything I was @-mentioned in across the last 24 hours and tell me which need a reply today."*

**Discord MCP.** Community-maintained. Bot-token auth, scoped to whichever servers you add the bot to. Useful for community managers and for solo founders running a Discord-based support channel; less polished than the Slack server. Starter prompt: *"Pull the last 50 messages from #support and flag the ones that look like genuine bug reports."*

**Microsoft Teams.** Bundled inside the Microsoft 365 MCP above; standalone Teams-only servers exist but offer no advantage over the umbrella one.

**Telegram MCP.** Community-maintained, varying quality. Bot-token or user-session auth. Niche but useful if your team or customer base lives in Telegram channels. Starter prompt: *"List every channel I'm in with more than 100 unreads."*

---

## Docs and knowledge

These are the connectors for the systems your team writes things down in. The pattern is the same everywhere: the agent reads existing docs to ground itself, then drafts new ones in your house style.

**Notion MCP.** Official, mature, widely used. Read pages, search the workspace, create and update pages and databases, manage properties. OAuth-based, with an integration you create inside Notion and grant page access to. The single biggest leverage win for teams that already live in Notion: the agent can read your existing wiki before answering a question, instead of guessing. Starter prompt: *"Search our Notion for any page about onboarding and tell me what's outdated based on what's currently in the product."*

**Google Drive / Docs / Sheets MCP.** Official, bundled into the Google Workspace MCP. Lists files, reads and writes Docs, reads and edits Sheets (including formulas and formatting), fetches Drive files. Sheets-as-a-database is a real and underused pattern (see *Sheets-as-database* below). Starter prompt: *"Open the spreadsheet titled 'Q2 revenue', add a column that computes 30-day rolling average of MRR, and chart it."*

**Confluence MCP.** Atlassian publishes an official MCP that bundles Jira and Confluence. Read and search spaces and pages, create new pages, comment. OAuth via Atlassian, with workspace selection on first connect. If your engineering org runs on Atlassian, this plus Jira is the highest-leverage pair in this appendix. Starter prompt: *"Find every page in our Engineering space tagged 'runbook' and tell me which haven't been updated in 12 months."*

**Obsidian MCP.** Community-maintained; works against a local vault directory, so auth is just filesystem access. Read, search, create notes, follow links. The killer use case is the personal knowledge graph — *"what did I write about pricing last year?"* — answered without leaving your editor. Starter prompt: *"Find every note in my Obsidian vault that mentions 'agentic working' and summarize the through-line."*

**Apple Notes / Bear MCP.** Community-maintained, generally Mac-only, varying quality. Apple Notes connectors typically use AppleScript bridges and break on macOS upgrades — usable but expect rough edges. Bear has a more stable URL-scheme API. Both are read-heavy in practice.

---

## Project and ticket trackers

The places work actually gets tracked. Strong MCP coverage here because every agent vendor wants their tool to look good in engineering demos.

**Linear MCP.** Official, very well maintained, arguably the gold standard for tracker MCPs. Full read and write on issues, projects, cycles, comments, labels, customers, documents. OAuth via Linear, scoped to a workspace. The schema is broad enough that the agent can do real project-management work — sweep stale issues, draft cycle plans, write retros from the issue activity log. Starter prompt: *"List every issue assigned to me that hasn't been updated in two weeks and propose a triage action for each."*

**Jira / Atlassian MCP.** Official, bundled with Confluence as noted above. Issues, sprints, boards, JQL search, comments, transitions. OAuth via Atlassian. Slightly more awkward than Linear (Jira's data model is heavier) but covers the long tail of enterprise teams. Starter prompt: *"Show me every ticket in the current sprint that's still in 'In Progress' but hasn't had a comment in five days."*

**GitHub Issues.** Folded into the GitHub MCP (next section). Most teams that use GitHub Issues just install the umbrella server.

**Asana MCP.** Official, covers tasks, projects, sections, custom fields. OAuth via Asana. Strongest for the agency / creative-services use case (see the agency PM stack in `examples/ch-09-saas-stacks/`). Starter prompt: *"For every active client project, list the next due task and its assignee."*

**Trello MCP.** Community-maintained. API-key auth. Adequate for personal kanban; thinner than the others for teams.

**ClickUp MCP.** Vendor-published, full read and write. Auth via API token. Solid for teams already on ClickUp; not a reason to switch from Linear or Jira.

---

## Code and version control

**GitHub MCP.** The flagship MCP in many ways — GitHub published it early, it's been heavily exercised by Anthropic and the wider community, and it's the most-installed server outside Gmail. Covers repos, branches, files, PRs, reviews, comments, issues, releases, workflow runs, secrets metadata. Auth is via a fine-grained personal access token or GitHub App install (preferred for orgs). Starter prompt: *"List every open PR I'm a reviewer on, summarize the changes, and tell me which look ready to approve."*

**GitLab MCP.** Official, more recent. Mirrors most of the GitHub surface — MRs, pipelines, issues, repository content. PAT-based auth. Quality is good if not yet as battle-tested.

**Bitbucket MCP.** Community-maintained, narrower coverage (PRs, repos, pipelines basics). App-password auth. Adequate for teams stuck on Bitbucket; consider this the floor of code-VCS support.

---

## Data and databases

This is the category where the *"is this reversible? is the blast radius bounded?"* heuristic from Ch. 6 earns its keep. **Install database MCPs with read-only credentials by default.** Write access is a separate decision.

**Postgres MCP.** Multiple implementations exist; the Anthropic-maintained community server is the common pick. Connect via a Postgres URL, run `SELECT` queries, inspect schemas, sample rows. Best practice: create a read-only role for the agent (see the `dev-backend-tester` skill referenced in this book's `CLAUDE.md` for the canonical pattern). Starter prompt: *"Connect to the staging database as the read-only role. Tell me how many users signed up last month grouped by acquisition channel."*

**MySQL MCP.** Community, similar shape to the Postgres one. Same read-only-role discipline applies. Quality is fine for ad-hoc queries; less mature for schema-introspection edge cases.

**SQLite MCP.** Community, trivial to install — it's just a file path. Brilliant for local data exploration ("here's a `.sqlite` someone gave me, tell me what's in it").

**BigQuery MCP.** Google publishes an official one as part of the Google Cloud MCP family. OAuth or service-account auth. Runs queries, lists datasets and tables, fetches schema. Quota and cost controls live in BigQuery itself; configure a project-level query cap before pointing your agent at it. Starter prompt: *"In our analytics dataset, find the five queries with the highest aggregate cost in the last week."*

**Snowflake MCP.** Vendor-published, similar capabilities — warehouses, schemas, query execution. Key-pair or OAuth auth. Use a dedicated warehouse with a spend cap for agent traffic.

**Redshift MCP.** AWS publishes one as part of the AWS MCP family; community alternatives exist. IAM-role auth in the AWS case.

**Sheets-as-database.** Not a separate MCP — you use the Google Sheets MCP and treat a sheet as a tiny database. Underrated pattern for small teams: a 5,000-row sheet is enough for most early-stage product analytics, and the agent can read it without any warehouse setup. The agency-PM stack in `examples/ch-09-saas-stacks/stack-agency-pm.md` is a good fit for this.

---

## Payments and billing

The "big and irreversible" caveats from Ch. 6 apply hard here. Read access is safe and useful; write access (creating charges, issuing refunds, mass-emailing customers) deserves explicit human approval each time.

**Stripe MCP.** Official, well-maintained. Covers customers, charges, invoices, subscriptions, products, payouts, disputes, and the full read side of the dashboard. Auth via a restricted API key — *use a restricted key*, not your live secret. By default scope it to read-only and grant write only for the specific resources you want the agent to manage (typically: customers, invoices, draft invoices). Starter prompt: *"List every subscription that failed payment in the last 30 days and the customer email on each."*

**PayPal MCP.** Vendor-published as of early 2026; coverage is narrower than Stripe's (transactions, invoices, payouts). OAuth via PayPal app credentials.

**Square MCP.** Vendor-published, covers payments, orders, customers, catalog. OAuth via Square. Useful for the retail / restaurant operator use case.

**Adyen MCP.** Hypothetical at time of writing — Adyen is enterprise-heavy and an MCP wrapper around their API would be straightforward, but nothing dependable has shipped. Ask your agent to write a minimal wrapper if you need read access.

---

## CRM and sales tools

Sales teams (see `stack-sales-team.md`) live across a half-dozen tools; CRM coverage is broad but uneven.

**HubSpot MCP.** Official, mature. Contacts, companies, deals, pipelines, tasks, engagements, sequences metadata. OAuth via HubSpot app install. Strong fit for both the marketing-CRM and sales-CRM cases. Starter prompt: *"List every deal in the 'Negotiation' stage with no activity in the last 10 days, and draft a follow-up email for each."*

**Salesforce MCP.** Official, but the surface is large and the install can be finicky (connected-app setup, OAuth, sometimes IT approval). Once installed, full read and write across objects, SOQL queries, reports. The enterprise default if you're already on Salesforce.

**Pipedrive MCP.** Vendor-published. Deals, contacts, activities, pipelines. API-token auth. Lighter alternative to HubSpot or Salesforce for smaller teams.

**Apollo MCP.** Community-maintained at time of writing; an official one is rumored. Prospect search, list management, sequence stats. API-key auth.

**Outreach / Salesloft MCPs.** Hypothetical / early community at time of writing. Both vendors publish APIs; expect official MCPs within the year.

---

## Marketing and ads

The connectors that let your agent run campaigns, send emails, and update your storefront. Same reversibility rule: spending $50 wrong is recoverable; mass-emailing a customer list wrong is not. Gate the irreversible actions.

**Google Ads MCP.** Official as part of Google's ads-platform tooling. Read campaigns, ad groups, keywords, performance data; create and pause campaigns. OAuth plus an ads developer token (one-time setup, sometimes requires approval). Starter prompt: *"Find every ad group with a CTR below 1% in the last 14 days and propose pause or edit actions for each."*

**Meta Ads MCP.** Official via the Meta Marketing API. OAuth via a Meta business app. Covers campaigns, ad sets, ads, audiences, performance. Setup is more painful than Google's; Meta's app-review process can stretch to days for write access.

**TikTok Ads MCP.** Vendor-published, narrower surface. OAuth via a TikTok business app.

**SendGrid MCP.** Community + the in-book `sendgrid-template-manager` skill referenced in `CLAUDE.md`. The MCP layer covers sends, suppressions, lists, templates; the skill layer adds your house style on top. API-key auth.

**Customer.io MCP.** Vendor-published. Workspaces, campaigns, segments, broadcasts. API-key auth.

**Mailchimp MCP.** Vendor-published. Lists, campaigns, automations, reports. OAuth.

**Shopify MCP.** Official, broad coverage — products, orders, customers, draft orders, inventory, shipping, discounts. Custom app install on the store, with scoped admin API access. Probably the second-most-installed MCP after Gmail among non-engineers. Starter prompt: *"Find every product whose inventory is below 10 units and tell me which had a sale in the last 30 days."*

**WooCommerce MCP.** Community-maintained. REST API auth with consumer key / secret. Adequate for ad-hoc store work.

**Squarespace MCP.** Hypothetical / early — Squarespace's API surface is narrow, and the MCP coverage matches.

**BigCommerce MCP.** Vendor-published; covers products, orders, customers. API-token auth.

---

## Analytics and data visualization

**Google Analytics MCP.** Official via Google. Run GA4 reports, list properties, fetch dimensions and metrics. OAuth-based. The agent is a real alternative to building one-off custom dashboards — *"give me weekly active users by country for the last quarter, charted"* takes ten seconds. Starter prompt: *"Compare this month's organic traffic to last month's, by landing page, and flag any page that dropped more than 20%."*

**Google Search Console MCP.** Official, bundled with the Google Workspace family. Read-only by design — queries, pages, performance, indexing status. OAuth. Indispensable for anyone doing SEO.

**Mixpanel MCP.** Vendor-published. Run JQL queries, fetch reports, list cohorts. API-key auth.

**Amplitude MCP.** Vendor-published. Charts, cohorts, user lookups. API-key auth.

**PostHog MCP.** Official. Events, persons, feature flags, session-replay metadata. Personal API key. Strong fit for product teams.

**Tableau / Looker.** Usually *not* accessed directly via MCP. The practical pattern is to point the agent at the underlying warehouse (BigQuery, Snowflake, Redshift) instead — the BI tool is for humans; the agent prefers the raw data. If you do need it, both vendors have early/experimental MCPs at time of writing; quality varies.

---

## Browser and web

The connector category where the line between "MCP" and "built-in" gets fuzzy.

**Built-in web fetch.** Every major agent (Claude Code, Codex, OpenCode, Cursor, Gemini CLI) ships with a built-in fetch tool — read a URL, return the text. *This is not an MCP you install.* For 80% of "go look at this page" tasks, the built-in is enough.

**Playwright MCP.** The community-favorite browser-driving MCP, built on the Playwright automation library. Headless real browser — navigate, click, fill forms, screenshot, run JavaScript. Auth is whatever the target site needs; you log in once, the browser keeps the session. Good for: scraping data behind login walls, automating web flows that have no API, running end-to-end checks. Starter prompt: *"Open our staging environment, log in as the test user, and walk through the checkout flow taking a screenshot at each step."*

**Puppeteer MCP.** Older, similar shape to Playwright. Playwright has largely won this race; install it instead unless you have a Puppeteer dependency.

**Claude for Chrome.** A different shape from the rest of this appendix. Not a server you install via MCP config — a *browser extension* that lets the agent drive your actual logged-in Chrome window, with the cookies and sessions you already have. Anthropic-shipped. Pair it with the headless MCPs: use Claude for Chrome when "logged in as me" matters; use Playwright when "scripted and reproducible" matters.

---

## Infrastructure and DevOps

Coverage here is partial and growing. Cloud vendors are publishing MCPs in waves; expect this section to be most-rewritten in future revisions of this appendix.

**AWS MCP.** Official, split into multiple per-service servers (S3, EC2, Lambda, RDS, IAM, CloudFormation, CloudWatch, etc.) rather than one monolithic one. IAM-role or access-key auth. Coverage is broad but uneven by service. Starter prompt: *"List every S3 bucket in our account that's publicly readable and tell me which were created in the last 90 days."*

**GCP MCP.** Official, similar shape — per-service servers under the Google Cloud umbrella. Service-account auth.

**Azure MCP.** Microsoft-published, broad but newer. Azure CLI integration as the underlying mechanism.

**Docker MCP.** Community-maintained, covers containers, images, compose. Local socket auth.

**Kubernetes MCP.** Community-maintained. kubeconfig auth, scoped to whichever contexts you grant. Read-heavy in practice — list pods, fetch logs, describe resources. Cluster-write operations should go through your normal CI/CD, not an agent.

**Vercel MCP.** Official. Deployments, projects, env vars, logs. API-token auth. The "what just broke production?" workflow on Vercel is dramatically faster with this installed.

**Netlify MCP.** Vendor-published, similar shape.

**Railway MCP.** Community-maintained at time of writing; the canonical pattern in this book's `CLAUDE.md` references a `railway-db-query` skill that wraps the Railway CLI. Useful for multi-env database work.

**Render MCP.** Vendor-published, narrower coverage than Vercel's. API-token auth.

---

## Calendars and scheduling

**Google Calendar MCP.** Bundled in the Google Workspace MCP. Read events, create events, manage attendees, find free slots. OAuth. Starter prompt: *"Find a 30-minute slot next week when Alice, Bob, and I are all free."*

**Outlook Calendar MCP.** Bundled in the Microsoft 365 MCP. Same capabilities.

**Cal.com MCP.** Official. Bookings, event types, availability, integrations. API-key auth. Strong fit for the solo-founder stack (`stack-startup-founder.md` lists Cal.com).

**Calendly MCP.** Vendor-published, narrower than Cal.com's. OAuth via Calendly.

---

## Filesystem and shell

A note, not a list: **filesystem access and shell execution are built in to every major terminal agent.** Claude Code, Codex, and OpenCode all read and write local files and run shell commands without any MCP install. You do not need a "filesystem MCP" or a "shell MCP"; they're part of the agent itself. (Some agents do package these as MCPs internally — that's an implementation detail, not something you configure.)

The only related connectors worth knowing about are *remote* filesystem MCPs (S3, GCS, Dropbox, Box) — those live in the Infra and Docs categories above respectively.

---

## How to find more

This appendix is a snapshot. The ecosystem moves fast — new MCPs publish weekly, old ones go stale, and the line between "official" and "community" shifts as vendors take over community implementations. When you need a connector that isn't here, the search order is:

1. **The Anthropic MCP registry.** Your agent can search it directly — *"search the MCP registry for a server for [tool]"*. The registry is the closest thing to a canonical index.
2. **The vendor's own site or developer docs.** Big vendors (Google, Microsoft, Stripe, GitHub, Shopify, Atlassian, Linear) increasingly publish official MCPs. Search *"[vendor name] MCP"* — if they have one, it's usually the top result.
3. **GitHub awesome-lists.** Search for `awesome-mcp`, `awesome-claude-mcp`, `awesome-claude-skills`. Quality varies; star count is a rough signal.
4. **Community Discord and forum threads.** The MCP and Claude Code Discords (and the Codex / OpenCode equivalents) usually have a #mcp-servers channel with the latest community recommendations.
5. **Your agent itself.** Ask: *"Is there an MCP server for [tool]? Search the registry and vendor site, summarize what you find, and propose the best option."* This is the Ch. 9 discovery loop; running it for every new system is the habit the book asks of you.

### When nothing exists

If no MCP exists for a system you need and the tool has an API, the answer is *write one*. Ask your agent:

> *"There's no MCP for [tool]. Write a minimal one that covers [the 2-3 operations I actually need]. Use the [vendor]'s REST API. I'll provide an API key when you're ready to test."*

A focused single-vendor MCP wrapping 2-3 endpoints is usually a 20-30 minute job for the agent — far cheaper than waiting for someone else to ship one, and you control exactly what surface area is exposed. If the tool catches on internally, you can later promote the rough wrapper into a polished, shareable MCP server.

The same approach handles the *partial-coverage* problem: when an MCP exists but is missing the one endpoint you need (a common case with community servers), ask the agent to fork it locally and add the missing tool. You don't need to upstream the change to benefit from it.

This is the through-line of the book: **if you can describe what you want the agent to do, you can ask the agent to build the bridge to do it.** The list above is a starting map of bridges others have already built. The bridges you build next will be specific to how *you* work — and that's exactly the point.
