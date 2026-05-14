# 11. Why is context everything?

You're forty minutes into a session and the agent has gone strange. It's suggesting things you already shot down. It's contradicting a decision it made in its own previous message. It's confidently telling you the file lives in a folder you renamed twenty minutes ago. You didn't change anything; it just… drifted.

You're not crazy. The agent forgot. Or — more precisely — what it can *see* right now is no longer a faithful picture of what you've been doing together.

Context is the substrate the agent thinks on. Get the context right and a mediocre model produces good work. Get it wrong and the best model in the world will hallucinate, repeat itself, and pull confidently in the wrong direction.

## What "context" actually is

In a chatbot, context is roughly *the conversation so far*. In an agent, it's broader and much more useful:

- The conversation so far.
- Every file the agent has opened or read.
- The output of every command it has run.
- The screenshots you've pasted in.
- The links it has fetched.
- The tickets, transcripts, PDFs, and CSVs you've handed it.
- The `CLAUDE.md` / `AGENTS.md` that tells it who you are and how you work (Ch. 8).
- The skills and MCP tools it knows it has available (Ch. 9, Ch. 10).

All of this lives in something called the **context window** — the working memory the model has access to on this turn. Modern context windows are large (Claude Sonnet 4.5 sits at 200K tokens; some models go to a million or more), but they are finite, and how you fill them matters more than how big they are.

A useful image: the agent is a smart consultant who just walked into the meeting. The context window is *everything on the table in front of them*. If the right document isn't on the table, they don't have it. If the table is covered in documents from three other projects, they'll struggle to find the one that matters.

## "Show, don't tell" applies to agents too

The biggest single upgrade most readers can make to their prompts is to **stop describing things the agent could just look at.**

The chatbot way:

> *"My bank statement looks weird this month — I think there are some duplicate charges from my phone bill or maybe a subscription I forgot about. Can you help me figure out what's going on?"*

The agent way:

> *"Read `~/Downloads/bank-statement-nov.pdf`. Find any duplicate charges, anything that looks like a forgotten subscription, and tell me what to follow up on."*

You stopped narrating the problem. You handed over the source and let the agent observe directly. Almost every *"the AI gave me a bad answer"* complaint can be traced back to the human paraphrasing something the AI could have read in full.

A few more in the same shape, across different kinds of work:

- *Bad:* *"Here's a rough description of what the client said in yesterday's meeting…"*
  *Good:* *"Read the transcript at `~/Downloads/acme-call-2026-05-10.txt` and summarize the client's three asks."*
- *Bad:* *"The page looks weird on my phone."*
  *Good:* *(pastes two screenshots)* *"Here's how it looks on my phone. Here's how it looks on my laptop. What's different?"*
- *Bad:* *"My ad isn't performing well."*
  *Good:* *"Pull the last 14 days of performance from my Google Ads account for the 'Spring Launch' campaign. What's off?"*
- *Bad:* *"This contract from the vendor seems off but I can't quite say why."*
  *Good:* *"Read `~/Documents/vendor-contract-v3.pdf`. Flag any clause around auto-renewal, liability cap, or IP ownership that looks unusual for a service agreement of this size."*
- *Bad:* *"My boss wants a one-pager on Q3 sales by Friday."*
  *Good:* *"Read `q3-sales.xlsx`. Build a one-page summary suitable for a board audience — headline number, top 3 wins, top 3 misses, what changed vs Q2. Save it as `q3-onepager.md`."*

## Screenshots, PDFs, and the multimodal upgrade

A screenshot is *the cheapest, highest-density way to give the agent context about something visual.* You'd be surprised how often it's the answer.

Floor plan of your apartment, asking where to put a mesh-WiFi node. A confusing utility bill where you want to know which line item is wrong. A Figma comment thread you want triaged into tickets. A dashboard you can't quite read. A whiteboard photo from this morning's meeting. In every one of these cases, the right move is to drop the image in and ask the question — not to type out what you think you see.

Same for PDFs. Contracts, research papers, scanned receipts, technical spec sheets. The agent reads them natively. You don't need to copy the text out first; that's the chatbot tax all over again (Ch. 1).

## Files and folders beat copy-paste

Whenever the input is a file you already have on disk, *point the agent at the file*. Don't paste its contents into the prompt. This works for almost every file format you actually use at work:

- **Documents** — Word (`.docx`), PDF, plain text (`.txt`), Markdown (`.md`).
- **Spreadsheets** — Excel (`.xlsx`), Google Sheets exports, CSV.
- **Slides** — PowerPoint (`.pptx`), Keynote, PDF exports of decks.
- **Images** — photos (`.jpg`, `.heic`), screenshots (`.png`), scans of receipts and forms — the agent reads them visually, no OCR step required from you.
- **Audio / video** — meeting recordings (`.mp4`, `.m4a`), voice memos — most modern agents either transcribe natively or invoke a transcription tool on your behalf.
- **Data exports** — JSON, XML, the messy CSV that came out of your accounting system at 11pm.

Two reasons it beats copy-paste. First, the agent will actually read the *whole* file (or as much as it needs), not whatever fragment you happened to paste in. A PDF contract is 14 pages; you'd never paste the whole thing. Second, you keep the prompt itself short and skimmable. The prompt is for *instructions*; the file is for *inputs*. Mixing them makes both harder to revise.

```
"Read ~/Downloads/Q3-sales.xlsx and tell me why our APAC numbers
keep dropping in the last week of every month. Look for recurring
patterns I might have missed."
```

Twenty words of prompt, a 4 MB Excel workbook of data. The agent does the rest. The same shape works for a 90-page PDF contract, a folder full of meeting screenshots, a `.pptx` deck you need a summary of, or a photo of a handwritten flipchart from this morning's offsite.

## Links: when fetching beats summarizing

If the relevant information lives on a public webpage, hand the agent the URL and let it fetch the page itself. Don't paraphrase. Don't copy-paste a section. The agent has a web-fetching tool — let it read the whole page.

This matters for the same reason files matter: paraphrases are lossy. The agent will pick up signal from headings, structure, footnotes, and adjacent paragraphs that you would never think to copy out.

When the source requires authentication or is behind a portal, that's when the **browser MCP** earns its keep — the agent drives a real browser, logs in (with your blessing), and reads the page that way. Ch. 26 is the deep-dive on this.

## The throughline from Ch. 8: persistent context

Some context shouldn't be re-typed every session. Who you are. What you work on. What conventions your team follows. The shape of your codebase. The brand voice. The fact that your test command is `make test` and not `npm test`.

That's what `CLAUDE.md` / `AGENTS.md` is for, and Ch. 8 walked through it: you do *not* hand-author that file; you have a five-minute conversation with the agent and it writes the file. The agent reads it automatically at the start of every session in that project, so you never have to re-explain the basics.

For cross-session memory that isn't project-specific — your name, your preferences, the fact that you skip the `Co-Authored-By` trailer in commits — most agent tools have a long-term memory layer (Claude Code's memory, Codex's persistent context, OpenCode's equivalents). Same pattern: the agent writes its own memory; you confirm what it remembers.

## Why long sessions go sideways

You've been working with the agent for two hours. You've opened a dozen files. You've explored three dead ends. You've corrected the agent five times. You've shipped one thing and started a second.

Then it starts repeating itself. Or it confidently references a decision from an hour ago in a way that doesn't match what you remember. Or it just feels *slower and worse*.

This is **context bloat**. The context window is finite, and you've packed it with old exploration, abandoned plans, files that are no longer relevant, and (worst of all) the agent's own previous tool outputs from things you've already finished. The signal you want — the *current* task — is drowning in noise.

Most agent tools handle this with **compaction**: at some threshold, the agent automatically summarizes the older parts of the conversation to make room for new work. Compaction is necessary, but it's also lossy. The summary the agent writes of "what we were doing earlier" may quietly drop a detail you cared about.

The honest cure is not to fight compaction; it's to **start fresh when the task changes**. When you finish a unit of work — a bug fixed, an article drafted, a campaign launched — close the session and open a new one for the next task. Each new session inherits the persistent context (`CLAUDE.md`, memory, skills, MCPs) but starts with a clean working table. Ch. 16 is the working chapter on managing the window once you're inside a session — `/compact`, `/clear`, the handoff file, why position matters more than size. Ch. 17 picks up the related discipline *before* the session begins: every installed MCP or skill is itself loaded context, and over-installing has real costs (with empirical numbers).

Heuristics for "time to start fresh":

- You finished one task and the next one isn't a direct continuation.
- You've corrected the agent on the same misunderstanding twice.
- The agent is referencing files or decisions in a way that feels off.
- You're more than an hour or two in and the work has wandered.

Cheap, fast, no penalty. Start a new session.

## Use sub-agents to keep the main thread clean

When you have a side-quest — *"research this on the web for me"*, *"go investigate why the staging DB is slow"*, *"look at every file under `lib/` and tell me which ones import deprecated APIs"* — you don't have to do it in your main session. You can hand it to a **sub-agent**: a fresh, throwaway agent instance with its own context window.

The sub-agent goes off, burns through its own context doing the research, comes back with a short summary, and your main thread stays clean. Ch. 15 covers this in depth; for now, just know that this is the right move when you're about to do something noisy that would otherwise crowd your main session.

In other tools: Claude Code has the `Task` tool for spawning sub-agents; Codex and OpenCode have similar primitives. The mental model is the same in any of them.

## The takeaway

- Context is everything the agent has on the table right now — conversation, files, tool output, screenshots, links, persistent project memory.
- Don't describe what the agent could just *see*. Hand it the file, the URL, the screenshot, the transcript.
- Persistent context (Ch. 8) saves you from re-explaining the basics every session.
- Long sessions go sideways. When you finish a task or feel drift, start a fresh session — it's cheap.
- Hand noisy side-quests to a sub-agent so your main thread stays focused (Ch. 15).

## Try it yourself

**Exercise 1.** Find a task you've been describing to a chatbot in long paragraphs. Replace the description with *"read this file"* or *"look at this screenshot"* and ask the same question. Compare the answers.

If you don't have a task handy right now, the book repo ships a ready-made one at `examples/ch-11-context/meeting-notes-raw.docx` — a messy ~2,000-word Word transcript of a product strategy meeting with action items, owners, and deadlines embedded mid-sentence rather than listed. Drop it in front of your agent:

> *"Read `examples/ch-11-context/meeting-notes-raw.docx`. Extract action items, owners, and deadlines. Flag anything where the owner or deadline isn't clear from the text."*

**You'll know it worked when** the agent's response references specifics you never typed out — section headings, exact numbers, a phrase from line 47, or in the meeting-notes case, ownership inferred from context (*"Dev? — ugh, ok"*) — proving it actually read the source instead of working from your paraphrase.

**Exercise 2.** Take a session that has been running for over an hour. Save what matters (a summary of decisions, the file paths you touched), close it, and open a fresh session for the next task. Notice the difference in response quality.

**You'll know it worked when** the new session feels noticeably sharper on the first prompt than the old session did on its last.

## What's next

You've equipped the agent (Ch. 10) and given it the right context (this chapter). The next question is the one most people under-specify: *what is the agent actually supposed to produce?* Ch. 12 walks through the six output forms and the one cardinal question — artifact, or action?
