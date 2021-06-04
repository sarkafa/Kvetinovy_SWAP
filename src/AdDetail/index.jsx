import React, { useState } from 'react';
import './style.css';
import { useParams } from 'react-router-dom';

const Ad = ({}) => {
  let { id } = useParams();
  console.log(id);
  const [detail, setDetail] = useState(null);
  /*useEffect(() => {
    fetch(`https://id=${id}`)
      .then((response) => response.json())
      .then((json) => setDetail(json.data));
  }, []);*/

  return (
    <div className="ad__detail">
      <img src={`/assets/${id}.jpg`} alt="" />
      <div className="ad__detail--info">
        <h1>{detail !== null ? detail.flowerNameCZ : 'Nadpis'}</h1>
        <h3>{detail !== null ? detail.category : 'kategoria'}</h3>
        <p>{detail !== null ? detail.description : 'popisok'}</p>
        <button
          onClick={() => {
            console.log('navrh vymeny');
          }}
        >
          Navrhni výmenu
        </button>
      </div>
    </div>
  );
};
export default Ad;
