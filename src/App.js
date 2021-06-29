import { useState, useEffect } from "react";
import { getLandingContent } from "./APIcalls/landingContentCall";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Search from "./components/Search";
import ResultBlock from "./components/ResultBlock";
import Content from "./components/Content";
import AnimeDetail from "./components/AnimeDetail";
import Discover from "./components/Discover";
import Nav from "./components/presentational/Nav";
import Footer from "./components/presentational/Footer";
import About from "./components/presentational/About";
import Hero from "./components/presentational/Hero";
import "./styles/css/style.css";
import ActorDetail from "./components/ActorDetail";
import LandingDataContext from "./contexts/LandingDataContext";
function App() {
  const [search, setSearch] = useState(String);
  const [animeResults, setAnimeResults] = useState(Array);
  const [upcomingAnime, setUpcomingAnime] = useState(Array);
  const [airingAnime, setAiringAnime] = useState(Array);
  const [isLoading, setIsLoading] = useState(Boolean);
  const [isError, setIsError] = useState(Boolean);
  const [discoverAnime, setDiscoverAnime] = useState(Array);
  const [specials, setTopSpecials] = useState(Array);

  const handleSearch = (e) => {
    e.preventDefault();
    searchAnime(search).catch((err) => {
      console.log(err);
      setIsError(true);
      setIsLoading(false);
    });
  };
  const endpoint = `https://api.jikan.moe/v3/top/anime/1/`;

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
    getLandingContent(`${endpoint}upcoming`).then((result) =>
      setUpcomingAnime(result.top.slice(0, 20))
    );
    getLandingContent(`${endpoint}airing`).then((result) =>
      setAiringAnime(result.top.slice(0, 20))
    );
    getLandingContent(`${endpoint}special`).then((result) =>
      setTopSpecials(result.top.slice(0, 20))
    );
  }, [endpoint]);

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
            <LandingDataContext.Provider
              value={{ upcomingAnime, airingAnime, specials }}
            >
              <Content sideScroll={sideScroll} />
            </LandingDataContext.Provider>
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
