import { z } from "zod";

export const overviewMetricsSchema = z.object({
  total_users: z.number(),
  total_revenue: z.number(),
  average_order_value: z.number(),
  average_purchase_frequency: z.number(),
  average_clv: z.number(),
});

export const channelPerformanceRowSchema = z.object({
  acquisition_channel: z.string(),
  users: z.number(),
  revenue: z.number(),
  avg_clv: z.number(),
  avg_orders: z.number(),
});

export const churnSummarySchema = z.object({
  churned_users: z.number(),
  active_users: z.number(),
  churn_rate_percentage: z.number(),
});

export const highValueCustomerSchema = z.object({
  user_id: z.number(),
  acquisition_channel: z.string(),
  signup_date: z.string(),
  orders: z.number(),
  order_value: z.number(),
  total_revenue: z.number(),
  last_purchase_date: z.string(),
});

export const cohortRetentionRowSchema = z.object({
  cohort_month: z.string(),
  month_number: z.number(),
  cohort_size: z.number(),
  retained_users: z.number(),
  retention_rate: z.number(),
});

export const analyticsResponseSchema = z.object({
  overview: overviewMetricsSchema,
  channelPerformance: z.array(channelPerformanceRowSchema),
  churnSummary: churnSummarySchema,
  highValueCustomers: z.array(highValueCustomerSchema),
  cohortRetention: z.array(cohortRetentionRowSchema),
});

export type OverviewMetrics = z.infer<typeof overviewMetricsSchema>;
export type ChannelPerformanceRow = z.infer<typeof channelPerformanceRowSchema>;
export type ChurnSummary = z.infer<typeof churnSummarySchema>;
export type HighValueCustomer = z.infer<typeof highValueCustomerSchema>;
export type CohortRetentionRow = z.infer<typeof cohortRetentionRowSchema>;
export type AnalyticsResponseValidated = z.infer<typeof analyticsResponseSchema>;
