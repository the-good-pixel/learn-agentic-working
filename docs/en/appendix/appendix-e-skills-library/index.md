# Appendix E — A Library of Real Skills

The skill-writing chapters (Ch. 15 and Ch. 17) make a claim that's hard to believe until you see it: most of the skills you'll use in a year of agentic working aren't elaborate. They're a page of opinions, dropped into `.claude/skills/<name>/SKILL.md`, that turns "ask the agent to figure it out" into "ask the agent and the right thing happens." The hard part isn't the YAML. The hard part is knowing *what rules a skill should contain*, and that only comes from watching real ones.

This appendix collects seven skills you can copy into your own setup today. Three are written for engineers (`ship-pr`, `local-dev`, `demo-video`). Three are written for non-technical work (`reconcile-stripe`, `brand-voice`, `weekly-team-update`). One — `gemini-chat-and-search` — is useful to everyone. Each one is a `SKILL.md` file in full, with no missing pieces. You can paste it into `~/.claude/skills/<name>/SKILL.md` (user-level, available across all your projects) or `.claude/skills/<name>/SKILL.md` (project-level, committed to a repo so your team inherits it) and it will work on the first invocation.

A note on adapting these. Every one of them is **opinionated** — they assert rules about tolerance windows, brand voice, animation timing, port-killing etiquette. Those rules came from real production use, and they will be subtly wrong for your situation. Don't reverently keep them. Open the skill, read it with the agent, and ask "where would this be wrong for our team?" Customizing a skill takes five minutes and is exactly the kind of thing the agent is good at. The skills below are starting points, not gospel.

## 1. `ship-pr` — the engineer's PR babysitter

The book's running example. Push the branch, open the PR, watch CI, deal with whatever the AI reviewer bots say, and tell you when it's actually ready to merge — not "tell you immediately and let you forget about it for two hours." Use this any time you've finished an implementation and want it shipped without sitting at the terminal through three CI cycles. Don't use it for exploratory branches, or when you want to manually review the diff before pushing.

````markdown
---
name: ship-pr
description: Create or update a PR, then babysit it to green. Pushes pending changes, opens a PR if none exists, waits for CI, and iterates on AI code-review comments (fixing real issues, replying to false positives) until the PR has no outstanding feedback. Notifies the user when the PR is ready to merge. Triggers on "ship this", "push and monitor the PR", "take this PR to green", "make the PR ready to merge".
---

# ship-pr

End-to-end PR shepherd: push, open or update the PR, monitor CI, resolve AI-review comments, and notify when mergeable.

## When to use

- "ship it" / "push this up" / "open a PR"
- "babysit the PR until it's green"
- "take this to merge-ready"

## When NOT to use

- Local-only exploratory branches not intended for review.
- The user wants to review the diff manually before pushing.
- The change is on `main` / `master` / the default branch — create a feature branch first and ask before proceeding.

## Preconditions

1. Working tree is in a committable state. If there are uncommitted changes, ask the user whether they should be included.
2. `gh auth status` succeeds.
3. Not currently on the default branch.

## Procedure

### Step 1 — Commit and push

- Stage only the files the user has been working on. Never `git add -A`.
- Sample the repo's commit style with `git log -5 --oneline` and match it.
- If the branch has no upstream, `git push -u origin HEAD`. Otherwise `git push`.
- Never use `--no-verify`, `--force`, or `--force-with-lease` without explicit user consent.

### Step 2 — Create or locate the PR

- `gh pr view --json number,url,state,isDraft` to check for an existing PR.
- If none, draft a title (under 70 chars) and a body from `git log <base>..HEAD` and the diff. Use `.github/pull_request_template.md` if present.

### Step 3 — Monitor CI

- `gh pr checks <number> --watch`.
- On failure, read the log (`gh run view <run-id> --log-failed`), diagnose, fix, commit, push. Re-enter Step 3.
- Never blindly re-run a failing job without reading the log.
- If a check is stuck more than 15 minutes with no progress, tell the user and ask how to proceed.

### Step 4 — Resolve AI review comments

Fetch comments:

```bash
gh api repos/{owner}/{repo}/pulls/<number>/comments --paginate
gh pr view <number> --json reviews,comments
```

Identify AI-authored comments. Common authors: any login ending in `[bot]` whose body contains review markers (CodeRabbit, Codex, the cloud-provider security bots, etc.). When in doubt, treat it as in-scope.

For each unresolved AI thread:

1. Read the full thread, including human replies.
2. Decide: real issue or false positive?
   - Real → fix in code. Commit with a message referencing the comment.
   - False positive → reply in-thread explaining *why*, citing the file/line or invariant that makes the warning incorrect.
3. After pushing fixes, the bots usually re-review. Re-enter Step 3 → Step 4.

Stop when: no unresolved AI comments remain, no new AI comments appeared since the last push, and CI is green.

If the same AI comment reappears after 2 fix attempts, flag it to the user. Something is ambiguous and needs human judgment.

### Step 5 — Notify ready-to-merge

Post a final summary: PR URL, CI state, AI-review state (N resolved, M replied-to), anything still needing human attention. Do not merge.

## Hard rules

- **Never force-push** without explicit user consent.
- **Never resolve or dismiss a human reviewer's comment.** Only AI-bot threads are in scope.
- **Never skip hooks or signing.** No `--no-verify`, no `--no-gpg-sign`.
- **Never merge.** Only the user merges.
- **The AI-reviewer thread is the audit trail.** Silent dismissal of a bot comment is forbidden — every dismissal needs an in-thread reply explaining why.
- **Do not edit unrelated files** while addressing AI comments. If a bot suggests a sweeping refactor, push back in-thread, don't quietly accept scope creep.
- **One logical concern per commit** when fixing review comments. Keeps the review trail legible.

## Reference files

- `.github/pull_request_template.md` if present.
- The repo's `CLAUDE.md` for any project-specific commit or PR conventions.
````

**How to adapt this.** Your repo probably has CI quirks this skill doesn't know about — a flaky integration suite, a deploy preview that takes 12 minutes to come up, a required human reviewer who lives in a different timezone. Open the skill with your agent, paste in the last three PR descriptions you wrote, and ask it to tighten the title/body conventions and the "stop waiting" thresholds to match your team's reality.

## 2. `gemini-chat-and-search` — never treat the first response as final

Web research is the part of agentic working most often done badly. People ask a question, accept the first answer, paste it into a doc, and ship. This skill exists to force a different shape: every research task is a *multi-turn* conversation with a search-grounded model, where the agent's job is to challenge, verify, and cross-check before it tells you anything. Use it whenever the answer matters — pricing, regulations, compatibility, library API shape, anything where being subtly wrong is costly. Don't use it for casual lookups where a single web search is fine.

````markdown
---
name: gemini-chat-and-search
description: Multi-turn web research via the Gemini API with Google Search grounding. Always conducts a conversation — asks, evaluates the response, then follows up to verify, challenge, or dig deeper until a reliable consensus is reached. Triggers on "ask Gemini", "research this", "verify with web search", "find out what the current state of X is", or when WebSearch is unavailable.
---

# gemini-chat-and-search

Web research as a deliberate, multi-turn conversation. Never one-shot.

## When to use

- The user asks "research X", "what's the current state of Y", "is Z still true".
- A claim needs verification (pricing, API behavior, regulation, compatibility, recency).
- The built-in WebSearch tool is unavailable or rate-limited.
- The question is about something that moved in the last 12 months — agent training data is stale.

## When NOT to use

- Single-fact lookups where the user wants speed over rigor ("what's the current Node LTS version?"). Use plain WebSearch.
- Questions that are purely about code in the current repo. Read the code instead.
- Anything where the agent already has reliable, recent primary-source knowledge.

## Procedure

### Step 1 — Frame the question precisely

Restate the user's request as a specific, falsifiable question. If the original was vague, narrow it first. Bad: "is Vercel good for this?" Good: "as of this quarter, does Vercel's free tier support cron jobs running every 5 minutes for a Next.js app?"

### Step 2 — First turn

Send the question to Gemini with Google Search grounding enabled. Capture:

- The answer.
- The grounding citations (URLs the model leaned on).
- Anything the model flagged as uncertain.

### Step 3 — Evaluate the first response

**Do not pass the first response back to the user as the answer.** Ask yourself:

- Did the model actually answer the specific question, or did it answer a nearby easier one?
- Are the citations primary sources (vendor docs, official changelogs, regulator websites) or aggregator blogs?
- Is anything load-bearing in the answer dated more than 18 months ago?
- Did the model hedge in a way that suggests the real answer is "it depends" and we need to specify more?

### Step 4 — Follow up

Send a second turn that does at least one of:

- **Challenges** the previous answer: "you said X — but [primary source] says Y. Reconcile."
- **Verifies** a load-bearing claim: "give me the URL of the official doc where the X limit is stated."
- **Drills in** on a specific case the user actually cares about: "narrow to the EU region and the Pro tier."
- **Asks the inverse**: "what would have to be true for the opposite answer to be correct?"

### Step 5 — Iterate

Continue the conversation until one of these is true:

- The model has cited primary sources for every load-bearing claim.
- A contradiction has been surfaced and resolved.
- The model explicitly states the limit of its knowledge ("the most recent doc available is dated [date]; behavior after that is not verifiable from search").

Typical conversations are 3–5 turns. If you're past 8 turns and still not converging, stop and tell the user what's contested.

### Step 6 — Report back

Give the user:

- The answer in one sentence.
- The two or three primary-source URLs that establish it.
- Anything that remained contested and why.

## Hard rules

- **Never treat Gemini's first response as final.** Minimum two turns, always.
- **Primary sources beat aggregator blogs.** A medium.com post is not evidence; a vendor changelog is.
- **Cite the URL** for every load-bearing claim in the final report. No naked assertions.
- **Surface contradictions, don't paper over them.** If two reputable sources disagree, say so.
- **Respect dating.** If a fact is older than 18 months and the domain moves fast, treat it as suspect until reconfirmed.
- **Don't fabricate citations.** If you can't find a primary source, say "no primary source found" rather than guessing a plausible URL.

## Reference files

None — this skill is self-contained. The API credentials live in the user's environment (`GEMINI_API_KEY`).
````

**How to adapt this.** If you use a different research tool — Perplexity, OpenAI's web search, an internal knowledge base — swap the API but keep the shape: precise question, evaluate, challenge, primary sources, contradictions surfaced. The procedure is the skill; the model is a detail.

## 3. `local-dev` — start the servers without trampling the neighbors

Local development is full of paper cuts. Port 3000 is busy and you don't know what's holding it. `node_modules` is symlinked because of a pnpm workspace and Vite blows up. Two repos both want to run a dev server and you can't remember which one is which. This skill encodes the workflow one team converged on after a week of those paper cuts. Drop it in any project that has a non-trivial local dev setup. Don't bother for a brand-new single-package repo with nothing weird going on.

````markdown
---
name: local-dev
description: Spin up local dev servers safely. Picks a free port, refuses to kill a port owned by a different repository, and handles known gotchas like symlinked node_modules that break Vite's file watcher. Triggers on "start the dev server", "run it locally", "spin up the app", "why is port 3000 busy".
---

# local-dev

Reliable local dev server startup for this project.

## When to use

- The user says "start the dev server", "run it locally", "boot up the frontend/backend".
- The user reports "port X is busy" and wants help unblocking.
- After a fresh `git pull` or branch switch, before testing changes.

## When NOT to use

- Production or staging deployments — see the project's deploy runbook.
- One-off scripts. Just run them.
- Debugging a remote server. This skill is local only.

## Procedure

### Step 1 — Detect what's already running

```bash
# Find what owns each port we care about
lsof -i :3000 -i :3001 -i :4000 -sTCP:LISTEN -P -n
```

For every busy port, capture the PID and the full path of the binary (`ps -o command= -p <pid>` and resolve symlinks).

### Step 2 — Decide: kill, skip, or use a new port

For each busy port:

- **If the process's working directory is inside this repository** (`lsof -p <pid> | grep cwd`), it's our own zombie. Safe to kill: `kill <pid>`, then `kill -9 <pid>` if needed.
- **If the process is from a different repository** on this machine, **never kill it**. Pick a different port instead and tell the user *which* port we're using and why.
- **If the process is a system service** (Docker, a database, the corporate VPN client), never kill it. Pick a different port.

### Step 3 — Handle the symlinked-`node_modules` trap

If `node_modules` is a symlink (workspaces, pnpm, Yarn Berry):

- Vite's file watcher will silently drop changes inside symlinked packages. The dev server appears to run, but edits to dependencies don't reload.
- Workarounds in priority order:
  1. Set `server.fs.allow` in `vite.config.*` to include the real path the symlink resolves to.
  2. Set `optimizeDeps.exclude` for the workspace packages so Vite doesn't pre-bundle them.
  3. As a last resort, replace the symlink with a bind mount or a real copy for the session.

Document which workaround the project uses in the project's CLAUDE.md so the next agent doesn't relitigate.

### Step 4 — Start the server

Use the project's start command (read it from `package.json` scripts, the Makefile, or the project's CLAUDE.md). Pass the chosen port via the project's documented env var (commonly `PORT`, `VITE_PORT`, `NEXT_PUBLIC_PORT`).

Stream logs to the user. Don't background the process unless the user asked — they need to see startup errors.

### Step 5 — Report

Tell the user:

- Which port the server is on, and why (if it wasn't the default).
- Anything that was already running on the conflicting ports, and whether we killed it or left it alone.
- The URL to open.
- Any warnings the server emitted that look load-bearing (deprecated configs, missing env vars).

## Hard rules

- **Never kill a process owned by a different repository.** Pick a different port instead. The other repo's agent is doing real work, and you are a guest on a shared machine.
- **Never kill PID 1, system services, or anything you can't identify.** When in doubt, pick a different port.
- **Never run `rm -rf node_modules` to "fix" things** without confirming with the user. Workspace setups can be hours of work to restore.
- **State the chosen port explicitly** in the final report. Silent fallback to a non-default port has cost teams half-days of confusion.
- **Don't background the dev server on first run.** The user needs to see if startup fails.
- **If Vite's HMR is silently broken**, treat that as a real bug, not a quirk. Apply the symlinked-modules workaround above.

## Reference files

- `package.json` scripts.
- The project's CLAUDE.md for documented port conventions and any project-specific workarounds.
- `vite.config.*` or the equivalent build-tool config.
````

**How to adapt this.** Different stack? Replace the Vite-specific guidance with the equivalent for your build tool (webpack, Turbopack, esbuild, the Rails or Django dev server). The two non-negotiable rules — *don't kill ports owned by other repos*, *state the port explicitly* — survive any stack change.

## 4. `demo-video` — Playwright + Remotion without the spring animations

Marketing wants a 30-second product demo. The engineer's instinct is to spin up a screen recorder and freestyle it; the result looks like a 2014 startup pitch deck. This skill is the opposite: a deterministic pipeline that drives the app with browser automation, captures the frames, and composites a captioned video with code-defined animations. The hard rules in it — *no spring animations, the caption owns the bottom band, don't redesign the browser chrome* — are scar tissue from a dozen demos where the agent tried to be creative and made something worse. Use it any time you need a polished product clip. Don't use it for tutorial videos that need a real human voiceover.

````markdown
---
name: demo-video
description: Generate a product demo video by driving the app with Playwright and compositing with Remotion. Produces a captioned, deterministic clip suitable for landing pages and social. Triggers on "make a demo video", "record a demo of feature X", "produce a clip for the homepage", "generate a 30-second demo".
---

# demo-video

Browser automation captures the app, Remotion composites the final video with captions and section transitions.

## When to use

- "Make a demo video of [feature]."
- "Produce a 30-second clip for the homepage hero."
- "Record the new flow and add captions."

## When NOT to use

- Tutorials that need a real human voiceover and pacing.
- Anything requiring screen-region selection or webcam.
- Long-form (>90 seconds). Use a real video editor.

## Procedure

### Step 1 — Storyboard

Before writing any code, write a numbered storyboard in the project's `demos/<slug>.md`:

1. Each beat is a line: `00:00–00:04 — Hero view. Caption: "Track every signal in one place."`
2. Aim for 4–8 beats. Total runtime: 20–45 seconds.
3. One idea per beat. If a beat has two ideas, split it.

Confirm the storyboard with the user before recording.

### Step 2 — Drive the app with Playwright

- Use the existing Playwright config from the e2e test suite if one exists. Don't introduce a parallel browser config.
- Set viewport to **1920×1080** (or 1280×720 for fast iterations). Lock the device scale factor.
- Use `page.evaluate` to disable any in-app animations that aren't load-bearing — they fight with the video's pacing.
- Capture frames at the timing points listed in the storyboard. Prefer `page.screenshot` per beat over continuous video — frames composite more cleanly.

### Step 3 — Composite with Remotion

- One `<Composition>` per video. Beats are `<Sequence>` children, in storyboard order.
- Transitions: **fade or slide only**. 8 frames at 30fps. No exceptions.
- Captions live in a fixed bottom band that's part of the composition itself, not overlaid by a separate tool. The band is the caption's home — never paint over it with content.
- Background color, font, and accent color come from the project's design tokens (read `tokens.json` or the equivalent). Don't pick new colors.

### Step 4 — Render and review

- Render at 1080p, 30fps, H.264, with a 192kbps AAC silent track if no audio.
- Output to `demos/out/<slug>.mp4`.
- Tell the user where the file is and embed the storyboard reference so they can sanity-check beats against the brief.

## Hard rules

- **No spring animations.** Springs look juvenile and unpredictable in 30-second clips. Linear and ease-in-out only.
- **The caption band is sacred.** Nothing else paints into the bottom 120px. Not a tooltip, not a notification toast, not a logo.
- **Don't redesign the app's chrome.** The point of the demo is to show the real product. Don't hide the nav, don't recolor buttons, don't replace fonts. If something in the chrome looks bad on camera, file it as a UI bug, not a demo workaround.
- **No fake data that contradicts reality.** Sample data is fine; sample data that implies a feature the product doesn't have is not.
- **One caption at a time.** No stacked captions, no double-deckers.
- **Lock the viewport size.** Letting the browser resize between beats produces jitter.
- **Mute everything.** The video has no audio track other than the silent placeholder. The user adds music in post if they want it.

## Reference files

- `demos/<slug>.md` — the storyboard.
- The project's Playwright config and design tokens.
- `remotion.config.ts`.
````

**How to adapt this.** If you're not on Playwright + Remotion, the principles still apply: storyboard first, deterministic capture, fixed caption band, no springs, don't redesign the chrome. Substitute your tool (Puppeteer, Cypress, After Effects, CapCut) and keep the rules.

## 5. `reconcile-stripe` — closing the month without a copy-paste rampage

Every month someone in finance ops takes the folder of vendor invoices, the Stripe export of the month's charges, and tries to make them agree. It's tedious, error-prone, and the kind of thing an agent should do in seven minutes. The catch: matching invoices to payments isn't an exact-equality problem (vendor names differ, amounts include fees, dates straddle the month boundary), and the failure mode of "the agent decided to invent a Stripe line to make the numbers tie" is unacceptable. This skill encodes the tolerances and the hard limits. Use it monthly. Don't use it as a substitute for a real accounting system — it produces a reconciliation report, not bookkeeping entries.

````markdown
---
name: reconcile-stripe
description: Reconcile a folder of vendor invoices against a Stripe export for the month. Matches on vendor name (fuzzy), amount (within stated tolerance), and date (within stated window). Produces a report of matched, unmatched, and ambiguous items. Triggers on "reconcile the invoices", "close the month", "match the Stripe export against the invoice folder", "produce a reconciliation report".
---

# reconcile-stripe

Monthly invoice-to-Stripe reconciliation. Produces a report; does not modify Stripe or the books.

## When to use

- End-of-month close. The user has a folder of vendor invoices and a Stripe export CSV.
- Ad-hoc spot checks of specific vendors against Stripe activity.
- Catching missing or duplicated charges before the books are closed.

## When NOT to use

- The user wants you to create, refund, or modify Stripe charges. Different skill, different blast radius.
- Reconciliation against a system other than Stripe — write a sibling skill (`reconcile-quickbooks`, `reconcile-bank`).
- The user wants formal accounting entries. This is reconciliation, not bookkeeping.

## Procedure

### Step 1 — Load the inputs

Expect:

- A folder of invoice files (PDF, mostly). Path provided by the user, or default to `./invoices/<YYYY-MM>/`.
- A Stripe export CSV for the same month. Default to `./stripe-export-<YYYY-MM>.csv`.

For each invoice, extract:

- Vendor name (string)
- Total amount (number, in the invoice's currency)
- Invoice date (ISO date)
- Invoice number (if present)
- Currency

For the Stripe export, parse each row's description, amount, currency, and date.

### Step 2 — Match

For each invoice, search the Stripe rows for a candidate match using all three criteria:

- **Vendor: fuzzy match.** Use a normalized comparison (lowercase, strip "Inc"/"Ltd"/"LLC"/"GmbH"/punctuation). Accept a match if the normalized strings have a Levenshtein ratio ≥ 0.85, **or** the invoice vendor appears as a substring of the Stripe description after normalization.
- **Amount: within tolerance.** Default tolerance is **±2% or ±$1, whichever is larger.** This covers FX rounding and payment processor fees. State the tolerance used at the top of the report.
- **Date: within window.** Default window is **±7 days** between the invoice date and the Stripe charge date. State the window used at the top of the report.

If a single Stripe row matches on all three, it's a **match**. If multiple rows match, it's **ambiguous**. If none match, the invoice is **unmatched**.

### Step 3 — Build the report

Output a Markdown report at `./reconciliation-<YYYY-MM>.md`:

1. **Header**: month, tolerances used (amount %, amount $, date window).
2. **Matched section**: table of (Invoice file, Vendor, Amount, Date, Matched Stripe row).
3. **Unmatched invoices section**: invoices with no Stripe counterpart. For each, suggest the closest Stripe candidate (highest combined similarity) so the human can decide.
4. **Unmatched Stripe rows section**: Stripe charges the invoice folder doesn't cover.
5. **Ambiguous section**: invoices with more than one plausible Stripe row. Show all candidates.
6. **Totals**: sum of matched, sum of unmatched, sum of ambiguous, on both sides.

### Step 4 — Hand off

Tell the user:

- The path to the report.
- The headline numbers (e.g. "23 of 27 invoices matched, 2 unmatched, 2 ambiguous").
- The single most surprising line item (largest unmatched amount, or a vendor that newly appeared).

## Hard rules

- **Never create, refund, void, or modify a Stripe line.** This skill is read-only against Stripe and the books. If the user wants to act on a finding, they do it through Stripe directly.
- **State the tolerances used at the top of every report.** Reconciliation is meaningless without them.
- **Never claim a match below the tolerance threshold.** If two candidates are close to the line, mark ambiguous, don't pick.
- **Never "round to match."** If an invoice is $1,200.00 and Stripe shows $1,199.50, that's within default tolerance; document the delta. If it's $1,200.00 vs $1,150.00, that is *not* a match — flag it.
- **Preserve currency.** If invoice and Stripe row are in different currencies, do not match silently. Either convert with a stated FX rate and document it, or flag as ambiguous.
- **Don't lose the invoice files.** Reference each invoice in the report by the filename it came from, so the human can audit.
- **Don't dedupe Stripe rows.** Multiple charges to the same vendor on the same day are legitimate; let the human decide.

## Reference files

- `./invoices/<YYYY-MM>/` — the invoice folder.
- `./stripe-export-<YYYY-MM>.csv` — the Stripe export.
- The previous month's `reconciliation-*.md`, if present, to inherit any tolerance overrides the user set.
````

**How to adapt this.** Tolerances are the most-customized part. A team paying mostly in USD with low fees can tighten amount tolerance to ±0.5%; a team paying international vendors should loosen the date window to ±14 days to cover settlement delays. Ask your agent to read three months of historical reconciliations and propose tolerances that would have produced clean reports — that's the right starting point.

## 6. `brand-voice` — the style guide that actually gets applied

Every company has a brand voice document. Almost no one reads it before drafting a tweet, an email, or a job posting, and as a result the brand voice exists in theory and dies in practice. This skill is the brand voice file *with teeth*: it gets loaded any time the agent is asked to write copy, and its rules apply before the draft comes back. Use it for any drafting task — emails, social posts, landing-page copy, board documents, recruiting outreach. Don't use it for internal Slack messages between colleagues; nobody wants a brand-voiced "lunch?".

````markdown
---
name: brand-voice
description: Apply the company brand voice rules to any drafting task — emails, social posts, landing-page copy, recruiting messages, board documents. Encodes diction, register, and forbidden words. Triggers on "draft a [post / email / page / message]", "write copy for", "rewrite this in our voice", "review this draft for tone".
---

# brand-voice

The company's voice, encoded as rules the agent enforces before returning a draft.

## When to use

- Drafting any external-facing copy.
- Drafting internal copy that crosses functions (board update, all-hands script, recruiting page).
- Rewriting an existing draft to match the company voice.
- Reviewing a draft for tone before it ships.

## When NOT to use

- 1:1 Slack messages between colleagues. Be a human.
- Code comments, commit messages, PR descriptions. Different conventions.
- Direct customer-support replies in flight — those have their own template library.

## Procedure

### Step 1 — Identify the surface

Ask (or infer): is this a Threads/X post, a LinkedIn post, an email, a landing-page section, a board doc, a recruiting message? Different surfaces, different sub-rules below.

### Step 2 — Draft against the rules

Apply the universal rules and the surface-specific rules. If the user provided a draft, rewrite it; otherwise produce one.

### Step 3 — Self-audit before returning

Check the draft against every rule in *Hard rules* below. Fix violations silently. If a rule conflict is unavoidable (e.g. an industry term that breaks the no-jargon rule but the audience expects it), call it out in a one-line note at the end of the draft.

### Step 4 — Return

Return the draft, then a short list of the rules that were load-bearing in this rewrite (e.g. "removed three exclamation marks, replaced 'leverage' twice, broke one long sentence in half"). This trains the user on the voice over time.

## Hard rules

### Universal

- **No exclamation marks.** Anywhere. Period.
- **No "leverage" as a verb.** Use "use".
- **No "unlock", "unleash", "empower", "supercharge", "revolutionize", "game-changing", "next-generation", "best-in-class".** Plain alternatives always exist.
- **No "in today's fast-paced world" or any phrase that performs the role of "let me clear my throat."** Start with the point.
- **No em dashes used as a stand-in for "and also" — use a period.** Reserve em dashes for genuine parenthetical asides.
- **No emoji** in any copy that will appear in a corporate context (board docs, contracts, recruiting page, investor updates). Social posts may use a single emoji per post, never two.
- **No "we are excited to announce."** State what was announced.
- **Active voice.** Passive voice only when the actor genuinely doesn't matter.
- **Sentence length variety.** Don't string three long sentences in a row. Don't string five short ones either.

### By surface

- **Threads / X / Bluesky**: Contractions OK. Single emoji OK. One link max. No hashtag soup; one hashtag if it's load-bearing, zero otherwise.
- **LinkedIn**: No contractions. No emoji. Lead with the point, not "I'm humbled to share." Length cap: 1,200 characters.
- **Email (external)**: Contractions OK in the body, not in the signoff. No "I hope this finds you well." Open with the reason for writing.
- **Landing-page copy**: Second person ("you"). One claim per section. Numbers concrete (specific figures, not "many").
- **Board doc / investor update**: No contractions. No first-person plural cheerleading ("we're crushing it"). State metrics with the period and the comparison ("Q1: $X, up Y% QoQ").
- **Recruiting outreach**: Personalize the first sentence to something real about the recipient. No "I came across your profile."

### Things to actively replace

| Don't | Do |
| --- | --- |
| leverage (verb) | use |
| utilize | use |
| in order to | to |
| at this point in time | now |
| reach out | contact, email, message |
| circle back | follow up |
| robust | (delete, or be specific) |
| seamless | (delete, or be specific) |
| solution | (the actual product noun) |

## Reference files

- The company's full brand voice doc, if one exists. Read it once on first invocation and treat it as overriding for any conflict with the rules above.
- The last 20 published posts/emails, for tonal calibration on tough cases.
````

**How to adapt this.** This is the most personal skill in the appendix. Open it, replace the forbidden-words list with the ones your team actually overuses, set the surface-specific rules to match your channels, and — most importantly — have the agent ingest five or six published pieces of copy you're proud of, and ask it to propose three rules it would *add* based on what those pieces have in common.

## 7. `weekly-team-update` — Friday updates that don't read like Friday updates

Every team writes a weekly update. Most of them are bad in the same way: lists of activities, no signal about what changed, performative optimism. This skill flips it. It pulls the week's metrics and project notes, leads with the metric move that actually matters, demands a one-line "why" for any KPI move over 15%, and bans the rhetorical tics that turn updates into noise. Use it every Friday. Don't use it for the formal monthly business review — that's a different document with a different audience.

````markdown
---
name: weekly-team-update
description: Generate the team's Friday update from metrics and project notes. Leads with the headline metric move, explains KPI movement over 15%, and enforces a no-exclamation, no-contractions-in-closing voice. Triggers on "write the weekly update", "draft Friday's update", "team update", "EOW summary".
---

# weekly-team-update

The Friday update, generated from the week's actual numbers and project notes — not vibes.

## When to use

- Friday afternoon / Monday morning team update.
- Anywhere a "what happened this week" summary is needed for a cross-functional audience.
- After a sprint, week, or two-week iteration closes.

## When NOT to use

- Monthly business review. Different audience, different depth, different format.
- 1:1 update to a manager. Be more direct.
- Customer-facing release notes. Different skill, different voice.

## Procedure

### Step 1 — Gather inputs

- Pull metrics for this week and last week from the team's metrics source (the dashboard, the spreadsheet, the BI tool, whichever the team uses).
- Read the week's project notes, standup logs, or ticket activity. Whatever the team's notes substrate is.
- Identify the top 3–5 KPIs the team has agreed to lead with. If there's no agreed list, ask the user once and remember it for next week.

### Step 2 — Find the lede

Scan the KPI movements week-over-week:

- The headline is the metric move that **most changes the picture** — not necessarily the biggest %, but the one a smart reader would care about most.
- If nothing moved meaningfully, the headline says so: "Quiet week on the metrics. The interesting thing was [project beat]."

### Step 3 — Draft

Structure (this order, every time):

1. **Headline** — one sentence. Lead with the metric, then the move, then the period. "Weekly active users hit 8,420, up 6% from last week."
2. **Why it moved** — one to three sentences, only for KPI moves over 15%, or for the headline metric regardless of size.
3. **Projects shipped** — bullet list. Each bullet: project, status, who. No more than seven bullets; if there are more, the team is over-extended and the agent should say so in a one-line aside.
4. **Risks / blockers** — bullets. Each one has an owner and a date. If there are none, write "No new risks raised this week." Don't invent risks.
5. **Next week** — bullets. Three to five items. Specific, not aspirational.
6. **Closing line** — one sentence. No contractions. No exclamations.

### Step 4 — Self-audit

Run the hard rules below. Fix violations silently.

### Step 5 — Return

Return the draft and a short note listing any KPI moves over 15% the user might want to fact-check.

## Hard rules

- **No exclamation marks.** Anywhere.
- **Lead with a metric, not a paragraph of preamble.** The first sentence of the update is the headline number. Always.
- **Any KPI move over 15% gets a one-line "why".** If you don't know the why, the line says "Cause not yet identified; investigating." Don't paper over it.
- **No contractions in the closing line.** "We will keep pushing on retention next week." not "We'll keep pushing." The closing is the most-quoted line; it carries the register.
- **No "great week!", "amazing progress!", "team's crushing it"** or any cheerleading without numbers behind it. Praise is a metric move, not an adjective.
- **No more than seven project bullets.** If there are more, point that out.
- **No invented risks.** If no one raised a risk this week, say so. Don't fabricate one to look thoughtful.
- **Numbers are absolute and relative.** "8,420 WAU, up 6% WoW" — never just "up 6%" and never just "8,420".
- **Specific names, not "the team did X".** Say who.
- **Date format**: ISO (`2026-05-08`) or the team's documented format. Pick one and be consistent within the update.

## Reference files

- The team's metrics dashboard or export.
- Last three weeks of updates, for tonal calibration and to detect drift.
- The team's agreed KPI list, if recorded.
````

**How to adapt this.** Two things to customize. First, the KPI list — get the team to agree on the three to five metrics that the update leads with, and put them in the skill so the agent doesn't ask every week. Second, the threshold — 15% is a reasonable default for KPIs with daily volatility; teams with smoother metrics (subscription revenue, churn) should tighten it to 5% or 10%, and noisy ones (paid acquisition) should loosen it to 25%.

## Writing your own from scratch

Chapter 17 gives you two flows for getting to a new skill, and they're worth remembering at the bottom of this appendix because the seven skills above might tempt you to think writing one is a big deal. It isn't.

**Search first.** Before you write anything, ask the agent: "Is there an existing skill for X? Check the Anthropic skills registry, my user-level skills, the project's skill directory, and `awesome-claude-skills` on GitHub." Skills are usually published as a single Markdown file in a repo, so they're easy to find and easy to copy. The seven in this appendix are a starting library, but the ecosystem is much larger and growing weekly. If someone has already paid the tax of writing the skill you need — for Shopify, for Linear, for HubSpot, for your specific build tool — inherit their work.

**Write from conversation, not from a blank file.** The far more common flow: you've just finished a piece of work, you notice you had to remind the agent of the same three rules along the way, and you say "turn what we just did into a skill." The agent reads its own session transcript, writes a draft `SKILL.md`, you read it, you sharpen the rules that were soft, and you save it. Total time: ten minutes. The skill captures the exact friction you just experienced, which is the friction your team will keep experiencing. That's the loop. The seven skills in this appendix were all written that way originally — none of them started as "let me sit down and design a skill." They started as "we keep doing this wrong, let's write it down."

Skills are cheap to write, cheap to throw away, and cheap to revise. Don't treat them like architecture documents. Treat them like running notes — the ones that happen to be machine-readable.
