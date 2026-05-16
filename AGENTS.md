# AGENTS.md

Bun workspace monorepo. Two apps, no shared packages yet.

## Layout

- `apps/cli` — OpenTUI React app, entry `src/index.tsx`, workspace name `cli`
- `apps/server` — Hono on `Bun.serve`, entry `src/index.ts`, workspace name `server`, exports `AppType` for future RPC
- `packages/shared` — workspace name `@lightcode/shared`, consumed as TS source via `exports: "./src/index.ts"`, no build step (apps import directly and bundle it). Depend on it with `"@lightcode/shared": "workspace:*"`.
- Root `tsconfig.base.json` is extended via `../../tsconfig.base.json` from each workspace

## Commands

Run from repo root unless noted:

```bash
bun install
bun run dev:server          # bun --filter server dev
bun run dev:cli             # bun run --cwd ./apps/cli dev
bun run build               # bun --workspaces run build
bun run typecheck           # bun --workspaces run typecheck
```

Per-app: `bun --filter <cli|server> <script>` or `cd apps/<name> && bun <script>`.

`dev:cli` deliberately uses `bun run --cwd ./apps/cli dev`, not `bun --filter cli dev`. `bun --filter` runs scripts through Bun's Foreman-style runner, which:

- multiplexes child stdout/stderr and prefixes each line with the package name,
- truncates output to `--elide-lines` (default 10),
- does not give the child a real TTY.

OpenTUI needs a raw, unfiltered TTY: it switches to the alternate screen, hides the cursor, and emits ANSI escape sequences and keyboard input streams directly. Through `--filter` the alt-screen never engages, key input is broken, and the UI renders as garbled prefixed lines. `bun run --cwd <dir>` just changes the process cwd and execs the script with the parent's TTY attached, so the TUI behaves normally. Use `--filter` for non-TUI workspaces (server, build, typecheck); use `--cwd` for any interactive/TUI script.

No test runner, linter, or formatter configured yet. Do not invent commands.

## Conventions

- Bun only — do not add Node/npm/pnpm/yarn artifacts. `packageManager` pinned in root `package.json`.
- `bunfig.toml` sets `linker = "hoisted"`; deps resolve from root `node_modules`.
- Strict TS via `tsconfig.base.json` (`noUncheckedIndexedAccess`, `verbatimModuleSyntax`, `noEmit`). Builds use `bun build`, not `tsc`.
- CLI uses JSX with `jsxImportSource: "@opentui/react"` — intrinsic elements like `<box>`, `<text>`, `<ascii-font>` are OpenTUI, not HTML.
- CLI tsconfig explicitly sets `module/target: esnext` so editors accept top-level `await` (Bun runtime allows it; some TS servers misread `module: Preserve`).
- Server entry guards startup with `if (import.meta.main)` so it can be imported without binding a port. Port via `Bun.env.PORT`, default 3000.

## OpenTUI gotchas

- `<textarea>` is **uncontrolled**. Read `ref.current.plainText` inside `onSubmit`/`onContentChange`; do not try to drive its content with a React `value` prop. Clear via `ref.current.clear()`.
- For OpenTUI questions, **invoke the `opentui` skill first** for curated context. Only fall back to grepping `node_modules/@opentui/*` if the skill doesn't cover it.

## Workspaces gotcha

Workspaces glob is `apps/*` and `packages/*`. After moving or renaming a workspace, delete `node_modules` + `bun.lock` and rerun `bun install` to refresh symlinks.

## Future / out of scope

CLI is intended to ship as a standalone binary (Bun `--compile`, Homebrew). No release tooling exists yet — do not build it unless asked.
