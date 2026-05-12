# Ch. 18 — Second-pair-of-eyes PR Review Exercise

A small mock PR with planted issues, so engineers can practice the "use a second agent to review the first agent's PR" pattern from Ch. 18 against known-bad input.

- `pr-description.md` — the PR author's stated intent. The reviewer should hold the diff up against this.
- `pr-diff.md` — ~120 lines of diff across four files. Mock Node.js + Express service.

## Planted issues (don't peek before you try)

<details>
<summary>Click to reveal</summary>

1. **Real security issue (high severity):** the new CSV endpoint interpolates `req.params.id`, `req.query.from`, `req.query.to`, `page`, and `per_page` directly into a SQL string — classic SQL injection. The existing JSON endpoint uses the parameterised `findOrdersForCustomer`; the new code bypasses it.
2. **Real security issue (high severity):** a live-looking Stripe secret key has been committed in `.env.example`. Even if it's a sample, this is the exact pattern that leaks real keys to GitHub-scanning bots.
3. **Subtle edge case:** the CSV endpoint doesn't validate that `from` and `to` are present. With them missing, the SQL becomes `>= 'undefined'` and either errors or returns nothing — depending on the driver. No timezone handling on the date filters either.
4. **Missing test:** the new `/orders.csv` route itself has no integration test. Only the `escapeCsvField` helper is tested. The PR description claims "manual testing"; that's not the same.
5. **(Legit changes mixed in):** `escapeCsvField` is reasonable, RFC-4180-compliant, and well-tested. The `Content-Disposition` header is correct. The route follows the existing router pattern.

</details>

## Exercise

> Review the PR in `pr-diff.md` as a second pair of eyes. The author's description is in `pr-description.md`. Don't review style — only correctness, security, edge cases, and missing tests. Format your output as a PR-comment-style list with severity tags.

**You'll know it worked when** the agent catches the SQL injection *and* the committed Stripe key, flags the missing date validation, and notes that the new route itself has no integration test. A sharp agent also pushes back on the PR description's "tested manually against staging" claim and asks what data shape was tested.
