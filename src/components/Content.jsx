// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useContext } from "react";
import AnimeCard from "./AnimeCard";
import LandingDataContext from "../contexts/LandingDataContext";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "swiper/swiper-bundle.css";
import Loading from "./Loading";

const Content = () => {
  SwiperCore.use([Navigation]);
  const { upcomingAnime, airingAnime, specials } =
    useContext(LandingDataContext);
  return (
    <main className="main-content">
      <header className="main-content__header">
        <p>Trending</p>
      </header>

      {airingAnime.length > 0 ? (
        <Swiper
          spaceBetween={25}
          tag="section"
          wrapperTag="div"
          id="trending"
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
          {airingAnime.map((airing) => {
            return (
              <SwiperSlide tag="div" key={airing.mal_id}>
                <AnimeCard anime={airing} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <Loading />
      )}

      <header className="main-content__header">Upcoming </header>

      {upcomingAnime.length > 0 ? (
        <Swiper
          spaceBetween={25}
          tag="section"
          wrapperTag="div"
          id="upcoming"
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
          {upcomingAnime.map((upcoming) => {
            return (
              <SwiperSlide key={upcoming.mal_id} tag="div">
                <AnimeCard anime={upcoming} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <Loading />
      )}

      <header className="main-content__header">Specials </header>

      {specials.length > 0 ? (
        <Swiper
          spaceBetween={25}
          tag="section"
          wrapperTag="div"
          id="specials"
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
          {specials.map((specials) => {
            return (
              <SwiperSlide key={specials.mal_id} tag="div">
                <AnimeCard anime={specials} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <Loading />
      )}
    </main>
  );
};

export default Content;
