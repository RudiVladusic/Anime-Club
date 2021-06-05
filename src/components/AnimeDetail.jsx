import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrown } from "@fortawesome/free-solid-svg-icons";
import { useParams, Link } from "react-router-dom";
import Loading from "./Loading";

const AnimeDetail = () => {
  const { id } = useParams();
  const [animeDetail, setAnimeDetail] = useState([]);
  const [voiceActors, setVoiceActors] = useState({
    image: "",
    name: "",
    charName: "",
    actorId: "",
  });
  const [readMore, setReadMore] = useState(false);
  const fullCastList = useRef(null);
  const api = `https://api.jikan.moe/v3/anime/`;
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

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      const call = await fetch(`${api}${id}`);
      const result = await call.json();
      setAnimeDetail(result);
    };

    const fetchRoles = async () => {
      const call = await fetch(`${api}${id}/characters_staff`);
      const result = await call.json();
      let voiceActorNames = await result.characters
        .slice(0, 20)
        .map((voiceA) => {
          let animeName = voiceA.name;
          return voiceA.voice_actors
            .filter((lang) => {
              return lang.language === "Japanese";
            })
            .slice(0, 1)
            .map((info) => {
              return {
                image: info.image_url,
                name: info.name,
                charName: animeName,
                actorId: info.mal_id,
              };
            });
        });

      setVoiceActors(voiceActorNames);
      console.log(voiceActorNames);
    };
    fetchAnimeDetails();
    fetchRoles();
  }, [id, api]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="detail-content">
      {animeDetail.length === 0 ? (
        <Loading />
      ) : (
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
              {score ? score : `Not scored`}
            </p>
            <p>
              <span>Scored by: </span>
              {scored_by ? `${scored_by} members` : `0 members`}
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
              {opening_themes && opening_themes.length > 0
                ? opening_themes.slice(0, 3).join(", ")
                : `None listed`}
            </p>

            {studios && (
              <>
                <span>Studios: </span>

                {studios.map((info, index) => {
                  const { name, url } = info;
                  return (
                    <a href={url} key={index}>
                      <p>{`${name} `}</p>
                    </a>
                  );
                })}
              </>
            )}

            {producers && (
              <>
                <span>Producers: </span>
                {producers.map((producer, index) => {
                  return <p key={index}> {producer.name}</p>;
                })}
              </>
            )}

            <>
              <span>Cast: </span>

              {voiceActors.length > 0 &&
                voiceActors.slice(0, 5).map((name) =>
                  name.map((x, index) => {
                    console.log(x.name);
                    return <p key={index}>{x.name}</p>;
                  })
                )}

              <button
                className="view-full-cast"
                onClick={() => {
                  fullCastList.current.scrollIntoView();
                }}
              >
                ...View full cast
              </button>
            </>
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

          <div className="detail-content__cast" ref={fullCastList}>
            <header>
              <h2>Cast</h2>
            </header>

            {voiceActors.length > 0 &&
              voiceActors
                .reduce((a, b) => {
                  return a.concat(b);
                })
                .map((info, index) => {
                  const { name, image, charName, actorId } = info;
                  return (
                    <article
                      key={index}
                      className="detail-content__cast--actors"
                    >
                      <img
                        src={image}
                        alt=""
                        style={{ width: "40px", height: "40px" }}
                      />
                      <Link to={`/anime/cast/${actorId}`}>{name}</Link>
                      <p>As {charName}</p>
                    </article>
                  );
                })}
          </div>
        </article>
      )}
    </main>
  );
};

export default AnimeDetail;
