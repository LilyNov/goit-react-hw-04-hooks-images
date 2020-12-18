import { Component } from 'react';
import PropTypes from 'prop-types';
import s from '../ImageGalleryItem/ImageGalleryItem.module.css';
import Modal from '../Modal/Modal';

export default class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  static propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { showModal } = this.state;
    const { src, alt, modalImg } = this.props;
    return (
      <li className={s.ImageGalleryItem}>
        <img
          onClick={this.toggleModal}
          src={src}
          alt={alt}
          className={s.ImageGalleryItemImage}
        />
        {showModal && (
          <Modal onClose={this.toggleModal} src={modalImg} alt={alt} />
        )}
      </li>
    );
  }
}
