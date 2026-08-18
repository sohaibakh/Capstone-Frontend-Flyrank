# DealSight AI

DealSight AI is a shopping trust intelligence capstone app. It helps users compare product listings across countries and marketplaces by combining price data, seller reputation signals, warranty risk, fake-discount checks, and an AI-generated buying verdict.

## Setup And Run

Run the project locally with one command:

```bash
npm install && npm run dev
```

Then open:

```text
http://localhost:3000
```

Optional environment variables:

| Variable | Required | Purpose |
| --- | --- | --- |
| `SERPER_API_KEY` | No | Enables live Google Shopping and reputation-search data through Serper. Without it, the app uses demo listings. |
| `GEMINI_API_KEY` | No | Enables Gemini trust analysis. Without it, the app uses heuristic scoring. |
| `GEMINI_MODEL` | No | Overrides the Gemini model. Defaults to `gemini-3.5-flash`. |

If these keys are not configured, the app still runs using demo shopping data and a heuristic trust engine.

## Screenshots

Add final production screenshots here after deployment:

- Home/guided demo screen
- Compare results screen
- AI verdict and trust matrix screen
- Mobile compare screen

## Architecture Overview

The app is built with Next.js App Router, React, TypeScript, and Tailwind CSS.

| Area | What it does |
| --- | --- |
| `src/app/page.tsx` | Main landing and guided demo experience. It introduces the product and lets users try a sample audit before entering the workspace. |
| `src/app/compare/page.tsx` | Main comparison page. It reads search parameters, builds product comparison data, filters/sorts results, and renders the trust analysis. |
| `src/app/api/compare/route.ts` | API endpoint for product comparison data. It accepts query/country parameters and returns normalized listing, pricing, and trust output. |
| `src/app/api/health/route.ts` | Health endpoint showing whether the app is running and whether Serper/Gemini are configured. |
| `src/lib/shopping.ts` | Core data and AI pipeline. It fetches shopping listings, attaches reputation snippets, calls Gemini when available, applies fallback scoring, groups results, and builds the final audit response. |
| `src/components/CompareSearchPanel.tsx` | Search/filter form for product, country, trust score, seller risk, condition, and sorting. |
| `src/components/PriceGrid.tsx` | Country-wise listing cards with prices, trust scores, seller risk, warranty risk, evidence, and external listing links. |
| `src/components/AiInsights.tsx` | High-level AI verdict panel showing confidence, fake-discount report, seller reputation report, warranty risk, and recommended action. |
| `src/components/SpecMatrix.tsx` | Matrix/table view for country and platform comparison. |
| `src/components/Navbar.tsx` and `src/components/Footer.tsx` | Shared navigation and footer. |
| `src/app/globals.css` | Global styling, animations, accessibility focus states, reduced-motion handling, and design tokens. |

## AI Integration

Gemini fits into the trust-analysis stage of the comparison pipeline.

1. The user searches for a product and selects countries.
2. The app retrieves shopping listings through Serper when `SERPER_API_KEY` is available.
3. The app optionally retrieves reputation snippets for listing domains.
4. If `GEMINI_API_KEY` is configured, the listings and reputation snippets are sent to Gemini.
5. Gemini returns structured JSON trust scores for each listing.
6. The app sanitizes the AI output, combines it with fallback scoring where needed, and renders the final comparison.

The Gemini system instruction is:

```text
You are a shopping trust agent. Return strict JSON only. Do not invent facts beyond the provided listings and reputation snippets.
```

The user prompt sends a JSON payload asking Gemini to score each listing for:

- Product match confidence
- Seller/site reputation
- Fake discount risk
- Warranty risk
- Final verdict
- Short trust summary
- Evidence strings
- Warning flags

The required output shape is strict JSON:

```json
{
  "listings": [
    {
      "id": "string",
      "productMatchConfidence": "0-100 number",
      "siteTrustScore": "0-100 number",
      "sellerRisk": "Low|Medium|High",
      "warrantyRisk": "Low|Medium|High",
      "fakeDiscountRisk": "Low|Medium|High",
      "verdict": "Recommended|Verify Seller|Wait|Avoid",
      "trustSummary": "short sentence",
      "evidence": ["2-4 short evidence strings"],
      "flags": ["short warning labels"]
    }
  ]
}
```

Gemini is used because the project needs more than simple price sorting. The AI layer can reason over seller names, product titles, warranty wording, reputation snippets, suspicious discounts, and marketplace context to produce a clearer buying recommendation. The app still includes a heuristic fallback so the capstone remains usable without API keys.

## Key Decisions

- Next.js App Router was used because it supports page routing, server-side data fetching, API routes, and production deployment on Vercel with minimal setup.
- The app falls back to demo listings and heuristic scoring so the project remains usable during presentations even if API keys are missing or external services fail.
- Gemini is asked for strict JSON only so the UI can safely render structured trust fields instead of parsing free-form text.
- Query length and country count are capped to reduce API-credit drain and avoid unbounded external requests.
- Accessibility improvements were built into the UI, including visible focus states, semantic controls, table captions, reduced-motion handling, and contrast-safe text.

## How AI Tools Built This

AI assistance was used to help plan the product flow, generate UI copy, implement frontend components, write documentation, and add testing/accessibility improvements. The final code still required project-specific decisions: choosing the shopping trust workflow, defining the Gemini prompt shape, adding fallback scoring, checking build/test output, and documenting limitations honestly.

## Known Limitations

- Live shopping data depends on Serper availability, rate limits, and result quality.
- Gemini analysis depends on the provided listing data and snippets; it does not independently verify every seller.
- Currency conversion is not fully normalized across countries; prices are grouped by market and shown in listing currency.
- The trust score is decision support, not a guarantee that a seller is safe.
- Saved audits and alerts are currently demo/product-ready UI areas, not persistent user accounts.
- The accessibility work follows WCAG 2.1 AA practices, but a final manual screen-reader and browser audit is still recommended.

## Future Improvements

- Add persistent user accounts, saved audits, and target-price alerts.
- Add real currency conversion and tax/shipping normalization.
- Expand country and marketplace support.
- Store historical price trends for better fake-discount detection.
- Add seller reputation caching and deeper source citations.
- Add automated accessibility testing with Axe or Lighthouse CI.
- Add unit and integration tests for the trust-scoring pipeline.
- Add deployment configuration and production monitoring.
