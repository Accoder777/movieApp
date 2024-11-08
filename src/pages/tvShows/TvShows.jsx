import React, { useEffect, useState } from 'react'
import BodyTop from '../../components/bodyTop/BodyTop'
import styles from './TvShows.module.css'
import FilmsDisplay from '../../components/filmDisplay/FilmsDisplay'
import { HandleApiRespErr } from '../../utils/HandleApiRespErr'
import { findTv, getTrendingTvShows } from '../../api/api'
import { useDebounce } from 'use-debounce'
import Skeleton from 'react-loading-skeleton'

const TvShows = () => {
  // state
  const [Inputvalue, setInputValue] = useState('')
  const [debounceFilter] = useDebounce (Inputvalue, 1000)
  const [isLoading, setIsloading] = useState(false)
  const [tvData, setTvData] = useState([])

  useEffect(()=>{
    const fetchData = async()=>{
      setIsloading(true)
      try {
        const res = await getTrendingTvShows();
        if(res.status === 200 && res.data){
          setTvData(res.data.results)
        }
      } catch (error) {
        HandleApiRespErr(error)
      }finally{
        setIsloading(false)
      }
    }
    fetchData()

  },[])

  console.log(Inputvalue)

  const handleFindData = async (Inputvalue) =>{
    setInputValue(Inputvalue)
    setIsloading(true)
    try {
      const res = await findTv(Inputvalue);
      console.log(res)
      if(res.status === 200 && res.data.results){
        setTvData(res.data.results)
      }
    } catch (error) {
      HandleApiRespErr(error)
    } finally{
      setIsloading(false)
    }
  }
  
  useEffect(()=>{
    if(debounceFilter){
      handleFindData(debounceFilter)
    } 
    
  },[debounceFilter])

  return (
    <>
     <BodyTop BodyTopTitle={"TV Shows"} value={Inputvalue} setValue={handleFindData} />
     <p className={styles.filmCounter}>{`${tvData.length} items`}</p>     
     
     {isLoading ? (
          <div style={{marginLeft: '20px'}}>
            <Skeleton
              height={480} 
              width={282} 
              baseColor="#8383832f" 
              highlightColor="#8383832f"
              count={8} 
              direction="ltr"
              borderRadius={'1rem'}
              inline={'true'}
              enableAnimation
              marginBottom={'0.5rem'}
              marginLeft={'1rem'}
            />
          </div>
        ):(
        
        tvData.map((item)=>(
            <FilmsDisplay {...item}  key={item.id}/>
          ))
     )
     }
     
    </>
  )
}

export default TvShows