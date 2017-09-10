import React from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'antd';

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
         visible={isOpen}
         title={canteenName}
         closable
         cancelText="Cancel"
         onCancel={toggleMeetingWindow}
         okText={isLoggedIn ? 'Create' : 'Login and create'}
         onOk={() => {
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
         <MeetingCreator canteenName={canteenName} />
       </Modal>
     </div>
  );

export default Meeting;
