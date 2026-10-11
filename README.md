# Shiftmate: Alexa+ style shop-floor copilot

Shiftmate is a browser-based simulated Alexa+ experience for a small factory shift lead. Ask about output, line status, sensor warnings, quality, or open actions in plain language. The assistant uses a visible demo plant dataset, cites the reading used for its answer, and asks for confirmation before it changes a simulated line state or creates a draft work order.

This is the Alexa+ **simulated-experience path** for the Build, Ship, Shape: Amazon Developer Hackathon. It is not an Alexa Skill, an MCP server, an Alexa+ integration, or connected to real factory equipment. The simulation path does not require a particular SDK; the complete source for the web experience is included here.

## Run it

Open `index.html` in a current desktop browser, or serve this folder locally:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>. The app has no build step, accounts, API keys, external services, or third-party runtime dependencies. Browser speech recognition is optional and depends on browser support and microphone permission; text input always works.

## Demo flow

1. Ask: “Give me the shift summary.” See output, yield, and line status explained with data sources.
2. Ask: “Why is Line 2 slowing down?” See the sensor reading, threshold, trend, and a suggested next step.
3. Confirm the draft work order. See the action queue update.
4. Ask: “Pause Line 2.” Confirm the action and see that only the demo line state changes.
5. Ask: “Show quality.” See yield and reject categories.

Use `HACKATHON_SUBMISSION.md` for the Devpost description, change log, demo narration, and product feedback draft.

## Interaction design

- The assistant operates on a small allowlist of explicit plant queries and demo actions.
- Answers include the simulated data source and timestamp; unknown questions are handled honestly.
- Actions that affect the simulated operation require a second confirmation.
- The UI labels the plant and controls as simulated, and never claims to contact equipment.
- Speech input uses the browser's Web Speech API when available. It is a convenience layer over the same deterministic command handler, not a cloud Alexa service.

## Project layout

- `index.html` — complete app, styles, demo data, and deterministic assistant logic.
- `HACKATHON_SUBMISSION.md` — prepared submission text and a short video plan.
- `LICENSE` — MIT license for this additional open-source project.

## Test checklist

- Open the app and confirm all three production lines render.
- Try the five demo prompts above using the text box.
- Confirm and cancel a ticket; confirm a pause and resume; verify the page always states that these are simulated actions.
- Resize to a phone-width viewport; the dashboard and assistant should stack and remain usable.

All readings and operator identities shown in the demo are fictional sample data.
