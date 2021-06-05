import React, { useEffect, useState } from 'react';
import './style.css';
import { db, storage } from './../firebase';
import { categories } from '.././categories';
import { flowers } from '.././flowers';
import firebase from 'firebase';

import FlowerItem from '../FlowerItem';

const Options = ({ name }) => {
  return (
    <>
      <option value={name}>{name}</option>
    </>
  );
};

export const Wishlist = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState();
  const [photoNameCZ, setPhotoNameCZ] = useState('');
  const [photoDescription, setPhotoDescription] = useState('');
  const [photoCategory, setPhotoCategory] = useState('Vyberte');
  const [photos, setPhotos] = useState([]);
  const [newPhotos, setNewPhotos] = useState(0);

  console.log(photos);

  useEffect(() => {
    const resetAfterSnapshot = db
      .collection('users')
      .doc('YpadprYKCHbtd91y02hL')
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

    setNewPhotos(newPhotos + 1);

    storage
      .ref(`/wishlist/${file.name}`)
      .put(file)
      .then((snapshot) => snapshot.ref.getDownloadURL())
      .then((urlLoadedFile) => {
        db.collection('users')
          .doc('YpadprYKCHbtd91y02hL')
          .collection('wishlist')
          .add({
            url: urlLoadedFile,
            nameCZ: photoNameCZ,
            description: photoDescription,
            category: photoCategory,
            timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
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
            key={photo.nameCZ}
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
                    <Options name={flower} />
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
                    <Options name={category} />
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
            {newPhotos !== 0 && (
              <>
                <p>Nahrané fotky</p>
                <ul>
                  {photos.slice(0, newPhotos).map((photo) => (
                    <li>
                      {photo.nameCZ}
                      <br />
                      <img src={photo.url} height="50" alt="" />
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};
