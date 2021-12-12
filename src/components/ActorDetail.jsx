import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import AnimeCard from "./AnimeCard";
import ErrorModal from "./presentational/ErrorModal";
import { useHistory } from "react-router";
const ActorDetail = ({ isLoading, setIsLoading }) => {
  const { id } = useParams();
  const history = useHistory();
  const [actorDetails, setActorDetails] = useState([]);
  const api = `https://api.jikan.moe/v3/person/`;
  const [error, setError] = useState({
    isError: false,
    message: `Server did not respond, sorry 😥`,
  });
  SwiperCore.use([Navigation]);
  useEffect(() => {
    const fetchActorDetails = async () => {
      setIsLoading(true);
      const call = await fetch(`${api}${id}`);
      const result = await call.json();
      if (!call.ok) {
        setError({ ...error, isError: true });

        throw new Error(error.message);
      }

      setActorDetails([result]);

      setIsLoading(false);
    };
    fetchActorDetails().catch((error) => console.warn(error.message));
    //eslint-disable-next-line
  }, [id, api, setIsLoading]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (error.isError) {
    return (
      <main className="main-content actor-detail">
        <div className="main-content-wrapper actor-detail-wrapper">
          <ErrorModal message={error.message} />
          <button
            onClick={() => {
              history.push(-1);
            }}
          >
            Go back
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="main-content actor-detail">
      {!isLoading ? (
        actorDetails &&
        actorDetails.map((details, index) => {
          const {
            name,
            given_name,
            about,
            image_url,
            voice_acting_roles,
            website_url,
          } = details;

          return (
            <div
              key={index}
              className="main-content-wrapper actor-detail-wrapper"
            >
              <div className="actor-details__info">
                <img
                  src={image_url}
                  loading="lazy"
                  alt="portrait of a person"
                />
                <h3 className="actor-details__website">
                  {website_url ? (
                    <a href={website_url}>{`${name}'s website`}</a>
                  ) : (
                    <p>{`${name} does not have a website listed`}</p>
                  )}
                </h3>
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
                {voice_acting_roles.length > 0 ? (
                  <>
                    <header>
                      <h2>
                        <span>{name}</span> has also appeared in:
                      </h2>
                    </header>
                    <Swiper
                      spaceBetween={20}
                      tag="section"
                      wrapperTag="div"
                      id="roles"
                      navigation
                      grabCursor="true"
                      breakpoints={{
                        0: {
                          slidesPerView: 2,
                        },

                        500: {
                          slidesPerView: 3,
                        },

                        768: {
                          slidesPerView: 3,
                        },

                        820: {
                          slidesPerView: 3,
                        },

                        1000: {
                          slidesPerView: 4,
                        },

                        1200: {
                          slidesPerView: 5,
                        },

                        1400: {
                          slidesPerView: 7,
                        },
                      }}
                    >
                      {voice_acting_roles
                        .slice(0, 50)
                        .map((animeName, index) => {
                          return (
                            <SwiperSlide key={index}>
                              <AnimeCard anime={animeName.anime} />
                            </SwiperSlide>
                          );
                        })}
                    </Swiper>
                  </>
                ) : (
                  <ErrorModal message={`No roles to display, sorry 😥`} />
                )}
              </div>
            </div>
          );
        })
      ) : (
        <Loading />
      )}
    </main>
  );
};

export default ActorDetail;
