import { useState } from "react";
import { useGetLandingContent } from "./APIcalls/useLandingContentCall";
import { useMangaCall } from "./APIcalls/useMangaCall";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SearchDataContext from "./contexts/SearchDataContext";
import "./styles/css/style.css";
import Content from "./components/Content";
import AnimeDetail from "./components/AnimeDetail";
import MangaDetail from "./components/MangaDetail";
import Discover from "./components/Discover";
import Nav from "./components/presentational/Nav";
import Footer from "./components/presentational/Footer";
import About from "./components/presentational/About";
import Hero from "./components/presentational/Hero";
import ActorDetail from "./components/ActorDetail";
import ResultBlock from "./components/ResultBlock";
import { searchAnimeCall } from "./APIcalls/searchAnimeCall";

function App() {
  const endpoint = `https://api.jikan.moe/v3/top/anime/1/`;
  const mangaEndpoint = `https://api.jikan.moe/v3/top/manga/1`;
  const { upcomingAnime, airingAnime, specials } =
    useGetLandingContent(endpoint);
  const { manga } = useMangaCall(mangaEndpoint);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [search, setSearch] = useState("");
  const [animeResults, setAnimeResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(false);
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
          <SearchDataContext.Provider
            value={{
              search,
              setSearch,
              animeResults,
              setAnimeResults,
              handleSearch,
              isLoading,
              isError,
            }}
          >
            <Nav />
            <Route exact path="/search">
              <ResultBlock />
            </Route>
          </SearchDataContext.Provider>

          <Route exact path="/">
            <Hero />

            <Content
              upcomingAnime={upcomingAnime}
              airingAnime={airingAnime}
              specials={specials}
              manga={manga}
            />
          </Route>

          <Route exact path="/discover">
            <Discover />
          </Route>

          <Route exact path="/anime/:id">
            <AnimeDetail />
          </Route>
          <Route exact path="/manga/:id">
            <MangaDetail />
          </Route>
          <Route exact path="/anime/cast/:id">
            <ActorDetail setIsLoading={setIsLoading} isLoading={isLoading} />
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
