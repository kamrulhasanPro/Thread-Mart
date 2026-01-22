import React from "react";

const Sorting = ({ sortValue, setSortValue }) => {
  return (
    <>
      <form className="filter group flex flex-nowrap">
        <input
          className="btn btn-square btn-secondary border-0 bg-secondary/50 outline-offset-0 outline-1 outline-primary/10 focus-within:outline-primary hidden  group-has-[input:checked]:block "
          type="reset"
          value="×"
          checked={sortValue === ""}
          onClick={() => setSortValue("")}
        />
        <input
          className="btn btn-secondary border-0 bg-secondary/50 outline-offset-0 outline-1 outline-primary/10 focus-within:outline-primary"
          type="radio"
          name="sorting"
          aria-label="Latest"
          value={"latest"}
          checked={sortValue === "latest"}
          onChange={(e) => setSortValue(e.target.value)}
        />

        <input
          className="btn btn-secondary border-0 bg-secondary/50 outline-offset-0 outline-1 outline-primary/10 focus-within:outline-primary"
          type="radio"
          name="sorting"
          aria-label="Oldest"
          value={"oldest"}
          checked={sortValue === "oldest"}
          onChange={(e) => setSortValue(e.target.value)}
        />
      </form>
    </>
  );
};

export default Sorting;
