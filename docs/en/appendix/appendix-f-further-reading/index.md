# Appendix F — Further Reading

*Current as of May 2026. The field moves fast — when in doubt, ask your agent to find the current version of any link below.*

This is a curated, opinionated list. Not exhaustive. Each entry comes with a one-sentence "why click this" note so you can decide whether it's worth your time.

A note before you start: where I'm not certain a URL is still accurate, I'll tell you what to search for instead of inventing a link. A working search query beats a dead link every time.

---

## The mental model

The handful of pieces that, between them, contain most of what you actually need to know about how an agent works under the hood.

- **The Model Context Protocol announcement and spec.** Anthropic's original November 2024 announcement of MCP, and the living spec at `modelcontextprotocol.io`. If you only read one thing on this list, it's the spec — it's surprisingly readable and it's the abstraction Ch. 9 builds on. The protocol is open and is now supported by every major agent tool, which is the whole point.
- **Anthropic's engineering blog on context.** Search for "Effective context engineering for AI agents" and "Engineering for AI agents" on `anthropic.com/engineering`. These are the closest thing the industry has to authoritative writing on how to keep a long-running agent coherent. Pair them with the prompt-caching docs (see *Cost & token economics* below).
- **Karpathy on the chatbot → agent shift.** Andrej Karpathy (X: `@karpathy`) has been the clearest public voice on what changes when models can act. Search for "Karpathy vibe coding" and "Karpathy software 3.0" — his 2024–2025 talks and tweets are the most-cited framing of the shift this book is about.
- **Simon Willison's "tools" tag.** `simonwillison.net/tags/tools/` — Simon writes near-daily about agent tooling, MCP servers, and the practical edges of agentic working. The single best running journal of the field.

---

## Inspirations for this book

- **Learn Harness Engineering** by Walking Labs — `github.com/walkinglabs/learn-harness-engineering`. The structural model this book copies: short, opinionated, scenario-led chapters with hands-on exercises. If you like the shape of this book, you'll like that one too, even though it's about a different topic.
- **The Pragmatic Engineer** by Gergely Orosz — `newsletter.pragmaticengineer.com`. Not agent-focused, but his deep-dives on AI-coding adoption inside real engineering orgs (Shopify, Stripe, etc.) are the best window into what actually happens when teams roll this out at scale. Search his newsletter archive for "AI coding tools" and "Cursor".
- **Latent Space** by swyx and Alessio — `latent.space`. The podcast and newsletter that takes agent tooling seriously as a craft. Their Claude Code, Cursor, and OpenCode episodes are worth your time.

---

## On context engineering

If Part III of this book is the one that earned its keep, this is where to go next.

- **Anthropic's "prompt caching" documentation** at `docs.anthropic.com` (search "prompt caching"). The mechanics of how the cache works, what's cacheable, and where the cost savings actually come from. Read it before you decide your agent runs are too expensive.
- **Anthropic's compaction and long-context writeups.** Search `anthropic.com/engineering` for "context" — there are several pieces on how Claude handles long sessions, what "auto-compact" actually does, and why some agents go sideways at 100k tokens. Currency caveat: this material gets updated as the underlying mechanics change.
- **OpenAI's context-management guide for the Responses API.** OpenAI maintains parallel guidance for their stack — search `platform.openai.com/docs` for "context" and "tools". Even if you don't use OpenAI, the cross-vendor framing helps you spot what's universal vs. what's vendor-specific.
- **Google DeepMind on long-context Gemini.** Search "Gemini long context" on the DeepMind blog. They've published the most empirical work on what models actually retrieve from a 1M-token window — sobering reading if you assume "long context" means "model read everything carefully".

---

## On skills, MCP, and tool use

- **`modelcontextprotocol.io`** — the official MCP documentation, hub for vendor-published servers, and the protocol spec. Bookmark it.
- **Awesome MCP lists.** Search GitHub for `awesome-mcp-servers` and `awesome-claude-skills`. There are several community-maintained lists; the most active one changes every few months, so search rather than relying on a specific repo I might cite stale. Use these to find a server before you write one.
- **The Anthropic MCP registry.** Search the Anthropic site for "MCP registry" — they maintain a vetted list of servers, including official vendor integrations (Linear, Stripe, GitHub, Shopify, etc.). This is the first place to look when you're equipping for a new domain.
- **Anthropic's posts on the skill ecosystem.** Search `anthropic.com` for "skills" and "Claude Code skills". The most useful pieces explain *why* skills exist as a separate primitive from prompts and MCPs — they encode procedure, not just capability.
- **Block's open-source agent work.** Block (the Square / Cash App company) has published a fair amount on their internal agent platform `goose` — search GitHub for `block/goose`. Useful as a counterpoint to the closed agents — it's the same primitives, exposed.

---

## On the agent loop in general

- **Simon Willison's blog**, again. `simonwillison.net`. He's the closest thing the field has to a daily newspaper. Subscribe.
- **Karpathy on X.** `@karpathy`. His threads on agents, on "vibe coding", and on the limits of current models are the most-quoted in the field for good reason. Search "Karpathy + vibe coding" and "Karpathy + agents" if you want the specific posts; URLs to individual tweets break too easily to cite.
- **Stratechery** by Ben Thompson — `stratechery.com`. The business-strategy view of where agent tooling fits in the broader platform shift. His pieces on Anthropic, on OpenAI's product strategy, and on the "agent layer" are essential context if you're making purchasing or platform decisions for a team.
- **Every / Dan Shipper's writing** — `every.to`. The single best non-technical writing about what it's actually like to use these tools every day. Aimed at the same audience as Part V of this book.
- **The Pragmatic Engineer "AI tools" deep-dives** (linked above) — empirical, not hype-driven.

---

## Multi-agent and agent-to-agent

The most genuinely uncertain corner of the field as of May 2026. The honest read is: nobody has settled answers yet, and you should be suspicious of anyone who claims they do.

- **Anthropic's multi-agent research writeups.** Search `anthropic.com/research` for "multi-agent" and "orchestration". They've published useful empirical work on when specialized sub-agents beat one strong agent, and the answer is "less often than you'd think". Pair with Ch. 14's note that the author rarely uses sub-agents.
- **Google's Agent-to-Agent (A2A) protocol.** Announced April 2024 and iterated several times since. Search "Google A2A protocol" on `developers.google.com` for the latest spec. Currency caveat: this has moved fast and may have been renamed or absorbed into another effort by the time you read this.
- **The MCP "elicitation" and "sampling" extensions.** Search `modelcontextprotocol.io` for these — they're the parts of MCP that point toward agent-to-agent composition without needing a separate protocol.

---

## Browser and computer-use

- **Anthropic's "Introducing computer use" post** (October 2024) and the follow-on technical writeups. Search `anthropic.com` for "computer use". Read these before Ch. 25.
- **Claude for Chrome announcements.** Search `anthropic.com` for "Claude for Chrome". This is the cleanest example of headed browser driving as a product.
- **ChatGPT Agent / Operator launch coverage.** OpenAI's Operator launched in early 2025; the product has been renamed and rescoped since. Search "ChatGPT Agent" and "OpenAI Operator" for current state. Simon Willison's coverage is reliable.
- **Playwright documentation** — `playwright.dev`. Even if your agent drives the browser for you, knowing what Playwright can do tells you what to ask for.

---

## Evals and agent observability

The corner of this field that's most under-developed in the public literature, and probably most important if you're rolling agents out at a company.

- **Anthropic's posts on evals.** Search `anthropic.com/engineering` for "evals" and "evaluation". They've published the clearest writing on lightweight evals for non-researchers — directly relevant to Ch. 26.
- **Inspect AI** — search GitHub for "inspect AI" (the UK AI Safety Institute's framework). One of the more thoughtful open-source eval frameworks. The exact repo path has moved; search rather than trusting a URL I might get wrong.
- **OpenEvals** — search GitHub for "OpenEvals". A lighter-weight community eval framework. Worth a look if Inspect feels heavy.
- **Braintrust, Langfuse, Helicone.** Three commercial observability platforms for agent / LLM workflows. Search each by name. Their docs are useful reading even if you don't buy — they tell you what production teams actually instrument.

---

## Cost and token economics

- **Anthropic's pricing page** — `anthropic.com/pricing`. The numbers shift; check current.
- **OpenAI's pricing page** — `openai.com/pricing`. Same.
- **Prompt-caching documentation** across providers. Search each vendor's docs for "prompt caching" — Anthropic, OpenAI, Google all have differently-shaped cache mechanics, and the savings are large enough that it's worth understanding which one you're paying for.
- **Token-pricing trackers.** There are several community-maintained dashboards comparing per-million-token costs across models — search "LLM pricing comparison" or "token cost tracker". I won't cite a specific one because they come and go; the search query is more durable.
- **Latent Space's pricing-deep-dives.** Search `latent.space` for "pricing" — they've done several careful comparisons of real-world token economics.

---

## Privacy and security

- **OWASP Top 10 for LLM Applications.** Search "OWASP LLM Top 10". The single most useful reference for the risk categories your security team will ask about. Updated annually.
- **Anthropic's data-handling documentation.** Search `anthropic.com` for "data usage" and "trust center". Read it before you connect the agent to anything regulated.
- **OpenAI and Google's equivalent pages.** Same search, different vendor. The cross-vendor differences matter — some train on your data by default, some don't.
- **NIST AI Risk Management Framework** — search "NIST AI RMF". US government framework that increasingly shows up in enterprise procurement. Worth knowing about even if you don't have to comply directly.

---

## Community spaces

- **r/ClaudeAI**, **r/LocalLLaMA**, **r/MachineLearning** on Reddit. The first is the practical Claude community; the second is the open-weights crowd that often spots tooling problems first; the third is the academic / research view. Different signals, all useful.
- **The Anthropic Discord.** Search the Anthropic site for "community Discord" — they've had an official one for a while, but the exact invite URL changes. Worth joining if you build with the API.
- **Latent Space Discord.** Invite at `latent.space`. The most active practitioner community I know of.
- **The Cursor community Discord and forum.** Search `cursor.com` for "community". Less Claude-specific but the same problems show up.
- **Hacker News.** `news.ycombinator.com`. Tag-search "Claude" or "MCP" to find the active threads. The comment sections are often more useful than the posts.

---

## Books and longer-form

- **Ethan Mollick — *Co-Intelligence: Living and Working with AI* (2024).** The most-recommended general-audience book on working with AI, and deserved. Mollick also writes the *One Useful Thing* Substack, which is worth subscribing to.
- **Andrej Karpathy — there is no Karpathy book yet, but his YouTube series "Neural Networks: Zero to Hero"** is the best free education on what's actually happening inside the model. Optional for using an agent; transformative if you want to know *why* it behaves the way it does.
- **Chip Huyen — *AI Engineering* (2024).** Aimed at engineers building AI-powered systems. More technical than this book; pair them if you're an engineer who wants the systems view alongside the working-with-agents view.
- **Cal Newport — *Slow Productivity* (2024).** Not about AI at all, but the framing of "doing fewer things, at a natural pace" is exactly what good agent delegation enables, and it's the philosophical companion piece this book deliberately doesn't try to be.

---

## Vendor documentation worth bookmarking

The official docs that you'll actually return to.

- **Claude Code docs** — `docs.claude.com/claude-code` (search "Claude Code docs" if that path has moved).
- **Codex docs** — `platform.openai.com/docs/codex`.
- **OpenCode docs** — `opencode.ai` and its GitHub repo.
- **Cursor docs** — `docs.cursor.com`.
- **Gemini CLI docs** — search "Gemini CLI" on `ai.google.dev`.
- **The Anthropic API reference** — `docs.anthropic.com/api`. Useful even if you only use Claude Code, because it tells you what's possible under the hood.

---

## A closing note

The half-life of any specific link in this list is shorter than the half-life of the underlying ideas. If a URL is dead by the time you click it, the underlying piece almost certainly still exists somewhere — search for the title and the author. Better yet, ask your agent to find the current version. That's a one-sentence prompt and it's exactly the kind of small task this book is trying to teach you to delegate.

If you find something here that's broken or outdated, or something this list is missing, open an issue on the repo.
