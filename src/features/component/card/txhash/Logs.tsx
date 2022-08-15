import React from 'react'
import styles from '../txhash/Logs.module.css'

export function Logs({ dataLogs }: { dataLogs: any }) {
    console.log(dataLogs)
    return (
        <div style={{ margin: '24px 12px', fontSize: '14px' }}>
            <div style={{ marginBottom: '12px' }}>Transaction Receipt Event Logs</div>
            {
                dataLogs.map((item: any, id: number) => {
                    return (
                        <div style={{ display: 'grid', gridTemplateColumns: '50px auto', alignItems: 'center' }}>
                            <div style={{ backgroundColor: 'rgba(119,131,143,.1)', borderRadius: '50%', height: '50px', width: '50px', textAlign: 'center' }} >
                                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>{item[6]}</span>
                            </div>
                            <div key={id} className={styles.componentEvents}>
                                <div style={{ textAlign: 'right', fontWeight: 'bold' }}>
                                    Address
                                </div>
                                <div>
                                    {item[7]}
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    Name
                                </div>
                                <div style={{ color: '#77838f' }}>
                                    {item[9] || 'Unknown'}
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    Topics
                                </div>
                                <div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '20px auto', gap: '12px' }}>
                                        {
                                            item[11].map((item2: any, id2: number) => {
                                                return (
                                                    <>
                                                        <div key={id2} className={styles.badgeNumber}>
                                                            {id2}
                                                        </div>
                                                        <div>
                                                            {item2}
                                                        </div>
                                                    </>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right', fontStyle: 'italic' }}>
                                    Data
                                </div>
                                <div>

                                    <div style={{ backgroundColor: 'rgba(119,131,143,.1)', borderRadius: '8px', padding: '12px', wordBreak: 'break-word' }}>
                                        {item[10] ? <pre>{JSON.stringify(item[10], null, 2)}</pre> : item[12]}
                                    </div>
                                </div>
                            </div>
                            <hr className='customHR' />

                        </div>)
                })
            }
        </div>
    )

}