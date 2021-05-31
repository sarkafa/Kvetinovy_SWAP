import React from 'react';
import './style.css';
import { useParams } from 'react-router-dom';

const Ad = ({}) => {
  let { id } = useParams();
  console.log(id);

  return (
    <div className="ad">
      <img src={`/assets/${id}.jpg`} alt="" />
    </div>
  );
};
export default Ad;
