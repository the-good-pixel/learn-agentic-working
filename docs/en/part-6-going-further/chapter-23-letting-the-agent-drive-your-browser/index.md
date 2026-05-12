# 23. Letting the agent drive your browser

You shipped a new feature on Friday. Marketing wants a 20-second demo video on Threads by Monday morning. You consider yourself a builder, not a producer, and the last time you made a "quick demo" it took an afternoon — record the screen three times because your cursor was in the wrong place, fight with the export, draw arrows in Keynote, give up and ship a screenshot.

This time you tell the agent: *"record a demo of the new watchlist flow, portrait, 15 seconds, chyron-style text for each step."* It opens a real browser, walks through the feature, captures the screen with a synthetic cursor, composites overlays on top, and hands you back an mp4. You change one piece of chyron copy and it re-renders. Total time at the keyboard: about twelve minutes.

The browser is the most universal action surface in business — almost every internal tool, vendor portal, CMS, and analytics dashboard runs in one. Letting the agent drive it directly is a force multiplier, especially when the system you're touching has no MCP (no native connector — see Ch. 9).

> **You need this when** the work you want done lives behind a web UI that has no API or no MCP — a vendor portal, an HRIS, an internal admin tool — *or* when the deliverable is visual: a demo video, a visual bug repro, a "what does this page look like on mobile in Safari" check.
>
> **You don't need this on day one.** If your work today is reachable through MCPs (Gmail, Sheets, Linear, GitHub, Slack), use those first. Browser-driving is the move when the MCP doesn't exist or can't reach the screen you need.

## Two modes: real browser, or scripted one

Browser-driving splits into two flavors. They feel different and serve different jobs.

**Headed real-browser driving.** The agent controls a real browser window — Claude for Chrome (an extension that hands a live tab to the agent), ChatGPT Agent / Operator, or any of the emerging computer-use APIs. You can *watch* the cursor move and the pages flip. It's signed in as you (because it's your browser), so anything that needs your auth Just Works. It's the right mode for *one-off* tasks: investigate a thing on a third-party site, fill in a long auth-gated form, operate a vendor portal that has no API. The downside: it's session-bound. The agent isn't going to repeat this work tomorrow without you re-driving it.

**Headless scripted-browser driving.** The agent writes (and later re-runs) a script — usually Playwright (a browser-automation framework) or Puppeteer (another browser-automation framework) — that drives a headless browser. There's no live window to watch; the agent reasons over the page's structure and produces a script that can be replayed. This is the mode for anything *repeatable*: making demo videos on a schedule, regression-testing flows, scraping a dashboard nightly, generating screenshots for marketing across viewports. The `demo-video` skill described later in this chapter is this mode at its most polished.

A rough rule: **once you want this to happen more than twice, the scripted mode pays for itself**. Until then, headed mode is faster to get going.

## The canonical loop: navigate → snapshot → interact → re-snapshot

Whatever mode you're in, the underlying loop is the same and it's worth naming:

1. **Navigate.** The agent goes to a URL.
2. **Snapshot.** It captures the current page — a screenshot, plus a structured representation of the elements on it (the DOM — the structured tree the browser builds for a page — the accessibility tree — the same tree a screen reader uses — or a model-friendly text rendering). Each interactive element gets a stable reference so the agent can point at "the third button" without ambiguity.
3. **Interact.** It clicks, types, scrolls, or waits — pointing at elements by their reference, not by guessing pixel coordinates.
4. **Re-snapshot.** It takes another snapshot and checks the page actually changed in the way it expected.

That last step is the one most people skip and the one that makes the difference between a brittle script and a reliable one. The agent is doing what a human QA does when they squint at the screen after clicking a button to confirm it actually went somewhere. If the re-snapshot doesn't match the expected state — wrong page, modal didn't open, form rejected the input — the agent backs off, reads the error, and retries.

This loop is the spine of every browser-driving skill we've shipped. It's also the loop the underlying tools (Claude's `agent-browser` skill, Playwright's MCP, Microsoft's Playwright agent) all implement in some form.

## Scenarios — what this actually unlocks

### Making demo videos (the `demo-video` skill)

The cleanest worked example. Our `demo-video` skill, in production on the product, drives a real Playwright browser through a feature, emits a raw video plus a stream of "cursor moved here, click happened there, spotlight this element" events, and then a Remotion (a video-compositing library) pipeline composites brand chrome — opening title, watermark, bottom chyron with sell-the-job-to-be-done copy, end-card CTA — on top of the raw footage.

What's notable is what the skill *won't* let the agent do, captured as hard rules learned from real user feedback: no spring animations ("feels ancient and old-school"), no chapter indicators ("makes viewers feel stuck on step one"), no separate intro card, chyron must own the full-width bottom band ("corner callouts get missed when the eye is on data"), don't redesign the chrome — copy it from an existing composition. The third demo video we made took one command. (See Ch. 16 for the war story behind why this became a skill, and Ch. 17 for the anatomy.)

### Recon, then write the tests

For an engineer, the highest-leverage browser-driving move isn't running tests — it's *writing* them. You hand the agent a feature ("the password reset flow") and say *"go through it like a user, then write me a Playwright spec that covers it."* It drives the headed browser once, watching what selectors are stable and what the success states look like, then authors the test from real behavior instead of from your half-remembered description. The reconnaissance step is what separates a flaky test from a green one.

### Dogfooding and exploratory QA

Hand the agent your staging URL and a paragraph describing the product. Ask it to *use* the product like a new user would and report every paper cut. It clicks around, takes screenshots of confusing screens, notes the moments it didn't know what to do next, files them as a list — sometimes as Linear tickets directly. This is *agent as user-tester*, not as developer. The findings are surprisingly good because the agent has no muscle memory and tries the wrong button first.

### Investigating third-party platforms

Real example: a Threads post wasn't rendering a link preview, and Meta's docs were unhelpful. The agent drove a browser to the post, opened the URL it linked to, fetched the page server-side as Meta's crawler would (different User-Agent string — the identifier the browser sends to tell sites what it is), compared the Open Graph tags (the metadata a page provides for link previews) between what was actually served and what Threads displayed, and identified the missing tag. Twenty minutes, no help thread.

The same shape works for "why does Google's preview look wrong", "why does this LinkedIn embed crop my image", "why won't Slack unfurl this URL." The agent is doing what you would do with two browser windows and curl (a command-line tool for making HTTP requests) — just faster, and writing notes as it goes.

### Filling auth-gated forms

The classic non-engineering case. Your benefits portal makes you re-enter the same data every open enrollment. Your insurance company has a 14-page intake form. Your accountant's tax-prep tool wants the same details you filed last year. With headed browser driving, you hand the agent the data (a spreadsheet, a previous filing, a paragraph) and let it fill the form page by page while you watch. You step in for the parts that need a real human decision; you let it cruise through the parts that don't.

### Visual bug repro across viewports

A user reports the navbar overlaps the hero text. You don't know which viewport. The agent loads the page at six common viewport sizes, screenshots each, and tells you which ones reproduce. Then it walks the page structure at the broken viewport and proposes a fix in the page's style code. This used to be twenty minutes of resizing windows. Now it's a paragraph.

### Operating vendor portals with no API

The category MCPs haven't covered yet — and probably never will, given the long tail. Your payroll provider's admin UI. The shipping-carrier portal where you reprint a label. The marketing tool whose API only covers 60% of the UI. SendGrid before they had a usable template API; Stripe Connect's onboarding UI; the HRIS your company uses that costs $50k/year and still requires manual clicks.

Headed browser-driving is the bridge. The agent operates the portal *as you would*, you watch, and when it becomes a recurring task you have it scripted into a skill so the next run is one command. This is the place the **monitor, don't block** principle from Ch. 7 earns the most: most vendor-portal actions are reversible, you're watching the run live, and the cost of gating every click would mean never doing it at all.

## Equip first, here too

Following the **equip first, then engage** principle (Ch. 10): before driving the browser by hand, ask if there's already a skill or MCP for the platform you're touching.

- *"Is there an MCP for [platform]?"* — many vendor portals now have one (Shopify, Stripe, SendGrid, HubSpot). If yes, use it; the browser is for what the API can't reach.
- *"Is there a published skill for driving [platform]?"* — community skill repos and the Anthropic registry sometimes have one. Install it.
- *"Is there a browser-driving skill in this repo already?"* — your team may have already written one. Reuse it.

Only when none of those exist do you drive the browser ad-hoc. And when you do drive it ad-hoc twice, that's the signal to capture the third run as a skill (Ch. 16).

## What goes wrong, and what to watch

Browser-driving is the most physically *visible* form of agent action — you literally watch the cursor move. That makes the failure modes easier to spot than most.

- **Stale snapshots.** The agent acts on a snapshot from before the page finished loading. Fix: tell it to wait for a specific element ("wait until the dashboard chart renders") instead of waiting a fixed number of seconds.
- **Hidden state.** Auth lives in IndexedDB (a kind of browser storage), or session storage, or a cookie that expires. The `demo-video` skill's auth gotcha — Firebase login state lives in IndexedDB, not cookies, so Playwright's default saved login state misses it — is a real one. Capture the failure mode in the skill the first time it bites you.
- **Selectors that aren't stable.** "The button with text 'Submit'" works until someone changes the copy. Prefer accessibility-tree references and data-test attributes (markers developers add to make elements easy to find); if you're operating someone else's site, accept that the script will break occasionally and the agent will need to re-walk it.
- **Drift from "I'll just watch it once" to "I'll just trust it."** Headed mode lulls you into watching less over time. For high-stakes actions (anything financial, anything irreversible — see Ch. 24), keep a gate even when the agent has done it ten times. For reversible things, let it cook.

## In other tools

- **Claude Code** — drives browsers via the `agent-browser` skill (Playwright under the hood) or the Playwright MCP server. Claude for Chrome is the headed real-browser variant — a browser extension that hands a live tab to Claude.
- **Codex / ChatGPT Agent** — ChatGPT Agent (formerly Operator) is OpenAI's headed real-browser product. Codex CLI can drive a browser via Playwright MCP the same way Claude Code does.
- **Gemini CLI** — driving headless browsers via tool integrations is supported; a Gemini-branded real-browser product hasn't shipped at the time of writing.
- **Cursor / Windsurf** — primarily IDE-focused; browser-driving usually means installing a Playwright-style MCP and letting the agent script it.

The space moves fast. The shape of the work — navigate, snapshot, interact, re-snapshot — is the part that won't change.

## The takeaway

- Two modes: **headed real-browser** (one-off, signed in as you, watch it work) and **headless scripted-browser** (repeatable, headless, becomes a skill).
- The canonical loop is **navigate → snapshot → interact → re-snapshot**. The re-snapshot is the step most people skip and the one that makes it reliable.
- The richest scenarios are the ones MCPs don't cover: demo videos, third-party platform investigations, auth-gated forms, vendor portals, cross-viewport bug repro.
- When you find yourself driving the same flow twice, capture it as a skill. The third run is one command (see Ch. 16, Ch. 17).
- Watch the browser the first few times. Then trust it for reversible work and keep gating the irreversible. The **monitor, don't block** stance from Ch. 7 applies here more than anywhere.

## Try it yourself

**One.** Pick a piece of recon you'd normally do in three browser tabs — "why does this URL preview look broken on Threads", "what does competitor X's pricing page actually charge for the Pro tier", "what's the schema on this public API". Ask the agent to drive the browser and bring back the answer plus screenshots.

**You'll know it worked when** the agent's report includes a thing you wouldn't have noticed yourself — a meta tag, a hidden field, a price-tier nuance — *and* you didn't open a single tab.

*If you can't think of recon to do, pick one of these*: *what does Linear's Pro tier actually include?*, *what's the schema of the public NASA APOD API?*, *why does this Threads post (paste any URL) not render a link preview?*

**Two.** Find a form on a real site you have to fill out occasionally (a benefits portal, a vendor signup, an event registration). Watch the agent fill it page by page while logged in as you. Don't help; only correct.

**You'll know it worked when** the form is submitted and you spent your time *reviewing* what it typed, not typing.

*If you can't think of a form, practice on a benign one*: your country's tax-office search form, a public library card application, or a vendor signup that won't actually charge you.

**Three (engineers).** Pick a small flow in your own product. Ask the agent to do reconnaissance on it (drive the browser, take notes) and then author a Playwright spec from what it learned — not from your description.

**You'll know it worked when** the resulting test passes on the first run on someone else's machine.
