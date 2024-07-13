import React, { useState } from "react";

export default function Filter({
  filteredData,
  resetFilter,
  handleSaveAndClose,
  pageSize,
}) {
  const [selectedFilterCategory, setSelectedFilterCategory] = useState(null); // Selected filter category state
  const [tempPageSize, setTempPageSize] = useState(pageSize); // Temporary page size state

  // Filter options for different categories
  const filters = {
    Status: ["Dead", "Alive", "unknown"],
    Species: [
      "Human",
      "Alien",
      "Humanoid",
      "Poopybutthole",
      "Mythological",
      "Unknown",
      "Animal",
      "Disease",
      "Robot",
      "Cronenberg",
      "Planet",
    ],
    Gender: ["Male", "Female", "Genderless", "unknown"],
    Type: [
      "Genetic experiment",
      "Superhuman",
      "Parasite",
      "unknown",
      "Hivemind",
      "Cronenberg",
      "Robot",
      "Alien",
    ],
    Origin: [
      "Earth (C-137)",
      "Earth (Replacement Dimension)",
      "unknown",
      "Abadango",
      "Anatomy Park",
      "Worldender's lair",
      "Bird World",
    ],
    Location: [
      "Earth (C-137)",
      "Earth (Replacement Dimension)",
      "unknown",
      "Citadel of Ricks",
      "Abadango",
      "Anatomy Park",
      "Worldender's lair",
      "Bird World",
    ],
  };

  // Handle click on filter category
  const handleCategoryClick = (category) => {
    setSelectedFilterCategory(category);
  };

  // Handle click on filter option
  const handleFilterClick = (category, option) => {
    filteredData(category, option);
  };

  // Handle input change for page size
  const handleInputChange = (event) => {
    setTempPageSize(event.target.value);
  };

  // Handle save button click and close filter menu
  const handleSaveAndCloseClick = () => {
    handleSaveAndClose(tempPageSize);
  };

  return (
    <div className="w-full md:w-64 lg:w-72 min-w-[200px] h-full overflow-y-auto bg-white p-4 border-r-2 border-violet-500 shadow-lg absolute z-10">
      <h2 className="text-center font-bold">Filter</h2>
      <div className="mt-4 mb-4 grid grid-cols-2 gap-2 md:flex md:flex-wrap">
        {Object.keys(filters).map((filterCategory) => (
          <button
            className={`p-2 mb-2 border rounded-md border-green-500 hover:bg-green-600 ${
              selectedFilterCategory === filterCategory ? "bg-gray-300" : ""
            }`}
            onClick={() => handleCategoryClick(filterCategory)}
            key={filterCategory}
          >
            {filterCategory}
          </button>
        ))}
      </div>
      {selectedFilterCategory && (
        <div>
          {filters[selectedFilterCategory].map((option) => (
            <button
              className="mb-2 p-1 rounded-md hover:bg-slate-400 block"
              onClick={() => handleFilterClick(selectedFilterCategory, option)}
              key={option}
            >
              {option}
            </button>
          ))}
        </div>
      )}
      <button
        className="mt-4 p-2 rounded-md bg-violet-500 text-white hover:bg-violet-600"
        onClick={resetFilter}
      >
        Reset Filter
      </button>
      <div className="mt-4">
        <p>Current Page Size : {pageSize}</p>

        <input
          type="number"
          id="pageSize"
          value={tempPageSize}
          onChange={handleInputChange}
          className="border rounded p-2 w-full focus:bg-slate-200"
        />
        <button
          className="mt-4 py-2 px-4 rounded-md bg-violet-500 text-white text-center flex justify-center mx-auto hover:bg-violet-600"
          onClick={handleSaveAndCloseClick}
        >
          Kaydet
        </button>
      </div>
    </div>
  );
}
