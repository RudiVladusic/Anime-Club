import { Link } from "react-router-dom";
import { useRef, useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import AnimeCard from "./AnimeCard";
import Loading from "./Loading";
import SideScrollContext from "../contexts/SideScrollContext";

const Discover = ({ filterAnime, discoverAnime, isLoading }) => {
  const animeDiscoverCont = useRef(null);
  const [selectValue, setSelectValue] = useState("select");
  const { sideScroll } = useContext(SideScrollContext);
  const getRandomGenre = (min, max, exclude) => {
    let calc = Math.floor(Math.random() * (max - min) + min);
    if (calc === exclude || calc === 33 || calc === 34) {
      calc = calc + 2;
    }
    return calc;
  };

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
          filterAnime(e.target.value).catch((err) => {
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

      {isLoading && discoverAnime.length === 0 && <Loading />}

      {!isLoading && discoverAnime.length > 0 && (
        <div className="control-cont">
          <div className="discover-content__cont" ref={animeDiscoverCont}>
            {discoverAnime.map((anime) => {
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
              sideScroll(animeDiscoverCont.current, 10, 450, -25);
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button
            className="control-cont__right"
            onClick={() => {
              sideScroll(animeDiscoverCont.current, 10, 450, 25);
            }}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      )}
    </main>
  );
};

export default Discover;
