import React, { Component } from 'react';
import Masonry from 'react-masonry-component';
import 'aws-sdk/dist/aws-sdk';
const aws = window.AWS;

import config from '../config'

export default class ImageListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      images: [],
    };
  }

  getPrefix({ loc, album }) {
    return `${loc}/${album}/`
  }

  componentWillReceiveProps(nextProps) {
    const { params: nextParams } = nextProps;
    const { params: currentParams } = this.props;

    if (nextProps.loc !== currentParams.loc && nextProps.album !== currentParams.album) {
      this.updateAlbum(nextParams);
    }
  }

  componentDidMount() {
    const { params } = this.props
    this.updateAlbum(params);
  }

  updateAlbum(params) {
    var s3 = new aws.S3();

    s3.listObjectsV2({
      Bucket: config.AWS.bucket,
      Prefix: this.getPrefix(params),
    }, (err, data) => {
      if (err) return console.error(err);
      this.setState({
        name: data.Name,
        images: data.Contents,
      });
    });
  }

  render() {
    const listStyles = {
      listStyle: 'none',
      overflow: 'hidden',
      padding: '0',
    };

    const itemStyles = {
      width: '32%',
      float: 'left',
      boxSizing: 'border-box',
      padding: '12px',
      border: '1px solid #ccc',
      margin: '0 1% 1% 0',
    };

    const imageStyles = {
      width: '100%',
    };

    const prefix = this.getPrefix(this.props.params);

    const els = this.state.images.map((image, i) => {
      if (prefix !== image.Key) {
        const src = `${config.AWS.s3Domain}/${this.state.name}/${image.Key}`;
        return (
          <li key={i} style={itemStyles}>
            <img style={imageStyles} title={image.Key} alt={image.Key} src={src} />
          </li>
        )
      }
    });

    return (
      <Masonry
          style={listStyles}
          elementType={'ul'}>
        {els}
      </Masonry>
    );
  }
}
