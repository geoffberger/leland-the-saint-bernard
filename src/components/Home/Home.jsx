import React, { Component } from 'react';

import Content from '../Content/Content';
import home from 'raw!../../../content/home.md'

export default class Home extends Component {
  render() {
    return (
      <Content input={home}/>
    )
  }
}
