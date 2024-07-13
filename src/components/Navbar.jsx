import React from "react";
import image from "../assets/Rick_and_Morty.svg.png";

export default function Navbar() {
  return (
    // Navbar container
    <nav className="h-20 bg-gradient-to-r from-violet-500 to-fuchsia-500 w-full">
      <div className="flex items-center justify-between mx-4 md:mx-8 text-lg">
        {/* Logo image */}
        <img className="h-16 mt-2" src={image} alt="Rick and Morty Logo" />
        {/* Title */}
        <h1 className="font-bold text-white text-center">
          Rick and Morty Characters!
        </h1>
      </div>
    </nav>
  );
}
