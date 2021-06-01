import React, { useEffect, useState } from 'react';
import './style.css';
import { db, storage } from './../firebase';

const Wishlist = () => {
  const [open, setOpen] = useState(false);

  const [soubor, setSoubor] = useState();
  const [popis, setPopis] = useState('');
  const [fotky, setFotky] = useState([]);

  useEffect(() =>
    db.collection('fotky').onSnapshot((snapshot) => {
      setFotky(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }),
  );

  const nahrajNaFirebase = (event) => {
    event.preventDefault();
    if (!soubor) {
      return;
    }
    storage
      .ref(`/obrazky/${soubor.name}`)
      .put(soubor)
      .then((snapshot) => snapshot.ref.getDownloadURL())
      .then((urlNahranehoObrazku) => {
        db.collection('users')
          .doc('YpadprYKCHbtd91y02hL')
          .collection('wishlist')
          .add({
            url: urlNahranehoObrazku,
            name: popis,
          });
        setPopis('');
      });
  };

  return (
    <>
      <button onClick={() => setOpen(!open)} className="btn--open">
        Přidej kytku
        <img src="/assets/cross.svg" alt="" />
      </button>

      {open && (
        <div className="popup">
          <div className="popup__inner">
            <button className="btn--close" onClick={() => setOpen(!open)}>
              X
            </button>
            <h4>Vyber fotku tvé vysněné kytky z úložiště a její jméno.</h4>
            <form onSubmit={nahrajNaFirebase}>
              <label>
                Název květiny:
                <input
                  value={popis}
                  onChange={(event) => setPopis(event.target.value)}
                />
              </label>
              <input
                type="file"
                className="form__file"
                onChange={(event) => setSoubor(event.target.files[0])}
              />

              <button>Nahrát</button>
            </form>
            <p>Nahrané fotky</p>
            <ul>
              {fotky.map((fotka) => (
                <li>
                  {fotka.popis}
                  <br />
                  <img src={fotka.url} height="50" alt="" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Wishlist;
