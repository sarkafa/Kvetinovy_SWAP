import React, { useEffect, useState } from 'react';
import './style.css';
import { db, storage } from './../firebase';
import { categories } from '.././categories';
import { flowers } from '.././flowers';
import firebase from 'firebase';
import { Autocomplete } from '.././Autocomplete';

import FlowerItem from '../FlowerItem';

export const Wishlist = () => {
  const [open, setOpen] = useState(false);
  const [photoNameCZ, setPhotoNameCZ] = useState('Vyberte');
  const [photoCategory, setPhotoCategory] = useState('');
  const [photos, setPhotos] = useState([]);
  const user = firebase.auth().currentUser;
  const [file, setFile] = useState();

  useEffect(() => {
    const resetAfterSnapshot = db
      .collection('users')
      .doc(user.uid)
      .collection('wishlist')
      .orderBy('timeStamp', 'desc')
      .onSnapshot((snapshot) => {
        setPhotos(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
    return resetAfterSnapshot;
  }, []);

  const loadToFirebase = (event) => {
    setOpen(!open);
    event.preventDefault();
    if (!file) {
      return;
    }

    db.collection('users')
      .doc(user.uid)
      .collection('wishlist')
      .add({
        url: `assets/${photoNameCZ}.jpg`,
        nameCZ: photoNameCZ,
        category: photoCategory,
        timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
        user: user.uid,
      });
    setPhotoNameCZ('');

    setOpen(!open);
  };

  return (
    <>
      <div className="container">
        <button onClick={() => setOpen(!open)} className="btn--open">
          Přidej kytku
          <img src="/assets/cross.svg" alt="" />
        </button>

        {photos.map((photo) => (
          <FlowerItem
            key={photo.id}
            flowerNameCZ={photo.nameCZ}
            url={photo.url}
            id={photo.id}
            category={photo.category}
            collection="wishlist"
          />
        ))}
      </div>

      {open && (
        <div className="popup">
          <div className="popup__inner">
            <button
              className="btn--close"
              onClick={() => {
                setOpen(!open);
              }}
            >
              X
            </button>
            <h4>Vyber název tvé vyněné kytičky</h4>
            <form onSubmit={loadToFirebase}>
              <label>
                Název květiny:
                <select
                  value={photoNameCZ}
                  onChange={(event) => {
                    setPhotoNameCZ(event.target.value);
                    console.log('photoname', event.target.value);

                    let flowerObject = flowers.filter(
                      (flower) => flower.name === event.target.value,
                    );
                    console.log(flowerObject);
                    setPhotoCategory(flowerObject[0].category);
                    setFile(`assers/${event.target.value}.jpg`);
                  }}
                >
                  <option value="Vyberte">Vyberte</option>
                  {flowers.map((flower) => (
                    <option value={flower.name}>{flower.name}</option>
                  ))}
                </select>
              </label>

              {photoNameCZ !== 'Vyberte' && (
                <label>Kategorie:{photoCategory} </label>
              )}
              <button
                className="btn__loadToFirebase"
                disabled={photoNameCZ === 'Vyberte'}
              >
                Nahrát
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
