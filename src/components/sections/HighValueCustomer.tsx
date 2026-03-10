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
    <section className="section-block pt-0">
      <div className="page-shell">
        <div className="glass-card">
          <h2 className="text-2xl font-semibold tracking-tight">
            High-value customers
          </h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            These are the users contributing the most total revenue in the
            simulated dataset.
          </p>

          <div className="mt-8 overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-3">
              <thead>
                <tr className="text-left text-sm text-slate-500">
                  <th className="px-4 py-2 font-medium">User ID</th>
                  <th className="px-4 py-2 font-medium">Channel</th>
                  <th className="px-4 py-2 font-medium">Orders</th>
                  <th className="px-4 py-2 font-medium">Order Value</th>
                  <th className="px-4 py-2 font-medium">Total Revenue</th>
                  <th className="px-4 py-2 font-medium">Last Purchase</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.user_id} className="bg-white/90">
                    <td className="rounded-l-2xl px-4 py-4 font-medium text-slate-900">
                      #{customer.user_id}
                    </td>
                    <td className="px-4 py-4 text-slate-700">
                      {customer.acquisition_channel}
                    </td>
                    <td className="px-4 py-4 text-slate-700">
                      {customer.orders}
                    </td>
                    <td className="px-4 py-4 text-slate-700">
                      {formatCurrency(customer.order_value)}
                    </td>
                    <td className="px-4 py-4 font-medium text-slate-900">
                      {formatCurrency(customer.total_revenue)}
                    </td>
                    <td className="rounded-r-2xl px-4 py-4 text-slate-700">
                      {customer.last_purchase_date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
