import React, { Component } from 'react';
import { Link, withRouter } from 'react-router'
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

class AlbumList extends Component {
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

  getAlbumFromPrefix(prefix) {
    return prefix.match(/\/([^]+)\/$/)
  }

  buildURLFromPrefix(prefix) {
    const parts = this.getAlbumFromPrefix(prefix);
    return `/location/${this.props.params.loc}/album/${parts[1]}`
  }

  updateAlbum(loc) {
    var s3 = new aws.S3();

    s3.listObjectsV2({
      Bucket: config.AWS.bucket,
      Delimiter: '/',
      Prefix: `${loc}/`,
    }, (err, data) => {
      if (err) return console.error(err);
      const albums = data.CommonPrefixes;
      this.setState({ albums });

      if (albums.length) {
        this.props.router.push(this.buildURLFromPrefix(albums[0].Prefix));
      }
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
              const parts = this.getAlbumFromPrefix(album.Prefix);
              let name = '';

              if (parts && (name = parts[1])) {
                const readableName = name
                  .split('-')
                  .map(capitalize)
                  .join(' ');

                return (
                  <span key={i} style={itemStyle}>
                    <Link to={{ pathname: this.buildURLFromPrefix(album.Prefix) }} activeStyle={{ color: 'black' }} style={linkStyles}>{readableName}</Link>
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

export default withRouter(AlbumList);
