import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { fetchImages } from "./components/services/api";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import SearchBar from "./components/SearchBar/SearchBar";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import toast from "react-hot-toast";
import ImageModal from "./components/ImageModal/ImageModal";

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [isError, setIsError] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const galleryRef = useRef(null);

  useEffect(() => {
    if (!query) return;

    const abortController = new AbortController();

    const getData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchImages(query, page, abortController.signal);
        setImages((prev) => [...prev, ...data.results]);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.log(error);
        if (error.code !== "ERR_CANCELED") {
          setIsError(true);
          toast.error("Try again later");
        }
      } finally {
        setIsLoading(false);
      }
    };
    getData();
    return () => {
      abortController.abort();
    };
  }, [query, page]);

  const handleChangeQuery = (newQuery) => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  const openModal = (image) => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  const scrollPage = () => {
    const firstImg = galleryRef.current?.firstElementChild;
    if (firstImg) {
      const { height } = firstImg.getBoundingClientRect();
      window.scrollBy({
        top: height * 3 + 55,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <div>
      <SearchBar handleChangeQuery={handleChangeQuery} />
      <ImageGallery images={images} onImageClick={openModal} ref={galleryRef} />
      {isLoading && <Loader />}
      {page < totalPages && !isLoading && (
        <LoadMoreBtn page={page} setPage={setPage} scrollPage={scrollPage} />
      )}
      {isError && <ErrorMessage />}
      {modalImage && (
        <ImageModal
          isOpen={!!modalImage}
          onClose={closeModal}
          imageUrl={modalImage.urls.regular}
          alt={modalImage.urls.alt_description}
          autorName={modalImage.user.name}
          instagram={modalImage.user.instagram_username}
        />
      )}
    </div>
  );
}

export default App;
