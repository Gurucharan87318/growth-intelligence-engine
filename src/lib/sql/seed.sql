drop table if exists users;

create table users (
  user_id bigint generated always as identity primary key,
  acquisition_channel text not null,
  signup_date date not null,
  order_value numeric(10,2) not null check (order_value >= 0),
  orders integer not null check (orders >= 1),
  last_purchase_date date not null
);

insert into users (
  acquisition_channel,
  signup_date,
  order_value,
  orders,
  last_purchase_date
)
select
  channels.channel_name,
  signup_date,
  round((40 + random() * 460)::numeric, 2) as order_value,
  (1 + floor(random() * 12))::int as orders,
  greatest(
    signup_date,
    current_date - ((random() * 120)::int)
  ) as last_purchase_date
from (
  select
    current_date - (30 + (random() * 335)::int) as signup_date,
    (
      array[
        'Organic Search',
        'Paid Search',
        'LinkedIn',
        'Referral',
        'Direct',
        'Email',
        'Partnerships'
      ]
    )[1 + (random() * 6)::int] as channel_name
  from generate_series(1, 500)
) as channels;
