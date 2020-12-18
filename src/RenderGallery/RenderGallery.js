import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ImageGallery from '../ImageGallery/ImageGallery';
import imgAPI from '../service/img-api';
import Loader from '../Loader/Loader';
import StatusError from '../StatusError/StatusError';
import Button from '../Button/Button';

export default function RenderGallery({ imgItem }) {
  const [images, setImages] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!imgItem) {
      return;
    }

    setStatus('pending');

    // if (!images) {
    //   setPage(1);
    // }

    imgAPI
      .fetchImages(imgItem, page)
      .then(images => {
        setImages(images);
        setStatus('resolved');
      })

      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [imgItem, page]);

  const onClickLoadMoreBtn = () => {
    setPage(page => page + 1);
  };

  if (status === 'idle') {
    return <p style={{ textAlign: 'center' }}>Let's Go!</p>;
  }

  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'rejected') {
    return (
      <StatusError message={error.message} style={{ textAlign: 'center' }} />
    );
  }

  if (status === 'resolved') {
    return (
      <>
        <ImageGallery images={images.hits} />
        <Button onClick={onClickLoadMoreBtn} />
      </>
    );
  }

  RenderGallery.propTypes = {
    imgItem: PropTypes.string,
  };
}
