# 23. Talking and showing: voice and vision as input

You're walking back from lunch, phone in hand, and a thought lands: the onboarding flow for new users has been bugging you for a week. Three specific friction points, in order. By the time you sit down at your desk, the first one has already slipped, and you're halfway through reconstructing the second.

You unlock your phone, hold down the dictation key, and talk for ninety seconds. The agent transcribes, cleans up the umms, and drops a draft Linear ticket with three sub-tasks into your queue. You open your laptop, glance at it, fix one phrasing, file it.

That's typing replaced by talking. You also never opened Notes, never copy-pasted, never re-typed at a keyboard the thing you'd already articulated at walking pace.

> **You need this when** keyboard input becomes the bottleneck — when the bottleneck isn't the agent's thinking or your deciding, but the speed of your hands. Or when the thing you're trying to describe is visual and your words keep falling short.
>
> **You don't need this on day one.** Almost everything in the rest of the book works fine with a keyboard and pasted screenshots. This chapter is about widening the input channel when the keyboard starts to feel narrow.

## Why a wider input channel matters

The standard agent loop is: you type, the agent thinks, the agent acts, you read. The bottleneck on most days is *the agent acts* — the work itself. But there are days when the bottleneck is *you type*. Long briefings. Walking around. Drawing on a whiteboard. Pointing at a thing on the screen and saying "this, but smaller, here."

Voice and vision are the two ways to widen that input channel.

Voice is faster than typing for most people once you cross about twenty words. Studies on dictation peg fluent speakers around 150 words per minute spoken, versus 40-60 typed for office workers. The gap shows up most on long, conversational briefings — the kind where you're explaining context, not authoring prose.

Vision is wider still, because some things just don't compress into words. A screenshot of a broken layout is worth two paragraphs of "the third row is misaligned and the button color is off." A photo of a whiteboard is worth a meeting transcript.

The trick with both is knowing when each genuinely helps and when it's a novelty.

## Voice: when it's faster

Three cases where voice actually pays off:

**Long context dumps.** You're briefing the agent on a new feature, an incident timeline, or a strategy. You have it all in your head and you'd rather monologue than type. Dictate the brief, hand it to the agent, let it ask follow-ups in text.

**Walking thoughts.** Insights that show up when you're not at a desk. The cost of *not* capturing them is high; the cost of typing them on a phone keyboard is high too. Dictation closes the gap.

**Multi-step instructions where the order matters.** "First check the staging DB, then if you see more than ten rows, draft an email to support, otherwise just log it and move on." Spoken naturally, that's a four-second sentence. Typed cleanly, it's a careful paragraph.

And one big case where voice is a *novelty*:

**Anything where precision matters more than speed.** Code, file paths, ticket IDs, exact phrasing for a customer email. Voice will mishear "Hexagon" as "hex a gone" and you'll waste more time fixing it than typing would have cost. Use the keyboard for those.

The current way most people do this in practice: phone-side dictation (iOS / Android system dictation, MacWhisper, Wispr Flow, Superwhisper) feeds straight into the agent's chat surface. On a laptop, push-to-talk dictation tools sit alongside the terminal or the chat window. The agent doesn't care where the text came from; it just sees a prompt.

The agent can also *talk back*. Most of the time you don't want it to — reading is faster than listening — but for hands-occupied moments (driving, cooking, walking the dog) audio output paired with voice input is the only mode that works at all. Treat it as a corner case, not the default.

## Vision: when seeing changes the answer

The bigger shift is on the input side. Modern agents can take *images* as part of a prompt, and that quietly changes what you can ask for.

A few real cases that fall flat without vision and click with it:

**"What's wrong with this layout?"** You drag a screenshot of the broken page into the chat. The agent reads the rendered pixels — alignment, color, spacing, hierarchy — and tells you what's off, often more accurately than reading the page's style code would. Then it fixes the styling.

**"This bank statement is confusing — what's actually being charged here?"** You snap a photo of the statement. The agent reads the line items, groups them, calls out the recurring charges and the one-time ones, and tells you which fee is new.

**"Help me place the mesh WiFi nodes."** You hand it a photo of your floor plan. The agent reads the rooms, the likely thick walls, the placement of the modem, and gives you three placements with reasoning. You couldn't describe the layout in words faster than the photo did.

**"Why doesn't this Threads post show a link preview?"** You screenshot the broken preview, the agent looks at it alongside the URL, fetches the page, and walks you through which Open Graph tag is missing. (You'll meet this scenario again in Ch. 24 from the *browser-driving* side.)

**"Read this whiteboard."** A photo of the meeting whiteboard becomes a structured list of decisions, action items, and open questions.

**"Is this contract clause normal?"** A photo of the page. The agent reads it, flags the unusual phrasing, suggests a redline.

What ties these together: in each case, *describing the thing in words* would either take longer than taking the picture, or lose information you didn't know was important. The image carries the context. The agent does the seeing.

## How this works under the hood (briefly)

You're not switching to a different model when you add a screenshot. The same multimodal model (Claude, GPT, Gemini — all three handle images natively now) accepts text and images in the same prompt. Internally, the image gets tokenized into a form the model can attend to alongside your words. To the agent's orchestrator, an image is just another piece of context, like a file or a URL.

That has a couple of practical consequences worth knowing:

- **Images cost tokens too.** A high-resolution screenshot can easily run a few thousand tokens. Not free, not expensive. Don't worry about it for one-off use; do think about it if you're building a workflow that processes hundreds of images per run (more on cost in Ch. 25).
- **The model sees what's *in* the image, not metadata.** EXIF, file names, layer info — gone. If you need the agent to know "this is from the staging environment", say so in the prompt.
- **PDFs and video frames work the same way.** A PDF gets rendered to images of each page; video, where supported, gets sampled into frames. Same multimodal substrate.

## A small but powerful pattern: screenshot → context → action

Vision input pairs especially well with the rest of the agent's tools. The flow looks like this:

1. You screenshot the thing — a broken UI, a chart, a form, an error dialog.
2. You drop it into the agent with one sentence of intent: *"fix this", "explain this", "redo this in our brand voice", "file a ticket for this".*
3. The agent reads the image, reaches for the relevant tools (the codebase, your ticket tracker, your design system, the browser), and does the work.

The screenshot isn't the deliverable. It's the *spec*. Same role a Figma file or a written ticket plays — but it's also the fastest way to communicate visual intent, because you skip the translation into words.

For non-engineers especially, this is the moment voice and vision start to feel less like a novelty and more like the natural way to talk to an agent. You point and you tell it what you want. It does the rest.

## In other tools

- **Claude Code / Claude apps** — drag images into the terminal or chat surface. The desktop and mobile apps accept screenshots and photos directly; the CLI accepts image paths.
- **Codex / ChatGPT** — full multimodal input in the apps; CLI image support varies by version. Voice input is built into the mobile apps.
- **Gemini CLI / Gemini app** — image input native (Gemini was multimodal from day one); strong voice support in the consumer app.
- **Cursor / Windsurf** — image input in the chat panel; mostly used for "match this design" workflows.

Voice-to-text itself is largely a *system-level* choice, not an agent feature. Whatever dictation works on your OS works for the agent.

## The takeaway

- Voice widens the input channel when typing is the bottleneck. It pays off most on long context dumps, walking thoughts, and natural-order multi-step instructions; it costs you on anything where precision matters.
- Vision is the bigger unlock. The agent reading a screenshot or a photo is often faster *and* more accurate than you describing the thing in words.
- The pattern that compounds: screenshot as spec → agent reads it → agent reaches for its tools to act on it.
- The model doesn't change; the input channel does. Treat images and audio as one more kind of context you can hand the agent, alongside files, links, and tickets.

## Try it yourself

**One.** Pick a piece of work you've been meaning to brief the agent on but haven't, because typing it all out felt like a chore. Dictate the brief into your phone (or laptop) — aim for two to three minutes of unbroken talking. Hand the transcript to the agent.

**You'll know it worked when** you got further into a real task in two minutes of talking than you would have in twenty minutes of typing — and the agent's first response shows it understood the context, not just the words.

*If you can't think of a brief to dictate, try one of these*: (a) *"Plan my next two weeks: I have a board meeting on the 24th, a product launch on the 30th, and a backlog of ~15 customer follow-ups"*; (b) *"Walk me through what to do about a teammate who's underperforming — I want to think out loud first, then have you summarize the options."*

**Two.** Find a screenshot you'd otherwise describe in words — a misaligned layout, a confusing chart, an error dialog, a printout. Drop it into the agent with one sentence: *"what's going on here, and what would you change?"* Don't pre-explain.

**You'll know it worked when** the agent named something you hadn't yet articulated yourself.

**Three.** If you don't have a real screenshot handy, the book repo ships two text mockups of "the kind of thing you'd photograph and hand over" at `examples/ch-22-vision/` — a confusingly-formatted Japanese-restaurant receipt with a buried service charge, and a benefits-portal form full of jargon ("Beneficiary Election Reaffirmation Schedule"). Pick one and hand it to your agent with one sentence: *"explain this to me — what did I pay for / what is it asking me to do?"*

**You'll know it worked when** the agent's answer takes your specifics into account rather than giving a generic explanation of what receipts or benefits forms are. (Note: this is a text-mockup substitute — in real use you'd hand the agent the actual photo or screenshot.)
