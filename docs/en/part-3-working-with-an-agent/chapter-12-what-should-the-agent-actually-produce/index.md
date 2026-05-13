# 12. What should the agent actually produce?

A PM asks her agent for "a competitive analysis of three pricing pages." The agent dutifully comes back with a thoughtful 1,200-word analysis — in the chat window. She tries to paste it into Notion; the formatting breaks. She tries to share it with her team; she ends up emailing a screenshot. By the time the analysis is in front of the people who need to read it, an hour has passed.

The agent did the work. The output form was wrong.

Most under-utilized agents are under-utilized at this exact point: the human asks for the *content* but never specifies the *deliverable*. The agent picks a default — usually a chat-window response — and a perfectly good piece of work ends up in a place where it can't be used.

This chapter is about closing that gap.

## The one cardinal question: artifact or action?

Before you specify a format, ask yourself one thing.

**Do you want the agent to produce an *artifact* (a document, a file, a piece of media that you can read or share) — or do you want it to take an *action* (update a system, create a ticket, send a message, launch a campaign)?**

That single question reorganizes everything else.

If the answer is **action**, you don't need a document at all. The deliverable is a new row in Salesforce, a Linear ticket assigned to the right person, a Slack message posted in `#design-review`, a PR opened with the right reviewers tagged, a calendar event on three people's schedules. The agent reaches into a real system via MCP and changes its state. You verify in the system itself, not in the chat window.

If the answer is **artifact**, then you pick a format — and the format depends on who will read it, where it will live, and what it needs to do.

A lot of people default to "artifact" out of habit and end up doing manual data entry afterward — the agent drafted the ticket text, then *they* opened Linear and pasted it in. That's the chatbot tax sneaking back in. If the work ends in a system that has an MCP, the deliverable should be the system update itself.

## The six output forms

For the cases where the deliverable really is an artifact, there are roughly six forms worth knowing. Pick on purpose; don't default.

### 1. Markdown — the right default

Markdown is the agent's lingua franca and yours. It's plain text, so it diffs cleanly in git, pastes into Notion / Slack / GitHub / Linear / Confluence without surprises, and renders beautifully everywhere. It's readable as a file. It's tweakable by hand. It can carry headings, lists, tables, code blocks, links, even Mermaid diagrams that render inline on GitHub.

Use Markdown for: research summaries, meeting notes, drafts of any kind, requirements docs, runbooks, READMEs, blog posts, ticket descriptions before they go into the tracker, anything you might paste into something else later.

When in doubt about format, the right answer is Markdown.

### 2. HTML — when you want the output to be interactive or visually polished and openable in any browser

When Markdown isn't enough — when you want something that *looks* finished and can also click, scroll, or animate — ask for an HTML file. The agent writes the file; you double-click it to open. No setup, no build step, no install. Any browser handles it.

Examples that land cleanly here: a one-page report with charts and clickable sections, a slide-deck-style summary you can flip through, an email preview to eyeball before you send, a small mock that needs to feel real for a meeting tomorrow.

Use HTML for: client-facing one-pagers, executive summaries with charts, lightweight slide decks, throwaway interactive prototypes, styled email previews, mocks that need to "feel real" without anyone touching a frontend project.

> *"Write me a single `report.html` summarizing this analysis. Include charts for the monthly numbers and make the sections clickable. I'll just double-click it to open."*

### 3. LaTeX → PDF — when typography is the deliverable

If the *appearance* of the document is part of the message — academic papers, signed contracts, financial reports, anything with serious math, anything that needs to print like a real publication — LaTeX is still unmatched. The agent compiles a `.tex` file to a PDF, and the result looks like it came out of a journal.

Most people will never need this. But if you're writing a research paper, a formal proposal, a math-heavy explainer, or something with serious typographic requirements, don't fight Markdown's limits — just ask for LaTeX.

### 4. Video — when motion or timing carries meaning

Some deliverables aren't documents. A product demo for a marketing page needs to *move*. A walkthrough of a new feature needs to *show*. A 60-second explainer needs *timing*.

The agent can build these directly. The pattern that works is a browser-automation tool driving the real product (recording the flow) combined with a video-rendering pipeline that adds chyrons, captions, and pacing. The `demo-video` skill (Ch. 17, Ch. 18) is the canonical example: it records a Playwright walkthrough of a live app, layers it under a Remotion render, and ships a polished `.mp4`. The first one took a session. The third one took one command.

You don't have to build that pipeline yourself; you ask the agent to. The deliverable is the video file.

### 5. Image — diagrams, charts, screenshots, generated art

Four very different sub-cases, each with a right tool:

- **Diagrams in a document or repo:** Mermaid. Text-based, renders inline on GitHub, edits cleanly. *"Draw the architecture as a Mermaid diagram in the README."*
- **Charts from data:** matplotlib / plotly. *"Plot this CSV's monthly revenue and save as `revenue.png`."*
- **Generated images for marketing or design:** the agent connects to DALL-E / Imagen / Stable Diffusion via MCP and produces them on request.
- **Screenshots of an actual UI:** the agent drives a real browser (Ch. 24), navigates, and captures.

Be specific about which sub-case you want. *"Make me an image"* is vague; *"draw a Mermaid sequence diagram of the auth flow"* is doable in one shot.

### 6. Direct action via MCP — no document at all

This is the form most people forget exists, and it's often the right one.

- *"File a Linear ticket for this bug, assign to Sasha, label `mobile-ios`, link to the Sentry issue."*
- *"Update row 47 in the campaign-tracker spreadsheet with the actual spend for last week."*
- *"Post a summary of this thread to `#engineering` in Slack."*
- *"Add the action items from this transcript to my Things inbox."*
- *"Create a Google Calendar event for the kickoff next Tuesday at 2pm and invite the team."*
- *"Open a PR with these changes, request review from @anna and @mark."*

In each case there is no document to copy-paste. The agent reaches into the system via MCP (Ch. 9) and the system updates. *That* is the deliverable. You verify it in the system itself — open Linear and look at the ticket, open the spreadsheet and look at the row.

This is the cleanest form of agentic work. It's also the form that the *"monitor, don't block"* stance from Ch. 7 was written for: let the agent take the action, watch the result in the system, intervene if something looks off.

## A decision framework

Five short questions, in order. The first one that fires picks your form.

1. **Does this work end in a system that has an MCP?** → **Direct action.** Ticket, row, message, PR, calendar event. No document.
2. **Does motion or timing carry meaning?** → **Video.**
3. **Is typography or print-quality part of the message?** → **LaTeX → PDF.**
4. **Does it need to look polished as a standalone document, or include light interactivity?** → **HTML.**
5. **None of the above?** → **Markdown.** And then it lives in your repo / Notion / Drive, where it can be revised forever.

For images, the decision is downstream of one of these — a Mermaid diagram lives *inside* a Markdown doc; a chart lives *inside* an HTML report; a screenshot is a side-effect of the agent driving a browser.

## How to specify it in the brief

Once you know the form, write it into the prompt. Two examples:

> *"Research the three closest competitors to our product. Output: a single `competitor-analysis.md` in the repo root, with one section per competitor (pricing, positioning, weaknesses, recent moves) and a one-paragraph summary at the top. Use Markdown tables for the pricing breakdown."*

> *"Triage today's Linear inbox. For each unassigned ticket: read it, decide which team owns it, assign it, add labels, and write a one-sentence summary in the comments explaining why you routed it that way. No final report to me — I'll review in Linear."*

In the first, the artifact is named, the location is specified, the structure is sketched. In the second, the deliverable is the *state of Linear at the end* — no artifact at all.

## Common mismatches and their fixes

A few patterns to watch for:

- **The "wrong container" mistake.** Asking for a polished report and getting it in the chat window. *Fix:* always specify a file path.
- **The "should have been an action" mistake.** Asking for a Markdown summary of a bug, then manually filing the ticket. *Fix:* skip the Markdown step; ask for the ticket directly.
- **The "asked for one, wanted three" mistake.** Asking for a research summary, then realizing you also want the tickets, the Slack post, and the calendar invite. *Fix:* state all the deliverables in the brief. The agent can produce multiple in one pass.
- **The "format vs. content" confusion.** Specifying tone and length but forgetting where the output should live. *Fix:* every brief answers both *what's in it* and *where it goes*.

## The takeaway

- The cardinal question is **artifact or action?** If the work ends in a system with an MCP, the deliverable is the system update, not a document.
- For artifacts, six forms cover almost everything: Markdown, HTML, PDF, Video, Image, and Direct action via MCP.
- Markdown is the right default. Reach for the others when their specific strengths matter.
- State the deliverable in the brief — name the file, the location, the structure, or the target system.
- The most common mistake is producing a document for work that should have been a system action.

## Try it yourself

**Exercise 1.** Take a task from your week that ended with you doing manual data entry — the agent gave you something, and you typed or pasted it into a tool. Re-do the task, but this time install the relevant MCP (Ch. 10) and ask the agent to write *into the tool directly*. Skip the intermediate document.

**You'll know it worked when** you didn't open a single browser tab or paste anything into a UI, and the work landed in the right system on its own.

*If you can't think of one, try this*: (a) imagine you got 5 customer emails today that need replies posted into your CRM — frame the exercise around drafting and writing those directly; (b) imagine you have 3 spreadsheet rows to update from a meeting note, and let the agent write them straight into the sheet.

**Exercise 2.** Take the fictional business update at `examples/ch-12-multi-format/quarterly-update-source.docx` (a one-page Brightline Foods Q3 memo) and ask the agent to produce four versions of it: a self-contained HTML report, a print-ready PDF, a channel-appropriate Slack / Linear / Notion draft, and a 30-second voiceover script. Then ask which of the four should be agent-creates-via-MCP vs. agent-hands-you-markdown.

**You'll know it worked when** the four outputs aren't four cosmetic skins of the same text — the channel post is shorter and skimmable, the voiceover reads aloud in 30 seconds, and the agent has an *opinion* about which formats are artifact and which are action.

## What's next

The agent acted. Now you have to look at what it did. Ch. 13 is about reviewing and recovering — for any kind of output, not just code.
