import React, { useEffect, useState } from 'react'
import styles from '../home/CardKPI.module.css'
import { getAll } from '../../../../data/DataQuery'
import { IQueryResultKPI } from '../../../../data/Type'
import { Oval } from 'react-loader-spinner'


export function CardKPI({ icon, title, query }: { icon: any, title: string, query: string }) {

    const [resultKPI, setResultKPI] = useState<IQueryResultKPI | undefined>({
        volumes: 0,
        rateGrowth: 0
    })

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getValues = async () => {
            setLoading(true)
            const data = await getAll(query)
            const r = (((Number(data[0][0]) - Number(data[0][1])) / Number(data[0][1])) * 100)
            const v = Number(data[0][0])
            setResultKPI({
                volumes: v,
                rateGrowth: r
            })
            setLoading(false)
        }
        getValues()
    }, [])



    return (
        <div className={styles.cardContainer}>
            {
                loading ? <><div style={{ display: 'flex', justifyContent: 'center' }}><Oval height="80"
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

                        <div className={styles.rowTop}>
                            <div className={styles.rowTopIcon}>
                                <div style={{ fontSize: '32px' }}>
                                    {icon}
                                </div>
                                <div style={{ fontSize: '20px', color: '#77838f', fontWeight: 'bold' }}>
                                    {title}
                                </div>
                            </div>
                            <div style={{ borderRadius: '4px', border: '0.5px solid #999999', backgroundColor: '#FBFBFB', fontSize: '14px', padding: '4px', color: '#8E8E8E' }}>
                                24H
                            </div>
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: 'bold', letterSpacing: '-1px', marginTop: '12px' }}>
                            $ {Intl.NumberFormat('en-US', {
                                notation: "compact",
                                maximumFractionDigits: 1
                            }).format(resultKPI?.volumes as number)}
                            <span style={{ fontSize: '16px', color: resultKPI?.rateGrowth as number > 0 ? 'green' : 'red' }}>{resultKPI?.rateGrowth as number > 0 ? '+' : null}{resultKPI?.rateGrowth.toFixed(2)}%</span>
                        </div>
                    </>
                )
            }
        </div>
    )
}