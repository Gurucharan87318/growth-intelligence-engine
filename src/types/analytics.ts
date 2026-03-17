export type OverviewMetrics = {
  total_users: number;
  total_revenue: number;
  average_order_value: number;
  average_purchase_frequency: number;
  average_clv: number;
};

export type ChannelPerformanceRow = {
  [x: string]: any;
  acquisition_channel: string;
  retention_score: number;
  cac: number;
  ltv: number;
  conversion_rate: number;
  acquisition_share: number;
};

export type ChurnSummary = {
  churned_users: number;
  active_users: number;
  churn_rate_percentage: number;
};

export type CohortRetentionRow = {
  cohort_month: string;
  month_number: number;
  cohort_size: number;
  retained_users: number;
  retention_rate: number;
};

export type HighValueCustomer = {
  user_id: number;
  acquisition_channel: string;
  signup_date: string;
  orders: number;
  order_value: number;
  total_revenue: number;
  last_purchase_date: string;
};

export type AnalyticsResponse = {
  cohortRetention: CohortRetentionRow[];
  overview: OverviewMetrics;
  channelPerformance: ChannelPerformanceRow[];
  churnSummary: ChurnSummary;
  highValueCustomers: HighValueCustomer[];
};
