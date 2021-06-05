import React from 'react';
import './style.css';
import { useHistory } from 'react-router-dom';

const Ad = ({ id, key, category, flowerNameCZ, url }) => {
  let history = useHistory();
  const handleClick = () => {
    history.push(`/detail/${id}`);
  };
  console.log(id);
  return (
    <div className="ad" onClick={handleClick}>
      <div className="ad__picture">
        <img src={url} />
      </div>
      <div className="ad__description">
        <h3 className="ad__name">{flowerNameCZ}</h3>
        <div>. {category}</div>
      </div>
    </div>
  );
};
export default Ad;
