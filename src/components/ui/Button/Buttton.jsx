import React from 'react'
import styles from './Buttton.module.css'

const Buttton = ({type='button', children, onClick, disabled,style={}}) => {
  return (
    <button className={styles.Btn} type={type} onClick={onClick} disabled={disabled} style={style}>
        {children}
    </button>
  )
}

export default Buttton