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
      <main>
        <header className="mainHeader">
          <p>Trending</p>
        </header>

        <div className="controlCont">
          <div className="trendingAnimeCont" ref={trendingAnimeCont}>
            {airingAnime.map((anime) => {
              return (
                <Link key={anime.mal_id} to={`/anime/${anime.mal_id}`}>
                  <AnimeCard anime={anime} />
                </Link>
              );
            })}
          </div>
          <button
            className="controlLeft"
            onClick={() => {
              sideScroll(trendingAnimeCont.current, 10, 450, -25);
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button
            className="controlRight"
            onClick={() => {
              sideScroll(trendingAnimeCont.current, 10, 450, 25);
            }}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>

        <header className="mainHeader">Upcoming </header>

        <div className="controlCont">
          <div className="upcomingAnimeCont" ref={upcomingAnimeCont}>
            {upcomingAnime.map((anime) => {
              return (
                <Link key={anime.mal_id} to={`/anime/${anime.mal_id}`}>
                  <AnimeCard anime={anime} />
                </Link>
              );
            })}
          </div>

          <button
            className="controlLeft"
            onClick={() => {
              sideScroll(upcomingAnimeCont.current, 10, 450, -25);
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button
            className="controlRight"
            onClick={() => {
              sideScroll(upcomingAnimeCont.current, 10, 450, 25);
            }}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
        <header className="mainHeader">Specials </header>
        <div className="controlCont">
          <div className="specialsCont" ref={specialsCont}>
            {specials.map((special) => {
              return (
                <Link key={special.mal_id} to={`/anime/${special.mal_id}`}>
                  <AnimeCard anime={special} />
                </Link>
              );
            })}
          </div>

          <button
            className="controlLeft"
            onClick={() => {
              sideScroll(specialsCont.current, 10, 450, -25);
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button
            className="controlRight"
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
