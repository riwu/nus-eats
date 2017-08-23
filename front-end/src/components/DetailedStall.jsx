import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const detailedStall = ({ stall, closeStoreView }) => (
  <Modal show={!!stall} onHide={closeStoreView}>
    <Modal.Header closeButton>
      <Modal.Title>{stall ? stall.name : null}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {stall ? stall.description : null}
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={closeStoreView}>Close</Button>
    </Modal.Footer>
  </Modal>
);

export default detailedStall;
