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
  const [index1, setIndex1] = useState(0);
  let { id } = useParams();
  const [isSelected, setIsSelected] = useState('');

  const user = firebase.auth().currentUser;

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

          userList.push({ ...doc.data(), id: doc.id });
        });
        setUserWishlist(userList);
      });
  }, []);

  console.log(`index1`, index1);

  console.log(`size: `, userWishlist.length);
  console.log(userWishlist);

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
                className="btn__swap"
                onClick={() => {
                  setSwap(true);
                }}
              >
                Nabídni kytku
              </button>
            )}

            {swap === true && (
              <>
                <div className="carousel">
                  <button
                    className="carousel__predchozi"
                    aria-label="předchozí"
                    onClick={() => {
                      setIndex1(
                        index1 === 0 ? userWishlist.length - 1 : index1 - 1,
                      );
                    }}
                  >
                    ←
                  </button>
                  <div className="carousel__media">
                    <img
                      className={`carousel__image ${
                        isSelected === userWishlist[index1].url
                      }`}
                      src={userWishlist[index1].url}
                      alt=""
                      onClick={() => {
                        setIsSelected(userWishlist[index1].id);
                      }}
                    />
                    <img
                      className={`carousel__image ${
                        isSelected ===
                        userWishlist[
                          `${
                            index1 === userWishlist.length - 1 ? 0 : index1 + 1
                          }`
                        ].id
                          ? 'carousel__image--selected'
                          : ''
                      }`}
                      src={
                        userWishlist[
                          `${
                            index1 === userWishlist.length - 1 ? 0 : index1 + 1
                          }`
                        ].url
                      }
                      alt=""
                      onClick={() => {
                        setIsSelected(
                          userWishlist[
                            `${
                              index1 === userWishlist.length - 1
                                ? 0
                                : index1 + 1
                            }`
                          ].id,
                        );
                      }}
                    />
                  </div>
                  <button
                    className="carousel__dalsi"
                    aria-label="další"
                    onClick={() => {
                      setIndex1(
                        index1 === userWishlist.length - 1 ? 0 : index1 + 1,
                      );
                    }}
                  >
                    →
                  </button>
                </div>
                <button className="btn__swap">Navrhni výmenu</button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default AdDetail;
