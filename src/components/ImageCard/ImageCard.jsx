import React from "react";
import s from "./ImageCard.module.css";

const ImageCard = ({ img }) => {
  return (
    <div>
      <img
        className={s.galleryImg}
        src={img.urls.small}
        alt={img.alt_description}
      />
    </div>
  );
};

export default ImageCard;
