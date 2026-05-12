# Seven Repeated Corrections — Pick One

Each of these is a real-shaped correction someone has caught themselves repeating to an agent week after week. For each, decide: is this best fixed as a **prompt tweak**, a **slash command**, a **skill**, or an **MCP**? Why?

1. **Bullet-points in meeting summaries.** Every time I ask the agent to summarize a meeting, I have to tell it not to use bullet points — my team prefers tight prose paragraphs and finds bullets lazy.

2. **Wrong default branch.** The agent keeps trying to push to `main`; I have to remind it we use `develop` as our default branch on every repo in this org.

3. **Linear ticket naming.** Every new project, I have to re-explain our naming convention for Linear tickets — `TEAM-ROLE-thing` (kebab-case, role-tagged), not `Team Role Thing` with title-case spaces.

4. **Unknown internal API.** The agent doesn't know about our internal customer-lookup API. I keep having to tell it the endpoint (`https://internal.example.com/v2/customers/{id}`) and that it uses bearer-token auth from `~/.config/example/token`.

5. **Customer-reply tone.** I keep correcting the agent's tone in customer replies — it defaults to formal corporate ("We sincerely apologize for the inconvenience…"), and our brand voice is warm and direct ("That's on us — here's what we'll do").

6. **Test command incomplete.** When the agent runs `npm test`, I keep telling it to also run `npm run typecheck` after. Both need to pass before I'll review the diff.

7. **Feature-flag state unknown.** Whenever the agent reasons about a feature it doesn't know whether the flag is on for our cohort, which environment, or which percentage rollout. I keep pasting the flag config from LaunchDarkly by hand into the prompt.
