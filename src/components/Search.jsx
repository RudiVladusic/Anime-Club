import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useContext } from "react";
import { searchAnimeCall } from "../APIcalls/searchAnimeCall";
import SearchDataContext from "../contexts/SearchDataContext";
import LoadingAndErrorContext from "../contexts/LoadingAndErrorContext";
const Search = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { search, setSearch, setAnimeResults } = useContext(SearchDataContext);
  const { setIsError, setIsLoading } = useContext(LoadingAndErrorContext);

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
    <form onSubmit={handleSearch}>
      <input
        type="search"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        placeholder={`Search for anime...`}
      />

      <button>
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </form>
  );
};

export default Search;
