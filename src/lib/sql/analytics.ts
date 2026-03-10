export const analyticsQueries = {
  overview: `
    select
      count(*) as total_users,
      coalesce(sum(order_value * orders), 0) as total_revenue,
      coalesce(avg(order_value), 0) as average_order_value,
      coalesce(avg(orders), 0) as average_purchase_frequency,
      coalesce(avg(order_value * orders), 0) as average_clv
    from public.users;
  `,

  channelPerformance: `
    select
      acquisition_channel,
      count(*) as users,
      coalesce(sum(order_value * orders), 0) as revenue,
      coalesce(avg(order_value * orders), 0) as avg_clv,
      coalesce(avg(orders), 0) as avg_orders
    from public.users
    group by acquisition_channel
    order by revenue desc;
  `,

  churnSummary: `
    select
      count(*) filter (
        where last_purchase_date < current_date - interval '30 days'
      ) as churned_users,
      count(*) filter (
        where last_purchase_date >= current_date - interval '30 days'
      ) as active_users,
      round(
        100.0 * count(*) filter (
          where last_purchase_date < current_date - interval '30 days'
        ) / nullif(count(*), 0),
        2
      ) as churn_rate_percentage
    from public.users;
  `,

  cohortRetention: `
    with user_cohorts as (
      select
        user_id,
        date_trunc('month', signup_date)::date as cohort_month,
        date_trunc('month', last_purchase_date)::date as activity_month
      from public.users
    )
    select
      cohort_month,
      activity_month,
      count(*) as retained_users
    from user_cohorts
    group by cohort_month, activity_month
    order by cohort_month, activity_month;
  `,

  highValueCustomers: `
    select
      user_id,
      acquisition_channel,
      signup_date,
      orders,
      order_value,
      (orders * order_value) as total_revenue,
      last_purchase_date
    from public.users
    order by total_revenue desc
    limit 10;
  `,
};
