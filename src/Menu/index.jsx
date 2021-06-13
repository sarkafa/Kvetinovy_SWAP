import React, { useState, useEffect } from 'react';
import './style.css';
import { MyFlowers } from '../MyFlowers';
import { Ads } from '../Ads';
import { Wishlist } from '../Wishlist';
import { LogIn } from '../LogIn';
import AdDetail from '../AdDetail';
import { auth, realtime } from '../firebase';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
  Redirect,
  useHistory,
  Link,
} from 'react-router-dom';

const PrivateRoute = ({ children, ...rest }) => {
  const user = auth.currentUser;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

const Notification = ({ offeredFlower, adFlower, swapperID }) => {
  return (
    <div className="notification">
      <div>
        Používateľ {swapperID} chce s vami zameniť {adFlower.nameCZ} za
        <Link to={`/detail/${offeredFlower.id}`}>{offeredFlower.nameCZ}</Link>
      </div>
      <div className="notification__buttons">
        <button>✓</button> <button>x</button>{' '}
      </div>
    </div>
  );
};

const Menu = () => {
  const user = auth.currentUser;
  const [menuOpened, setMenuOpened] = useState(false);
  const [signedUser, setSignedUser] = useState(null);
  const [notification, setNotification] = useState([]);
  const [burgerMenuOpened, setBurgerMenuOpened] = useState(true);

  const showNav = () => {
    document.querySelector('nav').classList.toggle('nav-closed');
  };

  auth.onAuthStateChanged(function (user) {
    if (user) {
      setSignedUser(user);
      console.log(signedUser);
    }
  });

  useEffect(() => {
    if (!signedUser) return;

    let notifications = realtime.ref();
    notifications
      .child('swaps')
      .child(signedUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(Object.values(snapshot.val()));
          setNotification(Object.values(snapshot.val()));
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [signedUser]);

  return (
    <Router>
      <div className="fixed--wraper">
        <div className="menu">
          <div className="logo">
            <NavLink exact to="/"></NavLink>
          </div>

          <ul className="menu__tabs--middle">
            <li>
              <NavLink exact to="/" activeClassName="selected">
                INZERÁTY
              </NavLink>
            </li>
            <li>
              <NavLink to="/myflowers" activeClassName="selected">
                MÉ KVĚTINY
              </NavLink>
            </li>
            <li>
              <NavLink to="/wishlist" activeClassName="selected">
                WISHLIST
              </NavLink>
            </li>
          </ul>

          <div className="user">
            <div className="user__name">
              <NavLink to="/login">
                {signedUser ? signedUser.email : ''}
              </NavLink>
            </div>

            <div
              className={signedUser ? 'user__icon' : ''}
              onClick={() => {
                setMenuOpened(!menuOpened);
                console.log(menuOpened);
              }}
            >
              <div
                className={
                  notification.length === 0
                    ? 'notifications--number--false'
                    : 'notifications--number'
                }
              >
                {notification.length === 0 ? '' : notification.length}
              </div>
              <div className={menuOpened ? 'logout' : 'logout--closed'}>
                {notification.map((n) => (
                  <Notification
                    offeredFlower={n.offeredFlower}
                    adFlower={n.adFlower}
                  />
                ))}
                <button
                  className="btn-logout"
                  onClick={() => {
                    auth.signOut().then(() => {
                      console.log('uzivatel odhlaseny');
                      location.href = location.origin;
                    });
                  }}
                >
                  Odhlásiť
                </button>
              </div>
            </div>
            <div class="navigation">
              <svg
                className="burgerMenu"
                onClick={() =>
                  setBurgerMenuOpened(burgerMenuOpened ? false : true)
                }
                viewBox="0 0 100 80"
                width="40"
                height="40"
              >
                <rect width="100" height="20"></rect>
                <rect y="30" width="100" height="20"></rect>
                <rect y="60" width="100" height="20"></rect>
              </svg>
              <ul
                className={`menu__tabs ${burgerMenuOpened ? 'nav-closed' : ''}`}
              >
                <li>
                  <NavLink
                    exact
                    to="/"
                    activeClassName="selected--burgerMenu"
                    onClick={() =>
                      setBurgerMenuOpened(burgerMenuOpened ? false : true)
                    }
                  >
                    INZERÁTY
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/myflowers"
                    activeClassName="selected--burgerMenu"
                    onClick={() =>
                      setBurgerMenuOpened(burgerMenuOpened ? false : true)
                    }
                  >
                    MÉ KVĚTINY
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/wishlist"
                    activeClassName="selected--burgerMenu"
                    onClick={() =>
                      setBurgerMenuOpened(burgerMenuOpened ? false : true)
                    }
                  >
                    WISHLIST
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Switch>
        <Route exact path="/login">
          <LogIn />
        </Route>
        <PrivateRoute exact path="/">
          <Ads />
        </PrivateRoute>
        <PrivateRoute path="/detail/:id" children={<AdDetail />}></PrivateRoute>
        <PrivateRoute path="/myflowers">
          <MyFlowers />
        </PrivateRoute>
        <PrivateRoute path="/wishlist">
          <Wishlist />
        </PrivateRoute>
      </Switch>
    </Router>
  );
};

export default Menu;
