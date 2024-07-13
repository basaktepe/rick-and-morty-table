import React, { useState } from "react";

function Pagination({ postsPerPage, totalPosts, paginate, currentPage }) {
  const [pageInput, setPageInput] = useState(""); // Input state for page number

  // Calculate the total number of pages
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Calculate the range of visible page numbers
  const maxPageNumbers = 10;
  let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
  let endPage = startPage + maxPageNumbers - 1;

  if (endPage > pageNumbers.length) {
    endPage = pageNumbers.length;
    startPage = Math.max(1, endPage - maxPageNumbers + 1);
  }

  const visiblePageNumbers = pageNumbers.slice(startPage - 1, endPage);

  // Handle input change for page number
  const handlePageInput = (e) => {
    setPageInput(e.target.value);
  };

  // Handle form submission for page number input
  const handlePageSubmit = (e) => {
    e.preventDefault();
    const pageNumber = parseInt(pageInput, 10);
    if (
      !isNaN(pageNumber) &&
      pageNumber >= 1 &&
      pageNumber <= pageNumbers.length
    ) {
      paginate(pageNumber);
    }
    setPageInput(""); // Reset input field
  };

  return (
    <nav className="flex flex-col items-center space-y-4 mt-6">
      <ul className="pagination flex flex-wrap gap-x-2 justify-center items-center">
        {currentPage > 1 && (
          <li className="page-item">
            <button
              onClick={() => paginate(currentPage - 1)}
              className="page-link w-full h-full block border border-gray-300 rounded-md px-3 py-1 hover:bg-gray-200"
            >
              Previous
            </button>
          </li>
        )}
        {visiblePageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${
              number === currentPage
                ? "bg-violet-500 text-white"
                : "border border-gray-300 rounded-md"
            }`}
          >
            <button
              onClick={() => paginate(number)}
              className="page-link w-full h-full block px-3 py-1 hover:bg-gray-200"
            >
              {number}
            </button>
          </li>
        ))}
        {currentPage < pageNumbers.length && (
          <li className="page-item">
            <button
              onClick={() => paginate(currentPage + 1)}
              className="page-link w-full h-full block border border-gray-300 rounded-md px-3 py-1 hover:bg-gray-200"
            >
              Next
            </button>
          </li>
        )}
      </ul>
      <form onSubmit={handlePageSubmit} className="flex items-center space-x-2">
        <input
          type="number"
          value={pageInput}
          onChange={handlePageInput}
          className="border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-violet-500"
          placeholder={currentPage}
        />
        <button
          type="submit"
          className="px-3 py-1 rounded-md bg-violet-500 text-white hover:bg-violet-600 focus:outline-none"
        >
          Go
        </button>
      </form>
    </nav>
  );
}

export default Pagination;
