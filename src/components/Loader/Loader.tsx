import React from "react";
import PropagateLoader from "react-spinners/PropagateLoader";
import s from "./Loader.module.css";

const Loader: React.FC = () => {
  return (
    <div className={s.loader}>
      <PropagateLoader color="rgb(65, 139, 224)" />
    </div>
  );
};

export default Loader;
