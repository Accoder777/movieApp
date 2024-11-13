import React, { useEffect, useMemo, useState } from "react";
import BodyTop from "../components/bodyTop/BodyTop";
import styles from "./SuggestMe.module.css";
import FilmsDisplay from "../components/filmDisplay/FilmsDisplay";
import Tabs from "../components/ui/Tabs/Tabs";
import { findAll, getFavorites, getTrending } from "../api/api";
import { HandleApiRespErr } from "../utils/HandleApiRespErr";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Import styles
import { useDebounce } from "use-debounce";

const list = [
  {
    key: "all",
    label: "ALL",
  },
  {
    key: "movie",
    label: "Movies",
  },
  {
    key: "tv",
    label: "Tv Shows",
  },
];

const SuggestMe = () => {
  const [Inputvalue, setInputValue] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [connectionErr, setConnnectionErr] = useState(false);
  const [moviesData, setMoviesData] = useState([]);
  const [favoritesID, setFavoritesId] = useState([])
  const [debounceFilter] = useDebounce(Inputvalue, 1000)

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
  
  const getFavoriteData = async (dataType) => {
    try {
      const res = await getFavorites(dataType);
      setFavoritesId((prevItems) => [
        ...prevItems,       
        ...res.data?.results 
      ]);
      
      console.log('res favorite', favoritesID)
    } catch (error) {
      HandleApiRespErr(error);
    }
  };
  
  useEffect(()=>{
     getFavoriteData('tv')
     getFavoriteData('movie')
  },[])


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
              <FilmsDisplay {...item} key={item.id} suggest={true} favoriteData={favoritesID} />
            ))         
        )}
      </div>
    </>
  );
};

export default SuggestMe;
