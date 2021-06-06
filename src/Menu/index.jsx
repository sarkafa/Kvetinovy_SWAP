import React, { useState } from 'react';
import './style.css';
import { MyFlowers } from '../MyFlowers';
import { Ads } from '../Ads';
import { Wishlist } from '../Wishlist';
import { LogIn } from '../LogIn';
import AdDetail from '../AdDetail';
import { auth } from '../firebase';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
  Redirect,
  useHistory,
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

const Menu = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [signedUser, setSignedUser] = useState(null);
  const history = useHistory();

  auth.onAuthStateChanged(function (user) {
    if (user) {
      setSignedUser(user);
    }
  });

  return (
    <Router>
      <div className="menu">
        <div className="logo">
          <NavLink exact to="/"></NavLink>
        </div>

        <ul className="menu__tabs">
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
            <NavLink to="/login">{signedUser ? signedUser.email : ''}</NavLink>
          </div>
          <div
            className={signedUser ? 'user__icon' : ''}
            onClick={() => {
              setMenuOpened(!menuOpened);
              console.log(menuOpened);
            }}
          >
            <div className={menuOpened ? 'logout' : 'logout--closed'}>
              <button
                className="btn"
                onClick={() => {
                  auth.signOut().then(() => {
                    console.log('uzivatel odhlasenyx');
                    location.href = location.origin;
                  });
                }}
              >
                Odhlásiť
              </button>
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
