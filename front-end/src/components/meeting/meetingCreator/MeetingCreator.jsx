import React from 'react';
import { FormGroup, ControlLabel, FormControl, ButtonGroup, Glyphicon } from 'react-bootstrap';
import DayPicker from './DayPicker';
import TimeSelector from './TimeSelector';
import DurationPicker from './DurationPicker';

import './MeetingCreator.css';

const MeetingCreator = ({ meetings, recentMeetings, activeTimeModifierIndex, updateTimeModifierRadio,
  activeDurationModifierIndex, updateDurationModifierRadio, titlePlaceholder,
  title, description, updateMeetingCreatorTitle, updateMeetingCreatorDescription }) => (
    <div className="MeetingCreator">
      <div className="pickers">
        <div>
          <div className="text">Pick a Date</div>
          <DayPicker meetings={meetings} recentMeetings={recentMeetings} />
        </div>
        <div>
          <div className="text">Pick a Time</div>
          <div>
            <TimeSelector
              timings={recentMeetings.map(meeting => ({
                value: meeting.time,
                onUpdate: time => meeting.onTimeUpdate(time),
              }))}
              updateTimeModifierRadio={updateTimeModifierRadio}
              activeTimeModifierIndex={activeTimeModifierIndex}
            />
          </div>
        </div>
        <div>
          <div className="text">Pick a Duration</div>
          <DurationPicker
            durations={recentMeetings.map(meeting => ({
              value: meeting.duration,
              onUpdate: duration => meeting.onDurationUpdate(duration),
            }))}
            updateDurationModifierRadio={updateDurationModifierRadio}
            activeDurationModifierIndex={activeDurationModifierIndex}
          />
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
