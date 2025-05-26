import React from "react";
import s from "./ImageCard.module.css";
import { Image } from "../../types/Image";

interface ImageCardProps {
  img: Image;
}

const ImageCard: React.FC<ImageCardProps> = ({ img }) => {
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
