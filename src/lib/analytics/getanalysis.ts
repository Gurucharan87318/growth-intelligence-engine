import { sql } from "@/lib/analytics/db";
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
      channel_name as acquisition_channel,
      retention_score::float as retention_score,
      cac::float as cac,
      ltv::float as ltv,
      conversion_rate::float as conversion_rate,
      acquisition_share::float as acquisition_share
    from public.growth_channels
    order by sort_order asc, channel_name asc;
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
    select
      cohort_label as cohort_month,
      month_index::int as month_number,
      users_count::int as cohort_size,
      round((users_count * retention_rate / 100.0))::int as retained_users,
      retention_rate::float as retention_rate
    from public.growth_cohorts
    order by cohort_label asc, month_index asc, sort_order asc;
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
