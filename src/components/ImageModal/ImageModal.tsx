import React from "react";
import Modal from "react-modal";
import s from "./ImageModal.module.css";

Modal.setAppElement("#root");

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  alt: string;
  autorName: string;
  instagram?: string;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  alt,
  autorName,
  instagram,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName={s.overlay}
      className={s.content}
    >
      <div className={s.imageWrapper}>
        <img src={imageUrl} alt={alt} className={s.image} />
        <div className={s.authorInfo}>
          <p>{autorName}</p>
          {instagram && (
            <a
              href={`https://instagram.com/${instagram}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              @{instagram}
            </a>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ImageModal;
