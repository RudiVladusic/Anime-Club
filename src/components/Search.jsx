const Search = ({ handleSearch, setSearch, search }) => {
  return (
    <form onSubmit={handleSearch}>
      <input
        type="search"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        placeholder={`Search for anime (e.g "death note")`}
      />

      <button>Search</button>
    </form>
  );
};

export default Search;
