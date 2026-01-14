# Transformer — Interactive Architecture Visualizer

Transform visualizations and interactive tools for exploring transformer architectures and attention patterns. This project is designed for users who want to learn, demonstrate, or prototype transformer internals with clear visuals and interactive playgrounds.

## Key Features

- Interactive architecture flow visualizations illustrating encoder/decoder blocks and data paths.
- Attention head visualizations and heatmaps to inspect attention patterns.
- Vector visualizer — interactive embedding explorer for experimenting with embeddings and projections (interactive controls, not a full REPL-style playground).
- Stage-by-stage visual breakdown (embedding, positional encoding, attention, FFN, residuals, normalization).

## Quick Start (User-focused)

1. Install dependencies:

```bash
pnpm install
```

2. Start the development server:

```bash
pnpm dev
```

3. Open the app in your browser (usually at `http://localhost:5173`).

4. Explore the UI:
- Use the navigation menu to switch between the Architecture Flow, Vector Playground, and component demos.
- Click on layers or heads to view detailed visualizations and heatmaps.

## Usage Tips

- For teaching or demos: step through the stages in the `SingleBlockStage` to show token flow.
- For debugging models: use the attention heatmap to spot anomalous head behavior.
- Adjust sequence length and head counts in the UI to see how the visualization scales.

## Development (for contributors)

- The app is written in TypeScript and React (Vite). Key files:
  - `App.tsx` — app shell and routing
  - `components/ArchitectureFlow.tsx` — high-level flow visuals
  - `components/VectorPlayground.tsx` — interactive embedding explorer
  - `components/stages/` — stage-by-stage visualization components

- Run linting and formatting as needed. To test locally, run the dev server and open the browser.

## How to Contribute

1. Open an issue to discuss new features or problems.
2. Create a branch with a clear name: `feat/<short-description>` or `fix/<short-description>`.
3. Keep changes focused and add small, reviewable commits.
4. Submit a pull request describing the user-facing impact and any developer notes.

## Customization

- Theme and visuals are driven by CSS/variables in the codebase — search for `constants.ts` to adjust colors or sizing.
- Add new stage components under `components/stages/` and register them in the relevant visual flows.

## License & Contact

This project is provided as-is. If you have questions, feature requests, or want to collaborate, open an issue or contact the maintainer.

---

If you'd like, I can also:

- add badges (build / license)
- create a short demo GIF and include it in this README
- add contributor guidelines and a CODE_OF_CONDUCT

Tell me which you'd prefer next.
# Transformer Architecture Visualization

Interactive visualization of Transformer components and data flow.
