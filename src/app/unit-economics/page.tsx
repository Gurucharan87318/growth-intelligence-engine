import { UnitEconomicsPageView } from "@/features/unit-economics/components/UnitEconomicsPageView";
import { getUnitEconomicsData } from "@/features/unit-economics/lib/queries";
export const dynamic = "force-dynamic";

export default async function UnitEconomicsPage() {
  const data = await getUnitEconomicsData();

  return <UnitEconomicsPageView {...data} />;
}
