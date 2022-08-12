import React, { useEffect, useState } from 'react'
import styles from '../txhash/Overview.module.css'
import { AiFillCheckCircle, AiOutlineCaretRight } from 'react-icons/ai'
import { BiTime } from 'react-icons/bi'
import { getAll } from '../../../../data/DataQuery'
import { getSearch } from '../../../../data/RawQuery'
import { Oval } from 'react-loader-spinner'
import { HiExternalLink } from 'react-icons/hi'



export function Overview({ id }: { id: string }) {
    const [isLoading, setLoading] = useState(false)
    const [result, setResult] = useState([[]])

    useEffect(() => {
        const getValues = async () => {
            setLoading(true)
            const d = await getAll(getSearch(id))
            setResult(d as any[])
            setLoading(false)
        }

        getValues()
    }, [])

    return (
        <>
            {
                isLoading ? <><div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Oval height="80"
                    width={30}
                    color="#3498db"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel='oval-loading'
                    secondaryColor="#3498db"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                /> Try refresh if Loading Take Too Long</div> </> : (
                    <>
                        {
                            result.length <= 0 ? (
                                <>
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '32px' }}>
                                        <img src={require('../../../../assets/img/not-found.png')} alt="not-found" width='300px' />
                                        <div style={{ padding: '12px' }}>Sorry, We Can't Find Your AAVE Transactions</div>
                                    </div>
                                </>
                            ) : (
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
                                        <div>{result[0][0]} </div>
                                    </div>
                                    {/* divider */}
                                    <hr className='customHR' />
                                    {/* divider */}
                                    <div className={styles.contentTx}>
                                        <div>From Address : </div>
                                        <a href={'https://etherscan.io/address/' + result[0][19]} style={{ textDecoration: 'none', color: '#3498db' }}>{result[0][19]}  <HiExternalLink /></a>
                                    </div>
                                    <div className={styles.contentTx}>
                                        <div>Interact With (To) : </div>
                                        <a href={'https://etherscan.io/address/' + result[0][19]} style={{ textDecoration: 'none', color: '#3498db' }}>{result[0][20]}  <HiExternalLink /></a>
                                    </div>
                                    {/* divider */}
                                    <hr className='customHR' />
                                    {/* divider */}
                                    <div className={styles.contentTx}>
                                        <div>Transaction Actions : </div>
                                        {
                                            result[0][11] === 'Liquidation' ? (
                                                <div>
                                                    <div style={{ color: '#77838f', padding: '8px 0px' }}>Liquidator Repay <span style={{ color: 'black' }}>{result[0][9]}</span> <span style={{ color: '#3498db' }}>${result[0][8]}</span> From AAVE Protocol V2</div>
                                                    <div style={{ color: '#77838f' }}>{result[0][11]} <span style={{ color: 'black' }}>{result[0][6]}</span> <span style={{ color: '#3498db' }}>${result[0][4]}</span> From AAVE Protocol V2</div>
                                                </div>
                                            ) : (
                                                <div>
                                                    <div style={{ color: '#77838f' }}>{result[0][11]} <span style={{ color: 'black' }}>{result[0][6]}</span> <span style={{ color: '#3498db' }}>${result[0][4]}</span> From AAVE Protocol V2</div>
                                                </div>
                                            )
                                        }
                                    </div>
                                    {/* divider */}
                                    <hr className='customHR' />
                                    {/* divider */}
                                    <div className={styles.contentTx}>
                                        <div>Token Transfers : </div>
                                        <div>{
                                            result.map((item, id) => {
                                                return (
                                                    <div key={id} style={{ display: 'grid', gridTemplateColumns: '20px 40px 100px 20px 100px 30px auto', padding: '8px 0px' }}>
                                                        <AiOutlineCaretRight style={{ fontSize: '14px' }} />
                                                        <div style={{ color: 'black', fontWeight: 'bold' }}>From</div>
                                                        <div style={{ color: '#3498db' }}>{(item[14] as string)?.slice(0, 5) + '...' + (item[14] as string)?.slice(-5)}</div>
                                                        <div style={{ color: 'black', fontWeight: 'bold' }}>To</div>
                                                        <div style={{ color: '#3498db' }}>{(item[15] as string)?.slice(0, 5) + '...' + (item[15] as string)?.slice(-5)}</div>
                                                        <div style={{ color: 'black', fontWeight: 'bold' }}>For</div>
                                                        <div style={{ color: 'black' }}>{(item[17] as number)?.toFixed(6)}  <span style={{ color: '#3498db' }}>${item[16]}</span></div>

                                                    </div>
                                                )
                                            })

                                        }</div>
                                    </div>
                                    {/* divider */}
                                    <hr className='customHR' />
                                    {/* divider */}
                                    <div className={styles.contentTx}>
                                        <div>Value : </div>
                                        <div>{result[0][12]} </div>
                                    </div>
                                    <div className={styles.contentTx}>
                                        <div>Transactions Fee : </div>
                                        <div>{result[0][13]}  </div>
                                    </div>
                                </div>
                            )
                        }

                    </>
                )
            }
        </>

    )
}