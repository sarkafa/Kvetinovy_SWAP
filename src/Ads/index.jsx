import React, { useState, useEffect } from 'react';
import './style.css';

import { Router, Route, NavLink, Switch } from 'react-router-dom';
import Ad from '../Ad/index';

const categories = ['Kvetoucí', 'Popínavé', 'Sukulenty', 'Řasokoule'];

const Categories = ({ category }) => {
  return (
    <>
      <label className="category__label">
        <input name="category" type="radio" />
        {category}
      </label>
    </>
  );
};

export const Ads = () => {
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

  return (
    <>
      <div className="ads__categories">
        <p>Kategorie</p>
        {categories.map((category) => (
          <Categories category={category} />
        ))}
        <p>Match</p>
        <label class="switch">
          <input type="checkbox" />
          <span class="slider round"></span>
        </label>
      </div>
      <div className="ads__container">
        {ads.map((ad) => (
          <Ad key={ad.flowerName} flowerName={ad.flowerName} src={ad.src} />
        ))}
      </div>
    </>
  );
};
