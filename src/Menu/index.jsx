import React, { useState } from 'react';
import './style.css';
import { MyFlowers } from '../MyFlowers';
import { Ads } from '../Ads';
import Wishlist from '../Wishlist';

import AdDetail from '../AdDetail';

import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
} from 'react-router-dom';

const PrivateRoute = ({ children, ...rest }) => {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
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
            <NavLink to="/myflowers">Anicka Nova</NavLink>
          </div>
          <div className="user__icon">
            <NavLink to="/myflowers"></NavLink>
          </div>
        </div>
      </div>

      <Switch>
        <Route exact path="/">
          <Ads />
        </Route>
        <Route path="/detail/:id" children={<AdDetail />}></Route>
        <Route path="/myflowers">
          <MyFlowers />
        </Route>
        <Route path="/wishlist">
          <Wishlist />
        </Route>
      </Switch>
    </Router>
  );
};

export default Menu;
