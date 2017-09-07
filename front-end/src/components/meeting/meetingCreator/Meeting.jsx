import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import MeetingCreator from './MeetingCreatorContainer';
import MeetingsDisplay from './MeetingsDisplayContainer';
import getMergedDate from '../../../util/getMergedDate';

const Meeting = ({ toggleMeetingWindow, canteenName, canteenId, isOpen, createMeeting,
   newMeetingDate, newMeetingTime, newMeetingDuration, title, description, titlePlaceholder,
   isLoggedIn, login }) => (
     <div>
       <Button
         onClick={toggleMeetingWindow}
       >
        + Meeting
      </Button>
       <Modal
         show={isOpen}
         onHide={toggleMeetingWindow}
         animation={false}
       >
         <Modal.Header closeButton>
           <Modal.Title>{canteenName}</Modal.Title>
         </Modal.Header>
         <Modal.Body>
           <MeetingCreator canteenName={canteenName} />
           <MeetingsDisplay />
         </Modal.Body>
         <Modal.Footer>
           <Button
             bsStyle="primary"
             onClick={() => {
               const invokeCreateMeeting = () => createMeeting({
                 canteenId,
                 startTime: getMergedDate(newMeetingDate, newMeetingTime),
                 duration: newMeetingDuration,
                 title: title.trim() || titlePlaceholder,
                 description,
               });
               if (!isLoggedIn) {
                 login().then(() => {
                   invokeCreateMeeting();
                 }).catch(() => {}); // do nothing if user refuse to log in
               } else {
                 invokeCreateMeeting();
               }
             }}
           >
             {isLoggedIn ? 'Create' : 'Login and create'}
           </Button>
           <Button onClick={toggleMeetingWindow}>Close</Button>
         </Modal.Footer>
       </Modal>
     </div>
  );

export default Meeting;
