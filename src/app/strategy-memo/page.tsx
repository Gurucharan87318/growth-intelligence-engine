import { StrategyMemoPageView } from "@/features/strategy-memo/components/StrategyMemoPageView";
import { getStrategyMemoData } from "@/features/strategy-memo/lib/queries";

export default async function StrategyMemoPage() {
  const data = await getStrategyMemoData();

  return <StrategyMemoPageView {...data} />;
}
