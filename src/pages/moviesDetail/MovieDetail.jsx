import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import { HandleApiRespErr } from '../../utils/HandleApiRespErr';
import { getMovieDetail } from '../../api/api';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import styles from "./MoviesDetail.module.css"
import Rate from '../../components/ui/Rate/Rate';

const MovieDetail = () => {
    const { id } = useParams();

    // state
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{
        const fetchData = async()=>{
            setIsLoading(true)

            try {
                const fetchedData = await getMovieDetail(id);
                if(fetchedData.status === 200 && fetchedData.data){
                    setData(fetchedData.data)
                }

            } catch (error) {
                HandleApiRespErr(error)
            }finally{
                setIsLoading(false)
            }
        }

        fetchData()
    },[id])

  return (
    <>
        {
            isLoading?(
                <p>Loading....</p>
            ):(
                    <div className={styles.pageContainer}>
                        <LazyLoadImage
                            className={styles.pictureTop}
                            alt="picture"
                            src={`https://image.tmdb.org/t/p/original/${data?.backdrop_path}`}
                            width={1200}
                            height={480}
                            effect="blur"
                        />
                        <div className={styles.pageInformation}>
                            <span>MaileHereko / TV Shows</span>
                            <h2>{data?.original_title}</h2>
                        </div>
                        <div className={styles.details}>
                            <LazyLoadImage
                            className={styles.pictureBottom}
                            alt="PictureBottom"
                            src={`https://image.tmdb.org/t/p/original/${data?.poster_path}`}
                            width={480}
                            height={720}
                            effect="blur"
                            />
                            <div className={styles.info}>
                                <h1 className={styles.filmTitle}>{data?.original_title}</h1>
                                <p className={styles.description}>
                                    {data?.overview}
                                </p>
                                <Rate value={data?.vote_average}/>
                                <ul className={styles.detailList}>
                                    <li className={styles.detailListItem}>
                                        <span className={styles.detailListItemCaption}>
                                            Type
                                        </span>
                                        <p className={styles.detailListItemValue}>Movie</p>
                                    </li>
                                    <li className={styles.detailListItem}>
                                        <span className={styles.detailListItemCaption}>
                                            Release Date:
                                        </span>
                                        <p className={styles.detailListItemValue}>{data?.release_date}</p>
                                    </li>
                                    <li className={styles.detailListItem}>
                                        <span className={styles.detailListItemCaption}>
                                            Run time
                                        </span>
                                        <p className={styles.detailListItemValue}>{data?.runtime}</p>
                                    </li>
                                    <li className={styles.detailListItem}>
                                        <span className={styles.detailListItemCaption}>
                                            Genres
                                        </span>
                                        <p className={styles.detailListItemValue}>{
                                            data?.genres.map((item)=>(
                                                `${item.name} `
                                            ))    
                                        }</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
            )
        }
    </>
  )
}

export default MovieDetail