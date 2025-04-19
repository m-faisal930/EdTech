import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [hidden, setHidden] = useState(true);

  return (
    <nav className="bg-white w-full min-h-20 border-b border-[#d3bdf0]">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 max-md:mt-2 max-md:mb-6">
          <h1 className="text-3xl font-bold">
            <span className="text-[#003060]">Cognit</span>
            <span className="text-yellow-300">ia</span>
          </h1>
        </Link>

        {/* Buttons */}
        <div className="flex md:order-2 space-x-3">
          <Link to="/role-select">
            <button
              type="button"
              className="text-[#003060] border-2 border-[#003060] bg-transparent hover:bg-[#003060] hover:text-white font-medium rounded-lg text-sm px-4 py-1.5 transition"
            >
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button
              type="button"
              className="bg-[#003060] text-white hover:bg-white hover:text-[#003060] border-2 border-[#003060] font-medium rounded-lg text-sm px-4 py-2 transition"
            >
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
