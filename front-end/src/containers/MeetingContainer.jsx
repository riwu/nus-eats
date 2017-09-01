import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import Meeting from '../components/Meeting';
import { toggleMeetingWindow, createMeeting } from '../actions';
import DatePicker from '../components/DatePicker';
import MeetingDatesComponent from './MeetingDatesContainer';

const mapStateToProps = (state, ownProps) => ({
  canteen: ownProps.canteen,
  isOpen: state.meeting.canteenId === ownProps.canteen.id,
  meeting: state.meeting,
});

const mapDispatchToProps = (dispatch, ownProps) => {
  let date;
  let time;
  return {
    toggleMeetingWindow:
        bindActionCreators(toggleMeetingWindow(ownProps.canteen.id), dispatch),
    createMeeting: () => {
      const startTime = moment(date.format('YYYY-MM-DD') + time.format(' HH:mm:ss'));
      dispatch(createMeeting({
        canteenId: ownProps.canteen.id,
        startTime,
        endTime: startTime,
      }));
    },
    DatePickerComponent: <DatePicker
      changeMeetingDate={(newDate) => { date = newDate; }}
      changeMeetingTime={(newTime) => { time = newTime; }}
    />,
    MeetingDatesComponent,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Meeting);
