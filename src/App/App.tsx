import { useEffect, useState } from 'react'
import './App.css'
import { Toaster } from 'react-hot-toast';
import ReactModal from 'react-modal';
import { SearchBar } from '../components/search-bar/SearchBar';
import Loader from '../components/loader/Loader';
import { LoadMoreBtn } from '../components/load-more-btn/LoadMoreBtn';
import { ImageGallery } from '../components/image-gallery/ImageGallery';
import { ImageModal } from '../components/image-modal/ImageModal';
import ErrorMessage from '../components/error-message/ErrorMessage';
import { fetchImages } from '../gallery-api';
import FetchedImage from '../types';
ReactModal.setAppElement('#root');

function App() {

  const [images, setImages] = useState<FetchedImage[]>([]);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<FetchedImage|null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);

  const handleSearch = (newQuery: string):void => {
    setQuery(newQuery);
    setCurrentPage(1);
    setImages([]);
  };

  const handleNextPage = ():void => {
    setCurrentPage(currentPage + 1);
  }

  useEffect(() => {
    if (query === "") {
      return;
    }
    async function fetchData() {
      try {
        setIsError(false);
        setIsloading(true);
        const data = await fetchImages(query, currentPage);
      setImages((prevImages) => {
        return [...prevImages, ...data.results];
      });
        setTotalPages(data.total_pages);
        const noResults = !data || data.total === 0 || data.results.length === 0;
        if (noResults) {
          setIsError(true);
          setImages([]);
          setTotalPages(0);
          return;
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          setIsError(true);
          
    }} finally {
      setIsloading(false);
  }
      
    }
    fetchData();
  }, [query, currentPage]);

  
  const openModal = (image:FetchedImage) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = ():void => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  
  const hasMorePages = currentPage < totalPages;
  const hasImages = images.length > 0;

  return (
    <div>
      <Toaster position="top-right" />
      <SearchBar onSearch={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {hasImages && <ImageGallery items={images} onImageClick={openModal} />}
      {hasImages && !isLoading && hasMorePages && <LoadMoreBtn onPaginate={handleNextPage} />}
      <ImageModal isOpen={isModalOpen} onRequestClose={closeModal} image={selectedImage}/>
    </div>
  )
}

export default App