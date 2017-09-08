import React from 'react';
import { connect } from 'react-redux';
import { getAllPhotos } from '../../../actions';
import Photos from './Photos';

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
  photos: state.stallPhotos,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getAllPhotos: () => dispatch(getAllPhotos(ownProps.stallId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PhotosContainer);
