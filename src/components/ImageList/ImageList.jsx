import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import Masonry from 'react-masonry-component';
import 'aws-sdk/dist/aws-sdk';
const aws = window.AWS;

import config from '../../config'
import styles from './ImageList.scss';


class ImageList extends Component {
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
    const prefix = this.getPrefix(this.props.params);

    const els = this.state.images.map((image, i) => {
      if (prefix !== image.Key) {
        const src = `${config.AWS.s3Domain}/${this.state.name}/${image.Key}`;
        return (
          <li key={i} styleName='item'>
            <img styleName='image' title={image.Key} alt={image.Key} src={src} />
          </li>
        )
      }
    });

    return (
      <Masonry
          className={styles.list}
          elementType={'ul'}>
        {els}
      </Masonry>
    );
  }
}

export default CSSModules(ImageList, styles);
