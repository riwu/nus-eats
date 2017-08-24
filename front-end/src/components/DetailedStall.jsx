import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import FacebookCommentsContainer from '../containers/FacebookCommentsContainer';

const DetailedStall = ({ stall, closeStoreView, ratingComponent }) => (
  <Modal show={!!stall} onHide={closeStoreView}>
    <Modal.Header closeButton>
      <Modal.Title>{stall ? stall.name : null}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {stall ? stall.description : null}
      {stall && <FacebookCommentsContainer href={`${window.location.origin}/stalls/${stall.id}`} />}
      <div>Your rating:</div>
      {ratingComponent}
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={closeStoreView}>Close</Button>
    </Modal.Footer>
  </Modal>
);

export default DetailedStall;
