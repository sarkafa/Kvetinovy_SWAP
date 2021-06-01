import React from 'react';
import './style.css';
import { useHistory } from 'react-router-dom';

const Ad = ({
  src,
  id,
  description,
  flowerNameCZ,
  flowerNameL,
  flowerNameC,
}) => {
  let history = useHistory();
  const handleClick = () => {
    history.push(`/detail/${id}`);
  };
  console.log(id);
  return (
    <div className="ad" onClick={handleClick}>
      <div className="ad__picture">
        <img src={`/assets/${id}.jpg`} />
      </div>
      <div className="ad__description">
        <h3 className="ad__name--cz">{flowerNameCZ}</h3>
        <h4 className="ad__name--l">{flowerNameL}</h4>
        <h5 className="ad__name--c">{flowerNameC}</h5>
        <p>{description}</p>
      </div>
    </div>
  );
};
export default Ad;
