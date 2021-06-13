import React from 'react';
import './style.css';
import { db, storage } from './../firebase';
import firebase from 'firebase';

const FlowerItem = ({ url, id, flowerNameCZ, category, collection, adID }) => {
  const user = firebase.auth().currentUser;

  const eraseFromFirebase = (event) => {
    event.preventDefault();
    console.log('user', user.uid);
    console.log('id', id);

    db.collection('users')
      .doc(user.uid)
      .collection(collection)
      .doc(id)
      .delete();

    db.collection('ads').doc(adID).delete();
  };

  return (
    <div className="item">
      <div className="item__picture" style={{ backgroundImage: `url(${url})` }}>
        <button className="btn--close" onClick={eraseFromFirebase}>
          X
        </button>
      </div>
      <h3 className="item__name">{flowerNameCZ}</h3>
      <div>{category}</div>
    </div>
  );
};
export default FlowerItem;
