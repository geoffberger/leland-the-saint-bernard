import React from 'react';

import Header from '../Header/Header'
import CSSModules from 'react-css-modules';

import styles from './Layout.scss';

const Layout = ({ children }) => {
  return (
    <div styleName='container'>
      <Header />
      {children}
    </div>
  );
};

export default CSSModules(Layout, styles);
