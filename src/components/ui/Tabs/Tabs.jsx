  import React from 'react'
  import styles from './Tabs.module.css'

  const Tabs = ({list, onClick, activeItem}) => {
    return (
      <div className={styles.container}>
        {
          list.map(items=>(
            <button
             key={items.key} 
             onClick={()=>onClick(items)} 
             className={[styles.item,items.key=== activeItem?styles.active:"",].join("  ")}>{items.label}</button>
          ))
        }
      </div>
    )
  }

  export default Tabs