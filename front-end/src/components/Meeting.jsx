import React from 'react';
import { Button, Glyphicon, Modal } from 'react-bootstrap';

const Meeting = ({ toggleMeetingWindow, canteen, isOpen, DatePickerComponent, createMeeting, MeetingDatesComponent }) => (
  <div>
    <Button onClick={toggleMeetingWindow}>
      + Meeting
    </Button>
    <Modal
      show={isOpen}
      onHide={toggleMeetingWindow}
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{canteen ? canteen.name : null}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <DatePickerComponent />
        <MeetingDatesComponent />
      </Modal.Body>
      <Modal.Footer>
        <Button bsStyle="primary" onClick={createMeeting}>Create</Button>
        <Button onClick={toggleMeetingWindow}>Close</Button>
      </Modal.Footer>
    </Modal>
  </div>
);

export default Meeting;
