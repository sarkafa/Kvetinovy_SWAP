import React from 'react';
import './style.css';

const MyFlowerItem = ({
  url,
  id,
  description,
  flowerNameCZ,
  flowerNameL,
  flowerNameC,
  categorz,
}) => {
  return (
    <div className="ad">
      <div className="ad__picture">
        <img src={url} />
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
export default MyFlowerItem;
