import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import FacebookCommentsContainer from '../../facebook/FacebookCommentsContainer';
import RatingContainer from '../RatingContainer';
import PhotosContainer from './PhotosContainer';
import ImageUploader from './ImageUploaderContainer';

const DetailedStall = ({ stall, closeModal }) => (
  <Modal show={!!stall} onHide={closeModal}>
    <Modal.Header closeButton>
      <Modal.Title>{stall ? stall.name : null}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {stall ? stall.description : null}
      <PhotosContainer stallId={stall ? stall.id : null} />
      <ImageUploader />
      <div>Your rating:</div>
      {stall ? <RatingContainer stallId={stall.id} /> : null }
      {stall && <FacebookCommentsContainer href={`${window.location.origin}/stalls/${stall.id}`} />}
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={closeModal}>Close</Button>
    </Modal.Footer>
  </Modal>
  );

export default DetailedStall;