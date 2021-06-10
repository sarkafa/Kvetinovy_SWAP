import React, { useEffect, useState } from 'react';
import './style.css';
import { db, storage } from './../firebase';
import { categories } from '.././categories';
import { flowers } from '.././flowers';
import firebase from 'firebase';

import FlowerItem from '../FlowerItem';

export const Wishlist = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState();
  const [photoNameCZ, setPhotoNameCZ] = useState('');
  const [photoDescription, setPhotoDescription] = useState('');
  const [photoCategory, setPhotoCategory] = useState('Vyberte');
  const [photos, setPhotos] = useState([]);
  const user = firebase.auth().currentUser;

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
    event.preventDefault();
    if (!file) {
      return;
    }

    storage
      .ref(`/wishlist/${file.name}`)
      .put(file)
      .then((snapshot) => snapshot.ref.getDownloadURL())
      .then((urlLoadedFile) => {
        db.collection('users').doc(user.uid).collection('wishlist').add({
          url: urlLoadedFile,
          nameCZ: photoNameCZ,
          description: photoDescription,
          category: photoCategory,
          timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
          user: user.uid,
        });
        setPhotoNameCZ('');
      }, []);
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
            description={photo.description}
            category={photo.category}
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
                setNewPhotos(0);
              }}
            >
              X
            </button>
            <h4>
              Vyber fotku tvé vysněné kytky z tvého adresáře a zapiš a její
              jméno.
            </h4>
            <form onSubmit={loadToFirebase}>
              <label>
                Název květiny:
                <select
                  value={photoNameCZ}
                  onChange={(event) => setPhotoNameCZ(event.target.value)}
                >
                  <option value="Vyberte">Vyberte</option>
                  {flowers.map((flower) => (
                    <option value={flower}>{flower}</option>
                  ))}
                </select>
              </label>

              <label>
                Popis kytky:
                <input
                  value={photoDescription}
                  onChange={(event) => setPhotoDescription(event.target.value)}
                />
              </label>

              <label>
                Kategorie:
                <select
                  value={photoCategory}
                  onChange={(event) => setPhotoCategory(event.target.value)}
                >
                  <option value="Vyberte">Vyberte</option>
                  {categories.map((category) => (
                    <option value={category}>{category}</option>
                  ))}
                </select>
              </label>

              <input
                type="file"
                className="form__file"
                onChange={(event) => setFile(event.target.files[0])}
              />

              <button
                disabled={
                  photoCategory === 'Vyberte' ||
                  photoNameCZ === 'Vyberte' ||
                  photoDescription === ''
                }
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
