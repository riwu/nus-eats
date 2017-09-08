import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import FacebookCommentsContainer from '../../facebook/FacebookCommentsContainer';
import RatingContainer from '../RatingContainer';
import PhotosContainer from './PhotosContainer';
import ImageUploader from './ImageUploader';

const DetailedStall = ({ stall, closeModal }) => (
  <Modal show={!!stall} onHide={closeModal}>
    <Modal.Header style={{ display: 'flex' }}>
      <Modal.Title>{stall ? stall.name : null}</Modal.Title>
      <ImageUploader stallId={stall ? stall.id : null} />
    </Modal.Header>
    <Modal.Body>
      {stall ? stall.description : null}
      <PhotosContainer stallId={stall ? stall.id : null} />
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
