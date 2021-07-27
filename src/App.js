import { useState } from "react";
import { useGetLandingContent } from "./APIcalls/useLandingContentCall";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SearchDataContext from "./contexts/SearchDataContext";
import LandingDataContext from "./contexts/LandingDataContext";
import LoadingAndErrorContext from "./contexts/LoadingAndErrorContext";
import "./styles/css/style.css";
import Search from "./components/Search";
import Content from "./components/Content";
import AnimeDetail from "./components/AnimeDetail";
import Discover from "./components/Discover";
import Nav from "./components/presentational/Nav";
import Footer from "./components/presentational/Footer";
import About from "./components/presentational/About";
import Hero from "./components/presentational/Hero";
import ActorDetail from "./components/ActorDetail";

function App() {
  const [isLoading, setIsLoading] = useState(Boolean);
  const [isError, setIsError] = useState(Boolean);
  const [search, setSearch] = useState(String);
  const [animeResults, setAnimeResults] = useState(Array);
  const endpoint = `https://api.jikan.moe/v3/top/anime/1/`;
  const { upcomingAnime, airingAnime, specials } =
    useGetLandingContent(endpoint);

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
              <Content />
            </LandingDataContext.Provider>
          </Route>

          <SearchDataContext.Provider
            value={{ search, setSearch, animeResults, setAnimeResults }}
          >
            <LoadingAndErrorContext.Provider
              value={{ isLoading, isError, setIsLoading, setIsError }}
            >
              <Route exact path="/search">
                <Search />
              </Route>
            </LoadingAndErrorContext.Provider>
          </SearchDataContext.Provider>

          <Route exact path="/discover">
            <LoadingAndErrorContext.Provider
              value={{ isLoading, isError, setIsLoading }}
            >
              <Discover />
            </LoadingAndErrorContext.Provider>
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
