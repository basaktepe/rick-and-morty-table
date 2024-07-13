import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "./components/Table";
import Pagination from "./components/Pagination";
import Filter from "./components/Filter";
import Navbar from "./components/Navbar";
import CharacterPage from "./components/CharacterPage";

function App() {
  const [posts, setPosts] = useState([]); // Data we fetched from API
  const [filteredPosts, setFilteredPosts] = useState([]); // Filtered data to be displayed
  const [loading, setLoading] = useState(false); // True when waiting for the response from API
  const [error, setError] = useState(null); // Holds error messages
  const [currentPage, setCurrentPage] = useState(1); // Current page initially set to 1
  const [postsPerPage, setPostsPerPage] = useState(4); // Post per page initially set to 4
  const [selectedCharacter, setSelectedCharacter] = useState(null); // Used to show character page
  const [activeFilters, setActiveFilters] = useState({
    Status: [],
    Species: [],
    Gender: [],
    Type: [],
    Origin: [],
    Location: [],
  }); // Active filters applied to the data
  const [isFilterVisible, setIsFilterVisible] = useState(false); // Visible when filter button clicked

  // Fetch all characters from the API
  useEffect(() => {
    const fetchAllCharacters = async () => {
      setLoading(true);
      setError(null);
      const totalCharacters = 826;
      const charactersPerPage = 20; // Number of characters per page from API
      const totalPages = Math.ceil(totalCharacters / charactersPerPage);

      const requests = [];
      for (let i = 1; i <= totalPages; i++) {
        requests.push(
          axios.get(`https://rickandmortyapi.com/api/character?page=${i}`)
        );
      }

      try {
        const responses = await Promise.all(requests);
        const allCharacters = responses.flatMap(
          (response) => response.data.results
        );
        setPosts(allCharacters);
        setFilteredPosts(allCharacters);
      } catch (error) {
        // Error handling
        console.error("Failed to fetch characters", error);
        setError("Failed to fetch characters. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllCharacters();
  }, []);

  // Sets the clicked character
  const handleRowClick = (character) => {
    setSelectedCharacter(character);
  };

  // Scroll to character detail when a character is selected
  useEffect(() => {
    if (selectedCharacter) {
      const characterDetail = document.getElementById("character-detail");
      if (characterDetail) {
        characterDetail.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [selectedCharacter]);

  // Handle page change
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Changes page size and initially sets the current page to 1
  const handlePageSizeChange = (value) => {
    const intValue = parseInt(value, 10);
    if (!isNaN(intValue) && intValue > 0) {
      setPostsPerPage(intValue);
      setCurrentPage(1);
    }
  };

  // Handle filter changes
  const handleFilterChange = (category, value) => {
    setActiveFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      if (newFilters[category].includes(value)) {
        newFilters[category] = newFilters[category].filter(
          (item) => item !== value
        );
      } else {
        newFilters[category].push(value);
      }
      return newFilters;
    });
  };

  // Apply filters to the posts
  useEffect(() => {
    const applyFilters = () => {
      let filtered = posts;
      Object.keys(activeFilters).forEach((category) => {
        if (activeFilters[category].length > 0) {
          filtered = filtered.filter((post) => {
            const postValue =
              category === "Origin" || category === "Location"
                ? post[category.toLowerCase()].name
                : post[category.toLowerCase()];
            return activeFilters[category].includes(postValue);
          });
        }
      });
      setFilteredPosts(filtered);
      setCurrentPage(1);
    };

    applyFilters();
  }, [activeFilters, posts]);

  // Reset all filters
  const resetFilter = () => {
    setActiveFilters({
      Status: [],
      Species: [],
      Gender: [],
      Type: [],
      Origin: [],
      Location: [],
    });
    setFilteredPosts(posts); // Reset to all posts
  };

  // Toggle filter visibility
  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  // Handle save button click and close filter menu
  const handleSaveAndCloseFilter = (newPageSize) => {
    handlePageSizeChange(newPageSize);
    setIsFilterVisible(false); // Hide the filter menu
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="h-screen flex flex-col font-roboto text-stone-700">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <button
          onClick={toggleFilterVisibility}
          className="bg-violet-500 text-white p-2 m-2 rounded-md max-h-10 hover:bg-violet-600 "
        >
          Filter
        </button>
        {isFilterVisible && (
          <Filter
            filteredData={handleFilterChange}
            resetFilter={resetFilter}
            handleSaveAndClose={handleSaveAndCloseFilter}
            pageSize={postsPerPage}
          />
        )}
        <div className="flex-1 overflow-auto p-4">
          {error && <p className="text-red-500">{error}</p>}{" "}
          <Table
            posts={currentPosts}
            loading={loading}
            onRowClick={handleRowClick}
          />
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={filteredPosts.length}
            paginate={paginate}
            currentPage={currentPage}
          />
          {selectedCharacter && (
            <div id="character-detail">
              <CharacterPage character={selectedCharacter} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
