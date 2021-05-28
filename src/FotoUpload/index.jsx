import React, { useState } from 'react';
import { storage } from '../firebase';

const FotoUpload = () => {
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    if (e.target.files[0]) {
    }
  };

  const handleUpload = () => {};

  return (
    <>
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}></button>
    </>
  );
};

export default FotoUpload;
