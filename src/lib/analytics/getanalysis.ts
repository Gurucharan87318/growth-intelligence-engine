import { sql } from "@/lib/db";
import type {
  AnalyticsResponse,
  ChannelPerformanceRow,
  ChurnSummary,
  CohortRetentionRow,
  HighValueCustomer,
  OverviewMetrics,
} from "@/types/analytics";

type RawHighValueCustomer = {
  user_id: number;
  acquisition_channel: string;
  signup_date: Date | string;
  orders: number;
  order_value: number;
  total_revenue: number;
  last_purchase_date: Date | string;
};

type RawCohortRetentionRow = {
  cohort_month: Date | string;
  month_number: number;
  cohort_size: number;
  retained_users: number;
  retention_rate: number;
};

const formatDate = (value: Date | string) => {
  if (value instanceof Date) {
    return value.toISOString().split("T")[0];
  }

  return value;
};

export async function getAnalyticsData(): Promise<AnalyticsResponse> {
  const overviewRows = await sql`
    select
      count(*)::int as total_users,
      coalesce(sum(order_value * orders), 0)::float as total_revenue,
      coalesce(avg(order_value), 0)::float as average_order_value,
      coalesce(avg(orders), 0)::float as average_purchase_frequency,
      coalesce(avg(order_value * orders), 0)::float as average_clv
    from public.users;
  `;

  const channelPerformanceRows = await sql`
    select
      acquisition_channel,
      count(*)::int as users,
      coalesce(sum(order_value * orders), 0)::float as revenue,
      coalesce(avg(order_value * orders), 0)::float as avg_clv,
      coalesce(avg(orders), 0)::float as avg_orders
    from public.users
    group by acquisition_channel
    order by revenue desc;
  `;

  const churnSummaryRows = await sql`
    select
      count(*) filter (
        where last_purchase_date < current_date - interval '30 days'
      )::int as churned_users,
      count(*) filter (
        where last_purchase_date >= current_date - interval '30 days'
      )::int as active_users,
      round(
        100.0 * count(*) filter (
          where last_purchase_date < current_date - interval '30 days'
        ) / nullif(count(*), 0),
        2
      )::float as churn_rate_percentage
    from public.users;
  `;

  const cohortRetentionRows = await sql`
    with cohort_items as (
      select
        u.user_id,
        date_trunc('month', u.signup_date)::date as cohort_month
      from public.users u
    ),
    user_activities as (
      select distinct
        ci.user_id,
        ci.cohort_month,
        (
          (extract(year from date_trunc('month', o.order_date)) - extract(year from ci.cohort_month)) * 12 +
          (extract(month from date_trunc('month', o.order_date)) - extract(month from ci.cohort_month))
        )::int as month_number
      from cohort_items ci
      join public.orders o on o.user_id = ci.user_id
      where o.order_date >= ci.cohort_month
    ),
    cohort_size as (
      select
        cohort_month,
        count(*)::int as cohort_size
      from cohort_items
      group by cohort_month
    )
    select
      ua.cohort_month,
      ua.month_number,
      cs.cohort_size,
      count(distinct ua.user_id)::int as retained_users,
      round(
        count(distinct ua.user_id)::numeric / nullif(cs.cohort_size, 0) * 100,
        2
      )::float as retention_rate
    from user_activities ua
    join cohort_size cs on cs.cohort_month = ua.cohort_month
    group by ua.cohort_month, ua.month_number, cs.cohort_size
    order by ua.cohort_month, ua.month_number;
  `;

  const highValueCustomerRows = await sql`
    select
      user_id,
      acquisition_channel,
      signup_date,
      orders,
      order_value::float,
      (orders * order_value)::float as total_revenue,
      last_purchase_date
    from public.users
    order by total_revenue desc
    limit 10;
  `;

  const overview = overviewRows[0] as unknown as OverviewMetrics;
  const churnSummary = churnSummaryRows[0] as unknown as ChurnSummary;
  const channelPerformance =
    channelPerformanceRows as unknown as ChannelPerformanceRow[];

  const highValueCustomers = (
    highValueCustomerRows as unknown as RawHighValueCustomer[]
  ).map((customer) => ({
    ...customer,
    signup_date: formatDate(customer.signup_date),
    last_purchase_date: formatDate(customer.last_purchase_date),
  })) as HighValueCustomer[];

  const cohortRetention = (
    cohortRetentionRows as unknown as RawCohortRetentionRow[]
  ).map((row) => ({
    ...row,
    cohort_month: formatDate(row.cohort_month),
  })) as CohortRetentionRow[];

  return {
    overview,
    channelPerformance,
    churnSummary,
    highValueCustomers,
    cohortRetention,
  };
}
