import React from "react";
import { useState } from "react";

const AnimeCard = ({ anime }) => {
  const [transparent, setTransparent] = useState(false);
  const handleClass = () => {
    setTransparent(!transparent);
  };
  const defaultClass = "articleInformation";
  const { title, image_url, mal_id, start_date, airing_start } = anime;

  return (
    <article
      key={mal_id}
      onMouseEnter={() => {
        handleClass();
      }}
      onMouseLeave={() => {
        handleClass();
      }}
    >
      <img src={image_url} alt="anime_image" loading="lazy" />
      <div
        className={transparent ? `${defaultClass} active` : `${defaultClass}`}
      >
        <header className="cardHeader">
          <p>{`${title}`}</p>
        </header>
        <button>Details</button>
        {start_date ? <p>Start date : {start_date.slice(0, 10)}</p> : ``}
        {airing_start ? <p>Start date: {airing_start.slice(0, 10)}</p> : ``}
      </div>
    </article>
  );
};

export default AnimeCard;
