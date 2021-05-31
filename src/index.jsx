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

const App = () => {
  return (
    <>
      <div className="wrapper">
        <Menu />
      </div>
    </>
  );
};

render(<App />, document.querySelector('#app'));
