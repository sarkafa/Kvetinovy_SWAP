import React, { useState, useEffect } from 'react';
import './style.css';
import MyFlowerItem from './../MyFlowerItem';
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
  const [photoNameL, setPhotoNameL] = useState('');
  const [photoNameC, setPhotoNameC] = useState('');
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
  });

  {
    console.log(photoNameCZ);
  }

  const loadToFirebase = (event) => {
    event.preventDefault();
    if (!file) {
      return;
    }

    setNewPhotos(newPhotos + 1);

    storage
      .ref(`/flowers/${file.name}`)
      .put(file)
      .then((snapshot) => snapshot.ref.getDownloadURL())
      .then((urlLoadedFile) => {
        db.collection('users')
          .doc('YpadprYKCHbtd91y02hL')
          .collection('myFlowers')
          .add({
            url: urlLoadedFile,
            nameCZ: photoNameCZ,
            nameL: photoNameL,
            nameC: photoNameC,
            description: photoDescription,
            category: photoCategory,
            timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
          });
        setPhotoName('');
      });
  };

  return (
    <>
      <div className="myFlowers">
        <button onClick={() => setOpen(!open)} className="btn--open">
          Přidej kytku
          <img src="/assets/cross.svg" alt="" />
        </button>

        {photos.map((photo) => (
          <MyFlowerItem
            flowerNameCZ={photo.nameCZ}
            flowerNameL={photo.nameL}
            flowerNameC={photo.nameC}
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
              Vyber fotku tvé vysněné kytky z tvého adresáře a vyplň informace.
            </h4>
            <form onSubmit={loadToFirebase}>
              <label>
                Český název květiny:
                <input
                  value={photoNameCZ}
                  onChange={(event) => setPhotoNameCZ(event.target.value)}
                />
              </label>
              <label>
                Latinský název květiny:
                <input
                  value={photoNameL}
                  onChange={(event) => setPhotoNameL(event.target.value)}
                />
              </label>

              <label>
                Běžný název květiny:
                <input
                  value={photoNameC}
                  onChange={(event) => setPhotoNameC(event.target.value)}
                />
              </label>
              <label>
                Popis inzerátu:
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
                    <CategoryOptions name={category.name} />
                  ))}
                </select>
              </label>
              <input
                type="file"
                className="form__file"
                onChange={(event) => setFile(event.target.files[0])}
              />

              <button>Nahrát</button>
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
