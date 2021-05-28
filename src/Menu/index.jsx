import React, { useState } from 'react';
import './style.css';
import MyFlowers from '../MyFlowers';
import Ads from '../Ads';
import Wishlist from '../Wishlist';
import FotoUpload from '../FotoUpload';
import Categories from '../Categories';

import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
} from 'react-router-dom';

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
          <div className="container">
            <Categories />
            <Ads />
          </div>
        </Route>
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
