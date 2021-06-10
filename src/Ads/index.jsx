//@ts-check

import React, { useState, useEffect } from 'react';
import './style.css';
import { Router, Route, NavLink, Switch } from 'react-router-dom';
import { db, storage } from './../firebase';
import Ad from '../Ad/index';
import { categories } from '.././categories';
import firebase from 'firebase';
import { MyFlowers } from '../MyFlowers';

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
  const [match, setMatch] = useState(false);
  const [mergedUsers, setMergedUsers] = useState([]);
  const [myWishlist, setMyWishlist] = useState([]);

  const user = firebase.auth().currentUser;

  const promiseWishlist = db
    .collection('users')
    .doc(user.uid)
    .collection('wishlist')
    .orderBy('timeStamp', 'desc')
    .get();

  const promiseMyFlowers = db
    .collection('users')
    .doc(user.uid)
    .collection('myFlowers')
    .orderBy('timeStamp', 'desc')
    .get();

  const promiseUsers = db
    .collection('users') // promise
    .get(); // promise

  useEffect(() => {
    Promise.all([promiseWishlist, promiseMyFlowers, promiseUsers])
      .then(([wishlistFS, myFlowersFS, usersFS]) => {
        //userWishlist
        const wishlist = wishlistFS.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        const wishlistNames = wishlist.map((wishlist) => wishlist.nameCZ);

        //userMyFlowers
        const myFlowers = myFlowersFS.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        const myFlowerstNames = myFlowers.map((flower) => flower.nameCZ);

        //users
        const userList = usersFS.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setMyWishlist(wishlistNames);

        return {
          wishlist,
          myFlowers,
          wishlistNames,
          myFlowerstNames,
          userList,
        };
      })
      .then((userData) => {
        //getmatched - their flowers are in my wishlist

        const leftSelector = db
          .collectionGroup('myFlowers')
          .where('user', '!=', user.uid)
          .where('nameCZ', 'in', userData.wishlistNames)
          .get();

        const rightSelector = db
          .collectionGroup('wishlist')
          .where('user', '!=', user.uid)
          .where('nameCZ', 'in', userData.myFlowerstNames)
          .get();

        return Promise.all([leftSelector, rightSelector]);
      })
      .then(([left, right]) => {
        const leftUsersList = left.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        const leftMergedUsersID = leftUsersList.map((user) => user.user);

        const rightUsersList = right.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        const rightMergedUsersID = rightUsersList.map((user) => user.user);

        //GET MATCHED USERS FINAL

        const mergedUsers = leftMergedUsersID.concat(rightMergedUsersID);
        const mergedUsersUniqueList = [];

        mergedUsers.forEach((user) => {
          if (
            leftMergedUsersID.includes(user) &&
            rightMergedUsersID.includes(user) &&
            !mergedUsersUniqueList.includes(user)
          ) {
            mergedUsersUniqueList.push(user);
          }
        });
        // setMergedUsersUnique(mergedUsersUniqueList);

        setMergedUsers(mergedUsersUniqueList);
      });
  }, []);

  //ADS CATEGORY and match
  useEffect(() => {
    let resetAfterSnapshot = db.collection('ads');
    resetAfterSnapshot = resetAfterSnapshot.where('user', '!=', user.uid);
    if (categoryValue !== null) {
      resetAfterSnapshot = resetAfterSnapshot.where(
        'category',
        '==',
        categoryValue,
      );
    }

    if (match && myWishlist.length === 0 && mergedUsers.length === 0) {
      return setAds([]);
    }

    if (match && myWishlist.length > 0 && mergedUsers.length > 0) {
      resetAfterSnapshot = resetAfterSnapshot.where('user', 'in', mergedUsers);
    }

    resetAfterSnapshot = resetAfterSnapshot
      .orderBy('user')
      .orderBy('timeStamp', 'desc')
      .onSnapshot((snapshot) => {
        let adsData = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        if (match && myWishlist.length > 0 && mergedUsers.length > 0) {
          adsData = adsData.filter((doc) => myWishlist.includes(doc.nameCZ));
        }

        setAds(adsData);
      });

    return resetAfterSnapshot;
  }, [categoryValue, match, myWishlist, mergedUsers]);

  //SWAP MATCH MAIN

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
            <input
              type="checkbox"
              onClick={() => setMatch(match ? false : true)}
            />
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
