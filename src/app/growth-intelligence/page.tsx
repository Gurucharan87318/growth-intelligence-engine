import { GrowthIntelligencePageView } from "@/features/growth-intelligence/components/GrowthIntelligencePage";
import { getGrowthIntelligenceData } from "@/features/growth-intelligence/lib/queries";
export const dynamic = "force-dynamic";

export default async function GrowthIntelligencePage() {
  const data = await getGrowthIntelligenceData();

  return <GrowthIntelligencePageView {...data} />;
}
