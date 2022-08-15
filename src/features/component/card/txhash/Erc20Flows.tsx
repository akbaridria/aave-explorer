import React from "react";
import { MarkerType } from 'react-flow-renderer';
import OverviewFlow from "../../../../react-flows/AppFlows";

export function Erc20flows({ dataTransfers }: { dataTransfers: any }) {
    const position = { x: 0, y: 0 }
    const fromAddress = dataTransfers.map((item: any) => {
        return item[7]
    })
    const toAddress = dataTransfers.map((item: any) => {
        return item[8]
    })
    console.log(fromAddress)
    console.log(toAddress)
    const allAddress = [...fromAddress, ...toAddress]
    const uniqueAddress = [...new Set(allAddress)]

    const nodes = uniqueAddress.map((item, id) => {
        return {
            id: id.toString(),
            data: {
                label: (
                    item.slice(0, 5) + '...' + item.slice(-5)
                )
            },
            position,
            style: {
                background: '#D6D5E6',
                color: '#333',
                border: '1px solid #222138',
                width: 180,
            },
        }
    })
    const edges = dataTransfers.map((item: any, id: any) => {
        return {
            id: 'el-' + id,
            source: uniqueAddress.indexOf((item[7] as string)).toString(),
            target: uniqueAddress.indexOf(item[8] as string).toString(),
            type: 'smoothstep',
            label: `Sent ${Intl.NumberFormat().format(item[13])} ${item[11]}`,
            markerEnd: {
                type: MarkerType.ArrowClosed,
            },
            animated: true
        }
    })

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '1100px', height: '800px' }}>
                <OverviewFlow initialNodes={nodes} initialEdges={edges} />
            </div>
        </div>
    )

}