import React, { Component } from 'react';
import { Router, Route, useRouterHistory } from 'react-router'
import { createHashHistory } from 'history'
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })

import Layout from './components/layout';
import AlbumList from './components/album-list';
import ImageList from './components/image-list';

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
