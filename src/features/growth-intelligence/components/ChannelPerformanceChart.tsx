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
              Compare channels by retention, CAC, LTV, conversion quality, and
              traffic share.
            </p>
          </CardHeader>

          <CardContent className="mt-2 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Channel</TableHead>
                  <TableHead>Retention</TableHead>
                  <TableHead>CAC</TableHead>
                  <TableHead>LTV</TableHead>
                  <TableHead>Conv</TableHead>
                  <TableHead>Share</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.acquisition_channel}>
                    <TableCell className="font-medium">
                      {row.acquisition_channel}
                    </TableCell>
                    <TableCell>{row.retention_score}</TableCell>
                    <TableCell>{formatCurrency(row.cac)}</TableCell>
                    <TableCell>{formatCurrency(row.ltv)}</TableCell>
                    <TableCell>{row.conversion_rate.toFixed(1)}%</TableCell>
                    <TableCell>{row.acquisition_share.toFixed(1)}%</TableCell>
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
