import { useState } from "react";
import { useGetLandingContent } from "./APIcalls/useLandingContentCall";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { searchAnimeCall } from "./APIcalls/searchAnimeCall";
import LandingDataContext from "./contexts/LandingDataContext";
import SideScrollContext from "./contexts/SideScrollContext";
import LoadingAndErrorContext from "./contexts/LoadingAndErrorContext";
import { sideScroll } from "./functions/sideScroll";
import "./styles/css/style.css";
import Search from "./components/Search";
import ResultBlock from "./components/ResultBlock";
import Content from "./components/Content";
import AnimeDetail from "./components/AnimeDetail";
import Discover from "./components/Discover";
import Nav from "./components/presentational/Nav";
import Footer from "./components/presentational/Footer";
import About from "./components/presentational/About";
import Hero from "./components/presentational/Hero";
import ActorDetail from "./components/ActorDetail";

function App() {
  const [search, setSearch] = useState(String);
  const [animeResults, setAnimeResults] = useState(Array);
  const [isLoading, setIsLoading] = useState(Boolean);
  const [isError, setIsError] = useState(Boolean);

  const endpoint = `https://api.jikan.moe/v3/top/anime/1/`;
  const { upcomingAnime, airingAnime, specials } =
    useGetLandingContent(endpoint);

  const handleSearch = (e) => {
    e.preventDefault();
    setIsLoading(true);
    searchAnimeCall(search)
      .then((data) => {
        setAnimeResults(data.results);
        setIsError(false);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
        setIsLoading(false);
      });
  };

  return (
    <Router>
      <Switch>
        <>
          <Nav />

          <Route exact path="/">
            <Hero />
            <SideScrollContext.Provider value={{ sideScroll }}>
              <LandingDataContext.Provider
                value={{ upcomingAnime, airingAnime, specials }}
              >
                <Content />
              </LandingDataContext.Provider>
            </SideScrollContext.Provider>
          </Route>
          <Route exact path="/search">
            <Search
              handleSearch={handleSearch}
              setSearch={setSearch}
              search={search}
            />
            <LoadingAndErrorContext.Provider value={{ isLoading, isError }}>
              <SideScrollContext.Provider value={{ sideScroll }}>
                <ResultBlock animeResults={animeResults} />
              </SideScrollContext.Provider>
            </LoadingAndErrorContext.Provider>
          </Route>

          <Route exact path="/discover">
            <SideScrollContext.Provider value={{ sideScroll }}>
              <LoadingAndErrorContext.Provider
                value={{ isLoading, isError, setIsLoading }}
              >
                <Discover />
              </LoadingAndErrorContext.Provider>
            </SideScrollContext.Provider>
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
