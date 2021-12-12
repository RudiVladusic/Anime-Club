import { useState } from "react";
import { Link } from "react-router-dom";

const MangaCard = ({ manga }) => {
  const { title, image_url, mal_id, start_date } = manga;
  const [transparent, setTransparent] = useState(false);
  const handleClass = () => {
    setTransparent(!transparent);
  };
  return (
    <Link to={`/manga/${mal_id}`}>
      <article
        onMouseEnter={handleClass}
        onMouseLeave={handleClass}
        className="anime-card-article"
      >
        <img src={image_url} alt="manga poster" />
        <div
          className={
            transparent ? "article-information active" : "article-information"
          }
        >
          <header className="card-header">
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

export default MangaCard;
