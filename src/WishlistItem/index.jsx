import React from 'react';
import './style.css';
import { useHistory } from 'react-router-dom';

const WishlistItem = ({ url, name }) => {
  // let history = useHistory();
  // const handleClick = () => {
  //   history.push(`/detail/${id}`);
  // };

  return (
    <div className="wishlist__item">
      <h3 className="wishlist__name">{name}</h3>
      <img src={url} />
    </div>
  );
};
export default WishlistItem;
