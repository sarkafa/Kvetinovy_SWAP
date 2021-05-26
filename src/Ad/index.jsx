import React from 'react';
import './style.css';

const Ad = ({ src, flowerName }) => {
  return (
    <div className="ad">
      <img className="ad__picture" src={src} />
      <h3 className="ad__name">{flowerName}</h3>
    </div>
  );
};
export default Ad;
