const Pagination = ({ page, setPage }) => {
  return (
    <div className="flex justify-center items-center gap-6 mt-8">
      
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="
          px-4 py-2 text-sm font-medium rounded-lg
          border border-gray-300 bg-white text-gray-700
          hover:bg-gray-100 transition cursor-pointer
          disabled:opacity-40 disabled:cursor-not-allowed
        "
      >
        ← Prev
      </button>

      <span className="text-sm font-semibold text-white">
        Page{" "}
        <span className="text-gray-900 font-bold border px-2 py-1 bg-white rounded">
          {page}
        </span>
      </span>

      <button
        onClick={() => setPage(page + 1)}
        className="
          px-4 py-2 text-sm font-medium rounded-lg
          border border-gray-300 bg-white text-gray-700
          hover:bg-gray-100 transition cursor-pointer
        "
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;
