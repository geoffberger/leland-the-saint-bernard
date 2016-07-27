import React from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router'

import config from '../../config'
import styles from './Header.scss'

const Header = () => {
  return (
    <div>
      <h1><Link to={{ pathname: '/' }} styleName='page-title'>Leland The Saint Bernard</Link></h1>

      <ul className="locations" styleName='list'>
        {config.site.menu.map((item, i) => {
          return (
            <li key={i} styleName='item'>
              <Link to={{ pathname: item.to }} activeClassName={styles.active} className={styles.link}>{item.name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CSSModules(Header, styles)
