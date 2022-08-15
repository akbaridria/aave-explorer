import React from 'react'
import styles from '../txhash/Overview.module.css'
import { AiFillCheckCircle, AiOutlineCaretRight } from 'react-icons/ai'
import { BiTime } from 'react-icons/bi'
import { HiExternalLink } from 'react-icons/hi'



export function Overview({ result, tokenTransfers, isLoading, tx }: { result: any, tokenTransfers: any, isLoading: boolean, tx: any }) {
    return (
        <div style={{ margin: '24px 0px' }}>
            <div className={styles.contentTx}>
                <div>Transaction Hash : </div>
                <div>{result[0][1]}</div>
            </div>
            <div className={styles.contentTx}>
                <div>Status : </div>
                <div className={styles.successBadge}><AiFillCheckCircle />Success</div>
            </div>
            <div className={styles.contentTx}>
                <div>Block Timestamp : </div>
                <div><BiTime style={{ fontSize: '14px' }} /> {result[0][2]}</div>
            </div>
            <div className={styles.contentTx}>
                <div>Block Number : </div>
                <div>{tx[0][0]}</div>
            </div>
            {/* divider */}
            <hr className='customHR' />
            {/* divider */}
            <div className={styles.contentTx}>
                <div>From Address : </div>
                <a href={'https://etherscan.io/address/' + result[0][19]} style={{ textDecoration: 'none', color: '#3498db' }}>{tx[0][7]}  <HiExternalLink /></a>
            </div>
            <div className={styles.contentTx}>
                <div>Interact With (To) : </div>
                <a href={'https://etherscan.io/address/' + result[0][19]} style={{ textDecoration: 'none', color: '#3498db' }}>{tx[0][8]}  <HiExternalLink /></a>
            </div>
            {/* divider */}
            <hr className='customHR' />
            {/* divider */}
            <div className={styles.contentTx}>
                <div>Transaction Actions : </div><div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {
                        result.map((item: any, id: any) => {
                            return (
                                item[11] === 'Liquidation' ? (

                                    <div key={id}>
                                        <div style={{ color: '#77838f', padding: '8px 0px' }}>Liquidator Repay <span style={{ color: 'black' }}>{Intl.NumberFormat().format(item[9] as number)}</span> <span style={{ color: '#3498db' }}>${item[8]}</span> From AAVE Protocol V2</div>
                                        <div style={{ color: '#77838f' }}>{item[11]} <span style={{ color: 'black' }}>{Intl.NumberFormat().format(item[6] as number)}</span> <span style={{ color: '#3498db' }}>${item[4]}</span> From AAVE Protocol V2</div>
                                    </div>
                                ) : (

                                        <div key={id}>
                                            <div style={{ color: '#77838f' }}>{item[11]} <span style={{ color: 'black' }}>{Intl.NumberFormat().format(item[6] as number)} ($<span>{Intl.NumberFormat().format(item[7])}</span>) </span> <span style={{ color: '#3498db' }}>${item[4]}</span> From AAVE Protocol V2</div>
                                        </div>

                                    )

                            )

                        })


                    }</div>
            </div>
            {/* divider */}
            <hr className='customHR' />
            {/* divider */}
            <div className={styles.contentTx}>
                <div>Token Transfers : </div>
                <div>{
                    tokenTransfers.map((item: any, id: any) => {
                        return (
                            <div key={id} style={{ display: 'grid', gridTemplateColumns: '20px 40px 100px 20px 100px 30px auto', padding: '8px 0px' }}>
                                <AiOutlineCaretRight style={{ fontSize: '14px' }} />
                                <div style={{ color: 'black', fontWeight: 'bold' }}>From</div>
                                <div style={{ color: '#3498db' }}>{(item[7] as string)?.slice(0, 5) + '...' + (item[7] as string)?.slice(-5)}</div>
                                <div style={{ color: 'black', fontWeight: 'bold' }}>To</div>
                                <div style={{ color: '#3498db' }}>{(item[8] as string)?.slice(0, 5) + '...' + (item[8] as string)?.slice(-5)}</div>
                                <div style={{ color: 'black', fontWeight: 'bold' }}>For</div>
                                <div style={{ color: 'black' }}>{Intl.NumberFormat().format(item[13] as number)} ($<span>{Intl.NumberFormat().format(item[14])}</span>)  <span style={{ color: '#3498db' }}>${item[11]}</span></div>

                            </div>
                        )
                    })

                }</div>
            </div>
            {/* divider */}
            <hr className='customHR' />
            {/* divider */}
            <div className={styles.contentTx}>
                <div>Value : </div><div>{Intl.NumberFormat().format(tx[0][9] as number)} Ether </div>
            </div>
            <div className={styles.contentTx}>
                <div>Transactions Fee : </div><div>{tx[0][10]} Ether </div>
            </div>
        </div>
    )
}