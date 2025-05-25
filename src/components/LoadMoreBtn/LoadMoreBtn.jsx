import React from "react";
import s from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ setPage, page, scrollPage }) => {
  return (
    <button
      className={s.loadMoreBtn}
      onClick={() => {
        setPage(page + 1);
        setTimeout(scrollPage, 300);
      }}
    >
      Load more
    </button>
  );
};

export default LoadMoreBtn;
