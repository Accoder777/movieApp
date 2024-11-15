import React, { useContext, useEffect, useState } from 'react'
import styles from './Dashboard.module.css'
import { CreatedContext } from '../context/UserContext'
import { getSuggest } from '../../api/api'
import { HandleApiRespErr } from '../../utils/HandleApiRespErr'

const Dashboard = () => {

    const {sessionId,user} = useContext(CreatedContext)
    const [favoriteTv, setFavoriteTv] = useState([])
    const [favoriteMovies, setFavoriteMovies] = useState([])
    
    useEffect(()=>{
      const getFavoriteData = async (dataType, sessionId) => {
        try {
          // const res = await getFavorites(dataType, sessionId);
          const res = await getSuggest(21575738,sessionId, dataType);
          if(dataType === 'movies'){
            setFavoriteMovies(res.data.results)
          }else{
            setFavoriteTv(res.data.results)
          }
          
        } catch (error) {
          HandleApiRespErr(error);
        }
      };
       getFavoriteData('tv', sessionId)
       getFavoriteData('movies', sessionId)
    },[])

  return (
    <>
        <div>Dashboard home
            <pre>
                {JSON.stringify(user, null, 2)}
                <h1>{sessionId}</h1>
            </pre>
            </div>  
        <div className={styles.Dashboard}>
            <h1 className={styles.title}>Welcome</h1>
            <div className={styles.cardContainer}>
                <div className={styles.dashboardCards}>
                    <span className={styles.score}>{favoriteMovies.length}</span>
                    <p className={styles.nameOfPage}>Movies</p>
                </div>
                <div className={styles.dashboardCards}>
                    <span className={styles.score}>{favoriteTv.length}</span>
                    <p className={styles.nameOfPage}>TV Shows</p>
                </div>
                <div className={styles.dashboardCards}>
                    <span className={styles.score}>{favoriteTv.length + favoriteMovies.length}</span>
                    <p className={styles.nameOfPage}>Suggestions</p>
                </div>
                <div className={styles.dashboardCards}>
                    <span className={styles.score}>3</span>
                    <p className={styles.nameOfPage}>Manual Suggestions</p>
                </div>
            </div>
            <a href="/" className={styles.throwLink}>Quick Links</a>
            <div className={styles.actionsContainer}>
                <button className={styles.actions}>Suggestion</button>
                <button className={styles.actions}>Add</button>
            </div>
        </div>
    </>
  )
}

export default Dashboard