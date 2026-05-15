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

Markdown is the agent's lingua franca and a sensible default for almost anything. It's plain text, so it diffs cleanly in git, pastes into Notion / Slack / GitHub / Linear / Confluence without surprises, and renders beautifully everywhere *it gets rendered*. It's tweakable by hand. It can carry headings, lists, tables, code blocks, links, even Mermaid diagrams that render inline on GitHub.

The honest caveat: **raw Markdown on its own is just text.** Open a `.md` file in TextEdit or Notepad and you'll see `# Headings` and `**bold**` as literal characters. Markdown only *looks* nice once something renders it — Notion, GitHub, a chat client, a static site, or the preview pane in your editor. If you're piping the result into one of those, perfect. If you want something that's immediately easy to *read* by a human who's going to double-click it, jump to HTML below.

Use Markdown for: research summaries, meeting notes, drafts of any kind, requirements docs, runbooks, READMEs, blog posts, ticket descriptions before they go into the tracker, anything you'll paste into something else later. When in doubt and the output is going to be rendered somewhere, the right answer is Markdown.

### 2. HTML — when you want something a human can just open and read

HTML is the right form **when the artifact needs to be readable on its own, without any rendering app in the middle.** Your agent writes one `.html` file; you double-click it; your browser opens it and it looks finished — headings, fonts, tables, sometimes charts, sometimes clickable sections. No build step, no install, no Markdown editor required, no "wait, does this person have Notion?" question to answer.

This is the form for the human moments: emailing a board update to someone who only checks email, leaving a one-pager on a shared drive for a non-technical colleague, sending a one-off report to a client who'll open it on their phone, showing a meeting attendee something polished without needing a slide deck app. Markdown lives in tools; HTML lives anywhere a browser exists.

Examples that land cleanly here: a one-page report with charts and clickable sections, a slide-deck-style summary you can flip through, an email preview to eyeball before you send, a small mock that needs to feel real for a meeting tomorrow, a dashboard-style view of a spreadsheet's results that the recipient can scroll through without opening Excel.

Use HTML for: client-facing one-pagers, executive summaries with charts, lightweight slide decks, throwaway interactive prototypes, styled email previews, board-update one-pagers, anything you want to *hand* to someone rather than make them open in a specific app.

> *"Write me a single `report.html` summarizing this analysis. Include charts for the monthly numbers and make the sections clickable. I'll just double-click it to open and forward it to my boss."*

### 3. LaTeX → PDF — when typography is the deliverable

If the *appearance* of the document is part of the message — academic papers, signed contracts, financial reports, anything with serious math, anything that needs to print like a real publication — LaTeX is still unmatched. The agent compiles a `.tex` file to a PDF, and the result looks like it came out of a journal.

Most people will never need this. But if you're writing a research paper, a formal proposal, a math-heavy explainer, or something with serious typographic requirements, don't fight Markdown's limits — just ask for LaTeX.

### 4. Video — when motion or timing carries meaning

Some deliverables aren't documents. A product demo for a marketing page needs to *move*. A walkthrough of a new feature needs to *show*. A 60-second explainer needs *timing*.

The agent can build these directly. The pattern that works is a **browser-automation tool** (Playwright — a piece of software that opens a browser, clicks buttons, and types like a real user, while recording everything to a video file) driving your real product, combined with a **video-rendering library** (Remotion — a tool that turns ordinary code into polished video, adding captions, animations, intros and outros) that adds the chrome on top. The `demo-video` skill (Ch. 18, Ch. 19) is the canonical example: it records a Playwright walkthrough of a live app, layers it through Remotion, and ships a polished `.mp4`. The first one took a session. The third one took one command.

**You do not need to know what Playwright or Remotion are.** You will never type either word at a keyboard. They are listed here for completeness because you might see the agent install them or mention them in a status update — that's normal, that's how it builds the video, and that is the agent's problem, not yours. You ask: *"make me a 30-second demo video of our reporting feature, using the live app at app.example.com, in our usual style."* The agent figures out which tools it needs, installs them, drives the recording, edits the result, and hands you the `.mp4`. The deliverable on your end is the video file. The pipeline is invisible.

**A second path worth knowing about**: the agent doesn't have to *make* the video locally. It can also **chain through a video-generation AI service** via MCP — Sora, Runway, Pika, Veo, whichever the agent has a connector for. The local pipeline above is the right answer when you're recording your *real product*. The AI-service path is the right answer when you're generating *new* visual content from a script ("a 10-second cinematic of a coffee bean rolling across a wooden table, soft morning light"). Often both are part of one workflow — record the product flow locally, generate a stylish intro animation via Sora, stitch them together. Same applies to other forms: images can be generated locally from data (matplotlib) or via DALL-E / Imagen / Midjourney; voice and music can be local or via ElevenLabs / Suno; transcription via Whisper / AssemblyAI. **Your agent becomes a conductor more often than a maker** — it orchestrates whichever service is best for that specific output, and hands you the finished file.

### 5. Image — diagrams, charts, screenshots, generated art

Four very different sub-cases, each with a right tool:

- **Diagrams in a document or repo:** Mermaid. Text-based, renders inline on GitHub, edits cleanly. *"Draw the architecture as a Mermaid diagram in the README."*
- **Charts from data:** matplotlib / plotly. *"Plot this CSV's monthly revenue and save as `revenue.png`."*
- **Generated images for marketing or design:** the agent connects to DALL-E / Imagen / Stable Diffusion via MCP and produces them on request.
- **Screenshots of an actual UI:** the agent drives a real browser (Ch. 26), navigates, and captures.

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
4. **Does a human need to just *open and read* it — without a specific app — or does it need light interactivity?** → **HTML.**
5. **None of the above, and the output is going to be rendered somewhere (Notion, GitHub, Slack, your editor)?** → **Markdown.** It lives in your repo / Notion / Drive, where it can be revised forever.

For images, the decision is downstream of one of these — a Mermaid diagram lives *inside* a Markdown doc; a chart lives *inside* an HTML report; a screenshot is a side-effect of the agent driving a browser.

## How to specify it in the brief

Once you know the form, write it into the prompt. Two examples:

> *"Research the three closest competitors to our product. Output: a single `competitor-analysis.md` in the repo root, with one section per competitor (pricing, positioning, weaknesses, recent moves) and a one-paragraph summary at the top. Use Markdown tables for the pricing breakdown."*

> *"Triage my Gmail inbox from today. For each unread email: read it, decide if it needs a reply, is just an FYI, or is junk. Reply-needed ones get drafted (don't send) with a starter response and labelled `Needs reply`. FYI ones get labelled `Read later` and archived. Junk gets labelled `Promo` and archived. No final report to me — I'll review in Gmail."*

In the first, the artifact is named, the location is specified, the structure is sketched. In the second, the deliverable is the *state of your inbox at the end* — no document at all. You don't open the chat to read a summary; you open Gmail and see the work is done.

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

**Exercise 2.** Take the fictional business update at [`examples/ch-12-multi-format/quarterly-update-source.docx`](/examples/ch-12-multi-format/quarterly-update-source.docx) (a one-page Brightline Foods Q3 memo) and ask the agent to produce four versions of it: a self-contained HTML report, a print-ready PDF, a channel-appropriate Slack / Linear / Notion draft, and a 30-second voiceover script. Then ask which of the four should be agent-creates-via-MCP vs. agent-hands-you-markdown.

**You'll know it worked when** the four outputs aren't four cosmetic skins of the same text — the channel post is shorter and skimmable, the voiceover reads aloud in 30 seconds, and the agent has an *opinion* about which formats are artifact and which are action.

## What's next

The agent acted. Now you have to look at what it did. Ch. 13 is about reviewing and recovering — for any kind of output, not just code.
