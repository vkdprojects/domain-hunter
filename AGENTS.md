# Agent rules

`domh` is a Go CLI. The web UI lives in `web/` (SvelteKit + `@codeatlasdev/ui`, Svelte 5, bun). Run web commands from `web/`.

Skills for UI work: `.agents/skills/codeatlas-ui`, `codeatlas-dx`, `codeatlas-writing`. Library docs: https://ui.codeatlas.com.br/llms.txt (full: `llms-full.txt`). Look props up in `.agents/skills/codeatlas-ui/API.md`, never guess them.

## UI
- Compose package components and page templates (PageShell, AppList, AppForm, AppSettings) before writing markup.
- Colors, spacing, radius and type come only from `--ca-*` tokens. No hardcoded colors, no Tailwind, no `!important`.
- Never put `transform` or `will-change` on a glass element or any of its ancestors.
- Theme lives only in `web/src/lib/theme.ts`.

## Mobile
- Test every screen at 390px wide.
- Text fields stay at 16px or larger. Touch targets are at least 44px. Use the `--ca-safe-*` tokens.
- Mobile layouts use `MobilePane`, `StickyActions` and `BottomNav`.
- When a tap opens a view with a focused field, call `primeKeyboard()` (from `@codeatlasdev/ui/actions`) in that tap.

## Test first
- Write the failing test before the fix or feature. Components get Vitest browser tests (`*.svelte.spec.ts`) with an axe check in every state. Flows get Playwright tests.
- A bug is done only when its regression test went red and then green.

## QA before saying done
1. `bun run check`, `bun run lint`, `bun run test`.
2. Open the changed screen at desktop and 390px width, in light and dark, using only the keyboard, and confirm there are no console errors.

## DX
- Keep components small and typed. Pass props as data.
- User-facing text goes through `web/src/lib/i18n.ts`. Component strings come from the library catalog.
- Update docs or an example with every public change.
