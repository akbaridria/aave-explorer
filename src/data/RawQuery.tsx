export const queryBorrowVolumes = `with data_price as (
    select
        hour::date as date,
        token_address,
        symbol,
        decimals,
        avg(price) as price
    from
        ethereum.core.fact_hourly_token_prices
    group by 1, 2, 3, 4
  )
  , data_all as (
  select 
    a.block_number,
    a.tx_hash,
    a.block_timestamp,
    a.origin_from_address as address,
    b.symbol,
    b.token_address as token_address,
    try_to_number(a.event_inputs:amount::string)/pow(10, b.decimals) as amount,
    (try_to_number(a.event_inputs:amount::string)/pow(10, b.decimals))*b.price as amount_usd
  from 
    ethereum.core.fact_event_logs a join data_price b on a.block_timestamp::date  = b.date
    and a.event_inputs:reserve = b.token_address
  where
      a.contract_address = '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9'
  and
      a.event_name = 'Borrow'
  and
      a.block_timestamp::date >= CURRENT_DATE - 7
  )
  select
      sum(case when block_timestamp >= CURRENT_TIMESTAMP() - INTERVAL '24 hour' then amount_usd else 0 end) as total_now,
      sum(case when block_timestamp < CURRENT_TIMESTAMP() - INTERVAL '24 hour' then amount_usd else 0 end) as total_prev
  from
      data_all
  where
      block_timestamp >= CURRENT_TIMESTAMP() - INTERVAL '48 hour'
  `

export const querySupplyVolumes = `with data_price as (
    select
        hour::date as date,
        token_address,
        symbol,
        decimals,
        avg(price) as price
    from
        ethereum.core.fact_hourly_token_prices
    group by 1, 2, 3, 4
  )
  , data_supply as (
    select 
      a.block_number,
      a.tx_hash,
      a.block_timestamp,
      a.origin_from_address as address,
         b.symbol,
      b.token_address as token_address,
      try_to_number(a.event_inputs:amount::string)/pow(10, b.decimals) as amount,
      (try_to_number(a.event_inputs:amount::string)/pow(10, b.decimals))*b.price as amount_usd
    from
        ethereum.core.fact_event_logs a join data_price b on a.block_timestamp::date = b.date
      and a.event_inputs:reserve = b.token_address
    where
        a.contract_address = '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9'
    and
        a.event_name = 'Deposit'
    and
        a.block_timestamp::date >= CURRENT_DATE - 7
  )
  select
      sum(case when block_timestamp >= CURRENT_TIMESTAMP() - INTERVAL '24 hour' then amount_usd else 0 end) as total_now,
      sum(case when block_timestamp < CURRENT_TIMESTAMP() - INTERVAL '24 hour' then amount_usd else 0 end) as total_prev
  from
      data_supply
  where
      block_timestamp >= CURRENT_TIMESTAMP() - INTERVAL '48 hour'`

export const queryWithdrawVolumes = `with data_price as (
    select
        hour::date as date,
        token_address,
        symbol,
        decimals,
        avg(price) as price
    from
        ethereum.core.fact_hourly_token_prices
    group by 1, 2, 3, 4
  ), data_withdraw as (
    select 
      a.block_number,
      a.tx_hash,
      a.block_timestamp,
      a.origin_from_address as address,
      b.symbol,
      b.token_address as token_address,
      try_to_number(a.event_inputs:amount::string)/pow(10, b.decimals) as amount,
      (try_to_number(a.event_inputs:amount::string)/pow(10, b.decimals))*b.price as amount_usd
    from ethereum.core.fact_event_logs a join data_price b on a.block_timestamp::date = b.date
    and a.event_inputs:token = b.token_address
    where 
      a.contract_address = '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9' 
    and 
      a.event_name = 'Withdraw'
    and
        a.block_timestamp::date >= CURRENT_DATE - 10
  )
  select
      sum(case when block_timestamp >= CURRENT_TIMESTAMP() - INTERVAL '24 hour' then amount_usd else 0 end) as total_now,
      sum(case when block_timestamp < CURRENT_TIMESTAMP() - INTERVAL '24 hour' then amount_usd else 0 end) as total_prev
  from
      data_withdraw
  where
      block_timestamp >= CURRENT_TIMESTAMP() - INTERVAL '48 hour'`

export const queryRepayVolumes = `with data_price as (
    select
        hour::date as date,
        token_address,
        symbol,
        decimals,
        avg(price) as price
    from
        ethereum.core.fact_hourly_token_prices
    group by 1, 2, 3, 4
  ), data_repay as (
    select 
      a.block_number,
      a.tx_hash,
      a.block_timestamp,
      a.origin_from_address as address,
      b.symbol,
      b.token_address as token_address,
      try_to_number(a.event_inputs:amount::string)/pow(10, b.decimals) as amount,
      (try_to_number(a.event_inputs:amount::string)/pow(10, b.decimals))*b.price as amount_usd
    from
        ethereum.core.fact_event_logs a join data_price b on a.block_timestamp::date = b.date
      and a.event_inputs:vault = b.token_address
    where
        a.contract_address = '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9'
    and
        a.event_name = 'Repay'
    and
        a.block_timestamp::date >= CURRENT_DATE - 10
  )
  select
      sum(case when block_timestamp >= CURRENT_TIMESTAMP() - INTERVAL '24 hour' then amount_usd else 0 end) as total_now,
      sum(case when block_timestamp < CURRENT_TIMESTAMP() - INTERVAL '24 hour' then amount_usd else 0 end) as total_prev
  from
      data_repay
  where
      block_timestamp >= CURRENT_TIMESTAMP() - INTERVAL '48 hour'`

export const queryFlashLoanVolumes = `with data_price as (
    select
        hour::date as date,
        token_address,
        symbol,
        decimals,
        avg(price) as price
    from
        ethereum.core.fact_hourly_token_prices
    group by 1, 2, 3, 4
  ), data_flashloan as (
    select 
      a.block_number,
      a.tx_hash,
      a.block_timestamp,
      a.origin_from_address as address,
      b.symbol,
      b.token_address as token_address,
      try_to_number(a.event_inputs:amount::string)/pow(10, b.decimals) as amount,
      (try_to_number(a.event_inputs:amount::string)/pow(10, b.decimals))*b.price as amount_usd
    from
        ethereum.core.fact_event_logs a join data_price b on a.block_timestamp::date = b.date
      and a.event_inputs:asset = b.token_address
    where
        a.contract_address = '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9'
    and
        a.event_name = 'FlashLoan'
    and
        a.block_timestamp::date >= CURRENT_DATE - 10
  )
  select
      sum(case when block_timestamp >= CURRENT_TIMESTAMP() - INTERVAL '24 hour' then amount_usd else 0 end) as total_now,
      sum(case when block_timestamp < CURRENT_TIMESTAMP() - INTERVAL '24 hour' then amount_usd else 0 end) as total_prev
  from
      data_flashloan
  where
      block_timestamp >= CURRENT_TIMESTAMP() - INTERVAL '48 hour'`

export const queryLiquidationVolumes = `with data_price as (
    select
        hour::date as date,
        token_address,
        symbol,
        decimals,
        avg(price) as price
    from
        ethereum.core.fact_hourly_token_prices
    group by 1, 2, 3, 4
  ), data_liquidation as (
    select 
      a.block_number,
      a.tx_hash,
      a.block_timestamp,
      a.origin_from_address as address,
      b.symbol,
      b.token_address as token_address,
      try_to_number(a.event_inputs:liquidatedCollateralAmount::string)/pow(10, b.decimals) as amount,
      (try_to_number(a.event_inputs:liquidatedCollateralAmount::string)/pow(10, b.decimals))*b.price as amount_usd,
        event_inputs
    from ethereum.core.fact_event_logs a join data_price b on a.block_timestamp::date = b.date
    and a.event_inputs:collateralAsset = b.token_address
    where
        a.contract_address = '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9'
    and
        a.event_name = 'LiquidationCall'
    and
        a.block_timestamp::date >= CURRENT_DATE - 10
  )
  select
      sum(case when block_timestamp >= CURRENT_TIMESTAMP() - INTERVAL '24 hour' then amount_usd else 0 end) as total_now,
      sum(case when block_timestamp < CURRENT_TIMESTAMP() - INTERVAL '24 hour' then amount_usd else 0 end) as total_prev
  from
      data_liquidation
  where
      block_timestamp >= CURRENT_TIMESTAMP() - INTERVAL '48 hour'`

export const queryLast10Borrow = `with data_price as (
        select
            hour::date as date,
            token_address,
            symbol,
            decimals,
            avg(price) as price
        from
            ethereum.core.fact_hourly_token_prices
        group by 1, 2, 3, 4
      )
      , data_all as (
      select 
        a.block_number,
        a.tx_hash,
        a.block_timestamp,
        a.origin_from_address as address,
        b.symbol,
        b.token_address as token_address,
        try_to_number(a.event_inputs:amount::string)/pow(10, b.decimals) as amount,
        (try_to_number(a.event_inputs:amount::string)/pow(10, b.decimals))*b.price as amount_usd
      from 
        ethereum.core.fact_event_logs a join data_price b on a.block_timestamp::date  = b.date
        and a.event_inputs:reserve = b.token_address
      where
          a.contract_address = '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9'
      and
          a.event_name = 'Borrow'
      and
          a.block_timestamp::date >= CURRENT_DATE - 7
      )
      select
          *
      from
          data_all
      order by block_number desc limit 10`

export const queryLast10Supply = `with data_price as (
        select
            hour::date as date,
            token_address,
            symbol,
            decimals,
            avg(price) as price
        from
            ethereum.core.fact_hourly_token_prices
        group by 1, 2, 3, 4
      )
      , data_supply as (
        select 
          a.block_number,
          a.tx_hash,
          a.block_timestamp,
          a.origin_from_address as address,
             b.symbol,
          b.token_address as token_address,
          try_to_number(a.event_inputs:amount::string)/pow(10, b.decimals) as amount,
          (try_to_number(a.event_inputs:amount::string)/pow(10, b.decimals))*b.price as amount_usd
        from
            ethereum.core.fact_event_logs a join data_price b on a.block_timestamp::date = b.date
          and a.event_inputs:reserve = b.token_address
        where
            a.contract_address = '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9'
        and
            a.event_name = 'Deposit'
        and
            a.block_timestamp::date >= CURRENT_DATE - 7
      )
      select
          *
      from
          data_supply
      order by block_number desc limit 10`

export const queryLast10Withdraw = `with data_price as (
        select
            hour::date as date,
            token_address,
            symbol,
            decimals,
            avg(price) as price
        from
            ethereum.core.fact_hourly_token_prices
        group by 1, 2, 3, 4
      ), data_withdraw as (
        select 
          a.block_number,
          a.tx_hash,
          a.block_timestamp,
          a.origin_from_address as address,
          b.symbol,
          b.token_address as token_address,
          try_to_number(a.event_inputs:amount::string)/pow(10, b.decimals) as amount,
          (try_to_number(a.event_inputs:amount::string)/pow(10, b.decimals))*b.price as amount_usd
        from ethereum.core.fact_event_logs a join data_price b on a.block_timestamp::date = b.date
        and a.event_inputs:token = b.token_address
        where 
          a.contract_address = '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9' 
        and 
          a.event_name = 'Withdraw'
        and
            a.block_timestamp::date >= CURRENT_DATE - 10
      )
      select
          *
      from
          data_withdraw
      order by block_number desc limit 10`

export const queryLast10Repay = `with data_price as (
        select
            hour::date as date,
            token_address,
            symbol,
            decimals,
            avg(price) as price
        from
            ethereum.core.fact_hourly_token_prices
        group by 1, 2, 3, 4
      ), data_repay as (
        select 
          a.block_number,
          a.tx_hash,
          a.block_timestamp,
          a.origin_from_address as address,
          b.symbol,
          b.token_address as token_address,
          try_to_number(a.event_inputs:amount::string)/pow(10, b.decimals) as amount,
          (try_to_number(a.event_inputs:amount::string)/pow(10, b.decimals))*b.price as amount_usd
        from
            ethereum.core.fact_event_logs a join data_price b on a.block_timestamp::date = b.date
          and a.event_inputs:vault = b.token_address
        where
            a.contract_address = '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9'
        and
            a.event_name = 'Repay'
        and
            a.block_timestamp::date >= CURRENT_DATE - 10
      )
      select
         *
      from
          data_repay
      order by block_number desc limit 10`

export const queryLast10FlashLoan = `with data_price as (
        select
            hour::date as date,
            token_address,
            symbol,
            decimals,
            avg(price) as price
        from
            ethereum.core.fact_hourly_token_prices
        group by 1, 2, 3, 4
      ), data_flashloan as (
        select 
          a.block_number,
          a.tx_hash,
          a.block_timestamp,
          a.origin_from_address as address,
          b.symbol,
          b.token_address as token_address,
          try_to_number(a.event_inputs:amount::string)/pow(10, b.decimals) as amount,
          (try_to_number(a.event_inputs:amount::string)/pow(10, b.decimals))*b.price as amount_usd
        from
            ethereum.core.fact_event_logs a join data_price b on a.block_timestamp::date = b.date
          and a.event_inputs:asset = b.token_address
        where
            a.contract_address = '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9'
        and
            a.event_name = 'FlashLoan'
        and
            a.block_timestamp::date >= CURRENT_DATE - 10
      )
      select
          *
      from
          data_flashloan
      order by block_number desc limit 10`

export const queryLast10Liquidation = `with data_price as (
        select
            hour::date as date,
            token_address,
            symbol,
            decimals,
            avg(price) as price
        from
            ethereum.core.fact_hourly_token_prices
        group by 1, 2, 3, 4
      ), data_liquidation as (
        select 
          a.block_number,
          a.tx_hash,
          a.block_timestamp,
          a.origin_from_address as address,
          b.symbol,
          b.token_address as token_address,
          try_to_number(a.event_inputs:liquidatedCollateralAmount::string)/pow(10, b.decimals) as amount,
          (try_to_number(a.event_inputs:liquidatedCollateralAmount::string)/pow(10, b.decimals))*b.price as amount_usd,
            event_inputs
        from ethereum.core.fact_event_logs a join data_price b on a.block_timestamp::date = b.date
        and a.event_inputs:collateralAsset = b.token_address
        where
            a.contract_address = '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9'
        and
            a.event_name = 'LiquidationCall'
        and
            a.block_timestamp::date >= CURRENT_DATE - 10
      )
      select
          *
      from
          data_liquidation
      order by block_number desc limit 10`

export function getSearch(id: string) {
    const query = `with data_price as (
        select
            hour::date as date,
            token_address,
            symbol,
            decimals,
            avg(price) as price
        from
            ethereum.core.fact_hourly_token_prices
        group by 1, 2, 3, 4
      )
      , data_borrow as (
      select 
        a.block_number,
        a.tx_hash,
        a.block_timestamp,
        a.origin_from_address as address,
        b.symbol,
        b.token_address as token_address,
        try_to_number(a.event_inputs:amount::string)/pow(10, b.decimals) as amount,
        (try_to_number(a.event_inputs:amount::string)/pow(10, b.decimals))*b.price as amount_usd,
        null as symbol1,
        null as amount1,
        null as amount_usd1
      from 
        ethereum.core.fact_event_logs a join data_price b on a.block_timestamp::date  = b.date
        and a.event_inputs:reserve = b.token_address
      where
          a.contract_address = '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9'
      and
          a.event_name = 'Borrow'
      and 
          a.tx_hash = '${id}'
      )
      , data_supply as (
        select 
          a.block_number,
          a.tx_hash,
          a.block_timestamp,
          a.origin_from_address as address,
             b.symbol,
          b.token_address as token_address,
          try_to_number(a.event_inputs:amount::string)/pow(10, b.decimals) as amount,
          (try_to_number(a.event_inputs:amount::string)/pow(10, b.decimals))*b.price as amount_usd,
            null as symbol1,
            null as amount1,
            null as amount_usd1
        from
            ethereum.core.fact_event_logs a join data_price b on a.block_timestamp::date = b.date
          and a.event_inputs:reserve = b.token_address
        where
            a.contract_address = '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9'
        and
            a.event_name = 'Deposit'
        and 
          a.tx_hash = '${id}'
      )
      , data_withdraw as (
        select 
          a.block_number,
          a.tx_hash,
          a.block_timestamp,
          a.origin_from_address as address,
          b.symbol,
          b.token_address as token_address,
          try_to_number(a.event_inputs:amount::string)/pow(10, b.decimals) as amount,
          (try_to_number(a.event_inputs:amount::string)/pow(10, b.decimals))*b.price as amount_usd,
            null as symbol1,
            null as amount1,
            null as amount_usd1
        from ethereum.core.fact_event_logs a join data_price b on a.block_timestamp::date = b.date
        and a.event_inputs:token = b.token_address
        where 
          a.contract_address = '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9' 
        and 
          a.event_name = 'Withdraw'
        and 
          a.tx_hash = '${id}'
      )
      , data_repay as (
        select 
          a.block_number,
          a.tx_hash,
          a.block_timestamp,
          a.origin_from_address as address,
          b.symbol,
          b.token_address as token_address,
          try_to_number(a.event_inputs:amount::string)/pow(10, b.decimals) as amount,
          (try_to_number(a.event_inputs:amount::string)/pow(10, b.decimals))*b.price as amount_usd,
            null as symbol1,
            null as amount1,
            null as amount_usd1
        from
            ethereum.core.fact_event_logs a join data_price b on a.block_timestamp::date = b.date
          and a.event_inputs:vault = b.token_address
        where
            a.contract_address = '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9'
        and
            a.event_name = 'Repay'
        and 
          a.tx_hash = '${id}'
      )
      , data_flashloan as (
        select 
          a.block_number,
          a.tx_hash,
          a.block_timestamp,
          a.origin_from_address as address,
          b.symbol,
          b.token_address as token_address,
          try_to_number(a.event_inputs:amount::string)/pow(10, b.decimals) as amount,
          (try_to_number(a.event_inputs:amount::string)/pow(10, b.decimals))*b.price as amount_usd,
            null as symbol1,
            null as amount1,
            null as amount_usd1
        from
            ethereum.core.fact_event_logs a join data_price b on a.block_timestamp::date = b.date
          and a.event_inputs:asset = b.token_address
        where
            a.contract_address = '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9'
        and
            a.event_name = 'FlashLoan'
        and 
          a.tx_hash = '${id}'
      )
      , data_liquidation as (
        select 
          a.block_number,
          a.tx_hash,
          a.block_timestamp,
          a.origin_from_address as address,
          b.symbol,
          b.token_address as token_address,
          try_to_number(a.event_inputs:liquidatedCollateralAmount::string)/pow(10, b.decimals) as amount,
          (try_to_number(a.event_inputs:liquidatedCollateralAmount::string)/pow(10, b.decimals))*b.price as amount_usd,
            c.symbol as symbol1,
            try_to_number(a.event_inputs:debtToCover::string)/pow(10, c.decimals) as amount1,
            (try_to_number(a.event_inputs:debtToCover::string)/pow(10, c.decimals))*c.price as amount_usd1
        from ethereum.core.fact_event_logs a join data_price b on a.block_timestamp::date = b.date
        and a.event_inputs:collateralAsset = b.token_address
        join data_price c on a.event_inputs:debtAsset = c.token_address and a.block_timestamp::date = c.date
        where
            a.contract_address = '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9'
        and
            a.event_name = 'LiquidationCall'
        and 
          a.tx_hash = '${id}'
      )
      , data_all as (
        select *, 'Supply' as action from data_supply
        union all
        select *, 'Withdraw' as action from data_withdraw
        union all
        select *, 'Borrow' as action from data_borrow
        union all
        select *, 'Repay' as action from data_repay
        union all
        select *, 'FlashLoan' as action from data_flashloan
        union all
        select *, 'Liquidation' as action from data_liquidation
      )
      select 
  a.*,
  b.eth_value,
  b.tx_fee,
  c.from_address,
  c.to_address,
  c.symbol as symbol_transfer,
  c.amount as amount_transfer,
  c.amount_usd as amount_usd_transfer,
  c.origin_from_address,
  c.origin_to_address
from data_all a join ethereum.core.fact_transactions b on a.tx_hash = b.tx_hash 
join ethereum.core.ez_token_transfers c on a.tx_hash = c.tx_hash
where a.tx_hash = '${id}'
order by c._log_id `
    return query
}  