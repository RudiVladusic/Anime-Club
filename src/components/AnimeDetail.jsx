import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrown } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

const AnimeDetail = () => {
  const { id } = useParams();
  useEffect(() => {
    const fetchItem = () => {
      fetch(`https://api.jikan.moe/v3/anime/${id}`)
        .then((res) => res.json())
        .then((res) => setAnimeDetail(res));
    };
    fetchItem();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [animeDetail, setAnimeDetail] = useState([]);
  const [readMore, setReadMore] = useState(false);
  const {
    title,
    image_url,
    synopsis,
    trailer_url,
    genres,
    rating,
    score,
    scored_by,
    status,
    opening_themes,
    studios,
    producers,
    type,
  } = animeDetail;

  return (
    <main className="detail-content">
      <article>
        <div className="detail-content__information">
          <div className="detail-content__image">
            <img src={image_url} alt="anime_image" />
          </div>
          <div className="detail-content__description">
            <header>
              <p className="detail-content__title">
                {title} <span>({type})</span>
              </p>
              <p className="detail-content__genre">
                <span>Genre: </span>
                {genres && genres.map((genre) => genre.name).join(", ")}
              </p>
            </header>

            {synopsis && (
              <p className="detail-content__synopsis">
                {readMore ? synopsis : synopsis.slice(0, 200)}
                <button
                  className="read-more"
                  onClick={() => setReadMore(!readMore)}
                >
                  {readMore ? "...read less" : "...read more"}
                </button>
              </p>
            )}
          </div>
        </div>

        <aside className="detail-content__aside">
          <p>
            <span>Score: </span>
            {score && score}
          </p>
          <p>
            <span>Scored by: </span>
            {scored_by && `${scored_by} members`}
          </p>

          <p>
            <span>Rating: </span>
            {rating}
          </p>
          <p>
            <span>Status: </span>
            {status}
          </p>
          <p>
            <span>Opening theme: </span>
            {opening_themes && opening_themes.slice(0, 3).join(", ")}
          </p>

          {studios && (
            <>
              <p>
                <span>Production</span>: {studios.map((studio) => studio.name)}
              </p>
              <p>
                <span>Producer info: </span>
                <a href={studios.map((link) => link.url)}>
                  {studios.map((name) => name.name)}
                </a>
              </p>
            </>
          )}

          {producers && (
            <>
              <p>
                <span>Producers: </span>
                {producers.map((producer) => producer.name).join(", ")}
              </p>
            </>
          )}
        </aside>

        <div className="detail-content-trailer">
          <div className="detail-content-trailer__video">
            {trailer_url ? (
              <iframe
                title="trailer"
                src={trailer_url}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            ) : (
              <p>
                No trailer available <FontAwesomeIcon icon={faFrown} />
              </p>
            )}
          </div>
        </div>
      </article>
    </main>
  );
};

export default AnimeDetail;
