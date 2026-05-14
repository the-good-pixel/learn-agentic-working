# 10. Equip first, then brief

You sit down on a Monday with what looks like a tidy task. Your Shopify store has 240 products. You want the agent to look through the catalog, pick the twenty most ad-worthy items, and launch a small Google Ads campaign for each cluster. You open your agent, you type:

> *"Look at my Shopify store and create some Google Ads campaigns for our best products."*

And the agent — being agreeable — starts trying. It maybe opens a browser. It maybe asks you for your Shopify admin URL. It maybe pastes a generic ad-copy template that has nothing to do with your actual products. Forty-five minutes later you have three half-broken campaigns, two browser tabs open to login screens, and a vague sense that this was supposed to be easier.

The mistake wasn't in the prompt. The mistake was *starting the task before you equipped the agent*.

## The habit change

Almost every reader of this book is carrying over one reflex from the chatbot era:

> *"OK, new task — let me think about how to do this."*

That reflex needs to be replaced with a new one:

> *"OK, new task — what tools and platforms are involved? Are there any pre-built MCPs or skills for them? If yes, install them. Then I'll start."*

This is the single most important habit change the book asks for. It's a small move at the front of every task. It costs you one extra prompt. And it changes the quality of the work the agent does for the rest of the session — because instead of improvising against a tool it has never seen, it inherits *accumulated knowledge* of how that tool actually behaves and how your team uses it.

We named these connectors and workflows in earlier chapters. An **MCP** (Ch. 9) is an app installed on the agent's phone — a connector that gives it a new tool, like "talk to Shopify" or "talk to Google Ads". A **skill** (preview from Ch. 9, full treatment in Ch. 17–19) is a saved procedure — a war-story or a team SOP captured as a reusable named workflow.

The Monday morning move is: **before you start the task, check whether either exists for the platforms you're about to touch. If they do, install them. *Then* brief the agent.**

## Replay the Shopify + Google Ads scenario, properly

Same task. Different first prompt.

> *"Today I want to audit my Shopify store and launch Google Ads campaigns for our best-performing products. Before we start: is there an MCP for Shopify? Is there one for Google Ads? Are there any published skills for ecommerce-to-ads workflows? Have a look in my local skills, the Anthropic MCP registry, vendor sites, and GitHub community lists. Tell me what you find before installing anything."*

That's it. That's the whole habit change in one prompt.

What happens next is the agent goes shopping. It searches the Anthropic registry. It checks the official Shopify developer site (yes, Shopify ships an MCP server). It checks whether a Google Ads MCP exists yet (at time of writing: yes, community-built ones exist; the vendor-published one is in flux — the agent will tell you the state of things today, which is more reliable than this paragraph). It scans your `~/.claude/skills/` folder for anything you or your team have already written. It comes back with a short list.

You read the list. You say:

> *"Install the Shopify MCP and connect it to my store. Install the community Google Ads MCP. We don't have a skill for ecommerce-to-ads yet — note that. Once both MCPs are connected, confirm they work by pulling one product and listing my Google Ads account name back to me."*

Two minutes later, the agent is equipped. *Now* you brief it on the actual task. And the difference is night and day: the agent already knows the shape of Shopify's product object, the structure of Google Ads campaigns, the rate-limit etiquette, the OAuth scopes you granted. It is no longer guessing.

## The order of operations

When you're working in a new domain, here's the order to look in, top to bottom. Stop at the first hit.

1. **Your own user-level skills.** Already installed. Free to use. Open `~/.claude/skills/` (or ask the agent to list them) and see what's there.
2. **Your team's shared skill library.** If your team has a repo of project-level skills (committed under `.claude/skills/` in your codebase), the agent will pick those up automatically when you `cd` into the project.
3. **Vendor-published MCP servers.** Shopify, Linear, Stripe, GitHub, Google Workspace, Notion, Slack, Atlassian, Cloudflare, Sentry — most major SaaS vendors now ship their own. Official means maintained, means reliable.
4. **The Anthropic MCP registry and community / awesome-MCP lists.** A surprisingly large amount of the long tail is covered here. The agent knows how to search it.
5. **A GitHub search.** Someone has often written `awesome-claude-skills/<vendor>` or a one-off MCP server for a tool you didn't expect to be covered.
6. **Ask the agent to write one.** If none of the above turns up anything usable, a minimal MCP wrapper or skill for a basic CRUD API is a 20-minute job for the agent. Cheaper than you'd think.

You do not have to run this checklist in your head. You can outsource the whole loop to the agent: *"is there an MCP or skill for working with Google Ads? Check in this order: my local skills, the Anthropic registry, the vendor site, and a GitHub search."* The discovery loop is itself a prompt.

## "Install the X MCP" — what that actually looks like

You do **not** edit JSON config files. You do not paste API keys into anything. The language you use with the agent is:

> *"Install the Gmail MCP and connect it to my Google account."*

The agent installs it (usually a one-line registration in the right place), prompts you to click through a one-time OAuth grant in your browser, and confirms it works by reading the most recent message in your inbox back to you. The phrasing matters: *install*, not *set up*. *Install* sounds like one phrase from you and one action by the agent. *Set up* sounds like manual technical work. Use the language that matches what's actually happening.

For non-vendor tools that need a credential, same idea — *"install the Linear MCP and use this API token: lin_api_..."*. The agent stores it in the right place and never asks again.

> **In other tools.** Codex, OpenCode, Cursor agents, and Gemini CLI all support MCP, with small variations in the install command and config location. The phrasing — *"install the X MCP"* — works in any of them. Your agent knows where to put it.

## The canonical working rhythm

Equipping is the *before*. Reviewing is the *after*. The shape of the work in between — every time you hand the agent a task that's bigger than a one-liner — is the same six-beat rhythm. Internalize this and most of what the rest of the book teaches becomes muscle memory.

1. **Ask the agent to study the problem first.** Give it the files, the context, the goal. Don't ask it to act yet. *"Read these three tickets, the spreadsheet in the inbox, and the BRAND_VOICE doc. Don't change anything yet — I want you to understand the shape of the work first."*
2. **It comes back with a plan.** A list of steps, files it'll touch, decisions it sees needing your judgment. It might flag two or three places where it had to guess and wants your call before proceeding.
3. **You read the plan and edit it.** This is your highest-leverage move in the whole session. Catch a wrong assumption now and it costs you one line of correction. Catch the same assumption after the agent has been running for an hour and it costs you the hour. The plan is cheap to fix; the execution is not.
4. **You tell it to go.** *"Looks good, proceed."* Or with edits: *"Looks good but change step 3 to do X instead of Y, then proceed."* The agent goes.
5. **You monitor the run.** Not by approving every step — by watching the streamed output as the agent works. Grab a cup of coffee. The coffee is part of the process, not a joke; the agent doesn't need you to babysit each tool call, it needs you *available* if it gets confused. This is *monitor, don't block* (Ch. 7) made concrete: monitoring scales because you stop pretending each step needs your sign-off.
6. **You review the results.** Spot-check the artifacts. Ask the agent to summarize what it did. Approve, edit, or ask for a redo. (Ch. 13 unpacks this layer in detail.)

This rhythm shows up everywhere from a 10-minute clean-up task to a multi-hour autonomous run on a hard problem. The relative *size* of each beat changes — for a small task, beats 1 and 2 collapse into a single sentence; for a multi-hour run, beat 3 might involve thirty minutes of careful editing — but the order doesn't. Plan, edit the plan, go, watch, review.

When you notice a session going badly, almost always the diagnosis is: *you skipped a beat*. You skipped the plan and let the agent improvise. You approved a plan without reading it carefully. You walked away during the run without leaving the stream visible. You accepted the summary without spot-checking. The rhythm is the antidote.

## Brief like a colleague, not a search engine

Once you're equipped, the second half of the habit is the brief itself. The chatbot era trained us to write prompts like search queries — short, keyword-dense, optimized for a single response. Agents reward the opposite. The mental model that works is:

> *"A smart, helpful colleague just walked into the room. They have no context on what I'm working on. What do I tell them?"*

You tell them:

- **What you're trying to accomplish.** The actual outcome you want.
- **What you've already tried** (if anything) and what went wrong.
- **Where the relevant inputs live.** The Linear ticket, the Notion doc, the spreadsheet, the screenshot.
- **Constraints.** Budget, deadline, brand-voice rules, "don't touch production", whatever applies.
- **What "done" looks like.** The format of the deliverable (see Ch. 12) and where it should land.

You don't have to fit this on one line. Multi-paragraph briefs are normal and welcome. The agent is patient.

A weak brief: *"Look at my Shopify store and make ads."*
A strong brief: *"I want to launch Google Ads campaigns for our top 20 Shopify products this week. Budget: $50/day per cluster, $500/day total cap. Audience: existing customer lookalikes plus broad interest targeting in the US and Canada. Brand voice: read `BRAND_VOICE.md` in the repo root — short, dry, no exclamation marks. Before launching anything, give me a plan: which products you'd cluster, what the campaign structure would be, and a sample ad for one cluster. I'll approve before you actually create the campaigns in Google Ads."*

Same task. The second one will produce work you can ship.

## Plan first, or just go?

A useful sub-habit: when the task is non-trivial, ask for a plan before the agent executes. Most modern agents have a dedicated mode for this — in Claude Code it's **Plan mode** (Shift+Tab to toggle), which lets the agent read, search, and think but blocks it from making changes until you approve. Codex and OpenCode have equivalents. The point is the same in any tool: you get to read the agent's plan, push back, redirect, and *then* let it work.

Plan mode is the right default for anything that's going to take more than a few minutes, touch multiple systems, or write to anything you care about. For five-minute tasks ("rename these files", "answer this question about the codebase"), just go — asking for a plan is more friction than the task itself warrants.

## Should the model think longer?

Modern models support **extended thinking** or **reasoning budgets** — letting the model spend more tokens chewing on a problem before it acts. Claude, GPT-5, Gemini all expose some version of this. The trade-off is real: extended thinking can dramatically improve hard reasoning, multi-step planning, and tricky debugging. It also costs more and takes longer.

Rule of thumb: turn it on for **planning a complicated migration, debugging an issue that has resisted the obvious fixes, or designing something that has to be right the first time.** Leave it off for routine tasks, where the extra thinking is expensive theater. If you're not sure, try the task with default thinking first; only escalate if you're not happy with the result.

## The takeaway

- The chatbot-era reflex is *"how do I do this?"* The agent-era reflex is *"what tools and skills exist for this? Install them first."*
- The discovery question — *"is there an MCP or skill for X?"* — is itself a prompt. The agent does the searching and the installing.
- Search in order: your skills → your team's skills → vendor MCPs → registries and community lists → GitHub → write one if nothing exists.
- Once equipped, brief like a colleague: outcome, inputs, constraints, what done looks like.
- For non-trivial work, ask for a plan first. For genuinely hard reasoning, let the model think longer.

## Try it yourself

Pick a platform you use at work that is *not* obviously a developer tool — your CRM, your ad platform, your help desk, your accounting system, your project tracker. Open your agent and ask:

> *"Is there an MCP or published skill for working with [platform]? Check my local skills, the Anthropic registry, the vendor's official site, and GitHub. Tell me what you find before installing anything."*

**You'll know it worked when** the agent comes back with a real list (not "I don't know") and you can choose whether to install one. If the agent says nothing exists, the next prompt is *"write a minimal MCP wrapper for [the two or three operations I need]"* — and that's a perfectly fine answer too.

## What's next

You've equipped the agent and briefed it well. Now the question becomes: *what context does the agent actually need to do the work?* Ch. 11 unpacks why context — files, screenshots, links, transcripts — is everything, and why long sessions go sideways.
