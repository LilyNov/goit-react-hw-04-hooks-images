import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from './Searchbar/Searchbar';
import RenderGallery from './RenderGallery/RenderGallery';

export default function App() {
  const [image, setImage] = useState('');

  return (
    <div>
      <Searchbar getImg={setImage} />
      <RenderGallery imgItem={image} />
      <ToastContainer autoClose={3000} />
    </div>
  );
}
