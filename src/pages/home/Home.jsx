import React, { useEffect, useMemo, useState } from "react";
import BodyTop from "../../components/bodyTop/BodyTop";
import styles from "./home.module.css";
import FilmsDisplay from "../../components/filmDisplay/FilmsDisplay";
import Tabs from "../../components/ui/Tabs/Tabs";
import { getTrending } from "../../api/api";
import { HandleApiRespErr } from "../../utils/HandleApiRespErr";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Import styles

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

const Home = () => {
  const [Inputvalue, setInputValue] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [connectionErr, setConnnectionErr] = useState(false);
  const [moviesData, setMoviesData] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const getData = async () => {
      setIsloading(true);
      try {
        const tempData = await getTrending(activeTab);
        console.log(activeTab)
        setMoviesData(tempData.data.results);

      } catch (error) {
        HandleApiRespErr(error)
        
      } finally {
        setIsloading(false);
      }
    };
    getData();
  }, [activeTab]);

  const seaurchData = useMemo(() => {

    const data = moviesData.filter((film) =>
      (film.title && film.title.toLowerCase().includes(Inputvalue.toLowerCase())) ||
      (film.name && film.name.toLowerCase().includes(Inputvalue.toLowerCase()))
    );
    
    return data;
    
  }, [moviesData, Inputvalue]);

  const handleChangeTab = ({ key }) => {
    setActiveTab(key);
  };

  return (
    <>
      <BodyTop
        BodyTopTitle={"MaileHereko"}
        BodyTopDesc={
          "List of movies and TV Shows, I, Pramod Poudel have watched till date.Explore what I have watched and also feel free to make a suggestion. 😉"
        }
        value={Inputvalue}
        setValue={setInputValue}
      />
      <Tabs list={list} onClick={handleChangeTab} activeItem={activeTab} />
      <div className={styles.container}>
        <div className={styles.internalNav}></div>
        <h1 className={styles.filmCounter}>
          All <span>({moviesData.length})</span>
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
              <FilmsDisplay {...item} key={item.id} />
            ))         
        )}
      </div>
    </>
  );
};

export default Home;
