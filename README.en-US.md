# One Page Resume

An AI-powered resume editor focused on layout control and delivery quality: local-first storage, real-time preview, modular editing, and high-quality PDF export.

- Repository: https://github.com/LuvKab/resume-master
- Stack: TanStack Start + React 18 + TypeScript + Tailwind + TipTap

## Highlights

- Per-section height control (including avatar area)
- Drag-and-drop section ordering with visual layout controls
- AI polish and grammar checking
- Local-first data storage (privacy-friendly)
- One-click PDF export for job applications
- OpenAI-compatible integrations (official / gateway / local)

## Quick Start

```bash
pnpm install
pnpm dev
```

Use the URL shown in terminal output.

## Build & Run

```bash
pnpm build
pnpm start
```

## Common Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start local development |
| `pnpm build` | Production build (client + SSR) |
| `pnpm preview` | Preview build output |
| `pnpm start` | Start server runtime |
| `pnpm generate:template-snapshots` | Regenerate template snapshots |

## Project Structure

```text
src/
  app/                 # pages and layouts
  components/          # UI components
  routes/              # route and API entry points
  i18n/                # locale messages
  config/              # constants and configs
  store/               # Zustand stores
  utils/               # utility helpers
```

## AI Configuration

### 1) Frontend manual mode (default)

Configure providers in `Dashboard -> AI Configuration`.

Supported providers:

- Official: OpenAI, DeepSeek, Doubao, Gemini
- OpenAI-compatible presets: Qwen, Zhipu, Kimi, OpenRouter, SiliconFlow, Together
- Local runtimes: Ollama, LM Studio

Behavior:

- All API-related input fields default to empty
- Presets only provide recommended Endpoint / Model
- Values are filled only after clicking `Apply Recommended Values`
- `API Key Optional` is available for local or unauthenticated gateways

### 2) Server-managed mode (optional)

If you do not want users to enter keys in UI:

```env
VITE_SERVER_MANAGED_AI=true
DEFAULT_AI_MODEL=openai
OPENAI_API_KEY=...
OPENAI_MODEL_ID=...
OPENAI_API_ENDPOINT=...
```

`doubao` / `deepseek` / `gemini` env variants are also supported.

## Customization Points

- Brand and export settings: `src/config/constants.ts`
- SEO metadata: `src/routes/$locale.tsx`, `src/routes/__root.tsx`
- Landing page visuals: `src/app/(public)/[locale]/page.tsx`

## GitHub Actions Notes

If these secrets are not configured, related publish/deploy jobs are skipped automatically (CI remains green):

- Docker: `DOCKERHUB_USERNAME`, `DOCKERHUB_TOKEN`
- Cloudflare: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`
