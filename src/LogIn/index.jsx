import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import './style.css';
import { useHistory, useLocation } from 'react-router-dom';
import { db, storage } from './../firebase';
import firebase from 'firebase';

export const LogIn = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const history = useHistory();
  const location = useLocation();
  const [registration, setRegistration] = useState(true);
  let { from } = location.state || { from: { pathname: '/' } };

  auth.onAuthStateChanged(function (user) {
    if (user) {
      history.replace(from);
    }
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        console.log(`Uzivatel ${user.email} sa zaregistroval`);
        if (user.uid != null) {
          db.collection('users').doc(user.uid).set({
            email: user.email,
          });
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
  };

  const handleSubmit2 = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        console.log(`Uzivatel ${user.email} sa prihlasil`);
        history.push(`/`);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
  };

  return (
    <div className="login__container">
      <div className="webDescription">
        <img src="\assets\swiss-cheese-plant-light-houseplant-photocatalysis-small-potted-plants-6194e80d43c972307b5e89c063193b2b.png" />
        <p>
          V??tejte na kv??tinov??m swapu, kde m????ete s u??ivateli m??nit svoje
          kv??tinov?? kr??sky za jin??.
        </p>
        <p>
          Nab??zen?? kytky p??id??vejte v sekci M?? kv??tiny a dopl??ujte vysv??n?? kytek
          pro ????ely matche v sekci Wishlist.
        </p>
      </div>
      <div className="formular">
        <div
          id="modal-signup"
          className={registration ? 'modal' : 'modal--closed'}
        >
          <p>Prihl??senie</p>
          <div className="modal-content">
            <form id="signup-form" onSubmit={handleSubmit2}>
              <div>
                <label>
                  <input
                    className="input-field"
                    type="email"
                    id="signup-email"
                    required
                    placeholder="Zadajte e-mail"
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </label>
              </div>
              <div>
                <label>
                  <input
                    className="input-field"
                    type="password"
                    id="gignup-password"
                    required
                    placeholder="Zadajte heslo"
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </label>

                <button className="btn-signIn">Prihl??si??</button>
              </div>
            </form>
          </div>
          <div>E??te nem??te ????et?</div>
          <button
            className="btn-login"
            onClick={() => {
              setRegistration(false);
            }}
          >
            Zaregistrujte sa
          </button>
        </div>

        <div
          id="modal-login"
          className={registration ? 'modal--closed' : 'modal'}
        >
          <p>Registrace</p>
          <div className="modal-content">
            <form id="login-form" onSubmit={handleSubmit}>
              <div>
                <label>
                  <input
                    className="input-field"
                    type="email"
                    id="login-email"
                    required
                    placeholder="Zadajte e-mail"
                    onChange={(event) => setEmail(event.target.value)}
                  />{' '}
                </label>
              </div>
              <div>
                <label>
                  <input
                    className="input-field"
                    type="password"
                    id="login-password"
                    required
                    placeholder="Zadajte heslo"
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </label>

                <button className="btn-signIn">Zaregistrova??</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
