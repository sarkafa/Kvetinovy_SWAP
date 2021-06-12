import React, { useState, useEffect } from 'react';
import './style.css';
import FlowerItem from './../FlowerItem';
import { categories } from '.././categories';
import { db, storage } from './../firebase';
import firebase from 'firebase';
import { flowers } from '.././flowers';

const Options = ({ name }) => {
  return (
    <>
      <option value={name}>{name}</option>
    </>
  );
};

export const MyFlowers = () => {
  const user = firebase.auth().currentUser;
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState();
  const [photoNameCZ, setPhotoNameCZ] = useState('');
  const [photoDescription, setPhotoDescription] = useState('');
  const [photoCategory, setPhotoCategory] = useState('Vyberte');
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const resetAfterSnapshot = db
      .collection('users')
      .doc(user.uid)
      .collection('myFlowers')
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
      .ref(`/myFlowers/${user.uid}/${file.name}`)
      .put(file)
      .then((snapshot) => snapshot.ref.getDownloadURL())
      .then((urlLoadedFile) => {
        const ad = {
          url: urlLoadedFile,
          nameCZ: photoNameCZ,
          description: photoDescription,
          category: photoCategory,
          user: user.uid,
          timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
        };
        db.collection('users').doc(user.uid).collection('myFlowers').add(ad);
        db.collection('ads').add(ad);

        setPhotoNameCZ('');
      });
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
            id={photo.id}
            collection="myFlowers"
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
            <h4>
              Vyber fotku tvé vysněné kytky z tvého adresáře a vyplň informace.
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
                    <option value={flower.name}>{flower.name}</option>
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
                className="btn__loadToFirebase"
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
