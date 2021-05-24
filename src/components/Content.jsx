import AnimeCard from "./AnimeCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Content = ({ upcomingAnime, airingAnime, specials, sideScroll }) => {
  const trendingAnimeCont = useRef(null);
  const upcomingAnimeCont = useRef(null);
  const specialsCont = useRef(null);

  return (
    <>
      <main className="main-content">
        <header className="main-content__header">
          <p>Trending</p>
        </header>

        <div className="control-cont">
          <div className="main-content__trending" ref={trendingAnimeCont}>
            {airingAnime.map((anime) => {
              return (
                <Link key={anime.mal_id} to={`/anime/${anime.mal_id}`}>
                  <AnimeCard anime={anime} />
                </Link>
              );
            })}
          </div>
          <button
            className="control-cont__left"
            onClick={() => {
              sideScroll(trendingAnimeCont.current, 10, 450, -25);
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button
            className="control-cont__right"
            onClick={() => {
              sideScroll(trendingAnimeCont.current, 10, 450, 25);
            }}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>

        <header className="main-content__header">Upcoming </header>

        <div className="control-cont">
          <div className="main-content__upcoming" ref={upcomingAnimeCont}>
            {upcomingAnime.map((anime) => {
              return (
                <Link key={anime.mal_id} to={`/anime/${anime.mal_id}`}>
                  <AnimeCard anime={anime} />
                </Link>
              );
            })}
          </div>

          <button
            className="control-cont__left"
            onClick={() => {
              sideScroll(upcomingAnimeCont.current, 10, 450, -25);
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button
            className="control-cont__right"
            onClick={() => {
              sideScroll(upcomingAnimeCont.current, 10, 450, 25);
            }}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
        <header className="main-content__header">Specials </header>
        <div className="control-cont">
          <div className="main-content__specials" ref={specialsCont}>
            {specials.map((special) => {
              return (
                <Link key={special.mal_id} to={`/anime/${special.mal_id}`}>
                  <AnimeCard anime={special} />
                </Link>
              );
            })}
          </div>

          <button
            className="control-cont__left"
            onClick={() => {
              sideScroll(specialsCont.current, 10, 450, -25);
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button
            className="control-cont__right"
            onClick={() => {
              sideScroll(specialsCont.current, 10, 450, 25);
            }}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </main>
    </>
  );
};

export default Content;
