import React from 'react'
import { CardKPI } from '../../src/features/component/card/home/CardKPI'
import { CardHistory } from '../features/component/card/home/CardHistory';
import {
    queryBorrowVolumes,
    queryFlashLoanVolumes,
    queryLiquidationVolumes,
    queryRepayVolumes,
    querySupplyVolumes,
    queryWithdrawVolumes,
    queryLast10Borrow,
    queryLast10FlashLoan,
    queryLast10Liquidation,
    queryLast10Repay,
    queryLast10Supply,
    queryLast10Withdraw
} from '../data/RawQuery';
import { FcAreaChart, FcBarChart, FcComboChart, FcDoughnutChart, FcLineChart, FcPieChart } from 'react-icons/fc'

export function Home() {

    const listIcons = [
        {
            icon: <FcAreaChart />,
            title: 'Borrow Volumes',
            query: queryBorrowVolumes,
            historyTitle: 'Borrow',
            historyQuery: queryLast10Borrow
        },
        {
            icon: <FcBarChart />,
            title: 'Supply Volumes',
            query: querySupplyVolumes,
            historyTitle: 'Supply',
            historyQuery: queryLast10Supply
        },
        {
            icon: <FcComboChart />,
            title: 'Repay Volumes',
            query: queryRepayVolumes,
            historyTitle: 'Repay',
            historyQuery: queryLast10Repay
        },
        {
            icon: <FcDoughnutChart />,
            title: 'Withdraw Volumes',
            query: queryWithdrawVolumes,
            historyTitle: 'Withdraw',
            historyQuery: queryLast10Withdraw
        },
        {
            icon: <FcLineChart />,
            title: 'FlashLoan Volumes',
            query: queryFlashLoanVolumes,
            historyTitle: 'FlashLoan',
            historyQuery: queryLast10FlashLoan
        },
        {
            icon: <FcPieChart />,
            title: 'Liquidation Volumes',
            query: queryLiquidationVolumes,
            historyTitle: 'Liquidation',
            historyQuery: queryLast10Liquidation
        }
    ]

    return (
        <div className="App">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', marginBottom: '32px' }}>
                {
                    listIcons.map((item, id) => {
                        return (
                            <CardKPI key={id} icon={item.icon} title={item.title} query={item.query} />
                        )
                    })
                }
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px', marginBottom: '32px' }}>
                {
                    listIcons.map((item, id) => {
                        return (
                            <CardHistory key={id} query={item.historyQuery} title={item.historyTitle} />
                        )
                    })
                }
            </div>
        </div>
    )
}