import React from "react";
import { useGlobalContext } from "./context";

const SearchForm = () => {
  const { searchTerm, searchHandler } = useGlobalContext();
  return (
    <form className="search-form" onSubmit={(e) => e.preventDefault()}>
      <h2>Search Hacker News</h2>
      <input
        type="text"
        className="form-input"
        value={searchTerm}
        onChange={(e) => searchHandler(e.target.value)}
      ></input>
    </form>
  );
};

export default SearchForm;
