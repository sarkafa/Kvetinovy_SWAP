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
            <NavLink to="/login">Anicka Nova</NavLink>
          </div>
          <div className="user__icon">
            <NavLink to="/login"></NavLink>
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
