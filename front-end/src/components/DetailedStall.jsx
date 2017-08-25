import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import FacebookCommentsContainer from '../containers/FacebookCommentsContainer';

const DetailedStall = ({ stall, toggleStallView, ratingComponent }) => (
  <Modal show={!!stall} onHide={toggleStallView}>
    <Modal.Header closeButton>
      <Modal.Title>{stall ? stall.name : null}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {stall ? stall.description : null}
      <div>Your rating:</div>
      {ratingComponent}
      {stall && <FacebookCommentsContainer href={`${window.location.origin}/stalls/${stall.id}`} />}
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={toggleStallView}>Close</Button>
    </Modal.Footer>
  </Modal>
  );

export default DetailedStall;
