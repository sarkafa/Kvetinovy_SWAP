import React, { useState, useEffect } from 'react';
import './style.css';
import { useParams } from 'react-router-dom';
import { db } from './../firebase';
import firebase from 'firebase';
import FlowerItem from '../FlowerItem';

const AdDetail = ({}) => {
  const [detail, setDetail] = useState(null);
  const [swap, setSwap] = useState(false);
  const [userWishlist, setUserWishlist] = useState([]);
  const [index, setIndex] = useState(0);
  let { id } = useParams();
  const user = firebase.auth().currentUser;
  console.log(user.uid);

  useEffect(() => {
    let adDetail = db;
    adDetail = adDetail.collection('ads').doc(id);
    adDetail
      .get()
      .then((doc) => {
        if (doc.exists) {
          setDetail(doc.data());
          console.log('Document data:', doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  }, []);

  useEffect(() => {
    db.collection('users')
      .doc(user.uid)
      .collection('wishlist')
      .get()
      .then((querySnapshot) => {
        let userList = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, ' => ', doc.data());
          userList.push(doc.data());
          console.log('ahoj', [...userWishlist, doc.data()]);
        });
        setUserWishlist(userList);
      });
  }, []);

  console.log(`user wishlist`, userWishlist);

  return (
    <div className="ad__detail">
      {detail !== null && (
        <>
          <img src={detail.url} alt="" />
          <div className="ad__detail--info">
            <h1>{detail !== null ? detail.nameCZ : 'Nadpis'}</h1>
            <h3>{detail !== null ? detail.category : 'kategoria'}</h3>
            <p>{detail !== null ? detail.description : 'popisok'}</p>
            {swap === false && (
              <button
                onClick={() => {
                  console.log('navrh vymeny');
                  setSwap(true);
                }}
              >
                Navrhni výmenu
              </button>
            )}

            {swap === true && (
              <div className="carousel">
                <button
                  className="carousel__predchozi"
                  aria-label="předchozí"
                  onClick={() => setIndex(index === 0 ? 4 : index - 1)}
                ></button>
                <div className="carousel__media">
                  <img
                    className="carousel__image"
                    src={userWishlist[index].url}
                    alt=""
                  />
                </div>
                <button
                  className="carousel__dalsi"
                  aria-label="další"
                  onClick={() => setIndex(index === 4 ? 0 : index + 1)}
                >
                  →
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default AdDetail;
