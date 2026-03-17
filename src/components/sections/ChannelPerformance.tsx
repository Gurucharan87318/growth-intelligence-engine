import { Badge } from "@/components/ui/badge";
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
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardHeader className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="secondary"
            className="bg-slate-100 text-slate-700 hover:bg-slate-100"
          >
            growth_channels
          </Badge>
          <Badge
            variant="secondary"
            className="bg-slate-100 text-slate-700 hover:bg-slate-100"
          >
            growth_summary
          </Badge>
        </div>

        <div className="space-y-2">
          <CardTitle className="text-2xl font-semibold tracking-tight text-slate-900">
            Channel Performance
          </CardTitle>

          <p className="text-sm font-medium text-slate-700">
            Comparative acquisition and monetization efficiency
          </p>

          <p className="max-w-3xl text-sm leading-6 text-slate-500">
            This table reads channel-level acquisition and revenue data from the
            backend to compare scale, quality, and monetization across customer
            acquisition sources.
          </p>
        </div>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="text-slate-600">Channel</TableHead>
                <TableHead className="text-right text-slate-600">Users</TableHead>
                <TableHead className="text-right text-slate-600">Revenue</TableHead>
                <TableHead className="text-right text-slate-600">Avg CLV</TableHead>
                <TableHead className="text-right text-slate-600">
                  Avg Orders
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.acquisition_channel}>
                  <TableCell className="font-medium text-slate-900">
                    {row.acquisition_channel}
                  </TableCell>
                  <TableCell className="text-right text-slate-600">
                    {Number(row.users).toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell className="text-right text-slate-600">
                    {formatCurrency(Number(row.revenue))}
                  </TableCell>
                  <TableCell className="text-right text-slate-600">
                    {formatCurrency(Number(row.avg_clv))}
                  </TableCell>
                  <TableCell className="text-right text-slate-600">
                    {Number(row.avg_orders).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
