import React, { useState, useEffect } from 'react';
import './style.css';
import { useParams } from 'react-router-dom';
import { db, realtime, auth } from '../firebase';
import firebase from 'firebase';
import FlowerItem from '../FlowerItem';

const AdDetail = ({}) => {
  const [detail, setDetail] = useState(null);
  const [swap, setSwap] = useState(false);
  const [myFlowers, setMyFlowers] = useState([]);
  const [index1, setIndex1] = useState(0);
  let { id } = useParams();
  const [isSelected, setIsSelected] = useState('');
  const [isSwap, setIsSwap] = useState(false);
  const [userWishlist, setUserWishlist] = useState([]);
  const [forSwap, setForSwap] = useState([]);
  const [sendSwap, setSendSwap] = useState(false);
  const user = firebase.auth().currentUser;

  const [signedUser, setSignedUser] = useState(null);
  auth.onAuthStateChanged(function (user) {
    if (user) {
      setSignedUser(user);
      console.log(signedUser);
    }
  });

  useEffect(() => {
    let adDetail = db;
    adDetail = adDetail.collection('ads').doc(id);
    adDetail
      .get()
      .then((doc) => {
        if (doc.exists) {
          setDetail(doc.data());
          console.log('Document data:', doc.data());
          loadUserWishlist(doc.data());
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
      .collection('myFlowers')
      .get()
      .then((querySnapshot) => {
        let userList = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots

          userList.push({ ...doc.data(), id: doc.id });
        });
        setMyFlowers(userList);
      });
  }, []);

  const loadUserWishlist = (detail) => {
    db.collection('users')
      .doc(detail.user)
      .collection('wishlist')
      .get()
      .then((querySnapshot) => {
        console.log(`userwishlist1`, querySnapshot);
        let userWishlistList = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots

          userWishlistList.push({ ...doc.data(), id: doc.id });
        });
        setUserWishlist(userWishlistList);
      });
  };

  userWishlist;

  const handleClick = () => {
    realtime
      .ref('swaps/' + detail.user)
      .push()
      .set({
        swapperID: signedUser.email,
        adFlower: detail,
        offeredFlower: myFlowers.find((flower) => flower.id === isSelected),
      });
    setSendSwap(true);
  };

  console.log(`index1`, index1);
  console.log(`size: `, myFlowers.length);
  console.log(myFlowers);

  return (
    <div className="ad__detail">
      {detail !== null && (
        <>
          <div className="img__container">
            <div className="responsive__small">
              <h1>{detail !== null ? detail.nameCZ : 'Nadpis'}</h1>
              <h3>{detail !== null ? detail.category : 'kategoria'}</h3>
              <p>{detail !== null ? detail.description : 'popisok'}</p>
            </div>
            <img src={detail.url} alt="" />
          </div>
          <div className="ad__detail--info">
            <div className="responsive__big">
              <h1>{detail !== null ? detail.nameCZ : 'Nadpis'}</h1>
              <h3>{detail !== null ? detail.category : 'kategoria'}</h3>
              <p>{detail !== null ? detail.description : 'popisok'}</p>
            </div>
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

            {swap === true && myFlowers.length === 0 && (
              <div>
                Nejprve musíš přidat květinu pro swap v sekci Mé květiny.
              </div>
            )}

            {swap === true && myFlowers.length === 1 && (
              <>
                <div
                  className={`carousel__image--one ${
                    isSelected === myFlowers[index1].id
                      ? 'carousel__image--selected'
                      : ''
                  }`}
                  style={{
                    backgroundImage: `url(${myFlowers[index1].url})`,
                  }}
                  onClick={() => {
                    setIsSelected(myFlowers[index1].id);
                  }}
                >
                  {userWishlist.find(
                    (flower) => flower.nameCZ === myFlowers[index1].nameCZ,
                  ) && (
                    <img
                      className="swap__image"
                      src={'/assets/swap.svg'}
                      alt=""
                    />
                  )}
                </div>

                <button className="btn__swap" onClick={handleClick}>
                  {sendSwap
                    ? 'Tvoja kytka sa už teší na nového majiteľa'
                    : 'Navrhni výmenu'}
                </button>
              </>
            )}

            {swap === true && myFlowers.length > 1 && (
              <>
                <div className="carousel">
                  <button
                    className="carousel__predchozi"
                    aria-label="předchozí"
                    onClick={() => {
                      setIndex1(
                        index1 === 0 ? myFlowers.length - 1 : index1 - 1,
                      );
                    }}
                  >
                    ←
                  </button>

                  <div className="carousel__media">
                    <div
                      className={`carousel__image--left ${
                        isSelected === myFlowers[index1].id
                          ? 'carousel__image--selected'
                          : ''
                      }`}
                      style={{
                        backgroundImage: `url(${myFlowers[index1].url})`,
                      }}
                      onClick={() => {
                        setIsSelected(myFlowers[index1].id);
                      }}
                    >
                      {userWishlist.find(
                        (flower) => flower.nameCZ === myFlowers[index1].nameCZ,
                      ) && (
                        <img
                          className="swap__image"
                          src={'/assets/swap.svg'}
                          alt=""
                        />
                      )}
                    </div>

                    <div
                      onClick={() => {
                        setIsSelected(
                          myFlowers[
                            index1 === myFlowers.length - 1 ? 0 : index1 + 1
                          ].id,
                        );
                      }}
                      className={`carousel__image--right ${
                        isSelected ===
                        myFlowers[
                          index1 === myFlowers.length - 1 ? 0 : index1 + 1
                        ].id
                          ? 'carousel__image--selected'
                          : ''
                      }`}
                      style={{
                        backgroundImage: `url(${
                          myFlowers[
                            `${
                              index1 === myFlowers.length - 1 ? 0 : index1 + 1
                            }`
                          ].url
                        })`,
                      }}
                    >
                      {userWishlist.find(
                        (flower) =>
                          flower.nameCZ ===
                          myFlowers[
                            index1 === myFlowers.length - 1 ? 0 : index1 + 1
                          ].nameCZ,
                      ) && (
                        <img
                          className="swap__image"
                          src={'/assets/swap.svg'}
                          alt=""
                        />
                      )}
                    </div>
                  </div>
                  <button
                    className="carousel__dalsi"
                    aria-label="další"
                    onClick={() => {
                      setIndex1(
                        index1 === myFlowers.length - 1 ? 0 : index1 + 1,
                      );
                    }}
                  >
                    →
                  </button>
                </div>
                <button className="btn__swap" onClick={handleClick}>
                  {sendSwap
                    ? 'Tvoja kytka sa už teší na nového majiteľa'
                    : 'Navrhni výmenu'}
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AdDetail;
