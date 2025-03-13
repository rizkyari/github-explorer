const SearchBar = ({ query, setQuery, onSearch }: any) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter GitHub username"
        className="w-full p-2 border rounded"
      />
      <button onClick={onSearch} className="w-full bg-blue-500 text-white p-2 mt-2 rounded">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
