import React from 'react'
import styles from './BodyTop.module.css'
import SeaurchVal from '../seaurch/SeaurchVal'

const BodyTop = ({ BodyTopTitle,BodyTopDesc, value, setValue}) => {
  return (
    <div className={styles.BodyTop}>
      
        <p className={styles.mailhereko}>MaileHereko</p>
        <h1 className={styles.title}>{BodyTopTitle}</h1>
        {BodyTopDesc&&(
            <p className={styles.desc}> 
            {BodyTopDesc}
        </p>
        )}
        <SeaurchVal value={value} setValue={setValue}/>
    </div>
  )
}

export default BodyTop