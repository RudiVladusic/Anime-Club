import { useContext } from "react";
import SearchDataContext from "../contexts/SearchDataContext";
import { useHistory } from "react-router";
import React from "react";
const Search = React.memo(
  ({
    isSearchOpen,
    isNavOpen,
    setIsNavOpen,
    setIsBurgerOpen,
    setIsSearchOpen,
  }) => {
    let history = useHistory();

    const { search, setSearch, handleSearch } = useContext(SearchDataContext);

    return (
      <form
        className={isSearchOpen ? `search-form searching` : `search-form`}
        onSubmit={(e) => {
          handleSearch(e);
          history.push("/search");
          if (isNavOpen) {
            setIsNavOpen(false);
            setIsBurgerOpen(false);
            setIsSearchOpen(false);
          }
        }}
      >
        <input
          type="search"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder={`Search for anime...`}
        />

        <button>go</button>
      </form>
    );
  }
);

export default Search;
