import React, { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import s from "./SearchBar.module.css";
import toast, { Toaster } from "react-hot-toast";

const SearchBar = ({ handleChangeQuery }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query.trim() === "") {
      toast.error("Please enter a search term!");
      return;
    }

    console.log(query);
    handleChangeQuery(query);

    setQuery("");
  };

  return (
    <header className={s.header}>
      <form className={s.headerForm} onSubmit={handleSubmit}>
        <button className={s.headerFormBtn} type="submit">
          <BiSearchAlt2 size="24" />
        </button>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
      <Toaster position="top-center" />
    </header>
  );
};

export default SearchBar;
