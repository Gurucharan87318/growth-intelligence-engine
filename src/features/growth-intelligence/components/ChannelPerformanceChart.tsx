import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ChannelPerformanceRow } from "@/types/analytics";

type ChannelPerformanceProps = {
  rows: ChannelPerformanceRow[];
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export function ChannelPerformance({ rows }: ChannelPerformanceProps) {
  return (
    <section id="channel-performance" className="section-block pt-0">
      <div className="page-shell">
        <Card className="border-white/60 bg-white/80 shadow-sm backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl tracking-tight">
              Acquisition comparison
            </CardTitle>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Compare channels by user volume, revenue contribution, average CLV,
              and average order behavior.
            </p>
          </CardHeader>

          <CardContent className="mt-2 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Channel</TableHead>
                  <TableHead className="text-right">Users</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                  <TableHead className="text-right">Avg CLV</TableHead>
                  <TableHead className="text-right">Avg Orders</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.acquisition_channel}>
                    <TableCell className="font-medium">
                      {row.acquisition_channel}
                    </TableCell>
                    <TableCell className="text-right">
                      {row.users.toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(row.revenue)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(row.avg_clv)}
                    </TableCell>
                    <TableCell className="text-right">
                      {row.avg_orders.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
