import React, { useState } from "react";
import Caret from "./Icons/Caret";

function Table({ posts, loading, onRowClick }) {
  const [sort, setSort] = useState({ keyToSort: "name", direction: "asc" });

  if (loading) {
    return <p>Loading...</p>;
  }

  let headers = [
    "Name",
    "Status",
    "Species",
    "Type",
    "Gender",
    "Origin",
    "Location",
    "Image",
  ];

  function handleHeaderClick(header) {
    const lowerCaseHeader = header.toLowerCase();
    setSort((prevSort) => ({
      keyToSort: lowerCaseHeader,
      direction:
        lowerCaseHeader === prevSort.keyToSort
          ? prevSort.direction === "asc"
            ? "desc"
            : "asc"
          : "asc",
    }));
  }

  function getSortedArray(arrayToSort) {
    return arrayToSort.sort((a, b) => {
      if (sort.direction === "asc") {
        return a[sort.keyToSort] > b[sort.keyToSort] ? 1 : -1;
      } else {
        return a[sort.keyToSort] > b[sort.keyToSort] ? -1 : 1;
      }
    });
  }

  if (posts.length === 0) {
    return <p>We couldn't find the character matching your search criteria.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table-auto border-2 border-gray-500 mx-auto mb-2 mt-10 w-full shadow-slate-400 shadow-md">
        <thead>
          <tr className="border-2 border-gray-300">
            {headers.map((header) => (
              <th key={header} onClick={() => handleHeaderClick(header)}>
                <div className="flex items-center p-2">
                  <span>{header}</span>
                  {sort.keyToSort === header.toLowerCase() && (
                    <Caret
                      direction={
                        sort.keyToSort === header.toLowerCase()
                          ? sort.direction
                          : "asc"
                      }
                    />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {getSortedArray(posts).map((post) => (
            <tr
              className="border-2 border-gray-200 h-16 cursor-pointer hover:bg-slate-200"
              key={`post${post.id}`}
              onClick={() => onRowClick(post)}
            >
              {headers.map((header) => {
                const lowerCaseHeader = header.toLowerCase();
                return (
                  <td
                    className={`p-2 ${
                      header === "Image" ? "max-w-16" : undefined
                    }`}
                    key={header}
                  >
                    {header !== "Image" ? (
                      lowerCaseHeader === "origin" ||
                      lowerCaseHeader === "location" ? (
                        post[lowerCaseHeader].name
                      ) : (
                        post[lowerCaseHeader]
                      )
                    ) : (
                      <img src={post.image} alt={post.name} />
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
