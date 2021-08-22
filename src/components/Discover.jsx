import { useState, useEffect, useContext } from "react";
import { filterAnimeCall } from "../APIcalls/filterAnimeCall";
import AnimeCard from "./AnimeCard";
import Loading from "./Loading";
import LoadingAndErrorContext from "../contexts/LoadingAndErrorContext";
import { getRandomGenre } from "../functions/getRandomGenre";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "swiper/swiper-bundle.css";

const Discover = () => {
  SwiperCore.use([Navigation]);
  const [discoverAnime, setDiscoverAnime] = useState(Array);
  const { isLoading, setIsLoading } = useContext(LoadingAndErrorContext);

  const [selectValue, setSelectValue] = useState("select");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="discover-content">
      <header className="main-content__header">
        <p>Discover</p>
      </header>
      <select
        id="genreSelect"
        name="Genre"
        defaultValue={selectValue}
        onChange={(e) => {
          filterAnimeCall(e.target.value)
            .then(setIsLoading(true))
            .then((data) => {
              setDiscoverAnime(data.anime);
              setIsLoading(false);
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        <option
          value={selectValue}
          onChange={(e) => setSelectValue(e.target.value)}
          disabled
        >
          Select genre
        </option>
        <option value="1">Action</option>
        <option value="2">Adventure</option>
        <option value="4">Comedy</option>
        <option value="8">Drama</option>
        <option value="7">Mystery</option>
        <option value="14">Horror</option>
        <option value="24">Sci Fi</option>
        <option value="40">Psychological</option>
        <option value="41">Thriller</option>
        <option value={getRandomGenre(1, 40, 12)}>Random</option>
      </select>

      {isLoading ? (
        <Loading />
      ) : discoverAnime.length === 0 ? null : (
        <div className="discover-content__cont">
          <Swiper
            spaceBetween={20}
            tag="section"
            wrapperTag="div"
            id="discover"
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
            {discoverAnime.map((anime) => {
              return (
                <SwiperSlide key={anime.mal_id}>
                  <AnimeCard anime={anime} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      )}
    </main>
  );
};

export default Discover;
