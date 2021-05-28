import React, { useState } from 'react';
import './style.css';

import { db } from './../firebase';

import { Router, Route, NavLink, Switch } from 'react-router-dom';

const Wishlist = () => {
  const handleClick = () => {
    db.collection('cities')
      .doc('LA')
      .set({
        name: 'Los Angeles',
        state: 'CA',
        country: 'USA',
      })
      .then(() => {
        console.log('Document successfully written!');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });

    console.log('zaznam pridan');
  };
  return <button onClick={handleClick}>Pridej zaznam do db</button>;
};

export default Wishlist;
