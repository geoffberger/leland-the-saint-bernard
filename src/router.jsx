import React, { Component } from 'react';
import { Router, Route, useRouterHistory, IndexRoute } from 'react-router'
import { createHashHistory } from 'history'
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })

import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import AlbumList from './components/AlbumList/AlbumList';
import ImageList from './components/ImageList/ImageList';

export default () => {
  return (
    <Router history={appHistory}>
      <Route path="/" component={Layout}>
        <IndexRoute component={Home}/>
        <Route path="location/:loc" component={AlbumList}>
          <Route path="album/:album" component={ImageList}/>
        </Route>
      </Route>
    </Router>
  );
};
