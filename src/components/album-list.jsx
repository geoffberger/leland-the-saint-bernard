import React, { Component } from 'react';
import { Link } from 'react-router'
import capitalize from 'lodash/capitalize';
import Slider from 'react-slick';
import 'aws-sdk/dist/aws-sdk';
const aws = window.AWS;

import config from '../config'

const listStyle = {
  listStyle: 'none',
  margin: '12px 0',
  padding: '0',
  overflow: 'hidden',
};

const itemStyle = {
  marginRight: '12px',
};

const linkStyles = {
  textDecoration: 'none',
  color: 'brown'
};

export default class AlbumListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.loc !== this.props.params.loc) {
      this.updateAlbum(nextProps.params.loc);
    }
  }

  componentDidMount() {
    this.updateAlbum(this.props.params.loc);
  }

  updateAlbum(loc) {
    var s3 = new aws.S3();

    s3.listObjectsV2({
      Bucket: config.AWS.bucket,
      Delimiter: '/',
      Prefix: `${loc}/`,
    }, (err, data) => {
      if (err) return console.error(err);
      this.setState({
        albums: data.CommonPrefixes
      });
    });
  }

  render() {
    var settings = {
      arrows: true,
      dots: false,
      infinite: false,
      speed: 500,
      variableWidth: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      mobileFirst: true,
    };

    return (
      <div>
        <div style={{ marginLeft: '25px', width: '90%' }}>
          <Slider {...settings}>
            {this.state.albums.map((album, i) => {
              const parts = album.Prefix.match(/\/([^]+)\/$/)
              let name = '';

              if (parts && (name = parts[1])) {
                const readableName = name
                  .split('-')
                  .map(capitalize)
                  .join(' ');

                return (
                  <span key={i} style={itemStyle}>
                    <Link to={{ pathname: `/location/${this.props.params.loc}/album/${name}` }} activeStyle={{ color: 'black' }} style={linkStyles}>{readableName}</Link>
                  </span>
                );
              }
            })}
          </Slider>
        </div>
        {this.props.children}
      </div>
    );
  }
}
