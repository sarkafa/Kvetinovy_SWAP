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
    setOpen(!open);
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
        db.collection('ads')
          .add(ad)
          .then((doc) => {
            const adExtended = { ...ad, adID: doc.id };
            db.collection('users')
              .doc(user.uid)
              .collection('myFlowers')
              .add(adExtended);
            console.log('documentID', doc.id);
          });

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
            adID={photo.adID}
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
            <h4>Vyber fotku tvé kytičky a přiedej její popis.</h4>
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
              <label className="flower__description">Popis kytky:</label>
              <textarea
                value={photoDescription}
                onChange={(event) => setPhotoDescription(event.target.value)}
              />

              {photoNameCZ !== 'Vyberte' && (
                <label>Kategorie:{photoCategory} </label>
              )}

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
