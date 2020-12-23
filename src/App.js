import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from './Searchbar/Searchbar';
import PropTypes from 'prop-types';
import ImageGallery from './ImageGallery/ImageGallery';
import imgAPI from './service/img-api';
import Loader from './Loader/Loader';
import StatusError from './StatusError/StatusError';
import Button from './Button/Button';

export default function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!query) {
      return;
    }

    setStatus('pending');

    imgAPI
      .fetchImages(query, page)
      .then(newImages => {
        setImages(images => [...images, ...newImages.hits]);
        setStatus('resolved');
      })

      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [query, page, images]);

  const onClickLoadMoreBtn = () => {
    setPage(page => page + 1);
  };

  return (
    <div>
      <Searchbar getImg={setQuery} getPage={setPage} />

      {status === 'idle' && <p style={{ textAlign: 'center' }}>Let's Go!</p>}

      {status === 'pending' && <Loader />}

      {status === 'rejected' && (
        <StatusError message={error.message} style={{ textAlign: 'center' }} />
      )}

      {status === 'resolved' && (
        <>
          <ImageGallery images={images} />
          <Button onClick={onClickLoadMoreBtn} />
        </>
      )}
      <ToastContainer autoClose={3000} />
    </div>
  );
}

App.propTypes = {
  imgItem: PropTypes.string,
};
