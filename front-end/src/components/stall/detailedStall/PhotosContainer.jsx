import React from 'react';
import { connect } from 'react-redux';
import { getAllPhotos } from '../../../actions';
import Photos from './Photos';

const stallPhotos = [...Array(10).keys()].reduce((obj, value) => ({
  ...obj,
  [value]: {
    original: `http://lorempixel.com/250/150/nature/${value}/`,
    thumbnail: `http://lorempixel.com/250/150/nature/${value}/`,
  },
}), {});

class PhotosContainer extends React.Component {
  componentDidMount() {
    this.props.getAllPhotos();
  }
  render() {
    return (
      <Photos photos={this.props.photos} />
    );
  }
}

const mapStateToProps = state => ({
  photos: Object.entries(stallPhotos).map(([id, photo]) => ({
    original: photo.original,
    thumbnail: photo.thumbnail,
  })),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getAllPhotos: () => dispatch(getAllPhotos(ownProps.stallId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PhotosContainer);
