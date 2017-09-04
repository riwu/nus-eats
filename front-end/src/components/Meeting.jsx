import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import moment from 'moment';
import DatePicker from '../containers/DatePickerContainer';
import MeetingDates from '../containers/MeetingDatesContainer';
import getMergedDate from '../util/getMergedDate';

const Meeting = ({ toggleMeetingWindow, canteen, isOpen, createMeeting, newMeetingDate, newMeetingTime, newMeetingDuration }) => (
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
        <DatePicker />
        <MeetingDates />
      </Modal.Body>
      <Modal.Footer>
        <Button
          bsStyle="primary"
          onClick={() => {
            createMeeting({
              canteenId: canteen.id,
              startTime: getMergedDate(newMeetingDate, newMeetingTime),
              duration: newMeetingDuration,
            });
          }}
        >
          Create
        </Button>
        <Button onClick={toggleMeetingWindow}>Close</Button>
      </Modal.Footer>
    </Modal>
  </div>
);

export default Meeting;
