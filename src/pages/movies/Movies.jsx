import React, { useEffect, useState } from 'react'
import BodyTop from '../../components/bodyTop/BodyTop'
import styles from './Movies.module.css'
import FilmsDisplay from '../../components/filmDisplay/FilmsDisplay'
import { findMovie, getTrendingMovies } from '../../api/api'
import { HandleApiRespErr } from '../../utils/HandleApiRespErr'
import { useDebounce } from 'use-debounce'
import Skeleton from 'react-loading-skeleton'

const Movies = () => {
  // state
  const [Inputvalue, setInputValue] = useState('')
  const [debounceFilter] = useDebounce(Inputvalue, 1000)
  const [isLoading, setIsloading] = useState(false)
  const [movieData, setMovieData] = useState([])

  useEffect(()=>{
    const fetchData = async()=>{
      setIsloading(true)
      try {
        const res = await getTrendingMovies();
        if(res.status === 200 && res.data){
          setMovieData(res.data.results)
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
    setIsloading(true)
    try {
      const res = await findMovie(Inputvalue);
      console.log(res)
      if(res.status === 200 && res.data.results){
        setMovieData(res.data.results)
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
     <BodyTop BodyTopTitle={"Movies"} value={Inputvalue} setValue={setInputValue} />
     <p className={styles.filmCounter}>{`${movieData.length} items`}</p>     
     
     {
     isLoading ? (
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
        
      movieData.map((item)=>(
            <FilmsDisplay {...item}  key={item.id}/>
          ))
     )
     }
     
    </>
  )
}

export default Movies