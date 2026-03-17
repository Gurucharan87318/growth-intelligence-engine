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

type CohortCell = {
  monthIndex: number;
  retention_rate: number;
};

type CohortRow = {
  cohortMonth: string;
  cohortSize: number;
  cells: CohortCell[];
};

type CohortProps = {
  rows: CohortRow[];
};

function formatMonth(value: string) {
  const date = new Date(value);
  return new Intl.DateTimeFormat("en-IN", {
    month: "short",
    year: "numeric",
  }).format(date);
}

export function Cohort({ rows }: CohortProps) {
  const maxMonthCount = rows.reduce(
    (max, row) => Math.max(max, row.cells.length),
    0
  );

  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardHeader className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="secondary"
            className="bg-slate-100 text-slate-700 hover:bg-slate-100"
          >
            growth_cohorts
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
            Cohort Retention
          </CardTitle>

          <p className="text-sm font-medium text-slate-700">
            Retention durability across acquisition cohorts
          </p>

          <p className="max-w-3xl text-sm leading-6 text-slate-500">
            This view reads cohort-level retention data from the backend and
            shows how user activity holds up month after month after signup.
            It helps distinguish durable growth from shallow acquisition spikes.
          </p>
        </div>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="text-slate-600">Cohort</TableHead>
                <TableHead className="text-right text-slate-600">Size</TableHead>
                {Array.from({ length: maxMonthCount }).map((_, index) => (
                  <TableHead
                    key={index}
                    className="text-right text-slate-600"
                  >
                    M{index}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.cohortMonth}>
                  <TableCell className="font-medium text-slate-900">
                    {formatMonth(row.cohortMonth)}
                  </TableCell>

                  <TableCell className="text-right text-slate-600">
                    {row.cohortSize.toLocaleString("en-IN")}
                  </TableCell>

                  {Array.from({ length: maxMonthCount }).map((_, index) => {
                    const cell = row.cells.find(
                      (item) => item.monthIndex === index
                    );

                    return (
                      <TableCell
                        key={index}
                        className="text-right text-slate-600"
                      >
                        {cell ? `${cell.retention_rate}%` : "—"}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
