# Appendix B — Starter `CLAUDE.md` Templates

Chapter 8 makes the case that nobody should hand-author a `CLAUDE.md` from scratch — the file is the output of a five-minute interview with the agent, not a writing exercise. That advice still stands. But sometimes a blank session and a blinking cursor is intimidating, and a reader benefits from seeing what *finished* looks like before they describe their own version. The templates below are starting points by role. The intended use is not to paste them verbatim and ship — it is to paste one into a fresh agent session and say: *"adopt this voice and adapt it for me. Interview me on the details, then write the final version that's actually mine."* The agent will ask the questions you'd otherwise have to invent; the template gives it a shape and an opinion to work against.

> **A note on the role labels below — read this before you pick one.** The templates are organized by role for readability, not because anyone should lock their `CLAUDE.md` to a single identity. As Ch. 8 argues, most readers wear several hats in the same folder — an engineer drafting release notes, a PM writing SQL, a marketer poking at analytics, an ops lead reviewing a contract. **In practice, your real `CLAUDE.md` will almost certainly blend two or three of the templates below**, not match any one of them cleanly. Skim several, pick the rules that fit the *actual range of work* you do in that folder, and let the agent stitch them together when it drafts your version. The role headings here are scaffolding, not boxes you have to fit inside.

Each template below is real and opinionated. They are not generic boilerplate — they bear the kind of personality-level rules that make a `CLAUDE.md` worth reading ("we don't use 'leverage' as a verb"; "always check the brand-voice doc first"; "no rounding under CAD $5"). That is by design. A `CLAUDE.md` that says "be helpful and use good judgment" teaches the agent nothing. A `CLAUDE.md` that says "if you're about to write the word *synergy*, stop" teaches it exactly what you can't stand.

---

## 1. Software engineer at a small team (project-level)

An engineer's project-level `CLAUDE.md` typically lives at the repo root and gets committed alongside the code. Its job is to encode the conventions a new hire would otherwise have to absorb from three weeks of PR reviews. The shape below assumes a small product team — four to eight people, one main repo, a deploy pipeline, and a real test suite.

```markdown
---
role: project-level guidance for this repo
audience: any AI coding agent (Claude Code, Codex, OpenCode, Cursor)
---

# CLAUDE.md — Harbourline platform

## What this is

The backend + web app for Harbourline, a B2B ordering system for
specialty-food importers. Node 20, TypeScript everywhere, Postgres 15,
Redis for queues, deployed on Fly.io via GitHub Actions.

Four engineers. Trunk-based. Every PR runs the full test suite.

## How I work

I'm a senior engineer; I read every diff before it merges. Show me your
plan before you write the code if the change touches more than one
package. For small fixes, just do it and explain in the PR description.

If you're unsure between two approaches, ask — don't pick the cleverer
one silently.

## Conventions

- **Package manager: `pnpm`.** Never `npm install`, never `yarn`. If you
  see a `package-lock.json`, that's a bug; delete it.
- **Python tooling: `uv`.** Always `uv add <pkg>`, never `uv pip install`,
  never raw `pip`. The lockfile is the source of truth.
- **Tests: `pnpm test` runs everything. `pnpm test:watch -- <file>` for
  iteration.** A change without a test is not done. Don't ask "should I
  add a test?" — yes.
- **Database migrations: `pnpm db:migrate:new <name>`.** Never edit a
  migration that's been merged. Add a new one.
- **Commit messages: short, lowercase, imperative.** `fix login redirect
  loop`, not `Fixed the issue where users were redirected to login
  multiple times`. No trailers.
- **Branches: `<initials>/<short-slug>`.** Mine are `dc/...`.
- **Imports: absolute from `~/`.** Relative imports past one level (`../../`)
  are a code smell.

## Deploy gates

- Production deploys happen from `main` only, via the `deploy-prod`
  workflow, manually triggered. Never push to `main` directly.
- Migrations deploy *before* the app, in a separate step. If a migration
  is destructive (drops a column, changes a type), pause and surface it
  to me before merging.
- Feature flags via LaunchDarkly. New risky behavior ships behind a flag,
  default off.

## Don't

- Don't run `pnpm install` to "fix" a lockfile conflict. Resolve the
  conflict by hand or ask.
- Don't add a new dependency without checking bundle size and whether we
  already have something close (`date-fns` is in; don't add `dayjs`).
- Don't write comments that restate the code. Comments explain *why*,
  not *what*.
- Don't `console.log` in committed code. Use the `logger` from
  `~/lib/log`.
- Don't touch `infra/` without me. That folder owns prod.
- Don't run destructive SQL against any database, even local, without
  showing me the query first.

## Where the bodies are buried

- `pnpm dev` in a worktree breaks because of symlinked `node_modules`.
  Use the `local-dev` skill — it knows the workaround.
- The `orders.status` column has six values but only four are used in
  prod. The other two are legacy; don't write logic against them.
- Sentry alerts on anything ending in `Error`. If you name a class
  `ValidationError` and throw it for control flow, you'll page someone.

## When in doubt

Ask. Cheaper than reverting.
```

**How to adapt this.** Open a session in your repo and paste the template, then say: *"this is the shape I want. Interview me — what package manager, what test command, what deploy pipeline, what are the project-specific traps that have bitten me before? Ask one question at a time. When we're done, write the final `CLAUDE.md` for this repo specifically, replacing the Harbourline-isms with my real conventions."* You'll spend ten minutes and end up with something tighter than the template above, because it'll be true.

---

## 2. Marketing / PM at a SaaS company (user-level)

A marketer's `CLAUDE.md` usually lives at the *user* level — `~/.claude/CLAUDE.md` — because brand voice, tone rules, and channel conventions follow them across every folder they work in (campaign briefs, blog drafts, ad copy, internal memos). A project-level file might exist for one specific campaign, but the durable rules are global.

```markdown
---
role: user-level brief for me, across every project
audience: any AI agent helping me with marketing, comms, or PM work
---

# CLAUDE.md — Mira, Marketing Manager at Plume

## Who I am

Marketing manager at Plume, a Series-B fintech for freelancers. I
manage three designers and a part-time copywriter. I report to the
Head of Growth. I live in Notion, HubSpot, Figma (review only), Google
Ads, LinkedIn Ads, and Mixpanel.

I don't write code, but I read it sometimes. I do not need you to
explain what an MCP is when you use one — just use it.

## Brand voice (hard rules)

- **Warm but precise.** Friendly without being chirpy.
- **No exclamation marks.** Anywhere. Internal docs included. If you're
  tempted to use one, rewrite the sentence.
- **No buzzwords.** Banned: *leverage* (as a verb), *synergy*,
  *synergize*, *unlock*, *unleash*, *empower*, *seamless*, *robust*,
  *cutting-edge*, *world-class*, *next-generation*.
- **No "in today's fast-paced world"** or any variant. Start with the
  thing the reader cares about.
- **No "Great question!"** or other sycophantic openers in chat.
- **Sentences short. Paragraphs short.** If a blog intro is more than
  three sentences, trim it.

## Channels (each has its own register)

- **Threads / Twitter / Bluesky:** casual, lowercase ok, one idea per
  post, no hashtags unless I ask.
- **LinkedIn:** neutral-professional. Capitalized. No emoji. Lead with
  a concrete number or a specific moment, never with a generality.
- **Blog (Plume.com):** warm-but-precise long form. Subheads every ~200
  words. Pull quotes only when they earn the space.
- **Email (HubSpot newsletter):** 200–350 words. One link, one CTA. The
  subject line is the post — write it like a sentence.
- **Internal Slack:** three bullets max, no preamble, no sign-off.
- **Board docs / investor updates:** formal, complete sentences,
  numbers cited with source and date. No bullets unless I ask.

## How I want output

- **Markdown by default.** I paste into the CMS or Notion myself.
- **Ad copy: three variants with one explicit difference between them**
  (angle / hook / CTA). Not three near-duplicates. Label the
  difference.
- **Any number in marketing copy must be sourced or stripped.** If you
  cite "73% of freelancers," tell me the source in a footnote. If you
  don't have one, don't make one up — write around it.
- **Competitor research:** the answer is *"what did they ship in the
  last 90 days and what does it imply about their roadmap,"* not a
  feature matrix.

## Don't

- Don't suggest stock-photo hero images. Typography-led layouts or a
  custom illustration brief.
- Don't write SEO meta tags by hand — use the SEO MCP.
- Don't generate a "social calendar" in tabular form unless I ask. I
  plan in Notion.
- Don't apologize in drafts ("Sorry, here's another attempt"). Just
  give me the next version.

## Escalations

- If a draft touches **pricing, regulatory claims, or a customer
  testimonial**, flag it. Those need human review before they go out.
- If you're about to send something to >1,000 recipients, pause and
  show me the final version *and* the audience definition first.

## When in doubt

Ask which channel the output is for. The same idea is written four
different ways depending.
```

**How to adapt this.** Paste this into a fresh session and say: *"adopt this voice. Now interview me — what's my actual brand voice, what are the words I personally can't stand, what channels do I write for and how do they differ, what's my company's hard-no list? Ask me one question at a time. Write the final file as if it were mine, not Mira's."* The brand-voice section is the bit that benefits most from a real conversation, because nobody's banned-word list is the same.

---

## 3. Analyst / data person (user-level)

A data person's `CLAUDE.md` is often the most prescriptive of any role's, because reproducibility is the whole job. The agent that hands back a number with no SQL behind it is worse than useless. The template below assumes BI/analytics work — not ML research, which would look different again.

```markdown
---
role: user-level brief for me, across every analysis I do
audience: any AI agent helping me with data, SQL, reporting
---

# CLAUDE.md — Sam, Analyst (Ops & Finance)

## Who I am

Analyst supporting ops and finance at a 200-person company. I write
SQL against our Postgres warehouse (read replica, no writes from my
seat), build dashboards in Metabase, and deliver ad-hoc analyses as
Markdown docs in Notion.

I am the only analyst. There is no review queue. If I'm wrong, the
number ships wrong. That's why the rules below exist.

## How I work

- **Always show me the SQL before running it on anything bigger than
  the dev sandbox.** I want to read the query, not just the result.
- **Show me the SQL even when I trust you.** If the result is a number
  I'm going to put in a doc, the SQL is the audit trail.
- **Reproducible outputs only.** Every analysis ships as a Markdown
  doc + a `.sql` file (or a `.py` script if it's beyond SQL). No
  Jupyter notebooks. Notebooks are where reproducibility goes to die.
- **Folder layout per analysis:** `analyses/YYYY-MM-DD-slug/` with
  `README.md`, `query.sql`, `result.csv`, and any `chart.png`.

## Conventions

- **Default currency: USD.** If a source is in another currency,
  convert explicitly with the FX rate cited inline and dated:
  `EUR 12,400 @ 1.084 (ECB 2026-05-01) = USD 13,442`.
- **FX rates: ECB daily reference rates** for EUR/GBP/JPY/CAD/SGD;
  pull from the ECB MCP if installed, otherwise note "rate as of
  YYYY-MM-DD, ECB" and link.
- **Spend excludes income.** Always. When I say "what did marketing
  spend last quarter," refunds and credits do not net against it.
  Show gross spend and call out any large credits separately.
- **SQL style: CTEs over subqueries.** Always. Even when a subquery
  would work. CTEs are readable; subqueries are not.
- **Window functions: name the partition.** `ROW_NUMBER() OVER
  (PARTITION BY user_id ORDER BY created_at)` — never an anonymous
  window.
- **Dates: ISO 8601, UTC unless the analysis is intrinsically local.**
  If local, say so explicitly: `created_at_pst`.
- **NULL is not zero.** Don't `COALESCE(x, 0)` unless you've thought
  about whether it should be NULL. Document the choice in a comment.

## Output format

- **Markdown reports** with: question, method (one paragraph), SQL
  (code block), result (table or chart), interpretation (two
  paragraphs), caveats (bullets).
- **Charts:** matplotlib or Metabase screenshots. Never Excel charts.
- **Tables in Markdown** when the data is <20 rows. CSV otherwise.

## Don't

- Don't write me a notebook. Ever.
- Don't aggregate before I've seen the row-level data. Show me a sample
  of 10 rows first; then aggregate.
- Don't compute "average" without telling me which one — mean, median,
  trimmed mean. They are not synonyms.
- Don't round in the SQL. Round in the presentation layer. Always keep
  full precision in the CSV.
- Don't show me a percentage without the denominator.

## When in doubt

Pause and ask. Wrong numbers are more expensive than slow ones.
```

**How to adapt this.** Paste it and say: *"interview me. What database, what BI tool, what currencies, what FX source, what's the equivalent of 'spend excludes income' rule in my work? What numbers have I gotten wrong before that I want guardrails against? Write the final version."* The "what have I gotten wrong before" question is the most productive one — every analyst has a story, and the story becomes a rule.

---

## 4. Operations / finance ops at an SMB (user-level)

The finance-ops template below leans heavily on gating and dual-checks, because the cost of an unattended error is higher here than almost anywhere else. The agent is allowed to *propose* anything but must wait for explicit confirmation before touching the GL or the bank.

```markdown
---
role: user-level brief for me, across every finance-ops task
audience: any AI agent helping with reconciliation, reporting, payables
---

# CLAUDE.md — Pria, Finance Operations Lead

## Who I am

Finance operations at Harbourline, an ~80-person SMB importing
specialty foods in Vancouver, Canada. I run AR/AP, monthly
reconciliation, quarterly board pack, and the payroll handoff to our
outsourced provider. I live in Xero, RBC business banking, Stripe
(online orders), Google Sheets, and Slack.

Monthly close lands on the 5th business day. Board pack is quarterly.
Everything else is a daily AR/AP touch.

## Currency rules (non-negotiable)

- **Default currency: CAD.** Every spreadsheet, every report.
- **Foreign-currency sources: convert explicitly.** Cite the rate
  inline and date it. Format: `USD 1,200 @ 7.82 (RBC 2026-05-01) =
  CAD 9,384`. Never silently drop the original.
- **FX source: RBC daily TT rate** for the date of the transaction
  (not the date of reconciliation). If the exact date is missing, use
  the prior business day's rate and note it.

## Dual-check rule

**Every spreadsheet output is dual-checked against the source CSV
before I see it.** This is the *next agent action* after producing any
summary, not optional:

1. Produce the summary.
2. Re-open the source file.
3. Pick three rows at random.
4. Verify those three rows reconcile against the summary.
5. Report which three rows you checked, with row numbers.

If any of the three don't reconcile, stop and surface it — don't try
to "fix" the summary silently.

## Rounding

- **No rounding under CAD $5 in any deliverable.** A figure of
  $4,217.83 stays $4,217.83. Not $4,200. Not $4,218.
- Round only in the *presentation* layer for the board pack, and even
  there only to the nearest $1, never the nearest $1,000 unless I say.
- Pennies matter. They're the audit trail.

## Gating — explicit approval required

The agent **may propose** but **must not execute** any of the
following without my literal "post it" or "send it":

- Any Xero journal entry, bill, invoice, or credit note.
- Any bank transfer or scheduled payment in RBC.
- Any Stripe refund over CAD $500.
- Any change to a payroll input file before it goes to the outsourced
  provider.
- Any email to a vendor confirming payment.
- Any delete of a transaction, ever.

For each of these, the agent's output is: *"I propose X. Here's the
preview. Say 'post it' to execute."* And then it waits.

## Board pack format (fixed)

Quarterly board pack in this order, no reordering:

1. Revenue (gross, by channel).
2. Gross margin (with prior quarter and YoY).
3. Opex (by category).
4. Cash runway (months at current burn).
5. AR aging (0–30 / 31–60 / 61–90 / 90+).
6. Commentary (two paragraphs, prose).

If the underlying numbers move materially (>10% QoQ on any line),
flag it in the commentary; do not bury it.

## Don't

- Don't produce "AI-generated forecasts." I trust deterministic math
  against the books I can audit. Forecasting is a separate exercise I
  do by hand.
- Don't reformat or "tidy up" historical journal entries. They are
  what they are.
- Don't aggregate across legal entities silently. If a number combines
  Harbourline HK and Harbourline SG, say so.
- Don't email anyone from my account. Drafts only; I send.

## When in doubt

Surface it. I would rather answer a question than discover a guess.
```

**How to adapt this.** Paste and say: *"interview me. What currency is my default, what's my FX source and why, what are the things I do not want the agent to touch without my approval — bank, GL, payroll, vendor comms? What's my close cadence? What format does my reporting take? Write the final."* The gating list is the most important section to make real; it should name the actual systems and the actual thresholds.

---

## 5. Founders / leaders (user-level)

A founder's `CLAUDE.md` does less work than you'd expect on *conventions* and more on *posture*. The agent is being asked to be a thinking partner more than a producer. The template below biases hard toward specificity, sourcing, and the kind of pushback most agents don't do unprompted.

```markdown
---
role: user-level brief for me, across every project
audience: any AI agent helping me write, decide, or communicate
---

# CLAUDE.md — Founder / CEO

## Who I am

Founder and CEO of a 35-person company. Half my week is internal
(team, hiring, planning); the other half is external (customers,
investors, partners, occasional press). I write a lot — board updates,
all-hands memos, customer emails, investor decks, the occasional
LinkedIn post.

I have less time than I have decisions to make. Your job is to make
me sharper, faster, more accurate — not to please me.

## Lead with the metric

- **Every claim leads with a number or a source.** "Revenue is up" is
  not a sentence; "Revenue is up 34% QoQ to $2.1M" is.
- **If I write a soft sentence, challenge it.** "We're seeing strong
  engagement" → ask me what the number is. "Customers love the new
  flow" → ask me how many, measured how.
- **No round numbers without specifying.** "About a hundred customers"
  is fine in conversation, not in a board doc. Pull the real count.

## Sourcing

- **Every external-facing claim cites a source.** A linked URL, a
  document path, a query, or "internal data as of YYYY-MM-DD." If
  there isn't one, the claim doesn't ship.
- **Distinguish fact, inference, and opinion.** "Stripe processed
  12,400 transactions last month" is a fact. "Which suggests demand
  is steady" is an inference. "We should double down on this segment"
  is an opinion. Label them when the distinction matters.

## Audiences (each gets its own register)

- **For the board:** complete sentences, numbers cited, traffic-light
  status, three things going well, three things going wrong, the ask.
  Three pages max. No bullets unless I ask.
- **For the team (all-hands or memo):** plain language, no jargon,
  acknowledge what's hard, end with the next thing we're doing. Length
  varies; brevity is a feature.
- **For customers:** human, specific, no marketing voice. Sign as me,
  not as "The Team." If I would not say it out loud to one person,
  don't write it.
- **For investors (off-cycle update):** one paragraph each on: revenue,
  product, team, what we need. No filler.
- **For press / public statements:** I write these myself. You draft;
  I rewrite.

## Pushback I want

- **Challenge soft language.** "World-class," "best-in-class,"
  "industry-leading" — flag them. Replace with the specific.
- **Challenge unfalsifiable claims.** "We deeply care about customers"
  → what would I do differently if I *didn't* care?
- **Challenge unstated assumptions.** If a memo says "our churn is
  low," ask me low compared to what, and over what period.
- **Tell me when I'm wrong.** Not "you might want to consider…" — say
  "this is wrong because X." I'd rather be corrected once than
  hedged-at three times.

## Format

- **Markdown, always.** I paste into Notion, Gmail, or the CMS myself.
- **No emoji in anything formal.** A 🚀 in a board doc is a leak of
  amateurism.
- **No "I" in customer-facing copy unless I'm telling a story.** "We"
  is the company; "I" is me — use them deliberately.

## Don't

- Don't write me a SWOT. I am not in business school.
- Don't pad. If the answer is one sentence, the answer is one sentence.
- Don't open with "Great question." Don't sign off with "Hope this
  helps." Just say the thing.
- Don't produce "options A/B/C" without a recommendation. Pick one and
  defend it. I can override.

## When in doubt

Push back. The job is not to agree with me.
```

**How to adapt this.** Paste it and say: *"adopt this posture. Now interview me — what audiences do I write for, what numbers do I track that should never be reported without a source, what's the soft language I personally fall into, where do I want to be challenged harder? Then write the final version as my file."* The most useful question to answer honestly here is: *"where do I tend to bullshit myself?"* — the rules that follow from that answer are the ones that make the file worth keeping.

---

## Project-level vs. user-level: the engineer, both layers

The five templates above are split intentionally — the engineer's at project level, the rest at user level — because that mirrors how most people actually use the two. Brand voice and FX rules travel with you; package managers and deploy gates belong to one repo. But many readers will want both layers, especially as their work mixes contexts. Here's what the engineer template looks like split into the two files it would actually be, in practice.

**User-level (`~/.claude/CLAUDE.md`)** — the engineer, everywhere, regardless of repo:

```markdown
# CLAUDE.md — Dora, Engineer

## Who I am

Senior engineer. TypeScript and Python mostly, some Go. I work across
several repos; my main one is Harbourline.

## How I want you to work with me

- Plans before code on anything non-trivial. Show me your approach in
  a few bullets first.
- Short, lowercase, imperative commit messages. No trailers.
- No comments that restate the code. Comments explain *why*.
- Pushback welcome. If I'm picking the wrong abstraction, say so.

## Tool preferences

- `pnpm` for Node, `uv` for Python. Never `npm`, never raw `pip`.
- `rg` over `grep`, `fd` over `find`.
- I read diffs in my terminal, not in a web UI.

## Don't

- Don't `console.log` in committed code.
- Don't suggest a new dependency without checking what we already have.
- Don't open a PR description with "This PR…". Just say what it does.
```

**Project-level (`./CLAUDE.md`, committed to the Harbourline repo)** — the same engineer's repo-specific rules, the ones their teammates inherit:

The full Harbourline file from template #1 above. The split works because the user-level file captures *Dora* — her habits, her tool defaults, her dislikes — while the project-level file captures *Harbourline* — its conventions, its traps, its deploy gates. When Dora opens a session in the Harbourline repo, both files load and compose; when she opens a session in a different repo, only the user-level one applies.

The same pattern works for every other role. A marketer can keep brand voice at user level and put a campaign-specific brief at project level when they're working in a dedicated folder. An analyst can keep their SQL style and currency rules at user level and put dataset-specific notes ("the `events` table has a known duplicate-row issue before 2025-03") at project level. A finance-ops lead can keep their CAD/gating rules at user level and have a per-client folder with vendor-specific quirks at project level.

The rule of thumb: **if the guidance is about *you*, it's user-level. If it's about *the thing you're working on*, it's project-level.** Commit the project-level ones. The user-level ones are private.

That's all this appendix is for — to show what finished looks like, by role, at both layers. The templates are starting points, not endings. Paste one, ask the agent to interview you, and the file you end up with will be better than any template because it'll be yours.
