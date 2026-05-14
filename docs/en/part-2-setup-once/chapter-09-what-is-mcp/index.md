# 9. What is MCP, and which servers should you install on day one?

Your agent is set up. It knows who you are. You ask it:

> *"Pull the latest five emails from my finance vendor and tell me which invoices are unpaid."*

It pauses. Then it apologizes — it can read files on your computer, but it can't see your Gmail. You'd have to export the emails as a `.mbox` file, or paste them into the chat, or screenshot them.

You think: *that's stupid. ChatGPT can browse the web. Why can't this thing read my email?*

The answer is that the agent itself doesn't have hands into Gmail by default. Gmail is *somebody else's system*, behind an OAuth login, with its own API. For the agent to reach in, *somebody* has to write the connector — the piece of code that knows how to authenticate to Gmail, how to call its API, how to translate "five most recent emails" into the right request.

That connector is called an **MCP server**. And the elegant part — the part that makes the whole agent ecosystem work — is that the same Gmail MCP works for Claude Code, Codex, OpenCode, Cursor, and any future agent. Write it once, plug it into anything.

## The diagram, one more time

Ch. 2 introduced the spine:

```
User Prompt → AI Model → Orchestrator → MCP → Real tools/services
```

Zoom into the MCP box. The **Model Context Protocol** is exactly that — a *protocol*, an agreed-upon way for an agent to ask a tool to do something. Anthropic published it; the broader ecosystem adopted it. It's like USB: any device that speaks USB plugs into any laptop that speaks USB. Any MCP server that follows the protocol plugs into any agent that speaks it.

A useful metaphor: **MCPs are apps installed on your agent's phone**. Each one gives the agent a new capability. The Gmail MCP adds *read and send email*. The Linear MCP adds *create, read, update tickets*. The browser MCP adds *open pages, click, fill forms*. (Reading and writing local files isn't an MCP — that's built in to the agent itself.)

Without MCPs, your agent is a brilliant intern with no access to anything. With MCPs, it's the same intern, but now with logins.

## One round-trip, end to end

You type: *"Find the latest invoice from Stripe in my Gmail and tell me the amount."*

1. The **orchestrator** (the Claude Code / Codex / OpenCode process running on your machine) receives the prompt and passes it to the **model**.
2. The model decides: *I need Gmail*. It emits a structured **tool call** — *"call the Gmail MCP's `search_messages` function with query `from:stripe`"*.
3. The orchestrator sees the tool call and forwards it to the **Gmail MCP server** running locally (or remotely) on your machine.
4. The MCP server makes the authenticated API call to Google. Gmail returns five messages.
5. The MCP server returns those messages to the orchestrator, which passes them back into the model's context.
6. The model reads them, finds the invoice line, and answers: *"$847.23, dated March 12."*

Six steps. Sub-second between most of them. You see a stream of activity — "calling Gmail…" — and then the answer. The MCP made the round-trip possible. Without it, step 3 fails and the agent apologizes.

That's the entire mental model.

## You don't edit JSON

Now the thing that matters most for non-technical readers: installing an MCP server traditionally means editing a JSON config file. Vendors give you a snippet that looks like:

```json
"mcpServers": {
  "gmail": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-gmail"],
    "env": { "GMAIL_CREDENTIALS_PATH": "/Users/you/.gmail.json" }
  }
}
```

If you look at that and feel your eyes glaze over: good. You're not supposed to write it. **You ask the agent.**

The actual prompt is:

> *"Install the Gmail MCP and connect it to my Google account."*

That's it. The agent:

1. Searches for the official or best-known Gmail MCP server (Anthropic's registry, the vendor's site, or community lists).
2. Edits your MCP config file for you.
3. Walks you through the OAuth grant — usually a browser window that opens, you click *Allow*, the agent confirms it can authenticate.
4. Runs a quick sanity check ("I just read your three most recent emails — the subject lines are X, Y, Z. Confirm?").

Five minutes, total. You provided: one sentence and one OAuth click. You did not look at JSON.

The same shape works for everything:

- *"Install the Linear MCP and connect it to my workspace."*
- *"Install the Shopify MCP and authenticate it for my store."*
- *"Install the Notion MCP and connect it to my workspace."*

The agent finds the right server, installs it, configures it, authenticates, and verifies. Your part is naming the system and approving the OAuth.

## Day-one MCPs everyone should install

Regardless of your role, install a starter set. They cover the surfaces almost every knowledge worker touches.

*One note before the list: there's no "filesystem MCP" you need to install. Reading and writing files on your local machine is built in to every major terminal agent (Claude Code, Codex, OpenCode) — it's part of the agent itself, not an MCP. The list below is everything beyond the local filesystem.*

- **Gmail / Google Workspace** — read and send email; read Calendar; read Drive; read and edit Sheets and Docs. If your work email lives in Google, this is the highest-leverage single install.
- **Outlook / Microsoft 365** — the equivalent for the Microsoft side.
- **Browser** — let the agent open pages, click, fill forms, take screenshots. Ch. 25 goes deep on browser-driving; for now, install it. The two big options are *Playwright* (headless, scripted) and the headed real-browser tools (Claude for Chrome, computer-use APIs). You can have both.
- **GitHub** — for anyone who touches code or even reads a repo. Open PRs, read issues, comment.
- **Linear** or **Jira** — whichever your team uses for tickets. Create, read, update, transition.
- **Notion** — read pages, create pages, search.
- **Slack** — read channels, post messages. The "read" half is genuinely useful even if you never auto-post.

If you're in a specialized role, add the ones that match:

- **Engineers**: Sentry, your CI provider (GitHub Actions/CircleCI), your cloud (AWS/GCP/Vercel), your DB (Postgres MCPs exist — *with a readonly role*, per Ch. 7).
- **Marketers**: Google Ads, Meta Ads, Google Analytics, Search Console, HubSpot, SendGrid, Webflow / your CMS.
- **Sales**: Salesforce, HubSpot CRM, Apollo / similar enrichment, Calendly.
- **Finance / ops**: Stripe, QuickBooks / Xero, your bank's data export, payroll provider.
- **Analysts**: your data warehouse (BigQuery, Snowflake, Redshift), Metabase / Looker, dbt.

You don't install all of these at once. You install the ones for the systems you actually use this month. The discovery loop in the next section is the habit that gets you the rest over time.

## The discovery loop: "is there an MCP for X?"

This is the question that turns the abstract idea of MCPs into a working habit. Anytime you're about to do a task that touches a new tool, ask the agent:

> *"Is there an MCP server for Shopify? For Stripe? For our HRIS? For Calendly?"*

The agent searches the **Anthropic MCP registry**, the vendor's docs, GitHub awesome-lists, and community directories. It comes back with: official ones (best — vendor-published, maintained), community ones (often great, occasionally abandoned), or *"no, but I can write a minimal one for you."*

That last branch matters. If the system has an API and no MCP yet, the agent can write a tiny wrapper itself — sometimes in 20 minutes. You don't need to wait for someone else to publish it.

Do this *before* starting work on a new system, not in the middle of it. **Equip first, then engage.** That's the next chapter (Ch. 10) — the habit change the rest of the book asks for. An agent improvising against a tool it has never seen produces mediocre output; an agent pre-equipped with the right MCP inherits a fluent interface to that system.

The discovery loop also runs as a one-time audit. Pick a Friday afternoon early in your agent journey and paste:

> *"List the SaaS tools and systems I work with regularly — ask me to fill in the gaps. For each one, check whether an MCP server exists, and if it does, propose installing it. We'll go through them one by one."*

Twenty minutes later you have eight MCPs installed, and you'll spend the next six months reaping the leverage.

## MCPs vs. skills vs. slash commands — the question every reader asks

New readers conflate these. They're not the same shape; they sit at different layers.

- A **prompt** is what you type in the chat. One-off.
- A **slash command** is a named, reusable prompt — type `/changelog` and it expands into a longer instruction. Lightweight; user-defined.
- A **skill** is a reusable, named **procedure**. It tells the agent *how* to do something — *"to send a monthly investor update: read this month's metrics spreadsheet, compare to last month's update for the structure, draft the email in our usual tone, attach the chart, send to the investor list as a BCC"*. Skills often **compose multiple MCPs** in service of an outcome.
- An **MCP** is a new **tool** — a capability the agent didn't have before. Gmail. Linear. The filesystem. A database.

Said another way: **an MCP adds a tool; a skill adds a procedure**. The Gmail MCP lets your agent read email. A skill called `triage-inbox` uses the Gmail MCP, plus the Linear MCP, plus your own house rules, to *triage* the inbox according to how you actually work.

Ch. 17 lays out the four layers — prompt → slash command → skill → MCP — and when to reach for each. For now, the rule of thumb: **if the agent can't reach a system at all, you need an MCP. If it can reach the system but keeps doing the workflow wrong, you need a skill.** Ch. 10 picks this up with *equip first, then engage*.

## A checklist for the end of this chapter

You should now have:

- [ ] At least one MCP installed beyond the built-in filesystem — Gmail, Linear, GitHub, or whichever is closest to your daily work.
- [ ] Watched the agent perform one round-trip through an MCP (read your email, fetch a ticket, list your repos) and seen the streamed tool calls.
- [ ] Tried the discovery prompt at least once — *"is there an MCP for [a tool I use]?"* — even if you didn't install the result yet.
- [ ] An intuitive feel for the difference between *"the agent can't reach this"* (need an MCP) and *"the agent reaches it but does the wrong thing"* (need a skill, Ch. 17–19).

## In other tools

The MCP protocol is genuinely cross-tool. The same server works for any agent that speaks it.

- **Claude Code** — first-class MCP support; `claude mcp add ...` from the CLI, or the agent edits the config for you.
- **Codex** and **OpenCode** — both support MCP servers. Slightly different config locations; same protocol.
- **Cursor** — supports MCPs through its settings UI as well as config.
- **Gemini CLI** — added MCP support; check the current docs for the latest.

Don't worry about cross-tool plumbing yourself. *"I installed this MCP for Claude Code — make sure Codex also picks it up"* is a valid prompt.

## Try it yourself

**Exercise.** Run the discovery loop end-to-end once.

> *"List five SaaS tools or systems I use heavily. (Ask me if you don't know.) For each one, check whether an MCP server exists and propose installing it. Walk me through the install and OAuth for the first one — Gmail if I use Google, Outlook if I use Microsoft."*

**You'll know it worked when** you can ask the agent *"what are the three most recent emails from my finance team?"* and get a real answer pulled from your real inbox, without exporting anything.

## What's next

You've got hands. Ch. 10 turns those hands into a habit: **equip first, then engage** — the move that separates an agent who improvises (and produces mediocre work) from one that arrives fluent in your tools.
