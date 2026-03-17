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
import type { HighValueCustomer } from "@/types/analytics";

type HighValueCustomersProps = {
  customers: HighValueCustomer[];
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export function HighValueCustomers({
  customers,
}: HighValueCustomersProps) {
  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardHeader className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="secondary"
            className="bg-slate-100 text-slate-700 hover:bg-slate-100"
          >
            growth_summary
          </Badge>
          <Badge
            variant="secondary"
            className="bg-slate-100 text-slate-700 hover:bg-slate-100"
          >
            growth_channels
          </Badge>
        </div>

        <div className="space-y-2">
          <CardTitle className="text-2xl font-semibold tracking-tight text-slate-900">
            High-Value Customers
          </CardTitle>

          <p className="text-sm font-medium text-slate-700">
            Customer value concentration and revenue quality
          </p>

          <p className="max-w-3xl text-sm leading-6 text-slate-500">
            This table surfaces the customer records contributing the most
            revenue within the current backend-fed analysis layer. It helps
            identify where revenue concentration is strongest and which channels
            are producing the most valuable users.
          </p>
        </div>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="text-slate-600">User ID</TableHead>
                <TableHead className="text-slate-600">Channel</TableHead>
                <TableHead className="text-right text-slate-600">Orders</TableHead>
                <TableHead className="text-right text-slate-600">
                  Order Value
                </TableHead>
                <TableHead className="text-right text-slate-600">
                  Total Revenue
                </TableHead>
                <TableHead className="text-right text-slate-600">
                  Last Purchase
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.user_id}>
                  <TableCell className="font-medium text-slate-900">
                    #{customer.user_id}
                  </TableCell>
                  <TableCell className="text-slate-600">
                    {customer.acquisition_channel}
                  </TableCell>
                  <TableCell className="text-right text-slate-600">
                    {customer.orders}
                  </TableCell>
                  <TableCell className="text-right text-slate-600">
                    {formatCurrency(customer.order_value)}
                  </TableCell>
                  <TableCell className="text-right font-medium text-slate-900">
                    {formatCurrency(customer.total_revenue)}
                  </TableCell>
                  <TableCell className="text-right text-slate-600">
                    {customer.last_purchase_date}
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
