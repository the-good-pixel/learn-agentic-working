# Ch. 24 — Credential Audit Exercise

A fictional inventory of an agent's credentials, deliberately over-permissive in realistic ways. All names, keys, and policies are made up.

## Exercise

> Read `current-setup.md`. For each credential, tell me: is this readonly when it could be? Is it scoped to the minimum it needs? Recommend one tightening per credential, in priority order. Format the output as a table I can take to my security lead.

**You'll know it worked when** the agent's table has a row per credential with three columns at minimum — *current state*, *recommended tightening*, *priority/risk* — and the priority order reflects blast radius (Stripe live secret + Postgres admin + AWS admin near the top; Google Drive readonly near the bottom). A sharp agent also flags the cross-cutting issues: no rotation on tokens >6 months old, secrets in a `.env` checked into a repo, passphrase-less SSH key with a world-readable mount.
