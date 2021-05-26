import React, { useState, useEffect } from 'react';
import './style.css';

import { Router, Route, NavLink, Switch } from 'react-router-dom';
import Ad from '../Ad/index';

const Ads = () => {
  const [ads, setAds] = useState([]);
  /*useEffect(()=>{
    fetch(``)
    .then(response => response.json())
    .then(json=> setAds(json.data));
  }, []);*/
  useEffect(
    () =>
      setAds([
        { flowerName: 'Paprad', src: '/assets/paprad.png' },
        { flowerName: 'Kvet', src: '/assets/paprad.png' },
        { flowerName: 'Kvet 2 ', src: '/assets/paprad.png' },
        { flowerName: 'Kvet 3', src: '/assets/paprad.png' },
      ]),
    [],
  );
  return ads.map((ad) => (
    <Ad key={ad.flowerName} flowerName={ad.flowerName} src={ad.src} />
  ));
};

export default Ads;
