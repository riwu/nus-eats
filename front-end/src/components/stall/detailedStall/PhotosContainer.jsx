import React from 'react';
import { connect } from 'react-redux';
import { getAllPhotos } from '../../../actions';
import Photos from './Photos';

const stallPhotos = [...Array(10).keys()].map(value => ({
  url: `http://lorempixel.com/250/150/nature/${value}/`,
  uuid: value,
}));

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

const mapStateToProps = (state, ownProps) => {
  console.log('photos:', state.stallPhotos[ownProps.stallId]);
  return ({
    photos: Object.values(state.stallPhotos[ownProps.stallId] || stallPhotos).map(photo => ({
      original: photo.url,
      thumbnail: photo.url,
      uuid: photo.uuid,
    })),
  });
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  getAllPhotos: () => dispatch(getAllPhotos(ownProps.stallId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PhotosContainer);
