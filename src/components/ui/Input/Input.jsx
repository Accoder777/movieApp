import React from 'react'
import styles from './Input.module.css'

const Input = ({
    name, 
    type, 
    value, 
    onChange=()=>{},
    helperText='', 
    icon,
    onBlur=()=>{},
    disabled=false,
    autoComplete='on',
    placeholder='',
    autoFocus
}) => {
  return (
    <div>
        <div className={styles.loginBox}>
        <div className={styles.inputIcon}>
            {icon}
        </div>
        <input
            autoComplete={autoComplete} 
            className={styles.loginInput} 
            type={type} 
            placeholder={placeholder}
            autoFocus={autoFocus}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
        />
        </div>
        {
        helperText && (
            <p className={styles.errMsg}>{helperText}</p>
        )}
    </div>
  )
}

export default Input