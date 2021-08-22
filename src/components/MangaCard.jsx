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
        className="manga-card"
      >
        <img src={image_url} alt="manga poster" />
        <div
          className={
            transparent ? "articleInformation active" : "articleInformation"
          }
        >
          <header className="cardHeader">
            <p>
              {title && title.length > 20 ? `${title.slice(0, 20)}...` : title}
            </p>
          </header>
          <button className="cardDetails">Details</button>
          {start_date && (
            <p className="cardStartDate">
              Start date : {start_date.slice(0, 10)}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
};

export default MangaCard;
