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
        {
          flowerName: 'Paprad',
          src: '/assets/paprad.png',
          id: '1',
          description: 'Kytka je v uzasnem stavu.',
        },
        {
          flowerName: 'Kvet',
          src: '/assets/paprad.png',
          id: '2',
          description: 'Kytka je trochu sesla.',
        },
        {
          flowerName: 'Kvet 2 ',
          src: '/assets/paprad.png',
          id: '3',
          description: 'Kytka je prave rozkvetla. Zkrášlí vám byt.',
        },
        {
          flowerName: 'Kvet 3',
          src: '/assets/paprad.png',
          id: '4',
          description: 'Kytička náramně nahradí domácího mazlíčka.',
        },
      ]),
    [],
  );

  return (
    <>
      <div className="ads">
        <div className="ads__categories">
          <p>Kategorie</p>
          {categories.map((category) => (
            <Categories category={category} />
          ))}
          <p>Match</p>
          <label className="switch">
            <input type="checkbox" />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="ads__container">
          {ads.map((ad) => (
            <Ad
              key={ad.flowerName}
              flowerName={ad.flowerName}
              src={ad.src}
              id={ad.id}
              description={ad.description}
            />
          ))}
        </div>
      </div>
    </>
  );
};
