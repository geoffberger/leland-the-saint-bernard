import React, { Component } from 'react';
import { Router, Route, useRouterHistory } from 'react-router'
import { createHashHistory } from 'history'
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })

import Layout from './components/Layout';
import AlbumList from './components/AlbumList';
import ImageList from './components/ImageList';

export default () => {
  return (
    <Router history={appHistory}>
      <Route path="/" component={Layout}>
        <Route path="location/:loc" component={AlbumList}>
          <Route path="album/:album" component={ImageList}/>
        </Route>
      </Route>
    </Router>
  );
};
