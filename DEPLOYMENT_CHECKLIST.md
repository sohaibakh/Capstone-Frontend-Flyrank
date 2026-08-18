# Deployment Checklist

## Deployment Ownership

The final deployment should be done by the project owner on Vercel because it requires access to the Vercel account, project settings, environment variables, domain settings, and final production URL submission.

Recommended platform:

- Vercel

## Pre-Deployment Checks

| Item | Status |
| --- | --- |
| `npm install` completes | Done |
| `npm run test` passes | Done |
| `npm run test:coverage` produces coverage output | Done |
| `npm run lint` passes | Done |
| `npm run build` passes | Done |
| `npm audit --omit=dev` reviewed | Reviewed: reports transitive `next`/`postcss`/`nanoid` issue with no audit fix available |
| README includes setup, env vars, architecture, AI integration, limitations, and future work | Done |
| Production hygiene added with input caps | Done |
| Compare API has `maxDuration` | Done |
| Compare page has `maxDuration` | Done |

## Vercel Deployment Steps

1. Push the latest code to GitHub.
2. Import the repository into Vercel.
3. Set framework preset to Next.js.
4. Add environment variables:

| Variable | Required | Value |
| --- | --- | --- |
| `SERPER_API_KEY` | Optional for demo, required for live shopping data | Add in Vercel project settings |
| `GEMINI_API_KEY` | Optional for demo, required for AI trust analysis | Add in Vercel project settings |
| `GEMINI_MODEL` | Optional | `gemini-3.5-flash` or selected Gemini model |

5. Deploy to production.
6. Open the production URL and complete a smoke test.
7. Submit the production URL for Checkpoint 2.

## Production Smoke Test

| Flow | Status |
| --- | --- |
| Home page loads | Pending production URL |
| Guided demo works | Pending production URL |
| `/compare?q=MacBook%20Pro%20M3` loads | Pending production URL |
| Filters update and submit | Pending production URL |
| AI verdict panel renders | Pending production URL |
| External listing links open in a new tab | Pending production URL |
| `/api/health` returns status JSON | Pending production URL |
| `/api/compare?q=MacBook%20Pro%20M3` returns comparison JSON | Pending production URL |

## Cross-Browser Pass

| Browser | Status |
| --- | --- |
| Chrome desktop | Pending production URL |
| Firefox desktop | Pending production URL |
| Safari desktop | Pending production URL |
| Mobile Safari | Pending production URL |
| Mobile Chrome | Pending production URL |

## Performance And Accessibility

| Audit | Status |
| --- | --- |
| Lighthouse mobile | Pending production URL |
| Lighthouse desktop | Pending production URL |
| WAVE browser audit | Pending production URL |
| Axe DevTools audit | Pending production URL |

## Failure Safety

How the app fails safely:

- If `SERPER_API_KEY` is missing or Serper fails, the app falls back to demo shopping listings.
- If `GEMINI_API_KEY` is missing or Gemini fails, the app falls back to heuristic trust scoring.
- If the compare API throws an error, it returns a JSON error with a hint instead of exposing a stack trace.
- Query input is capped to 80 characters.
- Country input is capped to 4 countries.
- External API calls use timeouts in `src/lib/shopping.ts`.

Known error-state limitation:

- The compare page currently relies mostly on fallback data instead of showing a large user-facing error screen. This is acceptable for demo resilience, but a future production version should add a dedicated error boundary and retry UI.

## Rollback Plan

Simple rollback plan:

1. In Vercel, open the project deployments list.
2. Select the last known good deployment.
3. Click redeploy/promote to production.
4. If the issue is caused by an environment variable, revert the variable in Vercel settings and redeploy.

Source-control rollback:

1. Revert the problematic commit on `main`.
2. Push to GitHub.
3. Allow Vercel to redeploy from `main`.

## Monitoring

Current monitoring:

- Vercel deployment logs.
- Vercel function logs.
- `/api/health` endpoint for service status and environment configuration checks.

Future monitoring:

- Add Sentry for frontend/runtime errors.
- Add Vercel Analytics for performance and traffic.
- Add API usage alerts for Serper and Gemini.

## Sign-Off

| Role | Name | Status |
| --- | --- | --- |
| Developer | M. Sohaib Akhtar | Ready for Vercel deployment |
| Reviewer | Pending | Pending final production URL and audits |
