import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
const AnimeCard = ({ anime }) => {
  const [transparent, setTransparent] = useState(false);
  const handleClass = () => {
    setTransparent(!transparent);
  };

  const { title, image_url, mal_id, start_date, airing_start } = anime;

  return (
    <Link className="anime-card" key={mal_id} to={`/anime/${mal_id}`}>
      <article
        onMouseEnter={() => {
          handleClass();
        }}
        onMouseLeave={() => {
          handleClass();
        }}
      >
        <img src={image_url} alt="anime_image" loading="lazy" />

        <div
          className={
            transparent ? "articleInformation active" : "articleInformation"
          }
          // className="articleInformation active"
        >
          <header className="cardHeader">
            <p>{title.length > 20 ? `${title.slice(0, 20)}...` : title}</p>
          </header>
          <button>Details</button>
          {start_date ? (
            <p>Start date : {start_date.slice(0, 10)}</p>
          ) : (
            <p>Start date: TBD</p>
          )}
          {/* {airing_start && <p>Start date: {airing_start.slice(0, 10)}</p>} */}
        </div>
      </article>
    </Link>
  );
};

export default AnimeCard;
