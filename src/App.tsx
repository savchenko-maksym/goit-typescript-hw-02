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
import { Image } from "./types/Image";

function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isError, setIsError] = useState<boolean>(false);
  const [modalImage, setModalImage] = useState<Image | null>(null);
  const galleryRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (!query) return;

    const abortController = new AbortController();

    const getData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchImages(query, page, abortController.signal);
        setImages((prev) => [...prev, ...data.results]);
        setTotalPages(data.total_pages);
      } catch (error: any) {
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

  const handleChangeQuery = (newQuery: string): void => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  const openModal = (image: Image): void => {
    setModalImage(image);
  };

  const closeModal = (): void => {
    setModalImage(null);
  };

  const scrollPage = (): void => {
    const firstImg = galleryRef.current
      ?.firstElementChild as HTMLElement | null;
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
          imageUrl={modalImage.urls.regular ?? ""}
          alt={modalImage.alt_description}
          autorName={modalImage.user?.name ?? "Unknown"}
          instagram={modalImage.user?.instagram_username ?? "N/A"}
        />
      )}
    </div>
  );
}

export default App;
