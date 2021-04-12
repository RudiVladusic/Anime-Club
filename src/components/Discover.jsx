import AnimeCard from "./AnimeCard";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";

const Discover = ({ filterAnime, discoverAnime, sideScroll }) => {
  const animeDiscoverCont = useRef(null);
  // x = 12 y = 40
  const [selectValue, setSelectValue] = useState("select");

  const getRandomGenre = (min, max, exclude) => {
    let calc = Math.floor(Math.random() * (max - min) + min);
    if (calc === exclude || calc === 33 || calc === 34) {
      // console.log(calc);
      calc += 2;
      console.log("hit");
    }
    console.log(calc);
    return calc;
  };

  // getRandomGenre(1, 40, 12);

  return (
    <main className="discoverMain">
      <header className="discoverMainHeader">Discover anime</header>
      <select
        id="genreSelect"
        name="Genre"
        defaultValue={selectValue}
        onChange={(e) => {
          filterAnime(e.target.value);
          console.log(e.target.value);
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

      <div className="controlCont">
        <div className="animeDiscoverCont" ref={animeDiscoverCont}>
          {discoverAnime.map((anime) => {
            return (
              <Link key={anime.mal_id} to={`/anime/${anime.mal_id}`}>
                <AnimeCard anime={anime} />
              </Link>
            );
          })}
        </div>

        {discoverAnime.length > 0 ? (
          <>
            <button
              className="controlLeft"
              onClick={() => {
                sideScroll(animeDiscoverCont.current, 10, 450, -25);
              }}
            >
              {"<"}
            </button>
            <button
              className="controlRight"
              onClick={() => {
                sideScroll(animeDiscoverCont.current, 10, 450, 25);
              }}
            >
              {">"}
            </button>
          </>
        ) : (
          ""
        )}
      </div>
    </main>
  );
};

export default Discover;
