import React from "react";
import styles from "./Example.module.css";
import PictureTop from "../assets/img/PictureTop.png";
import PictureBottom from "../assets/img/PictureBottom.png";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Example = () => {
  return (
    <div className={styles.pageContainer}>
      {/* <img src={PictureTop} alt="PictureTop" /> */}
      <LazyLoadImage
        className={styles.PictureTop}
        alt="picture"
        src={PictureTop}
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
          src={PictureBottom}
          width={480}
          height={720}
        />
        <div className={styles.info}>
          <h1 className={styles.filmTitle}>Have You Seen Our Robot?</h1>
          <p className={styles.description}>
            The mission to save Scarecrow takes an unexpected turn, throwing the
            Resolute into chaos. Judy hatches a plan to get a ship to Alpha
            Centauri.
          </p>
          <div className={styles.detailAll}>
                <div className={styles.detailPart1}>
                    <div className={styles.infoBox}>
                        <span className={styles.InfoType}>Type</span>
                        <span className={styles.Info}>Tv Show</span>
                    </div>
                    
                    <div className={styles.infoBox}>
                        <span className={styles.InfoType}>First air date</span>
                        <span className={styles.Info}>2018-10-23</span>
                    </div>
                    
                    <div className={styles.infoBox}>
                        <span className={styles.InfoType}>No. of Season</span>
                        <span className={styles.Info}>2</span>
                    </div>
                    
                    <div className={styles.infoBox}>
                        <span className={styles.InfoType}>Episode run time</span>
                        <span className={styles.Info}>56 min</span>
                    </div>
                    
                    <div className={styles.infoBox}>
                        <span className={styles.InfoType}>Genres</span>
                        <span className={styles.Info}>Action & Adventure, Sci-Fi & Fantasy, Drama</span>
                    </div>
                </div>
                <div className={styles.detailPart2}>
                    <div className={styles.infoBox}>
                        <span className={styles.InfoType}>Status</span>
                        <span className={styles.Info}>Returning Series</span>
                    </div>
                    
                    <div className={styles.infoBox}>
                        <span className={styles.InfoType}>Last air date</span>
                        <span className={styles.Info}>2019-04-24</span>
                    </div>
                    
                    <div className={styles.infoBox}>
                        <span className={styles.InfoType}>No. of episodes</span>
                        <span className={styles.Info}>20</span>
                    </div>
                </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Example;
