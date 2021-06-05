import React, { useState, useEffect } from 'react';
import './style.css';
import { Router, Route, NavLink, Switch } from 'react-router-dom';
import { db, storage } from './../firebase';
import Ad from '../Ad/index';
import { categories } from '.././categories';

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

  useEffect(() => {
    const resetAfterSnapshot = db
      .collection('ads')
      .orderBy('timeStamp', 'desc')
      .onSnapshot((snapshot) => {
        setAds(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
    return resetAfterSnapshot;
  }, []);

  console.log(ads);

  return (
    <>
      <div className="ads">
        <div className="ads__categories">
          <p>Kategorie</p>
          {categories.map((category) => (
            <Categories category={category} key={category} />
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
              flowerNameCZ={ad.nameCZ}
              url={ad.url}
              description={ad.description}
              category={ad.category}
              key={ad.id}
              id={ad.id}
            />
          ))}
        </div>
      </div>
    </>
  );
};
