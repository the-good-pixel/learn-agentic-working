# Ch. 9 — SaaS Stack MCP-Discovery Exercise

Three fictional SaaS stack inventories so you can run the Ch. 9 MCP-discovery loop against a credible list — useful if you don't want to expose your real stack while practising the prompt, or if your own stack is too small to feel meaningful.

## The exercise

1. Pick the stack closest to your actual work.
2. Hand the file to a fresh agent and run:

   > *"Here's my SaaS stack. For each tool, check if an official or community MCP server exists. Tell me which one to install first and why, and walk me through the OAuth or auth setup."*

3. The agent should search the Anthropic MCP registry, the vendor's own docs, and community awesome-MCP lists.

## You'll know it worked when

- The agent doesn't invent MCPs that don't exist. If nothing's available for a tool (likely the case for some smaller ones), it says so plainly.
- The "install this first" recommendation has a real reason behind it — usually the tool you touch most often, not the most technically interesting one.
- You walk away with at least one MCP actually installed and connected, not just a list.
