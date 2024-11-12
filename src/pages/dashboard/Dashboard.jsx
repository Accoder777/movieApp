import React, { useContext, useEffect, useState } from 'react'
import styles from './Dashboard.module.css'
import { CreatedContext } from '../context/UserContext'
import { getFavoriteTv, getWatchList } from '../../api/api'
import { HandleApiRespErr } from '../../utils/HandleApiRespErr'

const Dashboard = () => {

    const {sessionId,user} = useContext(CreatedContext)
    const [tvData, setTvData] = useState([])
    const [movieData, setMovieData] = useState([])
    const [suggestData, setSuggestData] = useState([])

    const fetchFavoriteData = async(typeOf)=>{
        try {
            const res = await getFavoriteTv(typeOf);
            if(res.status === 200 && res.data.results){
                if(typeOf === 'tv'){
                    setTvData(res.data.results)
                    console.log(res.data.results)
                }else{
                    setMovieData(res.data.results)
                    console.log(res.data.results)
                }
            }
        } catch (error) {
            HandleApiRespErr(error)
        }
    }
    
    const fetchWatchList = async(typeOf)=>{
        try {
            const res = await getWatchList(typeOf);
            if(res.status === 200 && res.data.results){
                setSuggestData(res.data.results)
                
            }
        } catch (error) {;
            HandleApiRespErr(error)
        } 
    }

    useEffect(()=>{
        fetchFavoriteData('tv')
        fetchFavoriteData('movies')
        fetchWatchList('tv');
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
                    <span className={styles.score}>{movieData.length}</span>
                    <p className={styles.nameOfPage}>Movies</p>
                </div>
                <div className={styles.dashboardCards}>
                    <span className={styles.score}>{tvData.length}</span>
                    <p className={styles.nameOfPage}>TV Shows</p>
                </div>
                <div className={styles.dashboardCards}>
                    <span className={styles.score}>{suggestData.length}</span>
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