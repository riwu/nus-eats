import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import DatePicker from './DatePicker';
import MeetingDatesComponent from '../containers/MeetingDatesContainer';
import getMergedDate from '../util/getMergedDate';

const Meeting = ({ toggleMeetingWindow, canteen, isOpen, createMeeting }) => (
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
        <DatePicker
          changeMeetingDate={(newDate) => { this.date = newDate; }}
          changeMeetingTime={(newTime) => { this.time = newTime; }}
        />
        <MeetingDatesComponent />
      </Modal.Body>
      <Modal.Footer>
        <Button
          bsStyle="primary"
          onClick={() => {
            const startTime = getMergedDate(this.date, this.time);
            createMeeting({
              canteenId: canteen.id,
              startTime,
              endTime: startTime,
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
