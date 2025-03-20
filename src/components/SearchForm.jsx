import React from "react";
import { useState } from "react";

export default function SearchForm(props) {
  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSearch(search);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="relative">
        <input
          type="text"
          className="w-[12rem] py-2 pl-4 pr-10 text-gray-500 bg-white border border-[#E46D45] rounded-full focus:outline-none focus:ring-2 focus:ring-[#F34910] focus:border-transparent"
          placeholder="search words"
          value={search}
          onChange={handleSearchChange}
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-0 flex items-center px-8 text-gray-500 rounded-r-full hover:text-blue-500 focus:outline-none"
        >
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}

{
  /*}
    <>
      <form
        onSubmit={handleSubmit}
        className="flex items-center max-w-sm mx-auto"
      >
        <label for="simple-search" className="sr-only">
          Buscar
        </label>
        <div className="relative w-full">
          <input
            type="text"
            id="simple-search"
            className="block w-full h-10 p-4 ps-10 text-sm text-gray-900 rounded-lg ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#c07c53] focus:border-none"
            placeholder={props.placeholder}
            onChange={handleSearchChange}
          />
        </div>
        <button
          type="submit"
          className="p-2.5 ms-2 text-sm font-semibold text-[#efe8db] bg-[#c07c53] hover:bg-[#D68C60] focus:outline-none focus:ring-2 focus:ring-[#c07c53] focus:ring-offset-2 rounded-lg"
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Buscar</span>
        </button>
      </form>
    </>
  );
} */
}
