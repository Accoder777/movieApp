import React from 'react'
import notfound from '../../assets/img/notfound.svg'
import styles from  './NotFound404.module.css'
import Buttton from '../../components/ui/Button/Buttton'
import { useNavigate } from 'react-router-dom'

const NotFound404 = () => {

  const user = true

  const navigate = useNavigate();

  const handleNavigate = () =>{
    if(user) navigate('/dashboard')
    else navigate('/')
  }

  return (
    <div className={styles.notFoundContainer}>
      <img className={styles.notFoundImage} src={notfound} alt="pic" width={400} height={320} />
      <div className={styles.content}>
        <h1 className={styles.title}>Lost your way?</h1>
        <p className={styles.desc}>Oops! This is awkward. You are looking for something that doesn't actually exist.</p>
      </div>
      <Buttton onClick ={handleNavigate}>
        Go to Home
      </Buttton>
    </div>
  )
}

export default NotFound404