import React from 'react'
import styles from '../features/component/card/txhash/txhash.module.css'
import { Overview } from '../features/component/card/txhash/Overview'
import { useParams } from 'react-router-dom'

export function Txhash() {
    let id: any = useParams() || { id: '' }
    return (
        <div className='App'>
            <div className={styles.wrapper}>
                <div style={{ fontWeight: 'bold', fontSize: '20px', padding: '12px 12px 24px 12px' }}>Transaction Details</div>
                <div className={styles.tab}>
                    <div className={styles.activeTab}>Overview</div>
                    <div>Logs (Soon!)</div>
                </div>
                <Overview id={id.id} />
            </div>
        </div>
    )
}