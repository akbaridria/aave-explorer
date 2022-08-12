import React, { useEffect, useState } from 'react'
import styles from '../home/CardHistory.module.css'
import { HiExternalLink } from 'react-icons/hi'
import { getAll } from '../../../../data/DataQuery'
import { Oval } from 'react-loader-spinner'

export function CardHistory({ query, title }: { query: string, title: string }) {

    const [result, setResult] = useState([])
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {

        const fetchData = async () => {
            setLoading(true)
            setResult(await getAll(query) as any)
            setLoading(false)
        }
        setResult(result as any)
        fetchData()
    }, [])

    return (
        <div className={styles.wrapper}>
            <div style={{ fontSize: '20px', color: '#77838f', fontWeight: 'bold', padding: '12px' }}>
                Last {title} Transactions
            </div>
            <hr className={styles.customHr} />
            {
                isLoading ? <><div style={{ display: 'flex', justifyContent: 'center' }}><Oval height="80"
                    width={30}
                    color="#3498db"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel='oval-loading'
                    secondaryColor="#3498db"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                /> </div> </> : (
                    <>
                        {result.map((item, id) => {
                            return (
                                <>
                                    <div key={id} className={styles.listTx}>
                                        <div className={styles.iconTX}>
                                            Tx
                                        </div>
                                        <div className={styles.contentTx}>

                                            <div>
                                                <div>
                                                    <a href={'/txhash/' + item[1]} className={styles.customAnchor}>
                                                        {(item[1] as string).slice(0, 5)} ... {(item[1] as string).slice(-5)} <HiExternalLink />
                                                    </a>
                                                </div>
                                                <div style={{ fontSize: '12px', color: '77838f' }}>
                                                    {item[0]}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                From Address
                                            </div>
                                            <div>
                                                <a href={'https://etherscan.io/address/' + item[3]} target="_blank" rel="noreferrer" className={styles.customAnchor}>
                                                    {(item[3] as string).slice(0, 5)} ... {(item[3] as string).slice(-5)} <HiExternalLink />
                                                </a>
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            {(item[6] as number).toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")} <span style={{ color: '#3498db' }}>${item[4]}</span>
                                        </div>
                                    </div>
                                    <hr className={styles.customHr} />
                                </>
                            )
                        })}

                    </>

                )
            }
        </div>
    )
}