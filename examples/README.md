# Examples

These files are mock data designed for the exercises in the corresponding chapter of the playbook. Drop them in front of your agent and try the prompt described in the chapter — that's the entire point of this folder. Names, amounts, customers, vendors, and transactions are all fictional.

## Index

- **`ch-05-ai-subscriptions/`** — Ch. 5 (skip the AI wrapper, keep the SaaS). A one-month company card statement mixing real-looking AI subs, AI add-ons, and ordinary business expenses, for the AI-subscription audit exercise.
- **`ch-08-personas/`** — Ch. 8 (teach the agent who you are). Three fictional personas (marketing manager, freelance designer, finance ops) to inhabit while running the CLAUDE.md interview prompt.
- **`ch-09-saas-stacks/`** — Ch. 9 (MCP). Three fictional SaaS stacks (startup founder, sales team, agency PM) to run the MCP-discovery loop against.
- **`ch-11-context/`** — Ch. 11 (context-first). A messy meeting transcript for extracting action items.
- **`ch-12-multi-format/`** — Ch. 12 (artifact vs. action). A one-page quarterly business update to render into four different output forms (HTML, PDF, channel post, voiceover).
- **`ch-13-self-audit/`** — Ch. 13 (self-audit). A small sales CSV with a deliberate error the agent should catch on re-check.
- **`ch-14-parallel/`** — Ch. 14 (letting it cook). A three-angle research brief for the parallel sub-agent fan-out exercise.
- **`ch-15-corrections/`** — Ch. 15 & 16 (skills vs. slash vs. MCP; when to stop re-prompting). Six plausible repeated agent corrections to layer-decide on.
- **`ch-17-session-transcript/`** — Ch. 17 (writing a good skill). A fake session transcript with four planted corrections, primed for extracting a skill from the conversation.
- **`ch-18-mock-repo/`** — Ch. 18 (engineers). A tiny Python repo with a planted off-by-one bug and a `BUG.md` ticket, for running plan → diff → ship without bringing your own repo.
- **`ch-18-pr-review/`** — Ch. 18 (engineers). A mock PR diff with planted issues (SQL injection, committed-looking secret, missing test) for the second-pair-of-eyes review exercise.
- **`ch-19-analytics/`** — Ch. 19 (data & analytics). A noisy multi-currency transactions file for cleanup, reporting, and duplicate detection.
- **`ch-20-finance-ops/`** — Ch. 20 (finance & ops flagship). Fake invoices and a Stripe export to reconcile against each other.
- **`ch-20-hr/`** — Ch. 20 (HR screening). A job description and five CVs to rank.
- **`ch-21-downloads/`** — Ch. 21 (personal workflows). A mock Downloads folder of ~40 stub files for the grouping / triage exercise.
- **`ch-21-everyone/`** — Ch. 21 (personal workflows). A bank statement to summarize and check for forgotten subscriptions.
- **`ch-21-mystery/`** — Ch. 21 (personal workflows). Two "what is this?" items: a dense tax-form fragment and a cryptic IoT error log.
- **`ch-22-vision/`** — Ch. 22 (voice and vision). Text mockups of a confusing receipt and a confusing benefits form, standing in for screenshots.
- **`ch-24-cost-audit/`** — Ch. 24 (responsible agents). A one-month API billing export for the "find the most expensive workflow" exercise.
- **`ch-24-credentials/`** — Ch. 24 (responsible agents). A fictional credential inventory for the over-permissive-access audit.

Each folder has its own `README.md` with the suggested prompt.
