"use client";

import { BusinessModelSimulator } from "@/components/sections/Simulation";
import { PageContainer } from "@/features/shared/components/PageContainer";

export default function SimulatePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <PageContainer>
        <div className="py-12 lg:py-16">
          <BusinessModelSimulator />
        </div>
      </PageContainer>
    </main>
  );
}
