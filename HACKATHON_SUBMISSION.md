# Devpost submission draft

## Project name

Shiftmate

## Tagline

An Alexa+ style, evidence-first copilot for the factory floor.

## Track

Alexa+ — self-hosted MCP server using Streamable HTTP, protocol version 2025-11-25.

## What it does

Shift leads lose time switching between production counters, sensor alerts, and quality logs just to decide what to check next. Shiftmate puts those signals behind one conversational interface backed by six discoverable MCP tools. A lead can ask for a shift summary, investigate a slow line, check defects, or prepare a maintenance action in everyday language.

Shiftmate answers from a visible sample plant dataset and names the readings behind each answer. For example, it can explain that Line 2 is at 87.4% uptime while its motor bearing sensor reports 4.8 mm/s vibration against a 4.5 mm/s watch threshold, up 0.9 mm/s from the shift-start sample. It can prepare a draft work order or a simulated pause/resume, but it waits for explicit confirmation and applies only a local demo-state change. The browser client connects to the self-hosted MCP endpoint, discovers the tools, and invokes them over Streamable HTTP.

## How it was built

The browser client is plain HTML, CSS, and JavaScript. `server.mjs` is a self-hosted Node.js MCP server that implements JSON-RPC over Streamable HTTP at `/mcp`, negotiates protocol `2025-11-25`, advertises six tools, manages short-lived sessions, and validates loopback Host/Origin values. Tool calls return structured results and evidence. `prepare_demo_action` creates a non-mutating preview; `confirm_demo_action` requires an explicit boolean confirmation and a fresh, one-use preview token before changing local demo state. The line diagnostic is a transparent threshold rule, not an ML prediction. All plant data is fictional, and no Alexa+ integration or physical equipment is connected.

## What changed during the hackathon

The existing AutoForge-Sentinel repository contained an industrial quality and conveyor digital-twin project before this hackathon. During this submission window, the new `amazon-device-hackathon/` project was added: a shop-floor copilot, an MCP Streamable HTTP server, six tools, a browser MCP client, evidence-cited responses, confirmation-gated simulated actions, protocol/tool tests, and this submission documentation. The project is distinct from the existing quality-prediction dashboard.

## Built with

- HTML, CSS, and JavaScript
- Node.js 20+ built-in HTTP and test modules; no third-party runtime dependency
- Model Context Protocol JSON-RPC over Streamable HTTP (`2025-11-25`)
- HTML, CSS, JavaScript, and fictional factory data
- Rule-based threshold diagnostics; no hosted AI model

## Product feedback

**MCP and Node.js:** I used the MCP `2025-11-25` Streamable HTTP protocol to expose typed tools from a local shop-floor dataset and called them from a browser client. The single endpoint and standard JSON-RPC messages made tool discovery and invocation easy to inspect; human confirmation is clear for actions. Writing the local server without a third-party runtime dependency kept setup short, but it also meant I had to implement and test protocol/session details myself. For production Alexa+ integrations, I would want an official Alexa+ sandbox and a concise guide for account authorization, domain data grounding, and confirmation UX. I would build with MCP again and connect an approved data source only after adding authentication, audit policy, and an operational safety review.

No AWS service, Amazon device SDK, Alexa+ Skill, or MCP server is used by this prototype. It is entered only in the Alexa+ simulated-experience track.

## Optional feature request

**Important:** Publish an Alexa+ simulation starter kit that shows how to turn a domain-specific data source into grounded, cited answers and confirmation-gated actions. This would help teams validate a useful conversational workflow before requesting or building a live integration.

## Optional friction log

**Task:** Build and inspect a self-hosted Alexa+ track MCP experience.  
**Steps:** Implement a Streamable HTTP server, negotiate the protocol, list tools, connect a browser client, and preview/confirm an action.  
**Expected:** A short, repeatable path from local server startup to tool discovery and a grounded tool call.  
**Observed:** The local workflow is runnable without a cloud account, but protocol session handling, local Origin checks, tool schemas, and user confirmations require careful implementation and test coverage. No official Alexa+ sandbox was available in this build.  
**Severity:** Moderate.  
**Workaround:** Add a self-hosted MCP server, expose typed tools with visible evidence, bind to loopback, and require a fresh confirmation token for every simulated write.  
**Suggestion:** Provide an Alexa+ MCP starter template with a current protocol example, local inspector workflow, auth guidance, grounding patterns, and confirmation UX.

## Demo video plan (about 90 seconds)

**0:00–0:12** — Show both local processes and the dashboard. Say: “Shiftmate gives a shift lead one conversational front door to production and quality signals.”  
**0:12–0:22** — Show the MCP connection status and six discovered tools.  
**0:22–0:42** — Ask why Line 2 is slowing. Show the actual `get_line_diagnostics` invocation, 4.8 mm/s vs 4.5 threshold, 0.9 shift-start change, evidence, and rule-based recommendation.  
**0:42–0:56** — Ask for quality summary and show the `get_quality_summary` tool result.  
**0:56–1:15** — Prepare a work order, point out that preparation changed nothing, confirm it, and show the draft in the queue.  
**1:15–1:27** — Show tests passing and close: “All readings and actions are simulated; the value is grounded answers with a human checkpoint before changes.”

## Submission checklist

- Track: Alexa+ MCP server over Streamable HTTP.
- Repository: private repository; share with `testing@devpost.com`, `chris-trag`, `knmeiss`, `giolaq`, `anishamalde`, `mosesroth`, and `emersonsklar` when submitting.
- Demo video: record the above flow, upload publicly to YouTube or Vimeo, in English, under three minutes, and paste the URL into Devpost.
- Product feedback: use the feedback section above and adjust it to match your actual experience before submission.
- Repo URL: `https://github.com/mayankrajput244251-rgb/shiftmate-alexa-plus`

