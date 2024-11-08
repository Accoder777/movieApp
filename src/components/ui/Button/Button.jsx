import React from 'react'
import styles from './Button.module.css'

const Button = ({type='button', children, onClick, disabled,style={}}) => {
  return (
    <button className={styles.Btn} type={type} onClick={onClick} disabled={disabled} style={style}>
        {children}
    </button>
  )
}

export default Button