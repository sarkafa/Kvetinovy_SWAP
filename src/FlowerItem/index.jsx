import React from 'react';
import './style.css';

const FlowerItem = ({ url, id, description, flowerNameCZ, category }) => {
  return (
    <div className="item">
      <div className="item__picture">
        <img src={url} />
      </div>
      <h3 className="item__name">{flowerNameCZ}</h3>
      <div>{category}</div>
    </div>
  );
};
export default FlowerItem;
