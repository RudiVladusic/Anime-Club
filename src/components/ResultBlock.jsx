import { useContext } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AnimeCard from "./AnimeCard";
import Loading from "./Loading";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";

import LoadingAndErrorContext from "../contexts/LoadingAndErrorContext";
import SearchDataContext from "../contexts/SearchDataContext";
const ResultBlock = () => {
  SwiperCore.use([Navigation]);
  const { isLoading, isError } = useContext(LoadingAndErrorContext);
  const { animeResults } = useContext(SearchDataContext);
  return (
    <>
      {isLoading && <Loading />}
      {isError && (
        <header className="error">
          <p>There were no results for that query. Try another one!</p>
        </header>
      )}

      {!isLoading && !isError && animeResults.length > 0 && (
        <section className="search-content__cont">
          <Swiper
            spaceBetween={25}
            tag="section"
            wrapperTag="div"
            id="search"
            navigation
            centeredSlides="true"
            centeredSlidesBounds="true"
            grabCursor="true"
            breakpoints={{
              0: {
                slidesPerView: 2,
                freeMode: true,
                centeredSlides: false,
              },

              500: {
                slidesPerView: 2,
                freeMode: true,
                centeredSlides: false,
              },

              768: {
                slidesPerView: 3,
                freeMode: true,
                centeredSlides: false,
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
        </section>
      )}
    </>
  );
};

export default ResultBlock;
