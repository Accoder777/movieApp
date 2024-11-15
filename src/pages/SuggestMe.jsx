import React, { useContext, useEffect, useState } from "react";
import BodyTop from "../components/bodyTop/BodyTop";
import styles from "./SuggestMe.module.css";
import FilmsDisplay from "../components/filmDisplay/FilmsDisplay";
import { findAll, getSuggest, getTrending } from "../api/api";
import { HandleApiRespErr } from "../utils/HandleApiRespErr";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Import styles
import { useDebounce } from "use-debounce";
import { CreatedContext } from "./context/UserContext";

const SuggestMe = () => {
  const [Inputvalue, setInputValue] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [connectionErr, setConnnectionErr] = useState(false);
  const [debounceFilter] = useDebounce(Inputvalue, 1000)
  const [moviesData, setMoviesData] = useState([]);
  const [favoriteTv, setFavoriteTv] = useState([])
  const [favoriteMovies, setFavoriteMovies] = useState([])
  const { sessionId } = useContext(CreatedContext)
  
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


  useEffect(() => {
    const getData = async () => {
      setIsloading(true);
      try {
        const tempData = await getTrending('all');
        setMoviesData(tempData.data.results);

      } catch (error) {
        HandleApiRespErr(error)
        setConnnectionErr(true)
        
      } finally {
        setIsloading(false);
      }
    };
    getData();
  }, []);


  const handleFindData = async (Inputvalue)=>{
    setInputValue(Inputvalue  )
    setIsloading(true)
    try {
      const res = await findAll(Inputvalue)
      if(res.data.results){
        const tempData = res.data?.results.filter((item)=> item.media_type!=='person')
        setMoviesData(tempData)

      }
      
    } catch (error) {
      HandleApiRespErr(error)
    }finally{
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
      <BodyTop
        BodyTopTitle={"Suggest Me"}
        BodyTopDesc={
          "I will really appericiate it if you take time to suggest me something good to watch."
        }
        value={Inputvalue}
        setValue={setInputValue}
      />
      <div className={styles.container}>
        <div className={styles.internalNav}></div>
        <h1 className={styles.filmCounter}>
        </h1>
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
        ) : connectionErr ? (
          <div>Connection error occurred</div>
        ) : (    
            moviesData.map((item) => (
              <FilmsDisplay {...item} key={item.id} suggest={true} favoriteMovies={favoriteMovies} favoriteTv={favoriteTv} />
            ))         
        )}
      </div>
    </>
  );
};

export default SuggestMe;
