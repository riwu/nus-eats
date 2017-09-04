import React from 'react';

import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';

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
          <TimePicker
            className="timePicker"
            showSecond={false}
            use12Hours
            value={this.props.newMeetingTime}
            disabledMinutes={() => Config.MINUTES_TO_HIDE}
            hideDisabledOptions
            getPopupContainer={triggerNode => triggerNode.parentNode}
            onChange={this.props.updateNewMeetingTime}
          />
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
