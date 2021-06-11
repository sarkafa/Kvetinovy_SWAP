import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import './style.css';
import { useHistory, useLocation } from 'react-router-dom';

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
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio
          corrupti cum asperiores distinctio vel nam ratione ullam unde,
          quisquam quae cupiditate reprehenderit alias nesciunt sed eum
          doloremque omnis! Nisi, maxime?
        </p>
      </div>
      <div className="formular">
        <div
          id="modal-signup"
          className={registration ? 'modal' : 'modal--closed'}
        >
          <p>Prihlásenie</p>
          <div className="modal-content">
            <form id="signup-form" onSubmit={handleSubmit2}>
              <div className="input-field">
                <label>
                  <input
                    type="email"
                    id="signup-email"
                    required
                    placeholder="Zadajte e-mail"
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </label>
              </div>
              <div className="input-field">
                <label>
                  <input
                    type="password"
                    id="gignup-password"
                    required
                    placeholder="Zadajte heslo"
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </label>
              </div>
              <button className="btn form__btn">Prihlásiť</button>
            </form>
          </div>
          <div>Ešte nemáte účet?</div>
          <button
            className="btn"
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
              <div className="input-field">
                <label>
                  <input
                    type="email"
                    id="login-email"
                    required
                    placeholder="Zadajte e-mail"
                    onChange={(event) => setEmail(event.target.value)}
                  />{' '}
                </label>
              </div>
              <div className="input-field">
                <label>
                  <input
                    type="password"
                    id="login-password"
                    required
                    placeholder="Zadajte heslo"
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </label>
              </div>
              <button className="btn">Zaregistrovať</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
