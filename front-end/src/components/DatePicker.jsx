import React from 'react';
import moment from 'moment';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import TimePicker from '../containers/TimePickerContainer';
import DurationPicker from '../containers/DurationPickerContainer';

import Config from '../constants/Config';
import './DatePicker.css';

class DatePicker extends React.Component {
  componentWillMount() {
    const interval = Config.TIME_PICKER_MINUTE_INTERVAL;
    this.now = moment();
    this.now.add(interval - (this.now.minute() % interval), 'minutes');
    this.props.updateNewMeetingDate(this.now);
    this.props.updateNewMeetingTime(this.now);
  }
  render() {
    return (
      <div className="DatePicker">
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

export default DatePicker;
