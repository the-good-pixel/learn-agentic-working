# Appendix C — Skills Examples

The skill-writing chapters (Ch. 17 and Ch. 19) make a claim that's hard to believe until you see it: most of the skills you'll use in a year of agentic working aren't elaborate. They're a page of opinions, dropped into `.claude/skills/<name>/SKILL.md`, that turns "ask the agent to figure it out" into "ask the agent and the right thing happens." The hard part isn't the YAML. The hard part is knowing *what rules a skill should contain*, and that only comes from watching real ones.

This appendix collects seven real skills you can copy into your own setup today. Three are engineer-flavored (`ship-pr`, `local-dev`, `demo-video`). Three are written for cross-functional work an engineer wouldn't necessarily own — managing email templates, running an event launch, asking the production database an ad-hoc question (`sendgrid-template-manager`, `event-setup`, `railway-db-query`). One — `gemini-chat-and-search` — is useful to everyone. Each one is a `SKILL.md` file paraphrased from a real one running in production, lightly redacted. You can paste it into `~/.claude/skills/<name>/SKILL.md` (user-level, available across all your projects) or `.claude/skills/<name>/SKILL.md` (project-level, committed to a repo so your team inherits it) and it will work on the first invocation after you fill in your own credentials, table names, and IDs.

A note on adapting these. Every one of them is **opinionated** — they assert rules about animation timing, port-killing etiquette, retry limits, what columns to read first. Those rules came from real production use, and they will be subtly wrong for your situation. Don't reverently keep them. Open the skill, read it with the agent, and ask "where would this be wrong for our team?" Customizing a skill takes five minutes and is exactly the kind of thing the agent is good at. The skills below are starting points, not gospel.

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

## 5. `sendgrid-template-manager` — the marketer asks, the agent edits the welcome email

Every team with a product has a folder of transactional emails — welcome emails, reset-password emails, event-reminder emails — sitting inside whatever email service the engineers picked years ago. The PM or marketer says "can we update the welcome email to mention the new onboarding flow?" and the actual change is a five-line content edit, but it lives behind an API and a UI nobody on the marketing team has logins for. This skill removes the friction: the agent has scoped API access to the email-template service (here, SendGrid) and can list, read, draft, and update templates on request. The version below is paraphrased from a real production skill. Use it any time someone wants email copy changed. Don't use it for sending campaigns — that's a different blast radius.

````markdown
---
name: sendgrid-template-manager
description: Manage SendGrid dynamic email templates — list, get, create, update, delete templates and versions. Use when the user asks about email templates, SendGrid templates, or needs to create, modify, or inspect transactional email content.
tools: Bash
---

# sendgrid-template-manager

Full CRUD on SendGrid dynamic templates and their versions via the v3 API, plus a brand-consistent base HTML template for new emails.

## When to use

- "Update the welcome email to say X."
- "List all our transactional templates."
- "Create a new template for event confirmations."
- "Show me the current HTML for the password-reset email."
- "Change the subject line on the abandoned-cart reminder."

## When NOT to use

- Sending a campaign or a one-off broadcast — different API, different blast radius, gate that behind explicit user approval.
- Editing email *content* that lives outside SendGrid (in-app banners, push notifications). Different surface.
- Anything touching billing, suppression lists, or subscriber lists. Out of scope.

## Authentication

The API key lives in the environment variable `SENDGRID_TEMPLATE_ADMIN_KEY`. Always read it from the env, never hardcode, never echo the full key into a log.

## Operations

The skill wraps small Python snippets (run with the project's `uv` or `python3`) against `https://api.sendgrid.com/v3`:

- **List templates** — `GET /templates?generations=dynamic&page_size=200`, paginate via the `_metadata.next` URL. The list response uses the `result` key, not `templates` (this is the single most common bug when writing against this API for the first time).
- **Get one template** — `GET /templates/{id}`. The list endpoint omits `html_content`; you must fetch each template individually to read or modify the body.
- **Create / update / delete templates** — `POST`, `PATCH`, `DELETE /templates/{id}`. The template ID format is `d-<32 hex chars>`.
- **Create / update / delete versions** — `POST`, `PATCH`, `DELETE /templates/{id}/versions/{version_id}`. Versions hold the actual `subject`, `html_content`, `plain_content`, and the `active` flag. Version IDs are standard UUIDs.

## Base HTML template

The skill bundles a known-good base HTML for new emails — logo, greeting, body, CTA button, sign-off, social icons, footer, copyright. It has the MSO/Outlook-compatible comment blocks and the mobile-responsive `@media` rules already in place. New templates are created by copying this base and replacing seven placeholders: `{{PREHEADER_TEXT}}`, `{{GREETING}}`, `{{BODY_TEXT}}`, `{{CTA_URL_VARIABLE}}`, `{{CTA_BUTTON_LABEL}}`, `{{CLOSING_TEXT}}`, `{{SIGN_OFF}}`.

Variables auto-injected by the backend (no caller change needed): `{{copyright_year}}`.

## Hard rules

- **Confirm with the user before deleting or modifying any existing template.** Show the diff, get a yes, then act.
- **Test new templates with a dummy send before flipping `active: 1`** on a version that real customers will receive.
- **Use descriptive template names** with an `[In Use]` suffix for the production version. Stale drafts pile up fast.
- **Iterate slowly when bulk-updating.** Add a ~150ms delay between requests to avoid rate-limit blowback.
- **Never log the full API key.** Treat it as production credentials.
- **Don't dedupe versions.** Multiple versions per template are legitimate; the `active` flag is the source of truth.

## Reference files

- The team's brand voice doc (if one exists) — informs subject lines and tone of any new draft.
- The previous version of whichever template you're editing — `GET` it before you `PATCH` so the diff is visible.
- The team's i18n table, if templates exist in more than one language.
````

**How to adapt this.** Two things to localize. First, the env-var name and the base HTML — swap them for your team's actual key and your actual branded template. Second, the database side: most teams that use a transactional-email service also have a small table in their own database that maps an app-side template key (`welcome_email_v2`) to the SendGrid template ID, so the app can swap templates without a code change. If you have one, add a small section to this skill that documents the table and the typical SQL query to find which SendGrid ID a given app-side template is currently pointing at.

## 6. `event-setup` — collapsing a six-Slack-channel launch into one invocation

Launching a new event (a conference, a hackathon, a webinar) is the kind of cross-functional task that lives in six different Slack channels and never quite gets written down. Marketing creates a SendGrid template, engineering wires up a registration page, ops sets up the Google Sheet that tracks who signed up, someone schedules the reminder emails. Each piece is small; the coordination is what eats the week. This skill is the SOP: it walks the agent through every checkbox — templates, database records, Google Sheets sync, test the registration flow end-to-end — in the order they actually need to happen. Paraphrased from a real production skill that has shipped dozens of events. Use it whenever a new event needs to go live. Don't use it for one-off ad-hoc broadcasts that don't need registration tracking.

````markdown
---
name: event-setup
description: Step-by-step guide for launching a new event — SendGrid templates, email config, event record, Google Sheets sync, and end-to-end testing. Use when setting up a new event or modifying event email flows.
tools: Bash, Read
---

# event-setup

The launch SOP for a new event. Templates, database records, reminder schedule, sheet sync, smoke test. In this order.

## When to use

- A new event (conference, hackathon, webinar, info session) needs registration and email flows wired up.
- An existing event's email content, reminder timing, or sheet sync needs to change.
- Verifying that an event's full registration flow still works after a refactor.

## When NOT to use

- One-off broadcasts that don't need per-recipient tracking. Use the email-template skill directly.
- Pure marketing-site changes (a landing page that doesn't accept registrations). Different surface.
- Anything that touches a payment flow. Out of scope here.

## Prerequisites

1. SendGrid template IDs for the registration email and any reminder emails (up to 3 per event).
2. A Google Sheet for tracking registrations, shared with the service account email. Note the sheet ID from the URL.
3. Event details: title, date, organizer name, mode (`ONLINE`/`OFFLINE`/`HYBRID`), unique invite code, line of business, region.
4. Admin role on the backend, with permission to run the relevant management commands.

## Procedure

### Step 1 — Create templates in SendGrid

Use the `sendgrid-template-manager` skill if it's installed. Otherwise, create them in the dashboard. You need:

- One **registration** template (the confirmation email sent right after sign-up).
- Up to three **reminder** templates (typical: 1 week before, 1 day before, day-of). Each gets its own SendGrid template ID, format `d-<32 hex chars>`.

Personalization variable used across all: `{{first_name}}`. Event-specific details (name, date, organizer) are usually hardcoded in the template body rather than passed as variables.

### Step 2 — Register templates in the backend

Add `update_or_create` calls in the project's email-templates seed command (here: `set_up_event_email_templates.py`). Each record needs: app-side UUID, display name, the SendGrid template ID, the provider, the `is_active` flag, and the line-of-business / region tags so the right tenant picks it up.

### Step 3 — Create the event record

Add an `Event.objects.update_or_create(...)` call in the events seed command (`set_up_events.py`). Fields: `date`, `title`, `organizer_name`, `mode`, `event_invite_code` (unique lowercase string), `gsheet_id` (the Google Sheet from prerequisites), `registration_email_template_id`, and the reminder pairs (`reminder_email_template_N_id` plus `reminder_send_at_N` for each reminder you want). Tag with `line_of_business` and `region_of_business`.

### Step 4 — Enable the setup commands in the deploy script

Uncomment (or add) the two management commands in the migration step so they run on the next deploy:

```bash
uv run python manage.py set_up_event_email_templates
uv run python manage.py set_up_events
```

### Step 5 — Wire the event into the Google Sheets sync

Add the new event's UUID to the list of events the health-check cron syncs (commonly in `monitor.py`). The cron writes registrations to the sheet and flips the `wrote_to_gsheet` flag so they don't get re-written.

### Step 6 — Smoke test locally

Run lint and the event test suites, then exercise the registration flow in a shell:

```bash
just lint
uv run pytest tests/.../event -v
```

Then call the registration function directly with `is_production=False` and confirm the `NotificationMessage` rows for both registration and reminders get created.

### Step 7 — Verify in staging, then ship

After deploy to staging: register a test user, confirm the email lands, confirm the row appears in the Google Sheet, confirm a reminder is scheduled at the right time. Only then promote to production.

## Hard rules

- **4-day cutoff is not optional.** SendGrid's `send_at` parameter has a hard 7-day ceiling. The backend schedules anything beyond ~4 days in-house instead of handing it to SendGrid. Don't bypass that path.
- **Reminders are capped at 3 per event.** If you need more, you're using the wrong primitive — write a campaign, not an event.
- **Retry budget is 10.** Failed notifications retry up to 10 times before being parked. Don't raise this without explicit user approval.
- **Don't hardcode template IDs in code paths.** All template lookups go through the `EmailTemplate` table, not constants. This is what makes templates editable without a deploy.
- **Confirm with the user before changing an active event.** Especially `reminder_send_at_*` — these can fire emails immediately if you set them to the past.
- **No registrations are written without a `NotificationMessage` reference** for the audit trail.

## Reference files

- The events seed command (`set_up_events.py` or equivalent).
- The email-templates seed command.
- The notifications module (`email_service.py`, `scheduled_email_processor.py`) for the cutoff and retry logic.
- The reference PR for the most recent launch — every team has one; use it as a worked example.
````

**How to adapt this.** Two things are project-specific. First, the names of the management commands and the location of the cron health-check are different in every codebase — ask the agent to find them on first run and update the skill with the actual paths. Second, the cutoff window (4 days here) and retry budget (10 here) are tuned for one team's email volume; teams sending fewer, more time-sensitive emails should tighten both.

## 7. `railway-db-query` — the PM gets to ask the database a question

Half the time someone asks an engineer "do we have any users on the new plan yet?", the engineer pulls up a SQL client, runs `SELECT COUNT(*) FROM ...`, pastes the number back, and moves on. The other half, the engineer is in the middle of something else, the PM waits two days, and decisions get made on guesses. This skill closes that gap. It gives the agent scoped, read-only access to the project's hosted databases (here, Postgres on Railway across dev and prod) plus a library of common analysis queries — token usage and cost, user-tier counts, schema inspection, recent activity. The PM asks in English; the agent runs the query and explains the result. Paraphrased from a real production skill. Use it for ad-hoc analytical questions. Don't use it as a substitute for a real BI tool, and don't use it for anything that writes.

````markdown
---
name: railway-db-query
description: Access Railway development and production databases to run read-only SQL queries, analyze costs, debug issues, and explore data. Use when the user asks to "check the database", "query dev/prod database", "analyze token costs", "check user counts", or needs to investigate database state.
---

# railway-db-query

Connect to the project's hosted Postgres databases and run read-only analysis queries.

## When to use

- "Check whether any users have signed up for X yet."
- "How much are we spending on Y this month? Pull the token counts."
- "Did the new table get created in prod after the last deploy?"
- "Why don't we see any rows in the new analytics table?"
- General ad-hoc data questions where pulling out a BI tool would be overkill.

## When NOT to use

- Anything that writes (`INSERT`, `UPDATE`, `DELETE`, `DROP`, `ALTER`, `TRUNCATE`, `GRANT`). Different blast radius — gate behind explicit user approval if it's ever needed, and prefer a migration in the codebase instead.
- Long-running reports the team will want to see every week. Build it into a real dashboard.
- Anything touching PII without a documented reason and an audit trail.

## Connection

Railway uses proxy connections with per-environment credentials. The connection string format is:

```
postgresql://USER:PASSWORD@HOST:PORT/DATABASE
```

Get it by asking the user for the `DATABASE_URL` for the environment they want (dev or prod), or by checking the project's `.env.dev` / `.env.prod` if those are local and gitignored. Default database name is `railway`, default user is `postgres`. Test the connection with `psql "$CONNECTION_STRING" -c "SELECT NOW();"` before doing anything real.

## Common queries

Keep a small library of starter queries in the skill — the agent picks the right one based on the user's question and adapts it.

- **Token usage and cost.** `SELECT COUNT(*), SUM(input_tokens), SUM(output_tokens), AVG(total_tokens), MIN(created_at), MAX(created_at) FROM <table> WHERE input_tokens IS NOT NULL;` — then apply the current per-million pricing for the model the team is using to get a monthly cost projection.
- **User and tier counts.** `SELECT subscription_tier, COUNT(*), COUNT(CASE WHEN status = 'active' THEN 1 END) FROM users GROUP BY subscription_tier;`
- **Recent activity across tables.** A `UNION ALL` block that counts rows and shows earliest/latest `created_at` per table — useful for "did anyone actually use the new feature this week?".
- **Schema inspection.** `SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = '<table>'` and `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`.
- **Row counts at a glance.** `SELECT tablename, n_live_tup FROM pg_stat_user_tables ORDER BY n_live_tup DESC;`

## Workflow

1. Ask the user which environment (dev or prod) and confirm the connection string.
2. Test the connection.
3. Pick (or adapt) the closest starter query.
4. Run it. Format results as a Markdown table.
5. Add interpretation — calculate cost projections from token counts, point out when "earliest" is recent enough that the data is incomplete, flag anything surprising.

## Hard rules

- **Read-only by default.** Never run `INSERT`, `UPDATE`, `DELETE`, `DROP`, `ALTER`, `TRUNCATE`, `CREATE`, `GRANT`, or `REVOKE` without showing the user the query and getting explicit approval.
- **Always `LIMIT` exploratory queries** on large tables. Add `LIMIT 100` by default; remove it only when the user asks for full counts.
- **Never log the connection string** with the password embedded. Reference it via the env var, not by echoing it back.
- **Prefer aggregates over row dumps** when answering a question. "How many users on Pro" is a `COUNT`, not a `SELECT *`.
- **State the environment in every reply.** A number from dev and a number from prod look identical and mean very different things.
- **If a query takes longer than a few seconds, stop and `EXPLAIN`** before re-running. Long-running queries on prod are a real cost.

## Reference files

- The project's `.env.dev` / `.env.prod` for connection strings (if committed locally and gitignored).
- The team's pricing or model-cost reference for any cost-calculation queries.
- The latest schema migration for the table the user is asking about.
````

**How to adapt this.** Three things to localize. First, the connection-string format and host pattern — Railway, Supabase, RDS, Cloud SQL all look different; document the one your team uses. Second, the starter-query library — the five above are the most-asked across the projects this was distilled from, but every team has its own top ten. Ask the agent to pull the team's last month of database questions out of chat history and propose the queries that would have answered them. Third, decide explicitly whether you ever want this skill to be able to write. If the answer is "no, ever," strip the approval-gated language and replace it with a flat ban.

## Writing your own from scratch

Chapter 19 gives you two flows for getting to a new skill, and they're worth remembering at the bottom of this appendix because the seven skills above might tempt you to think writing one is a big deal. It isn't.

**Search first.** Before you write anything, ask the agent: "Is there an existing skill for X? Check the Anthropic skills registry, my user-level skills, the project's skill directory, and `awesome-claude-skills` on GitHub." Skills are usually published as a single Markdown file in a repo, so they're easy to find and easy to copy. The seven in this appendix are a starting library, but the ecosystem is much larger and growing weekly. If someone has already paid the tax of writing the skill you need — for Shopify, for Linear, for HubSpot, for your specific build tool — inherit their work.

**Write from conversation, not from a blank file.** The far more common flow: you've just finished a piece of work, you notice you had to remind the agent of the same three rules along the way, and you say "turn what we just did into a skill." The agent reads its own session transcript, writes a draft `SKILL.md`, you read it, you sharpen the rules that were soft, and you save it. Total time: ten minutes. The skill captures the exact friction you just experienced, which is the friction your team will keep experiencing. That's the loop. The seven skills in this appendix were all written that way originally — none of them started as "let me sit down and design a skill." They started as "we keep doing this wrong, let's write it down."

Skills are cheap to write, cheap to throw away, and cheap to revise. Don't treat them like architecture documents. Treat them like running notes — the ones that happen to be machine-readable.
