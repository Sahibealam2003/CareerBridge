const SearchBar = ({ onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const value = e.target.search.value;
    onSearch(value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        name="search"
        placeholder="Search jobs..."
        className="border p-2 w-full bg-white rounded"
      />

      <button className="bg-blue-600 cursor-pointer text-white px-4 rounded">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
