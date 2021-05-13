import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

const Search = ({ handleSearch, setSearch, search }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
