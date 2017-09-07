import React from 'react';
import { Button, Modal, Tooltip, OverlayTrigger } from 'react-bootstrap';
import MeetingCreator from './MeetingCreatorContainer';
import MeetingsDisplay from './MeetingsDisplayContainer';
import getMergedDate from '../../../util/getMergedDate';

const Meeting = ({ toggleMeetingWindow, canteen, isOpen, createMeeting,
   newMeetingDate, newMeetingTime, newMeetingDuration, title, description, isLoggedIn, login }) => {
  const trimmedTitle = title.trim();
  const button = (
    <Button
      bsStyle="primary"
      onClick={() => {
        if (trimmedTitle === '' || !isLoggedIn) {
          return;
        }
        createMeeting({
          canteenId: canteen.id,
          startTime: getMergedDate(newMeetingDate, newMeetingTime),
          duration: newMeetingDuration,
          title: trimmedTitle,
          description,
        });
      }}
    >
      Create
    </Button>
  );
  return (
    <div>
      <Button
        onClick={() => {
          if (!isLoggedIn) {
            login();
          }
          toggleMeetingWindow();
        }}
      >
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
          <MeetingCreator />
          <MeetingsDisplay />
        </Modal.Body>
        <Modal.Footer>
          {
            trimmedTitle ? button :
            <OverlayTrigger
              ref={(ref) => { this.overlayRef = ref; }}
              placement="left"
              overlay={
                <Tooltip id="Enter a title">
                  {isLoggedIn ? 'Enter a title!' : 'Please log in first!'}
                </Tooltip>
              }
            >
              {button}
            </OverlayTrigger>
          }

          <Button onClick={toggleMeetingWindow}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Meeting;
