import { useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from '../Searchbar/Searchbar.module.css';

export default function Searchbar({ getImg }) {
  const [image, setImage] = useState('');

  //получение значения input
  const handleNameChange = e => {
    setImage(e.currentTarget.value.toLowerCase());
  };

  //отправка значения из формы
  const handleSubmit = e => {
    e.preventDefault();

    if (image.trim() === '') {
      toast.warn('Fill out the form');
      return;
    }

    getImg(image);
    setImage('');
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.SearchFormButton}>
          <BiSearchAlt style={{ marginRight: 8 }} />
        </button>

        <input
          className={s.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={image}
          onChange={handleNameChange}
        />
      </form>
    </header>
  );
}
