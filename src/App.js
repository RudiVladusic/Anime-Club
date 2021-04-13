import Search from "./components/Search";
import ResultBlock from "./components/ResultBlock";
import { useState, useEffect } from "react";
import Content from "./components/Content";
import "./styles/css/style.css";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AnimeDetail from "./components/AnimeDetail";
import Footer from "./components/Footer";
import About from "./components/About";
import Discover from "./components/Discover";
import Hero from "./components/Hero";

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
    searchAnime(search);
  };

  const filterAnime = (query) => {
    fetch(`https://api.jikan.moe/v3/genre/anime/${query}/1`)
      .then((res) => res.json())
      .then((res) => setDiscoverAnime(res.anime.slice(0, 20)));
  };

  const searchAnime = (query) => {
    fetch(
      `https://api.jikan.moe/v3/search/anime?q=${query}&page=1&genre_exclude=1&limit=20`
    )
      .then(setIsLoading(true))
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch");
        }
        return res.json();
      })
      .then((res) => {
        setAnimeResults(res.results);
        setIsLoading(false);
        setIsError(false);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
        setIsLoading(false);
      });
  };

  const getUpcomingAnime = () => {
    fetch(`https://api.jikan.moe/v3/top/anime/1/upcoming`)
      .then((res) => res.json())
      .then((res) => setUpcomingAnime(res.top.slice(0, 20)));
  };

  const getTrendingAnime = () => {
    fetch(`https://api.jikan.moe/v3/top/anime/1/airing`)
      .then((res) => res.json())
      .then((res) => setAiringAnime(res.top.slice(0, 20)));
  };

  const getSpecials = () => {
    fetch(`https://api.jikan.moe/v3/top/anime/1/special`)
      .then((res) => res.json())
      .then((res) => setTopSpecials(res.top.slice(0, 20)));
  };

  useEffect(() => {
    getUpcomingAnime();
    getTrendingAnime();
    getSpecials();
  }, []);

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
          <Route exact path="/anime/:id" component={AnimeDetail} />
          <Route exact path="/discover">
            <Discover
              filterAnime={filterAnime}
              discoverAnime={discoverAnime}
              sideScroll={sideScroll}
            />
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
