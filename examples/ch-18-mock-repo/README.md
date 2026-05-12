# Ch. 18 — Mock Repo for Plan → Diff → Ship

A tiny Python shipping-rate calculator with one planted bug, for engineers who want to run the Ch. 18 plan-then-diff exercise without bringing their own repo or ticket.

## Files

- `main.py` — the calculator. One off-by-one bug at a tier boundary.
- `tests/test_main.py` — passing tests. None of them currently catch the bug — by design.
- `BUG.md` — the "ticket". Treat it as if it arrived from your support team.

## The exercise

1. Open `BUG.md` and read it like a Linear ticket.
2. In a fresh agent session in this folder, run the Ch. 18 rhythm:

   > *"Read `BUG.md`. Plan a fix first — don't write code yet. Tell me which file and which line, and what the regression test should look like."*

3. Review the plan. Then:

   > *"Go. Patch the code and add the regression test. Run the test suite. Show me the diff."*

4. Review the diff. If it's good, "ship" it (in this mock repo that just means committing locally — there's nowhere to push).

## You'll know it worked when

- The agent points at the `<` vs. `<=` boundaries in `tier_for_weight` (three of them: `5`, `10`, `20`) without you having to guess.
- The agent adds a regression test pinning 5, 10, and 20 kg to the lower tier.
- All tests pass after the fix.
- The diff is small (one operator change on each of three boundary lines in `main.py`, a handful of new test lines).

## Running tests

```bash
cd examples/ch-18-mock-repo
python -m pytest tests/
```
