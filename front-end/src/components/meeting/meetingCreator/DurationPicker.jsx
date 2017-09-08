import React from 'react';
import moment from 'moment';
import { Form, FormControl, Radio, FormGroup, ControlLabel } from 'react-bootstrap';
import './DurationPicker.css';

// have to use index as key as duration can be set to the same
const DurationPicker = ({ durations, updateDurationModifierRadio, activeDurationModifierIndex }) => (
  <Form inline>
    {durations.map((duration, index) => (
      <div key={index}>
        <FormGroup className="group">
          {durations.length === 1 ? null :
          <Radio
            checked={index === activeDurationModifierIndex}
            onChange={() => { updateDurationModifierRadio(index); }}
          />
          }
          <FormControl
            className="inputBox"
            type="number"
            min={0}
            value={duration.value ? duration.value.asMinutes() : ''}
            onChange={event => duration.onUpdate(moment.duration(Number(event.target.value), 'minutes'))}
            step={10}
            onClick={() => { updateDurationModifierRadio(index); }}
          />
          <ControlLabel>Minutes</ControlLabel>
        </FormGroup>
      </div>
      ))}
  </Form>
);

export default DurationPicker;
