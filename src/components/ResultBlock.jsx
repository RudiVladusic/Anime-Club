import { useContext, useEffect } from "react";
import AnimeCard from "./AnimeCard";
import Loading from "./Loading";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import SearchDataContext from "../contexts/SearchDataContext";
import ErrorModal from "./presentational/ErrorModal";
const ResultBlock = () => {
  SwiperCore.use([Navigation]);
  const { animeResults, isLoading, isError } = useContext(SearchDataContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isError) {
    return (
      <main className="main-content search">
        <div className="main-content-wrapper search-wrapper">
          <ErrorModal message={`there were no results for that query`} />;
        </div>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="main-content search">
        <div className="main-content-wrapper search-wrapper">
          <Loading />;
        </div>
      </main>
    );
  }

  return (
    <main className="main-content search">
      <div className="main-content-wrapper">
        <div className="search-content__cont">
          {animeResults.length > 0 && !isLoading && (
            <Swiper
              spaceBetween={20}
              tag="section"
              wrapperTag="div"
              id="search"
              navigation
              grabCursor="true"
              breakpoints={{
                0: {
                  slidesPerView: 2,
                },

                500: {
                  slidesPerView: 2,
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
              {animeResults.map((anime) => (
                <SwiperSlide tag="div" key={anime.mal_id}>
                  <AnimeCard anime={anime} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </main>
  );
};

export default ResultBlock;
