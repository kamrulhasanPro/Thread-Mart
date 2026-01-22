import React from "react";
import { FaFilter } from "react-icons/fa";

const SearchFilter = ({
  searchValue,
  setSearchValue,
  filterValue,
  setFilterValue,
  children,
}) => {
  return (
    <>
      {/* search and filter */}
      <div className="flex gap-2 w-full">
        {/* search */}
        <label className="input bg-secondary/50 w-full outline-offset-0 focus-within:outline-primary border-0 transition-all outline-1 outline-primary/10">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            required
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </label>

        {/* status */}
        <label
          className="input bg-secondary/50 outline-offset-0 focus-within:outline-primary border-0 transition-all cursor-pointer pr-0 outline-1 outline-primary/10"
          htmlFor="select"
        >
          <FaFilter />

          <select
            id="select"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            className={`appearance-none w-full  px-2 py-2 outline-none border-none  [&>*]:bg-secondary
             [&>*]:text-white`}
          >
            {children}
          </select>
        </label>
      </div>
    </>
  );
};

export default SearchFilter;
