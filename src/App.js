import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Search from "./components/Search";
import ResultBlock from "./components/ResultBlock";
import Content from "./components/Content";
import AnimeDetail from "./components/AnimeDetail";
import Discover from "./components/Discover";
// import NotFound from "./components/NotFound";
import Nav from "./components/presentational/Nav";
import Footer from "./components/presentational/Footer";
import About from "./components/presentational/About";
import Hero from "./components/presentational/Hero";
import "./styles/css/style.css";
import ActorDetail from "./components/ActorDetail";
// import LoadingAndErrorContext from "./contexts/LoadingAndErrorContext";

function App() {
  const [search, setSearch] = useState("");
  const [animeResults, setAnimeResults] = useState([]);
  const [upcomingAnime, setUpcomingAnime] = useState([]);
  const [airingAnime, setAiringAnime] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [discoverAnime, setDiscoverAnime] = useState([]);
  const [specials, setTopSpecials] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    searchAnime(search).catch((err) => {
      console.log(err);
      setIsError(true);
      setIsLoading(false);
    });
  };
  const api = `https://api.jikan.moe/v3/top/anime/1/`;

  const filterAnime = async (query) => {
    setIsLoading(true);
    const call = await fetch(`https://api.jikan.moe/v3/genre/anime/${query}/1`);
    const result = await call.json();
    if (!call.ok) {
      throw Error(`Could not fetch`);
    }
    setDiscoverAnime(result.anime.slice(0, 20));
    setIsLoading(false);
  };

  const searchAnime = async (query) => {
    setIsLoading(true);
    setIsError(false);
    const call = await fetch(
      `https://api.jikan.moe/v3/search/anime?q=${query}&page=1&genre_exclude=1&limit=20`
    );
    if (!call.ok) {
      throw Error(`Could not fetch`);
    }
    const result = await call.json();

    setAnimeResults(result.results);
    setIsLoading(false);
  };

  useEffect(() => {
    const getUpcomingAnime = async () => {
      const call = await fetch(`${api}upcoming`);
      const result = await call.json();
      setUpcomingAnime(result.top.slice(0, 20));
    };

    const getTrendingAnime = async () => {
      const call = await fetch(`${api}airing`);
      const result = await call.json();
      setAiringAnime(result.top.slice(0, 20));
    };

    const getSpecials = async () => {
      const call = await fetch(`${api}special`);
      const result = await call.json();
      setTopSpecials(result.top.slice(0, 20));
    };

    getUpcomingAnime();
    getTrendingAnime();
    getSpecials();
  }, [api]);

  const sideScroll = (element, speed, distance, step) => {
    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
      element.scrollLeft += step;
      scrollAmount += Math.abs(step);
      if (scrollAmount >= distance) {
        clearInterval(slideTimer);
      }
    }, speed);
  };

  return (
    <Router>
      <Switch>
        <>
          <Nav />

          <Route exact path="/">
            <Hero />
            <Content
              upcomingAnime={upcomingAnime}
              airingAnime={airingAnime}
              specials={specials}
              sideScroll={sideScroll}
            />
          </Route>
          <Route exact path="/search">
            <Search
              handleSearch={handleSearch}
              setSearch={setSearch}
              search={search}
            />
            <ResultBlock
              animeResults={animeResults}
              isLoading={isLoading}
              isError={isError}
              sideScroll={sideScroll}
            />
          </Route>

          <Route exact path="/discover">
            <Discover
              filterAnime={filterAnime}
              discoverAnime={discoverAnime}
              sideScroll={sideScroll}
              isLoading={isLoading}
              isError={isError}
            />
          </Route>

          <Route exact path="/anime/:id">
            <AnimeDetail />
          </Route>
          <Route exact path="/anime/cast/:id">
            <ActorDetail isLoading={isLoading} setIsLoading={setIsLoading} />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>

          <Footer />
        </>
      </Switch>
    </Router>
  );
}

export default App;
