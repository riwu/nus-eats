import React from 'react';
import moment from 'moment';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import TimeSelector from './TimeSelector';
import DurationPicker from './DurationPicker';

import './MeetingCreator.css';

const MeetingCreator = ({ meetings, activeTimeModifierIndex, updateTimeModifierRadio,
  activeDurationModifierIndex, updateDurationModifierRadio,
  title, description, updateMeetingCreatorTitle, updateMeetingCreatorDescription }) => (
    <div>
      <div className="MeetingCreator">
        <div className="picker">
          <div className="text">Select Date</div>
          <DayPicker
            onDayClick={date => meetings[0].onDateUpdate(moment(date))}
            selectedDays={meetings[0].date ? meetings[0].date.toDate() : null}
          />
        </div>
        <div>
          <div className="picker">
            <div className="text">Select Time</div>
            <TimeSelector
              timings={meetings.map(meeting => ({
                value: meeting.time,
                onUpdate: time => meeting.onTimeUpdate(time),
              }))}
              updateTimeModifierRadio={updateTimeModifierRadio}
              activeTimeModifierIndex={activeTimeModifierIndex}
            />
          </div>
          <div className="picker">
            <div className="text">Select Duration</div>
            <DurationPicker
              durations={meetings.map(meeting => ({
                value: meeting.duration,
                onUpdate: duration => meeting.onDurationUpdate(duration),
              }))}
              updateDurationModifierRadio={updateDurationModifierRadio}
              activeDurationModifierIndex={activeDurationModifierIndex}
            />
          </div>
        </div>
      </div>

      <FormGroup className="input">
        <ControlLabel>Title</ControlLabel>
        <FormControl
          value={title}
          onChange={event => updateMeetingCreatorTitle(event.target.value)}
        />
      </FormGroup>
      <FormGroup className="picker">
        <ControlLabel>Description</ControlLabel>
        <FormControl
          placeholder="Enter an optional description"
          componentClass="textarea"
          value={description}
          onChange={event => updateMeetingCreatorDescription(event.target.value)}
        />
      </FormGroup>
    </div>
);

export default MeetingCreator;
