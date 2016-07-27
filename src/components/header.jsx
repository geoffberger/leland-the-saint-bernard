import React from 'react';
import { Link } from 'react-router'

import config from '../config'

const pageTitleStyles = {
  color: 'brown',
  textDecoration: 'none',
};

const listStyles = {
  listStyle: 'none',
  overflow: 'hidden',
  padding: 0,
};

const itemStyles = {
  float: 'left',
  marginRight: '12px'
};


const linkStyles = {
  textDecoration: 'none',
  color: 'brown'
};

export default () => {
  return (
    <div>
      <h1><Link to={{ pathname: '/' }} style={pageTitleStyles}>Leland The Saint Bernard</Link></h1>

      <ul className="locations" style={listStyles}>
        {config.site.menu.map((item, i) => {
          return (
            <li key={i} style={itemStyles}>
              <Link to={{ pathname: item.to }} activeStyle={{ color: 'black' }} style={linkStyles}>{item.name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
