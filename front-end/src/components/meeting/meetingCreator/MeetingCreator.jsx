import React from 'react';
import moment from 'moment';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { FormGroup, ControlLabel, FormControl, ButtonGroup, Glyphicon } from 'react-bootstrap';
import TimeSelector from './TimeSelector';
import DurationPicker from './DurationPicker';

import './MeetingCreator.css';

const MeetingCreator = ({ meetings, activeTimeModifierIndex, updateTimeModifierRadio,
  activeDurationModifierIndex, updateDurationModifierRadio, titlePlaceholder,
  title, description, updateMeetingCreatorTitle, updateMeetingCreatorDescription }) => (
    <div>
      <div className="pickers">
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

      <FormGroup>
        <ControlLabel>Title</ControlLabel>
        <ButtonGroup className="formInput">
          <FormControl
            value={title}
            placeholder={titlePlaceholder}
            onChange={event => updateMeetingCreatorTitle(event.target.value)}
          />
          <Glyphicon
            className="close"
            glyph="remove-sign"
            onClick={() => updateMeetingCreatorTitle('')}
          />
        </ButtonGroup>
      </FormGroup>
      <FormGroup>
        <ControlLabel>Description</ControlLabel>
        <ButtonGroup className="formInput">
          <FormControl
            placeholder="Enter an optional description"
            componentClass="textarea"
            value={description}
            onChange={event => updateMeetingCreatorDescription(event.target.value)}
          />
          <Glyphicon
            className="close"
            glyph="remove-sign"
            onClick={() => updateMeetingCreatorDescription('')}
          />
        </ButtonGroup>
      </FormGroup>
    </div>
);

export default MeetingCreator;
