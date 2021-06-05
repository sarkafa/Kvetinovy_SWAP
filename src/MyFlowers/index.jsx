import React, { useState, useEffect } from 'react';
import './style.css';
import FlowerItem from './../FlowerItem';
import { categories } from '.././categories';
import { db, storage } from './../firebase';
import firebase from 'firebase';

const CategoryOptions = ({ name }) => {
  return (
    <>
      <option value={name}>{name}</option>
    </>
  );
};

export const MyFlowers = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState();
  const [photoNameCZ, setPhotoNameCZ] = useState('');
  const [photoDescription, setPhotoDescription] = useState('');
  const [photoCategory, setPhotoCategory] = useState('Vyberte');
  const [photos, setPhotos] = useState([]);
  const [newPhotos, setNewPhotos] = useState(0);

  console.log(`new kytky:${newPhotos}`);

  useEffect(() => {
    const resetAfterSnapshot = db
      .collection('users')
      .doc('YpadprYKCHbtd91y02hL')
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

    setNewPhotos(newPhotos + 1);

    storage
      .ref(`/myFlowers/${file.name}`)
      .put(file)
      .then((snapshot) => snapshot.ref.getDownloadURL())
      .then((urlLoadedFile) => {
        const ad = {
          url: urlLoadedFile,
          nameCZ: photoNameCZ,
          description: photoDescription,
          category: photoCategory,
          user: 'YpadprYKCHbtd91y02hL',
          timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
        };
        db.collection('users')
          .doc('YpadprYKCHbtd91y02hL')
          .collection('myFlowers')
          .add(ad);
        db.collection('ads').add(ad);

        setPhotoName('');
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
                    <CategoryOptions name={category} key={category} />
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
                <p>Nahrané kytky</p>
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
