import { MarketOpportunityPageView } from "@/features/market-opportunity/components/MarketOpportunityPage";
import { getMarketOpportunityData } from "@/features/market-opportunity/lib/queries";

export default async function MarketOpportunityPage() {
  const data = await getMarketOpportunityData();

  return <MarketOpportunityPageView {...data} />;
}
