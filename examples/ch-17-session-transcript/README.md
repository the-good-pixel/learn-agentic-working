# Ch. 17 — Skill-From-Conversation Exercise

`session-transcript.md` is a fake session where a PM drafted the company's weekly Friday team update with an agent and corrected the agent four times on consistent things:

1. No exclamation marks.
2. Lead with the metric, not the story.
3. Any KPI that moved more than 15% MoM needs a one-line explanation.
4. No contractions in the closing line.

Drop the whole transcript into a fresh agent session and say:

> *"I just had this session — paste below. Write me a skill that captures what we did, especially the corrections I had to give you. Save it as `.claude/skills/weekly-team-update/SKILL.md`."*
>
> *[paste the contents of `session-transcript.md`]*

**You'll know it worked when** the produced `SKILL.md` bakes all four corrections in as hard rules (not soft suggestions), names the trigger phrases the way a real PM would say them (*"draft this week's team update"*, *"weekly update from metrics"*), and includes a "when not to use this" section (e.g. *not* for external customer comms, *not* for board updates).
