import React from 'react';
import { render } from 'react-dom';
import './style.css';
import Menu from './Menu';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from 'react-router-dom';
import Ads from './Ads/index';
import Categories from './Categories';
const App = () => {
  return (
    <>
      <Menu />
    </>
  );
};

render(<App />, document.querySelector('#app'));
