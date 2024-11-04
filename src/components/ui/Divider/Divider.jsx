import React from 'react'
import styles from './Divider.module.css'

const Divider = ({label}) => {
  return (
    <div className={styles.divider}>
        <div className={styles.labelBox}>
            <p>{label}</p>
        </div>
    </div>
  )
}

export default Divider