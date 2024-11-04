import React, { useEffect, useState } from "react";
import styles from "./MoviesDetails.module.css";
import PictureTop from "../../assets/img/PictureTop.png";
import PictureBottom from "../../assets/img/PictureBottom.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useParams } from "react-router-dom";
import { HandleApiRespErr } from "../../utils/HandleApiRespErr";
import { getMovieDetail } from "../../api/api";

const MoviesDetails = () => {
  const [details, setDetails] = useState([])


  const {id} = useParams();
  console.log(id)
  useEffect(()=>{
      const getDetails = async()=>{
        try {
          const res = await getMovieDetail(id);

          if(res.status && res.data){
            setDetails(res.data)
          }
          else{
            console.log('error')
          }
        } catch (error) {
          HandleApiRespErr(error)
        }
      }
      getDetails();
  },[id])

  console.log("data==>", details)

  const {
    original_title,
    overview,
    backdrop_path,
    release_date,
    runtime,
    genres,
    poster_path
  } = details;

  return (
    <div className={styles.pageContainer}>
      <LazyLoadImage
        className={styles.PictureTop}
        alt="picture"
        src={`https://image.tmdb.org/t/p/w500/${backdrop_path}`}
        width={1200}
        height={480}
      />
      <div className={styles.pageInformation}>
        <span>MaileHereko / TV Shows</span>
        <h2>Lost In Space</h2>
      </div>
      <div className={styles.details}>
        <LazyLoadImage
          className={styles.PictureBottom}
          alt="PictureBottom"
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          width={480}
          height={720}
        />
        <div className={styles.info}>
          <h1 className={styles.filmTitle}>{original_title}</h1>
          <p className={styles.description}>
            {overview}
          </p>
          <div className={styles.detailAll}>
                <div className={styles.detailPart1}>
                    <div className={styles.infoBox}>
                        <span className={styles.InfoType}>Type</span>
                        <span className={styles.Info}>Tv Show</span>
                    </div>
                    
                    <div className={styles.infoBox}>
                        <span className={styles.InfoType}>Release date</span>
                        <span className={styles.Info}>{release_date}</span>
                    </div>
                    
                    <div className={styles.infoBox}>
                        <span className={styles.InfoType}>run time</span>
                        <span className={styles.Info}>{runtime}</span>
                    </div>
                    
                    <div className={styles.infoBox}>
                        <span className={styles.InfoType}>Genres</span>
                        <span className={styles.Info}>
                          {/* {genres.join(", ")} */}
                          Fantastic
                        </span>

                    </div>
                </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default MoviesDetails;
