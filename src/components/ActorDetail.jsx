import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import AnimeCard from "./AnimeCard";
const ActorDetail = ({ isLoading, setIsLoading }) => {
  const { id } = useParams();
  const [actorDetails, setActorDetails] = useState([]);
  const api = `https://api.jikan.moe/v3/person/`;

  SwiperCore.use([Navigation]);
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
                {voice_acting_roles !== 0 ? (
                  <Swiper
                    spaceBetween={25}
                    tag="section"
                    wrapperTag="div"
                    id="actorRoles"
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
                    {voice_acting_roles.slice(0, 50).map((animeName, index) => {
                      return (
                        <SwiperSlide key={index}>
                          <AnimeCard anime={animeName.anime} />
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                ) : (
                  <h2>No roles</h2>
                )}
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
