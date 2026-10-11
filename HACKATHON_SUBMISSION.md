# Devpost submission draft

## Project name

Shiftmate

## Tagline

An Alexa+ style, evidence-first copilot for the factory floor.

## Track

Alexa+ — simulated Alexa+ experience in a web app.

## What it does

Shift leads lose time switching between production counters, sensor alerts, and quality logs just to decide what to check next. Shiftmate puts those signals behind one conversational interface. A lead can ask for a shift summary, investigate a slow line, check defects, or prepare a maintenance action in everyday language.

Shiftmate answers from a visible sample plant dataset and names the readings behind each answer. For example, it can explain that Line 2 is at 87.4% uptime while its motor bearing sensor reports 4.8 mm/s vibration against a 4.5 mm/s watch threshold. It can then prepare a draft maintenance ticket or simulated pause, but it waits for explicit confirmation. The entire demo runs in a browser and includes a text input plus optional browser speech recognition.

## How it was built

The app is a self-contained HTML, CSS, and JavaScript web experience. A deterministic intent handler maps supported questions to a small set of plant-data operations such as `get_shift_summary`, `get_sensor_readings`, `get_quality_summary`, and `list_open_actions`. The sample readings are stored in the page and are clearly labeled as simulated. This is the hackathon's simulated Alexa+ experience option; it does not claim to call Alexa+, an Alexa Skill, an MCP server, or real equipment.

## What changed during the hackathon

The existing AutoForge-Sentinel repository contained an industrial quality and conveyor digital-twin project before this hackathon. During this submission window, the new `amazon-device-hackathon/` project was added: a voice-and-chat shop-floor copilot, evidence-cited responses, explicit confirmation for simulated actions, a responsive dashboard, a runnable demo, and this submission documentation. The new experience is distinct from the existing quality-prediction dashboard and is presented as a simulated Alexa+ productivity workflow.

## Built with

- HTML, CSS, and JavaScript
- Browser Web Speech API for optional voice input
- Local deterministic assistant and fictional factory data

## Product feedback

**Web platform and browser speech recognition:** I used standard browser technologies to make a no-install, no-key demo that a judge can run locally. The dashboard and typed assistant workflow are straightforward to try. Speech input is useful for demonstrating hands-free interaction, but browser support and microphone permission differ, so the app keeps text input available as a reliable fallback. For a production Alexa+ integration, I would want clearer starter guidance for mapping an existing domain data model to a conversational experience, plus a simple sandbox for testing permissions, confirmations, and tool failures. I would build on this simulated workflow again, then replace the local tool layer with an approved Alexa+ integration when access is available.

No AWS service, Amazon device SDK, Alexa+ Skill, or MCP server is used by this prototype. It is entered only in the Alexa+ simulated-experience track.

## Optional feature request

**Important:** Publish an Alexa+ simulation starter kit that shows how to turn a domain-specific data source into grounded, cited answers and confirmation-gated actions. This would help teams validate a useful conversational workflow before requesting or building a live integration.

## Optional friction log

**Task:** Build and test a simulated Alexa+ experience using a realistic domain dataset.  
**Steps:** Build a self-contained web app, define a small set of query and action operations, add browser voice input, then test typed and spoken prompts.  
**Expected:** A straightforward way to demonstrate an Alexa+-like experience without a live account or device integration.  
**Observed:** A simulated browser interaction is feasible with standard web APIs, but it remains the developer's responsibility to create deterministic domain tools, add trustworthy data citations, and make simulated state changes obvious. Voice recognition support also depends on the browser.  
**Severity:** Moderate.  
**Workaround:** Keep text input, label the simulation clearly, cite local data, and require confirmation for state-changing actions.  
**Suggestion:** Provide a compact Alexa+ simulation starter template with sample tool schemas, grounding patterns, action confirmations, and a judge-ready local demo path.

## Demo video plan (about 90 seconds)

**0:00–0:12** — Show the dashboard and say: “Shiftmate gives a shift lead one place to ask what needs attention.”  
**0:12–0:32** — Ask for the shift summary. Point out the answer's cited output, yield, and line data.  
**0:32–0:52** — Ask why Line 2 is slowing. Show the 4.8 mm/s reading, the 4.5 watch threshold, and the suggested inspection.  
**0:52–1:08** — Confirm a draft work order and show the updated queue.  
**1:08–1:20** — Ask to pause Line 2, confirm, and show the simulated status label. State that no machinery is connected.  
**1:20–1:30** — Close with the impact: less time collecting signals, clearer next steps, and human confirmation before action.

## Submission checklist

- Track: Alexa+ simulated experience.
- Repository: private repository; share it with `testing@devpost.com` and the Amazon reviewers listed in the event rules.
- Demo video: record the above flow, upload publicly to YouTube or Vimeo, in English, under three minutes, and paste the URL into Devpost.
- Product feedback: use the feedback section above and adjust it to match your actual experience before submission.
- Repo URL: `https://github.com/mayankrajput244251-rgb/AutoForge-Sentinel/tree/main/amazon-device-hackathon`

