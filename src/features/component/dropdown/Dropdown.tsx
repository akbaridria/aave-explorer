import React, { useState } from 'react'
import { AiFillCaretDown } from 'react-icons/ai'
import styles from '../dropdown/Dropdown.module.css'
export function Dropdown() {
    const [isActive, setActive] = useState(false)
    return (
        <div>
            <div className={styles.containerDrop} onClick={() => setActive(!isActive)}>
                <img src="https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@bea1a9722a8c63169dcc06e86182bf2c55a76bbc/svg/black/eth.svg" alt="eth" style={{ width: '32px' }} />
                Ethereum
                <AiFillCaretDown style={{ cursor: 'pointer' }} />
            </div>
            {
                isActive ? (
                    <div className={styles.bodyDrop} >
                        <div className={styles.row}>
                            <img src="https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@bea1a9722a8c63169dcc06e86182bf2c55a76bbc/svg/black/matic.svg" alt="eth" style={{ width: '24px' }} />
                            Polygon (soon)
                        </div>
                    </div>
                ) : null
            }

        </div>
    )
}