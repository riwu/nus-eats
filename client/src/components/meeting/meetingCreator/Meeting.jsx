import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import MeetingCreator from './MeetingCreatorContainer';
import getMergedDate from '../../../util/getMergedDate';

const Meeting = ({ openFeed, toggleMeetingWindow, canteenName, canteenId, isOpen, createMeeting,
   newMeetingDate, newMeetingTime, newMeetingDuration, title, description, titlePlaceholder,
   isLoggedIn, login, userId }) => (
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
         </Modal.Body>
         <Modal.Footer>
           <Button onClick={toggleMeetingWindow}>Cancel</Button>
           <Button
             bsStyle="primary"
             onClick={() => {
               const invokeCreateMeeting = () => {
                 createMeeting({
                   canteenId,
                   startTime: getMergedDate(newMeetingDate, newMeetingTime),
                   duration: newMeetingDuration,
                   title: title.trim() || titlePlaceholder,
                   description,
                   userId,
                 });
                 toggleMeetingWindow();
                 openFeed();
               };
               if (!isLoggedIn) {
                 login().then(() => {
                   invokeCreateMeeting();
                 });
               } else {
                 invokeCreateMeeting();
               }
             }}
           >
             {isLoggedIn ? 'Create' : 'Login and create'}
           </Button>
         </Modal.Footer>
       </Modal>
     </div>
  );

export default Meeting;
