import React, { useEffect, useState } from "react";
import styles from "./TvShowsDetail.module.css";
import { useParams } from "react-router-dom";
import { getFavorites, getTvDetail, getWatchList } from "../../api/api";
import { HandleApiRespErr } from "../../utils/HandleApiRespErr";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Rate from "../../components/ui/Rate/Rate";
import axios from "axios";

const TvShowsDetail = () => {
  const { id } = useParams();

  // state
  const [data, setData] = useState(null);
  const [add, setAdd] = useState(true);
  const [suggestMe, setSuggestMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const AccesToken = process.env.REACT_APP_ACCESS_TOKEN;

  const handleAddFavorites = async (tvId) => {
    const options = {
      method: "POST",
      url: "https://api.themoviedb.org/3/account/21575738/favorite",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${AccesToken}`,
      },
      data: { media_type: "tv", media_id: tvId, favorite: true },
    };

    try {
      const res = await axios.request(options);
      if (res.status === 201) {
        if (add) {
          setAdd(false);
        } else {
          setAdd(true);
        }
      }
    } catch (error) {
      HandleApiRespErr(error);
    }
  };

  const handleaAddWatchList = async (tvId)=>{
    const options = {
        method: 'POST',
        url: 'https://api.themoviedb.org/3/account/21575738/watchlist',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMTY5NDA3OWY2ZDE5ODNiMjk1M2I2MDhhNDk3NTM5MCIsIm5iZiI6MTczMTI0ODI2My41Mjc1MDczLCJzdWIiOiI2NzEwOGRhNWRiNzljOWNlYWUwZWQwNmQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.7WLP7XYSmpWdOnGob0QugScHva8Ss5yFt28q1RAftnM'
        },
        data: {media_type: 'tv', media_id: tvId, watchlist: true}
      };
      try {
        const req = await axios.request(options);
        console.log(req)
      } catch (error) {
        HandleApiRespErr(error)
      }
  }


    useEffect(()=>{
        const getListWatchList = async()=>{
            try {
                const res = await getWatchList('tv');
                if(res.data.results){
                    const WatchList = res.data.results;
                    const num =  WatchList.filter((item)=> item.id == id)

                    if(num.length>0){
                        setSuggestMe(false)
                    }
                }
            } catch (error) {
                HandleApiRespErr(error)
            }
        }

        getListWatchList()
    },[id])
  useEffect(() => {
    const getTv = async () => {
      try {
        const res = await getFavorites("tv");
        const favoritesList = res?.data?.results;
        const num = favoritesList?.filter((item) => item.id == id);
        if (num.length > 0) {
          setAdd(false);
        }
      } catch (error) {
        // HandleApiRespErr(error)
      }
    };
    getTv();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const fetchedData = await getTvDetail(id);
        if (fetchedData.status === 200 && fetchedData.data) {
          setData(fetchedData.data);
        }
      } catch (error) {
        HandleApiRespErr(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      {isLoading ? (
        <p>Loading....</p>
      ) : (
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
          <div
            className={styles.AddList}
            >
            {add ? (
              <h2 
                onClick={() => handleAddFavorites(id)}
                className={styles.addBtn}>
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 12H18"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 18V6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Add My List
              </h2>
            ) : (
                <h2
                 className={styles.removeBtn}
                 // onClick={()=>handleRemoveList(id)}
                 >
                    Remove from List
                </h2>
            )}
            {suggestMe ? (
              <h2
               className={styles.suggestBtn}
               onClick={()=>handleaAddWatchList(id)}
               >
                <span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.47998 18.35L10.58 20.75C10.98 21.15 11.88 21.35 12.48 21.35H16.28C17.48 21.35 18.78 20.45 19.08 19.25L21.48 11.95C21.98 10.55 21.08 9.35003 19.58 9.35003H15.58C14.98 9.35003 14.48 8.85003 14.58 8.15003L15.08 4.95003C15.28 4.05003 14.68 3.05003 13.78 2.75003C12.98 2.45003 11.98 2.85003 11.58 3.45003L7.47998 9.55003"
                      stroke="#7B6EF6"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M2.37988 18.35V8.55002C2.37988 7.15002 2.97988 6.65002 4.37988 6.65002H5.37988C6.77988 6.65002 7.37988 7.15002 7.37988 8.55002V18.35C7.37988 19.75 6.77988 20.25 5.37988 20.25H4.37988C2.97988 20.25 2.37988 19.75 2.37988 18.35Z"
                      stroke="#7B6EF6"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>{" "}
                </span> 
                Suggest this
              </h2>
            ) : (
              <h2 className={styles.unSuggestBtn}>
                <span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22 9V15C22 15.22 22 15.44 21.98 15.65C21.16 14.64 19.91 14 18.5 14C17.44 14 16.46 14.37 15.69 14.99C14.65 15.81 14 17.08 14 18.5C14 19.34 14.24 20.14 14.65 20.82C14.92 21.27 15.26 21.66 15.66 21.98C15.45 22 15.23 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H15C20 2 22 4 22 9Z"
                      stroke="#37D8A7"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2.52002 7.10999H21.48"
                      stroke="#37D8A7"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.52002 2.10999V6.96997"
                      stroke="#37D8A7"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15.48 2.10999V6.52002"
                      stroke="#37D8A7"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M23 18.5C23 19.34 22.76 20.14 22.35 20.82C22.11 21.22 21.81 21.58 21.46 21.88C20.67 22.58 19.64 23 18.5 23C17.43 23 16.44 22.62 15.67 21.98H15.66C15.26 21.66 14.92 21.27 14.65 20.82C14.24 20.14 14 19.34 14 18.5C14 17.08 14.65 15.81 15.69 14.99C16.46 14.37 17.44 14 18.5 14C19.91 14 21.16 14.64 21.98 15.65C22.62 16.42 23 17.42 23 18.5Z"
                      stroke="#37D8A7"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16.75 18.5L17.86 19.61L20.26 17.39"
                      stroke="#37D8A7"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                  Already watched
              </h2>
            )}
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
              <p className={styles.description}>{data?.overview}</p>
              <Rate value={data?.vote_average} />
              <ul className={styles.detailList}>
                <li className={styles.detailListItem}>
                  <span className={styles.detailListItemCaption}>Type</span>
                  <p className={styles.detailListItemValue}>Tv Shows</p>
                </li>
                <li className={styles.detailListItem}>
                  <span className={styles.detailListItemCaption}>
                    no. Of Seasons
                  </span>
                  <p className={styles.detailListItemValue}>
                    {data?.number_of_seasons}
                  </p>
                </li>
                <li className={styles.detailListItem}>
                  <span className={styles.detailListItemCaption}>
                    First air date
                  </span>
                  <p className={styles.detailListItemValue}>
                    {data?.first_air_date}
                  </p>
                </li>
                <li className={styles.detailListItem}>
                  <span className={styles.detailListItemCaption}>
                    Episode run time
                  </span>
                  <p className={styles.detailListItemValue}>
                    {data?.number_of_episodes}
                  </p>
                </li>
                <li className={styles.detailListItem}>
                  <span className={styles.detailListItemCaption}>Status</span>
                  <p className={styles.detailListItemValue}>{data?.status}</p>
                </li>
                <li className={styles.detailListItem}>
                  <span className={styles.detailListItemCaption}>
                    Last air date
                  </span>
                  <p className={styles.detailListItemValue}>
                    {data?.last_air_date}
                  </p>
                </li>
                <li className={styles.detailListItem}>
                  <span className={styles.detailListItemCaption}>Genres</span>
                  <p className={styles.detailListItemValue}>
                    {data?.genres?.map((item) => `${item.name} `)}
                  </p>
                </li>
                <li className={styles.detailListItem}>
                  <span className={styles.detailListItemCaption}></span>
                  <p className={styles.detailListItemValue}></p>
                </li>
                <li className={styles.detailListItem}>
                  <span className={styles.detailListItemCaption}>
                    No. of Episodes
                  </span>
                  <p className={styles.detailListItemValue}>20</p>
                </li>
                <li className={styles.detailListItem}>
                  <span className={styles.detailListItemCaption}></span>
                  <p className={styles.detailListItemValue}></p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TvShowsDetail;
