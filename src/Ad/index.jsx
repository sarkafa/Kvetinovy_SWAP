import React from 'react';
import './style.css';
import { useHistory } from 'react-router-dom';

const Ad = ({ src, flowerName, id }) => {
  let history = useHistory();
  const handleClick = () => {
    history.push(`/detail/${id}`);
  };
  console.log(id);
  return (
    <div className="ad" onClick={handleClick}>
      <img className="ad__picture" src={`/assets/${id}.jpg`} />
      <h3 className="ad__name">{flowerName}</h3>
    </div>
  );
};
export default Ad;
