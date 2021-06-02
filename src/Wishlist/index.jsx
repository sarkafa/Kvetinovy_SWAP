import React, { useEffect, useState } from 'react';
import './style.css';
import { db, storage } from './../firebase';
import firebase from 'firebase';
import WishlistItem from './../WishlistItem';

const Wishlist = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState();
  const [photoName, setPhotoName] = useState('');
  const [photos, setPhotos] = useState([]);
  const [newPhotos, setNewPhotos] = useState(0);

  console.log(`new kytky:${newPhotos}`);

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
  });

  {
    console.log(photoName);
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
          .collection('wishlist')
          .add({
            url: urlLoadedFile,
            name: photoName,
            timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
          });
        setPhotoName('');
      });
  };

  return (
    <>
      <div className="wishlist">
        <button onClick={() => setOpen(!open)} className="btn--open">
          Přidej kytku
          <img src="/assets/cross.svg" alt="" />
        </button>

        {photos.map((photo) => (
          <WishlistItem name={photo.name} url={photo.url} />
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
                <input
                  value={photoName}
                  onChange={(event) => setPhotoName(event.target.value)}
                />
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
                      {photo.name}
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

// {photos.map((fotka) => (
//   <li>
//     {fotka.name}
//     <br />
//     <img src={fotka.url} height="50" alt="" />
//   </li>
// ))}

export default Wishlist;
