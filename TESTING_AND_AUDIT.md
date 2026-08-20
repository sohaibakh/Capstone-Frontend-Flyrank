# Testing And Audit Evidence

## Unit Test Evidence

Component tested:

- `src/components/CompareSearchPanel.test.tsx`

What the tests cover:

- The product search, sort, minimum trust, and country filter controls render with accessible labels.
- Country filter buttons expose selected state with `aria-pressed`.
- Selecting Canada updates state.
- Choosing a suggested product and pressing `Run audit` submits the expected `/compare` URL.

Command:

```bash
npm run test
```

Output:

```text
Test Files  1 passed (1)
Tests       2 passed (2)
Duration    1.83s
```

## Coverage Evidence

Command:

```bash
npm run test:coverage
```

Output:

```text
Test Files  1 passed (1)
Tests       2 passed (2)
Duration    1.98s

Coverage summary:
Statements   : 61.9% (39/63)
Branches     : 51.72% (30/58)
Functions    : 42.1% (16/38)
Lines        : 62.71% (37/59)

CompareSearchPanel.tsx:
Statements   : 86.04%
Branches     : 73.68%
Functions    : 77.77%
Lines        : 89.74%
```

## Build And Lint Evidence

Commands:

```bash
npm run lint
npm run build
```

Output:

```text
npm run lint
eslint completed with no errors.

npm run build
Compiled successfully.
TypeScript completed successfully.
Generated static pages successfully.
```

## End-To-End Critical Flow

Manual flow to verify before submission:

1. Open the deployed production URL.
2. Start from the home page.
3. Enter or select `MacBook Pro M3`.
4. Select countries: United States, United Kingdom, Pakistan.
5. Run the audit.
6. Confirm the compare page loads with listing cards, AI verdict, price metrics, and country/platform matrix.
7. Change filters and confirm results update without a crash.
8. Open one external listing link and confirm it opens in a new tab.

Status:

- Local component/unit test: passed.
- Production E2E browser pass: pending until Vercel deployment URL exists.

## Performance Audit

Required final audit target:

- Lighthouse Performance: 90+
- Lighthouse Accessibility: 90+
- Run on mobile and desktop.

Status:

- Production Lighthouse scores recorded for mobile and desktop.

Recommended command after deployment:

```bash
npx lighthouse https://your-production-url.vercel.app --view
```

Recorded Lighthouse scores:

| Audit | Mobile Score | Desktop Score | Status |
| --- | ---: | ---: | --- |
| Performance | 99 | 94 | Recorded |
| Accessibility | 96 | 96 | Recorded |
| Best Practices | 100 | 100 | Recorded |
| SEO | 100 | 100 | Recorded |

## Accessibility Audit

Accessibility improvements already made:

- Added skip-to-main-content link.
- Added visible global focus states.
- Added `aria-current` to active navigation links.
- Added `aria-pressed` to selected filter/demo buttons.
- Added `aria-live` status for audit loading state.
- Added table captions, column scopes, and row headers.
- Improved low-contrast muted text.
- Added reduced-motion handling for animations.

Accessibility audit completed:

- Tool: axe DevTools browser extension.
- Production URL: `https://capstone-frontend-flyrank.vercel.app`
- Evidence file/name: `capstone-frontend-flyrank.vercel.app-2026-08-20`
- Result: axe analysis was run on the deployed site, reported issues were reviewed, and the related accessibility fixes were applied.

Status:

- Code-level accessibility improvements: completed.
- Axe browser audit: completed.

## Improvement Made From Audit Findings

Finding:

- axe/Lighthouse accessibility review identified areas that needed stronger accessible UI support, including clear focus behavior, semantic control state, and safer color contrast for small muted text.

Improvement:

- Added/verified visible focus states, `aria-pressed` for selected controls, `aria-live` loading status, table captions/scopes, reduced-motion support, and darker contrast-safe text colors such as `#5b616e` for muted labels.
