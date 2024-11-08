import React, { useEffect, useState } from 'react'
import styles from './TvShowsDetail.module.css'
import { useParams } from 'react-router-dom';
import { getTvDetail } from '../../api/api';
import { HandleApiRespErr } from '../../utils/HandleApiRespErr';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Rate from '../../components/ui/Rate/Rate';

const TvShowsDetail = () => {
    const { id } = useParams();

    // state
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{
        const fetchData = async()=>{
            setIsLoading(true)

            try {
                const fetchedData = await getTvDetail(id);
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
                            <h2>{data?.name}</h2>
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
                                <h1 className={styles.filmTitle}>{data?.name}</h1>
                                <p className={styles.description}>
                                    {data?.overview}
                                </p>
                                <Rate value={data?.vote_average}/>
                                <ul className={styles.detailList}>
                                    <li className={styles.detailListItem}>
                                        <span className={styles.detailListItemCaption}>
                                            Type
                                        </span>
                                        <p className={styles.detailListItemValue}>Tv Shows</p>
                                    </li>
                                    <li className={styles.detailListItem}>
                                        <span className={styles.detailListItemCaption}>
                                            no. Of Seasons
                                        </span>
                                        <p className={styles.detailListItemValue}>{data?.number_of_seasons}</p>
                                    </li>
                                    <li className={styles.detailListItem}>
                                        <span className={styles.detailListItemCaption}>
                                            First air date
                                        </span>
                                        <p className={styles.detailListItemValue}>{data?.first_air_date}</p>
                                    </li>
                                    <li className={styles.detailListItem}>
                                        <span className={styles.detailListItemCaption}>
                                            Episode run time
                                        </span>
                                        <p className={styles.detailListItemValue}>{data?.number_of_episodes}</p>
                                    </li>
                                    <li className={styles.detailListItem}>
                                        <span className={styles.detailListItemCaption}>
                                            Status
                                        </span>
                                        <p className={styles.detailListItemValue}>{data?.status}</p>
                                    </li>
                                    <li className={styles.detailListItem}>
                                        <span className={styles.detailListItemCaption}>
                                            Last air date
                                        </span>
                                        <p className={styles.detailListItemValue}>{data?.last_air_date}</p>
                                    </li>
                                    <li className={styles.detailListItem}>
                                        <span className={styles.detailListItemCaption}>
                                            Genres
                                        </span>
                                        <p className={styles.detailListItemValue}>
                                        {
                                            data?.genres.map((item)=>(
                                                `${item.name} `
                                            ))    
                                        }
                                        </p>
                                    </li>
                                    <li className={styles.detailListItem}>
                                        <span className={styles.detailListItemCaption}>
                                        </span>
                                        <p className={styles.detailListItemValue}></p>
                                    </li>
                                    <li className={styles.detailListItem}>
                                        <span className={styles.detailListItemCaption}>
                                            No. of Episodes
                                        </span>
                                        <p className={styles.detailListItemValue}>20</p>
                                    </li>
                                    <li className={styles.detailListItem}>
                                        <span className={styles.detailListItemCaption}>
                                        </span>
                                        <p className={styles.detailListItemValue}></p>
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

export default TvShowsDetail