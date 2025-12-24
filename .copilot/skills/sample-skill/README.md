Minimal Copilot Agent Skill — sample-skill

What this contains

- `skill.yaml` — example manifest describing the skill and a local handler command.
- `sample-skill.js` — Node script that lists files in the workspace root and prints JSON.

How to test locally (options)

1. Using GitHub Copilot CLI (recommended if available)

- Install & authenticate Copilot CLI per GitHub docs.
- From the repository root run (hypothetical command — verify with your Copilot CLI):

```bash
copilot skill register ./.copilot/skills/sample-skill
copilot skill enable sample-skill
copilot skill invoke sample-skill --command "sample.list-files"
```

2. Manual local test (no registration)

- Run the handler directly to see output:

```powershell
cd "C:\Users\Ludwig Rivera\Downloads\My Portfolio"
node ./.copilot/skills/sample-skill/sample-skill.js
```

3. In VS Code with Copilot Agents enabled

- Register the skill via the Copilot UI or CLI, then open Copilot Chat or Command Palette and invoke the registered command `sample.list-files`.

Notes

- The exact CLI and registration commands may differ depending on Copilot tooling versions — consult GitHub's Agent Skills docs when registering.
- This sample is safe to run locally; it only reads the workspace root file listing.
