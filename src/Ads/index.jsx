import React, { useState, useEffect } from 'react';
import './style.css';
import { Router, Route, NavLink, Switch } from 'react-router-dom';
import { db, storage } from './../firebase';
import Ad from '../Ad/index';
import { categories } from '.././categories';

const Categories = ({ category, onClick }) => {
  return (
    <>
      <label className="category__label">
        <input name="category" type="radio" onChange={onClick} />
        {category}
      </label>
    </>
  );
};

export const Ads = () => {
  const [ads, setAds] = useState([]);
  const [categoryValue, setCategoryValue] = useState(null);

  useEffect(() => {
    let resetAfterSnapshot = db.collection('ads');
    if (categoryValue !== null) {
      resetAfterSnapshot = resetAfterSnapshot.where(
        'category',
        '==',
        categoryValue,
      );
    }

    resetAfterSnapshot.orderBy('timeStamp', 'desc').onSnapshot((snapshot) => {
      setAds(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return resetAfterSnapshot;
  }, [categoryValue]);

  return (
    <>
      <div className="ads">
        <div className="ads__categories">
          <p>Kategorie</p>
          <Categories
            category="Všechny"
            onClick={() => {
              setCategoryValue(null);
            }}
          />
          {categories.map((category) => (
            <Categories
              category={category}
              key={category}
              onClick={() => {
                setCategoryValue(category);
              }}
            />
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
              key={ad.nameCZ}
            />
          ))}
        </div>
      </div>
    </>
  );
};
