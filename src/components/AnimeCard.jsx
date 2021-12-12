import { useState } from "react";
import { Link } from "react-router-dom";

const AnimeCard = ({ anime }) => {
  const [transparent, setTransparent] = useState(false);
  const handleClass = () => {
    setTransparent(!transparent);
  };

  const { title, image_url, mal_id, start_date, name } = anime;

  return (
    <Link className="anime-card" key={mal_id} to={`/anime/${mal_id}`}>
      <article
        className="anime-card-article"
        onMouseEnter={() => {
          handleClass();
        }}
        onMouseLeave={() => {
          handleClass();
        }}
      >
        <img src={image_url} alt="anime poster" loading="lazy" />

        <div
          className={
            transparent ? "article-information active" : "article-information"
          }
        >
          <header className="card-header">
            <p>{name && name.length > 20 ? `${name.slice(0, 20)}...` : name}</p>
            <p>
              {title && title.length > 20 ? `${title.slice(0, 20)}...` : title}
            </p>
          </header>
          <button className="card-details">Details</button>
          {start_date && (
            <p className="card-start-date">{start_date.slice(0, 10)}</p>
          )}
        </div>
      </article>
    </Link>
  );
};

export default AnimeCard;
