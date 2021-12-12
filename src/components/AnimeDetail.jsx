import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import Loading from "./Loading";
import ErrorModal from "../components/presentational/ErrorModal";

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
  const message = `Something went wrong while fetching data`;

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      const call = await fetch(`${api}${id}`);
      const result = await call.json();
      if (!call.ok) {
        throw new Error(message);
      }
      setAnimeDetail(result);
    };

    const fetchRoles = async () => {
      const call = await fetch(`${api}${id}/characters_staff`);
      const result = await call.json();
      if (!call.ok) {
        throw new Error(message);
      }
      const actorsAreListedCheck = result.characters

        .map((voiceActor) => voiceActor.voice_actors)
        .some((len) => len.length > 0);
      if (actorsAreListedCheck) {
        const voiceActorNames = await result.characters.map((character) => {
          const characterName = character.name;
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
    fetchAnimeDetails().catch((error) => console.log(error));
    fetchRoles().catch((error) => console.log(error));
  }, [id, api, message]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="main-content anime-detail">
      {animeDetail.length === 0 ? (
        <Loading />
      ) : (
        <article className="main-content-wrapper anime-detail-wrapper">
          <div className="detail-content__information">
            <div className="detail-content__image">
              <img src={image_url} alt="anime_image" />
            </div>
            <div className="detail-content__description">
              <header>
                <p className="detail-content__title">
                  {title} ({type})
                </p>
                <p>
                  Genre:{" "}
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
            <p>Score: {score || `Not scored`}</p>
            <p>Scored by: {scored_by || `0 members`}</p>

            <p>Rating: {rating || `Not listed`}</p>
            <p>Status: {status || `Not listed`}</p>
            <p>
              Opening theme:{" "}
              {opening_themes && opening_themes.length > 0
                ? opening_themes.slice(0, 3).join(", ")
                : `None listed`}
            </p>

            <p>
              Studios:{" "}
              {studios.length !== 0 && studios
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
              Producers:{" "}
              {(producers.length > 0 &&
                producers.map((producer) => producer.name).join(", ")) ||
                `None listed`}
            </p>

            <p>
              Cast:{" "}
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
                  fullCastList.current.scrollIntoView({
                    block: "nearest",
                    inline: "nearest",
                  });
                }}
              >
                ...View full cast
              </button>
            </p>
          </aside>

          <div className="detail-content-trailer">
            {trailer_url ? (
              <div className="detail-content-trailer__video">
                <iframe
                  title="trailer"
                  src={trailer_url}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <ErrorModal message={`No trailer available, sorry 😥`} />
            )}
          </div>

          <div className="detail-content__cast" ref={fullCastList}>
            {voiceActors.length > 0 ? (
              voiceActors
                .reduce((a, b) => {
                  return a.concat(b);
                })
                .slice(0, 50)
                .map((info, index) => {
                  const { name, image, charName, actorId } = info;
                  return (
                    <div key={index} className="detail-content__cast--actors">
                      <img
                        src={image}
                        alt=" person"
                        style={{ width: "40px", height: "40px" }}
                      />
                      <Link to={`/anime/cast/${actorId}`}>{name}</Link>
                      <p>{`As ${charName}`}</p>
                    </div>
                  );
                })
            ) : (
              <ErrorModal
                message={`The cast of ${title} is not listed, sorry 😥`}
              />
            )}
          </div>
        </article>
      )}
    </main>
  );
};

export default AnimeDetail;
