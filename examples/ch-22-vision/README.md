# Ch. 22 — Voice and Vision Exercise

Two text mockups standing in for "the kind of thing you'd screenshot and hand to your agent":

- `mockup-receipt.txt` — a confusingly-formatted receipt from a fictional Japanese restaurant in Vancouver. Mixed Chinese/English line items, items grouped strangely, a service charge line buried in the middle that's *also* included in the total below (look carefully — the line items add up to more than the "items subtotal" suggests).
- `mockup-form-screenshot.txt` — a confusing benefits-portal screen with jargon like "Beneficiary Election Reaffirmation Schedule" and three nested election options.

**Note:** in real use you'd hand the agent the actual photo or screenshot. This folder ships text mockups so the exercise runs without an image pipeline; the chapter's point about vision-as-input still applies.

## Exercise

> Pick one of the mockups. Hand it to your agent with a one-sentence question:
>
> - *"explain this receipt to me — what did I actually pay for and is the total right?"*
> - *"my HR sent me this; what is it asking me to enter, and what happens if I do nothing?"*

**You'll know it worked when** the agent's answer takes your specifics into account — not a generic explanation of "what a receipt is" or "what beneficiary forms do". For the receipt, a good agent notices that the items don't obviously sum to 1,134 at first glance and walks through the math; for the form, a good agent translates the legalese into "either reaffirm, update, or decline — and if you do nothing, the default rules kick in".
