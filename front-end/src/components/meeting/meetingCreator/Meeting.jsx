import React from 'react';
import { Button, Modal, Tooltip, OverlayTrigger } from 'react-bootstrap';
import MeetingCreator from './MeetingCreatorContainer';
import MeetingsDisplay from './MeetingsDisplayContainer';
import getMergedDate from '../../../util/getMergedDate';

const Meeting = ({ toggleMeetingWindow, canteen, isOpen, createMeeting,
   newMeetingDate, newMeetingTime, newMeetingDuration, title, description }) => (
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
           <MeetingCreator />
           <MeetingsDisplay />
         </Modal.Body>
         <Modal.Footer>
           <OverlayTrigger
             placement="left"
             overlay={title.trim() ? '' : <Tooltip id="Enter a title">Enter a title!</Tooltip>}
           >
             <div style={{ display: 'inline' }}>
               <Button
                 style={{ pointerEvents: 'none' }}
                 bsStyle="primary"
                 disabled={!title.trim()}
                 onClick={() => {
                   createMeeting({
                     canteenId: canteen.id,
                     startTime: getMergedDate(newMeetingDate, newMeetingTime),
                     duration: newMeetingDuration,
                     title: title.trim(),
                     description,
                   });
                 }}
               >
                Create
              </Button>
             </div>
           </OverlayTrigger>
           <Button onClick={toggleMeetingWindow}>Close</Button>
         </Modal.Footer>
       </Modal>
     </div>
);

export default Meeting;
