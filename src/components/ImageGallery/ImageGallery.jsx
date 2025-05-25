import React, { forwardRef } from "react";
import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";

const ImageGallery = forwardRef(({ images, onImageClick }, ref) => {
  return (
    <ul className={s.imgList} ref={ref}>
      {images.map((img) => (
        <li
          className={s.imgItem}
          key={img.id}
          onClick={() => onImageClick(img)}
        >
          <ImageCard img={img} />
        </li>
      ))}
    </ul>
  );
});

export default ImageGallery;
