# Growth Intelligence Engine
**Strategic Decision Intelligence Platform**

A full-stack analytical platform designed to bridge the gap between fragmented business metrics and executive action. This system automates the synthesis of market data, growth cohorts, and unit economics into structured, decision-ready strategy memos.

---

## Executive Summary

The Growth Intelligence Engine is engineered to solve the "Synthesis Gap"—the manual and often error-prone process of converting database exports into strategic narratives. It provides a modular, 4-tier analytical workflow that allows founders and analysts to move from raw signals to defensible operational recommendations in a fraction of the time.

### Core Analytical Modules
* **Market Opportunity:** Quantitative ranking of entry wedges based on TAM/SAM/SOM and demand urgency.
* **Growth Intelligence:** Advanced diagnosis of retention durability and cohort quality beyond vanity volume.
* **Unit Economics Simulator:** An interactive modeling environment for LTV/CAC, payback periods, and margin sensitivity.
* **Strategy Memo:** A logic-driven narrative layer that automatically synthesizes upstream signals into executive-grade reports.

---

## Showpiece: Dynamic Simulation Engine

The core technical differentiator of this platform is its **decoupled mathematical engine**. This allows for cross-industry modeling within a single unified interface.

* **Logic Mapping:** The system dynamically reconfigures its underlying formula sets based on the selected business model (SaaS, E-commerce, or Marketplace).
* **Sensitivity Analysis:** A 5x5 heatmap visualizing how incremental shifts in churn or acquisition costs impact long-term valuation.
* **Comparison Mode:** Users can snapshot a "Baseline" scenario and overlay a "Simulated" future state to visualize break-even points and cash flow valleys.

---

## Technical Architecture

* **Frontend:** Next.js 15 (App Router), TypeScript, Tailwind CSS.
* **Component Architecture:** Radix UI / shadcn for high-density, professional interfaces.
* **Data Visualization:** Recharts for complex area charts, bar charts, and custom gauge components.
* **Backend:** Supabase (PostgreSQL) utilizing Row Level Security (RLS) for enterprise-grade data isolation.
* **Logic Layer:** Standalone TypeScript utility engine for all financial and growth calculations, ensuring maximum testability and separation of concerns.

---

## Key Design Patterns

* **Decoupled Math Logic:** Formulas reside in a dedicated `simulation-engine.ts` library, separate from React components. This allows for easier auditing of business logic and industry-standard benchmarking.
* **Type-Safe Data Contracts:** Strict TypeScript interfaces ensure data integrity across the analytical funnel, from raw Supabase rows to processed frontend view models.
* **Asynchronous Data Fetching:** Modular query layers optimize server-side rendering while maintaining client-side interactivity for simulations.

---

## Development Roadmap

1.  **Phase 1:** MVP stabilization of the 4 core modules and basic simulation logic.
2.  **Phase 2:** Implementation of Multi-Tenant Workspaces and persistent user-saved scenarios.
3.  **Phase 3:** Integration of automated data ingestion via third-party APIs (Stripe, Shopify).
4.  **Phase 4:** AI-assisted qualitative synthesis for the Strategy Memo layer.

---


## Local Development
Prerequisites
Node.js 18.x or higher

npm or pnpm

A Supabase project and associated API keys

## Installation
Clone the repository:

Bash
git clone https://github.com/your-username/growth-intelligence-engine.git
cd growth-intelligence-engine
Install dependencies:

Bash
npm install
Environment Configuration:
Create a .env.local file in the root directory and add your credentials:

Env 
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
DATABASE_URL=your_postgresql_connection_string


Run the development server:
Bash
npm run dev
The application will be available at http://localhost:3000.

## Production Build & Deployment
Local Production Testing
To verify the production build locally:

Bash
npm run build
npm run start

## Deployment (Vercel)
This project is optimized for deployment on the Vercel platform.

GitHub Integration: Push the codebase to a private or public GitHub repository.

Project Import: Import the repository into the Vercel Dashboard.

Environment Variables: Add the NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, and DATABASE_URL in the Vercel project settings.

Build Settings: Ensure the framework preset is set to Next.js.

Database Sync: If utilizing Supabase, ensure your production database schema is migrated and available before the first deployment.

## Contact and Project Context

**Gurucharan Senthilkumar** * **LinkedIn:** [https://www.linkedin.com/in/gurucharansenthilkumar/]  
* **Project Goal:** To productize strategic consulting workflows for high-growth startups and the Tamil diaspora entrepreneurial ecosystem.

---
