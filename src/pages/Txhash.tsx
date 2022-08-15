import React, { useEffect, useState } from 'react'
import styles from '../features/component/card/txhash/txhash.module.css'
import { Overview } from '../features/component/card/txhash/Overview'
import { useParams } from 'react-router-dom'
import { getAll } from '../data/DataQuery'
import {
    queryBorrow,
    querySupply,
    queryWithdraw,
    queryRepay,
    queryFlashLoan,
    queryLiquidation,
    queryTx,
    queryTokenTransfer,
    queryEventLogs
} from '../data/RawQuery'
import { Oval } from 'react-loader-spinner'
import { Logs } from '../features/component/card/txhash/Logs'


export function Txhash() {
    const [isLoading, setLoading] = useState(false)
    const [result, setResult] = useState([[]])
    const [tokenTransfers, setTokenTransfers] = useState([[]])
    const [tx, setTx] = useState([[]])
    const [dataLogs, setDataLogs] = useState([[]])
    const [clickTab, setClickTab] = useState('Overview')
    const [loadingProgress, setLoadingProgress] = useState('')

    let id: any = useParams().id

    useEffect(() => {

        const getValues = async () => {
            setLoading(true)
            setLoadingProgress('Getting Query Borrow')
            const d = await getAll(queryBorrow(id))
            setLoadingProgress('Getting Query Supply')
            const e = await getAll(querySupply(id))
            setLoadingProgress('Getting Query Withdraw')
            const f = await getAll(queryWithdraw(id))
            setLoadingProgress('Getting Query Repay')
            const g = await getAll(queryRepay(id))
            setLoadingProgress('Getting Query FlashLoan')
            const h = await getAll(queryFlashLoan(id))
            setLoadingProgress('Getting Query Liquidation')
            const i = await getAll(queryLiquidation(id))
            const temp = [...d, ...e, ...f, ...g, ...h, ...i]
            setResult(temp as any[])
            if (temp.length > 0) {
                setLoadingProgress('Getting Query Tx')
                const i = await getAll(queryTx(id))
                setLoadingProgress('Getting Query Token Transfers')
                const j = await getAll(queryTokenTransfer(id))
                setLoadingProgress('Getting Query Event Logs')
                const h = await getAll(queryEventLogs(id))
                setTokenTransfers(j as any[])
                setTx(i as any)
                setDataLogs(h as any[])
            }
            setLoading(false)
        }

        getValues()
    }, [id])


    return (
        <div className='App'>
            {
                isLoading ? (
                    <><div style={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center' }}><Oval height="80"
                        width={30}
                        color="#3498db"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel='oval-loading'
                        secondaryColor="#3498db"
                        strokeWidth={2}
                        strokeWidthSecondary={2}
                    /> {loadingProgress}</div> </>
                ) : (
                    result.length > 0 ? (
                            <div className={styles.wrapper}>
                                <div style={{ fontWeight: 'bold', fontSize: '20px', padding: '12px 12px 24px 12px' }}>Transaction Details</div>
                                <div className={styles.tab}>
                                    <div onClick={() => setClickTab('Overview')} className={clickTab === 'Overview' ? styles.activeTab : styles.inActiveTab}>Overview</div>
                                    <div onClick={() => setClickTab('Logs')} className={clickTab === 'Logs' ? styles.activeTab : styles.inActiveTab}>Logs ({dataLogs.length})</div>
                                </div>
                                {
                                    clickTab === 'Overview' ? (
                                        <Overview isLoading={isLoading} tx={tx} result={result} tokenTransfers={tokenTransfers} />
                                    ) : clickTab === 'Logs' ? (
                                        <Logs dataLogs={dataLogs} />
                                    ) : null
                                }
                            </div>
                    ) : (

                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '32px' }}>
                            <img src={require('../assets/img/not-found.png')} alt="not-found" width='300px' />
                            <div style={{ padding: '12px' }}>Sorry, We Can't Find Your AAVE Transactions</div>
                        </div>
                    )

                )
            }

        </div>
    )
}