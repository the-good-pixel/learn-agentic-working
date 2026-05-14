# Learn Agentic Working

**A practical, open-source playbook for getting real work done with AI agents.**

For engineers, designers, analysts, PMs, marketers, operations — anyone whose work touches a computer.

## Why this book exists

You've already chatted with ChatGPT or Gemini. You've asked it questions, copy-pasted its answers, maybe even gotten it to draft an email or explain a piece of code.

That's the **chatbot** mode. The AI talks; you do.

There's a different mode now: the **agent** mode. You tell it what you want done, and *it does it* — reads your files, edits them, runs commands, opens browsers, sends emails, queries databases, picks up where it left off, and shows you the result.

This book is about that mode. Not the theory of it; the daily practice of it.

We use **Claude Code** as the main running example because that's what the author uses every day. The patterns work the same way in **Codex**, **OpenCode**, **Cursor agents**, **Gemini CLI**, and whatever ships next month. Where another tool has a notable equivalent, we cite it.

**Prerequisites:** you've used a chat AI like ChatGPT, Gemini, or Claude.ai. That's it. We'll cover everything else.

> **One promise to non-technical readers, up front.** You do not need to learn to code to get value out of this book. You do not need to write configuration files. You do not need to install things by hand. The agent does almost all of that *for* you. The throughline of the whole book is: **if you can describe what you want, you can ask the agent to do it — including setting itself up.** This is true for the agent's installation, for the files that teach it who you are, for the tools it connects to, for the reusable workflows ("skills") that it learns over time. You ask; it builds. The only piece you can't outsource is *deciding what you want to happen*.

## How to read this book

> **Don't try to learn all of this before you start.** A 28-chapter table of contents can be intimidating — sub-agents, parallel worktrees, multi-agent workflows, autonomous schedules, custom MCP servers — and the natural reaction is *"I need to understand all of that first."* You don't. The fastest readers do this: **read Part I, do the 10-minute first win in Ch. 4, pick one workflow from Part V that matches your day job, and just *start*.** Everything else is opt-in. You'll grow into sub-agents the day you wish you had one. You'll discover scheduled agents when a report becomes annoying. The advanced patterns will pull *you* — you won't need to push toward them.

Reading paths, depending on who you are:

- **Brand new** — Part I and Part II in order, then jump to the workflow in Part V that matches your role. Skip everything else for now.
- **Convince me before I invest in setup** — Part I, then skip ahead to **Part III** and your **Part V** chapter. Loop back to Part II once you're sold.
- **Already used Claude Code or Codex a bit** — skim Part I, settle in for Part II (most people miss the setup that makes the rest easy), and treat Parts III–VI as reference.
- **Rolling this out across a small team** — Part I, then Ch. 7 (trust / monitor-don't-block) and Ch. 17–18 (skills as shared institutional knowledge), then come back for the rest.

Every chapter is standalone. Code is copy-pasteable. Examples are real — drawn from actual work, not invented.

## A note on examples

Every workflow shown in this book comes from **real, paraphrased usage** — actual things the author and his team did to ship work. We deliberately avoid toy examples like "summarize this paragraph"; if a workflow is in here, it's something you could plausibly do at work tomorrow.

Names, ticket IDs, and client details are anonymized. The shape of the work is real.

## Three throughlines

If you forget every specific pattern in this book and you remember these three, you'll figure out the rest as the tools change underneath you.

1. **If you can describe what you want, you can ask the agent to do it — including setting itself up.** You will not be asked to write code, edit config files, or install anything by hand. You will be asked to *decide what you want to happen*.
2. **Equip first, then engage.** Before starting any task in an unfamiliar domain, the first move is *not* "how do I do this?" — it's *"what MCPs and skills already exist for the tools involved? Install them."*
3. **Monitor, don't block.** Let the agent take real action by default and watch what it does, rather than gating every step. The exception is the small set of *big and irreversible* actions.

## Start reading

→ [**Chapter 1: What changes when AI can act, not just answer?**](./en/part-1-foundations/chapter-01-what-changes-when-ai-can-act/)

Or, if you'd rather just *try it*:

→ [**Chapter 4: A 10-minute first win**](./en/part-1-foundations/chapter-04-a-10-minute-first-win/)
