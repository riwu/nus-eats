import React from 'react';
import moment from 'moment';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import TimePicker from '../containers/TimePickerContainer';
import DurationPicker from '../containers/DurationPickerContainer';

import Config from '../constants/Config';
import './MeetingCreator.css';

class MeetingCreator extends React.Component {
  componentWillMount() {
    const interval = Config.TIME_PICKER_MINUTE_INTERVAL;
    this.now = moment();
    // update both time and date here instead of in their own components
    // to ensure they are defaulting to same time
    this.now.add(interval - (this.now.minute() % interval), 'minutes');
    this.props.updateNewMeetingDate(this.now);
    this.props.updateNewMeetingTime(this.now);
  }
  render() {
    return (
      <div className="MeetingCreator">
        <div className="picker">
          <div className="text">Select Date</div>
          <DayPicker
            onDayClick={date => this.props.updateNewMeetingDate(moment(date))}
            selectedDays={(this.props.newMeetingDate || this.now).toDate()}
          />
        </div>
        <div className="picker">
          <div className="text">Select Time</div>
          <TimePicker />
        </div>
        <div className="picker">
          <div className="text">Select Duration</div>
          <DurationPicker />
        </div>
      </div>
    );
  }
}

export default MeetingCreator;
