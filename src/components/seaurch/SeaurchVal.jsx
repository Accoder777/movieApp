import React from 'react'
import styles from './SeaurchVal.module.css'

const SeaurchVal = ({value, setValue}) => {
    return (
        <div className={styles.seauchInputBox}>
            <div className={styles.seauchInputIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M22 22L20 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
            <input 
             className={styles.seauchInput}
              type="text"
               placeholder='Search Movies or TV Shows'
               name='seaurchInput'
               value={value}
               onChange={event=> setValue(event.target.value)}
               />
        </div>
    )
}

export default SeaurchVal