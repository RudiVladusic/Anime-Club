import { Link } from "react-router-dom";
import AnimeCard from "./AnimeCard";
import { useRef } from "react";

const ResultBlock = ({ animeResults, isLoading, isError, sideScroll }) => {
  console.log(animeResults);
  const animeCont = useRef(null);
  return (
    <main className="searchMain">
      {isLoading ? (
        <div className="loading">
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        ""
      )}
      {isError ? (
        <header className="error">
          <p>There was no results for that query. Try another one!</p>
        </header>
      ) : (
        ""
      )}

      {!isLoading && !isError ? (
        <div className="controlCont">
          <section className="animeCont" ref={animeCont}>
            {animeResults.map((anime) => (
              <Link key={anime.mal_id} to={`/anime/${anime.mal_id}`}>
                <AnimeCard anime={anime} />
              </Link>
            ))}

            {animeResults.length > 0 ? (
              <>
                <button
                  className="controlLeft"
                  onClick={() => {
                    sideScroll(animeCont.current, 10, 450, -25);
                  }}
                >
                  {"<"}
                </button>
                <button
                  className="controlRight"
                  onClick={() => {
                    sideScroll(animeCont.current, 10, 450, 25);
                  }}
                >
                  {">"}
                </button>{" "}
              </>
            ) : (
              ""
            )}
          </section>
        </div>
      ) : (
        ""
      )}
    </main>
  );
};

export default ResultBlock;
