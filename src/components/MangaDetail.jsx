import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";

const MangaDetail = () => {
  const [mangaDetails, setMangaDetails] = useState(Array);
  const { id } = useParams();
  const [readMore, setReadMore] = useState(Boolean);
  useEffect(() => {
    const getMangaDetails = async () => {
      const call = await fetch(`https://api.jikan.moe/v3/manga/${id}`);
      const result = await call.json();
      setMangaDetails(result);
    };

    getMangaDetails();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    title,
    background,
    chapters,
    image_url,
    status,
    synopsis,
    authors,
    type,
    published,
    score,
    scored_by,
    genres,
  } = mangaDetails;
  return (
    <main className="main-content anime-detail">
      {mangaDetails.length === 0 ? (
        <Loading />
      ) : (
        <article className="main-content-wrapper anime-detail-wrapper">
          <div className="detail-content__information">
            <div className="detail-content__image">
              <img src={image_url} alt="manga poster" />
            </div>
            <div className="detail-content__description">
              <header>
                <p className="detail-content__title">{title}</p>
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
            <h3>
              <span>Published by: </span>
              {authors &&
                authors.map((author) => {
                  return author.name;
                })}
            </h3>
            <p>
              <span>Status: </span> {status && status}
            </p>
            <p>
              <span>Type:</span> {type && type}
            </p>
            <p>
              <span>Chapters:</span> {chapters || "Not listed"}
            </p>
            <p>
              <span>Published: </span>
              {published ? published.string : "Not listed"}
            </p>
            <p>
              <span>Score:</span> {score || "Not listed"}
            </p>
            <p>
              <span>Scored by:</span>{" "}
              {`${scored_by} MAL members` || "Not listed"}
            </p>
          </aside>

          <div className="detail-content__background">
            <header>
              <h2>Background</h2>
            </header>
            <p>{background && background}</p>
          </div>
        </article>
      )}
    </main>
  );
};

export default MangaDetail;
