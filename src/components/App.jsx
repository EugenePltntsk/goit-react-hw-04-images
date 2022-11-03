import { searchImages } from 'Helpers/API';
import { useEffect, useState } from 'react';
import { ImageGallery } from './ImageGallery';
import { Modal } from './Modal';
import { Searchbar } from './Searchbar';
import css from './App.module.css';
import { Button } from './Button';

export const App = () => {
  const [imageName, setImageName] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [largeImage, setlargeImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (imageName === '') return;

    setIsLoading(true);
    async function getdata() {
      try {
        const { hits } = await searchImages(imageName, page);
        setImages(prev => [...prev, ...hits]);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
        console.log(error.message);
      }
    }
    getdata();
  }, [imageName, page]);

  const getLargeImage = event => {
    setlargeImage(event.target.dataset.image);
  };

  const closeModal = event => {
    if (event?.target === event?.currentTarget || event.key === 'Escape') {
      setlargeImage('');
    }
  };

  const changePage = () => {
    setPage(prev => prev + 1);
  };

  const saveDataToState = query => {
    setImageName(query);
    setPage(1);
    setImages([]);
  };

  return (
    <div className={css.App}>
      <Searchbar isLoading={isLoading} saveDataToState={saveDataToState} />

      <ImageGallery getLargeImage={getLargeImage} images={images} />
      {images.length !== 0 && <Button changePage={changePage} />}
      {largeImage && <Modal closeModal={closeModal} src={largeImage} />}
    </div>
  );
};
