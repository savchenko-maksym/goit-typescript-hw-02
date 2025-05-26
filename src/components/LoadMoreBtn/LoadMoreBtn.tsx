import React from "react";
import s from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  setPage: (page: number) => void;
  page: number;
  scrollPage: () => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({
  setPage,
  page,
  scrollPage,
}) => {
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
