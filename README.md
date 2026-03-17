This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

src/
  app/
    page.tsx
    market-opportunity/
      page.tsx
    growth-intelligence/
      page.tsx
    unit-economics/
      page.tsx
    strategy-memo/
      page.tsx

  features/
    shared/
      components/
        PageContainer.tsx
        Section.tsx
        SectionHeader.tsx
        MetricCard.tsx
      lib/
        formatters.ts
      types/
        common.ts

    market-opportunity/
      components/
        MarketOpportunityView.tsx
        SegmentBarChart.tsx
        AttractivenessScorecard.tsx
      lib/
        queries.ts
        types.ts

    growth-intelligence/
      components/
        GrowthIntelligenceView.tsx
        ChannelPerformanceChart.tsx
        CohortRetentionChart.tsx
      lib/
        queries.ts
        types.ts

    unit-economics/
      components/
        UnitEconomicsView.tsx
        ScenarioBarChart.tsx
        LeverImpactList.tsx
      lib/
        queries.ts
        types.ts

    strategy-memo/
      components/
        StrategyMemoView.tsx
        RecommendationList.tsx
        StakeholderViews.tsx
      lib/
        queries.ts
        types.ts

  components/
    sections/
      NavBar.tsx
      Footer.tsx

  lib/
    supabase/
      server.ts
      client.ts
