import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Loading from "./Loading";

const ActorDetail = ({ isLoading, setIsLoading }) => {
  const { id } = useParams();
  const [actorDetails, setActorDetails] = useState([]);
  const api = `https://api.jikan.moe/v3/person/`;

  useEffect(() => {
    const fetchActorDetails = async () => {
      setIsLoading(true);
      const call = await fetch(`${api}${id}`);
      const result = await call.json();
      setActorDetails([result]);
      setIsLoading(false);
    };
    fetchActorDetails();
  }, [id, api, setIsLoading]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main className="actor-details">
      {!isLoading ? (
        actorDetails &&
        actorDetails.map((details, index) => {
          const { name, given_name, about, image_url, voice_acting_roles } =
            details;

          return (
            <article key={index} className="actor-details--container">
              <div className="actor-details__image">
                <img
                  src={image_url}
                  loading="lazy"
                  alt="portrait of a person"
                />
                <header className="actor-details__header">
                  <h2>{name && name}</h2>
                  <h2>{given_name && given_name}</h2>
                </header>

                <div className="actor-details__biography">
                  {/* *NOTE* : current API response gives all information in a
                single string, so there is no way for me to properly display all the data in biography section (i. e. links and formatting), if the situation changes i will refactor this accordingly */}
                  <p>{about && about.replace(/\\n/g, "\n")}</p>
                </div>
              </div>

              <div className="actor-details__roles">
                <header>
                  <h2>
                    <span>{name}</span> has also appeared in:
                  </h2>
                </header>
                <div className="actor-details__roles--container">
                  {voice_acting_roles
                    .filter((role) => {
                      return role.role === "Main";
                    })
                    .slice(0, 20)
                    .map((animeName, index) => {
                      return (
                        <Link
                          to={`/anime/${animeName.anime.mal_id}`}
                          key={index}
                        >
                          <article className="actor-details__role">
                            <div className="actor-details__role--information">
                              <header>{animeName.anime.name}</header>
                              <button>Details</button>
                            </div>
                            <img src={animeName.anime.image_url} alt="" />
                          </article>
                        </Link>
                      );
                    })}
                </div>
              </div>
            </article>
          );
        })
      ) : (
        <Loading />
      )}
    </main>
  );
};

export default ActorDetail;
