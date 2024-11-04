import React from 'react'
import styles from './Header.module.css'
import { Link } from 'react-router-dom'

const Header = ({navList}) => {
  return (
    <>
      <header className={styles.header}>
        <nav className={styles.navbar}>
          <div className={styles.logo}>
            <Link to="/"><img src="/assets/image/logo.png" alt="Logo" /></Link>
          </div>
          <ul className={styles.listOfPages}>
            {
              navList.map(({beforeIcon,href, title,icon})=>(
                <li key={href}><Link className={styles.navListLink} to={href}>{beforeIcon}{title}{icon}</Link></li>
              ))
            }
          </ul>
        </nav>
      </header>
    </>
  )
}

export default Header