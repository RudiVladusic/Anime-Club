import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrown } from "@fortawesome/free-solid-svg-icons";
import { useParams, Link } from "react-router-dom";
import Loading from "./Loading";

const AnimeDetail = () => {
  const { id } = useParams();
  const [animeDetail, setAnimeDetail] = useState(Array);
  const [voiceActors, setVoiceActors] = useState({
    image: "",
    name: "",
    charName: "",
    actorId: "",
  });
  const [readMore, setReadMore] = useState(Boolean);
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
      // if (!call.ok) {
      //   setIsError(true);
      //   return;
      // }
      const actorsAreListedCheck = result.characters
        .slice(0, 20)
        .map((voiceActor) => voiceActor.voice_actors)
        .every((len) => len.length > 0);
      if (actorsAreListedCheck) {
        let voiceActorNames = await result.characters
          .slice(0, 20)
          .map((character) => {
            let characterName = character.name;
            return character.voice_actors
              .filter((lang) => {
                return lang.language === "Japanese";
              })
              .slice(0, 1)
              .map((info) => {
                return {
                  image: info.image_url,
                  name: info.name,
                  charName: characterName,
                  actorId: info.mal_id,
                };
              });
          });

        setVoiceActors(voiceActorNames);
      }

      return;
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
              {score || `Not scored`}
            </p>
            <p>
              <span>Scored by: </span>
              {scored_by || `0 members`}
            </p>

            <p>
              <span>Rating: </span>
              {rating || `Not listed`}
            </p>
            <p>
              <span>Status: </span>
              {status || `Not listed`}
            </p>
            <p>
              <span>Opening theme: </span>
              {opening_themes && opening_themes.length > 0
                ? opening_themes.slice(0, 3).join(", ")
                : `None listed`}
            </p>

            <p>
              <span>Studios: </span>
              {studios.length !== 0
                ? studios.map((info, index) => {
                    const { name, url } = info;
                    return (
                      <a href={url} key={index}>
                        {`${name} `}
                      </a>
                    );
                  })
                : `None listed`}
            </p>

            <p>
              <span>Producers: </span>

              {(producers.length > 0 &&
                producers.map((producer) => producer.name).join(", ")) ||
                `None listed`}
            </p>

            <p>
              <span>Cast: </span>

              {voiceActors.length > 0 &&
              voiceActors.filter((len) => len.length > 0)
                ? voiceActors
                    .slice(0, 5)
                    .map((names) =>
                      names.map((name) => {
                        return name.name.replace(",", "");
                      })
                    )
                    .join(", ")
                : `None listed`}
              <button
                className="view-full-cast"
                onClick={() => {
                  fullCastList.current.scrollIntoView();
                }}
              >
                ...View full cast
              </button>
            </p>
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
            voiceActors.filter((len) => len.length > 0) ? (
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
                        alt=" person"
                        style={{ width: "40px", height: "40px" }}
                      />
                      <Link to={`/anime/cast/${actorId}`}>{name}</Link>
                      <p>{charName}</p>
                    </article>
                  );
                })
            ) : (
              <p>None listed</p>
            )}
          </div>
        </article>
      )}
    </main>
  );
};

export default AnimeDetail;
