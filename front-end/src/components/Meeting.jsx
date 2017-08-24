import React from 'react';
import { Button, Glyphicon, Modal } from 'react-bootstrap';

const Meeting = ({ toggleMeetingWindow, canteen, isOpen }) => (
  <div>
    <Button onClick={toggleMeetingWindow}>
      <Glyphicon glyph="plus" />
      Meeting
    </Button>
    <Modal show={isOpen} onHide={toggleMeetingWindow}>
      <Modal.Header closeButton>
        <Modal.Title>{canteen ? canteen.name : null}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Time

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={toggleMeetingWindow}>Close</Button>
      </Modal.Footer>
    </Modal>
  </div>
);

export default Meeting;
