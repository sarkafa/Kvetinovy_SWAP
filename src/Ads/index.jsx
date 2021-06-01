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
          flowerNameCZ: 'Fíkus',
          flowerNameL: 'Ficus',
          flowerNameC: '',
          src: '/assets/paprad.png',
          id: '1',
          description: 'Kytka je v uzasnem stavu.',
          category: 'Nekvetoucí',
        },
        {
          flowerNameCZ: 'Spící panna',
          flowerNameL: 'Aglaonema commutatum',
          flowerNameC: '',
          src: '/assets/paprad.png',
          id: '2',
          description: 'Kytka je trochu sesla.',
          category: 'Nekvetoucí',
        },
        {
          flowerNameCZ: 'Kávovník',
          flowerNameL: 'Coffea arabica',
          flowerNameC: '',
          src: '/assets/paprad.png',
          id: '3',
          description: 'Kytka je prave rozkvetla. Zkrášlí vám byt.',
          category: 'Nekvetoucí',
        },
        {
          flowerNameCZ: 'Pryšec nádherný',
          flowerNameL: 'Euphorbia pulcherrima',
          flowerNameC: 'Vánoční hvězda',
          src: '/assets/paprad.png',
          id: '4',
          description: 'Kytička náramně nahradí domácího mazlíčka.',
          category: 'Nekvetoucí',
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
              key={ad.id}
              flowerNameCZ={ad.flowerNameCZ}
              flowerNameL={ad.flowerNameL}
              flowerNameC={ad.flowerNameC}
              src={ad.src}
              id={ad.id}
              description={ad.description}
              category={ad.category}
            />
          ))}
        </div>
      </div>
    </>
  );
};
