import { Link } from "react-router-dom";
import { useContext, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import AnimeCard from "./AnimeCard";
import Loading from "./Loading";
import SideScrollContext from "../contexts/SideScrollContext";

const ResultBlock = ({ animeResults, isLoading, isError }) => {
  const animeCont = useRef(null);
  const { sideScroll } = useContext(SideScrollContext);
  return (
    <main className="search-content">
      {isLoading && <Loading />}
      {isError && (
        <header className="error">
          <p>There were no results for that query. Try another one!</p>
        </header>
      )}

      {!isLoading && !isError && animeResults.length > 0 && (
        <div className="control-cont">
          <section className="search-content__cont" ref={animeCont}>
            {animeResults.map((anime) => (
              <Link key={anime.mal_id} to={`/anime/${anime.mal_id}`}>
                <AnimeCard anime={anime} />
              </Link>
            ))}

            <button
              className="control-cont__left"
              onClick={() => {
                sideScroll(animeCont.current, 10, 450, -25);
              }}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <button
              className="control-cont__right"
              onClick={() => {
                sideScroll(animeCont.current, 10, 450, 25);
              }}
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </section>
        </div>
      )}
    </main>
  );
};

export default ResultBlock;
