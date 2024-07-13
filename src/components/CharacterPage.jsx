import React from "react";

function CharacterPage({ character }) {
  return (
    // Main container
    <div className="p-4 border-2 rounded-xl border-gray-300 mt-4 bg-gray-100 max-w-4xl mx-auto shadow-lg cursor-pointer text-sky-600">
      {/* Character name */}
      <h3 className="text-2xl font-bold mb-4">{character.name}</h3>
      <div className="flex flex-col md:flex-row gap-4">
        {/* Character image */}
        <img
          src={character.image}
          alt={character.name}
          className="w-32 h-32 md:w-48 md:h-48 rounded-full mx-auto md:mx-0"
        />
        <div className="font-bold">
          {/* Character details */}
          <p>{`Status: ${character.status}`}</p>
          <p>{`Type: ${character.type}`}</p>
          <p>{`Gender: ${character.gender}`}</p>
          <p>{`Origin Location: ${character.origin.name}`}</p>
          <p>{`Last Location: ${character.location.name}`}</p>
        </div>
      </div>

      {/* Episodes list */}
      <h3 className="mt-4 underline text-lg text-center">Episodes</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
        {character.episode.map((episode, index) => {
          const episodeNumber = episode.split("/").pop(); // Extract episode number from URL
          return (
            <a
              key={index}
              href={episode}
              className="block text-gray-500 hover:text-blue-400 text-center"
            >
              {`Episode ${episodeNumber}`}
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default CharacterPage;
