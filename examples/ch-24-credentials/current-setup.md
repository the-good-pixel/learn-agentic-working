# Agent Credential Inventory — current state

This is a fictional snapshot of an agent's credentials, written as a single engineer would document them in a private note. Names, repos, and keys are made up.

## 1. GitHub Personal Access Token

- **Scopes granted:** `repo` (full), `admin:org`, `delete_repo`, `workflow`
- **What the agent actually does with it:** reads issues, reads PR diffs, opens PRs, replies to AI reviewer comments. Has never used `admin:org` or `delete_repo`.
- **Rotation:** issued 11 months ago, no expiry set.

## 2. Postgres — production

- **Role:** `app_admin` (full read/write/DDL on all schemas)
- **Where it's used:** the agent runs ad-hoc support queries when a customer complaint comes in ("did user X's payout fire?"). About 95% are `SELECT`.
- **Network:** direct connection from agent host; no jump box.

## 3. Stripe API key

- **Type:** live secret key, full account scope (read + write, including refunds, payouts, customer deletion).
- **What the agent does with it:** monthly reconciliation reports (read-only), occasional refund issuance after support tickets.
- **Storage:** in a `.env` file checked into a private repo.

## 4. Google Workspace OAuth (for the agent's service account)

- **Scopes:** `drive.readonly`, `gmail.modify`, `calendar` (full)
- **What the agent does:** reads Drive docs for context, drafts (and occasionally sends) emails on user's behalf, creates calendar events.
- **Consent:** user clicked through the OAuth screen ~6 months ago, hasn't reviewed since.

## 5. Internal company API key — "platform-api"

- **Scope:** `admin` (can read and modify every tenant, including billing fields).
- **What the agent does:** pulls per-tenant usage stats for a weekly digest. All read-only in practice.

## 6. SSH key for prod jump host

- **Type:** RSA 4096, no passphrase.
- **Location:** `~/.ssh/id_rsa_prod` on the agent host, world-readable inside the container, mounted in from a host bind-mount.
- **What it gets the agent:** shell on the prod jump host, from which the agent can reach DB and app servers.

## 7. AWS IAM access key

- **User:** `agent-ops`
- **Policy attached:** `AdministratorAccess`
- **What the agent does:** reads CloudWatch logs, occasionally restarts an ECS service.
- **Created:** 14 months ago, never rotated.
