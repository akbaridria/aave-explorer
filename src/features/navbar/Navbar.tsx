import React, { useState } from 'react';
import styles from './Navbar.module.css';
import AaveLogo from '../../assets/img/Aave-Crypto-Logo-PNG.png'
import { AiOutlineSearch } from 'react-icons/ai';
import { Dropdown } from '../component/dropdown/Dropdown'
import { useNavigate } from 'react-router-dom';

export function Navbar() {
    const [input, setInput] = useState('')
    let navigate = useNavigate();
    const handleKeyPress = (event: any) => {
        if (event.key === 'Enter') {
            navigate('/txhash/' + input, { replace: true })
        }
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.row}>
                <div className={styles.rowNav}>
                    <a href="/" ><img src={AaveLogo} alt="AAVE Logo" className={styles.logoStyle} /></a>
                    <div className={styles.rightNav}>
                        <div className={styles.searchStyle}>
                            <div className={styles.wrapperSearch}>
                                <AiOutlineSearch style={{ color: '#999999', fontSize: '18px' }} />
                                <input type='text' className={styles.inputStyle} placeholder="Search By Tx Hash" onKeyPress={handleKeyPress} onInput={e => setInput((e.target as HTMLInputElement).value)} />
                            </div>
                        </div>
                        <Dropdown />
                    </div>
                </div>
            </div>
        </div>
    );
}
