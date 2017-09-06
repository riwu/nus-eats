import React from 'react';
import moment from 'moment';
import { Form, FormControl, Radio, FormGroup, ControlLabel } from 'react-bootstrap';
import './DurationPicker.css';

// have to use index as key as duration can be set to the same
const DurationPicker = ({ durations, updateDurationModifierRadio, activeDurationModifierIndex }) => (
  <div>
    <Form inline>
      {durations.map((duration, index) => (
        <FormGroup key={index}>
          <Radio
            checked={index === activeDurationModifierIndex}
            onChange={() => { updateDurationModifierRadio(index); }}
          />
          <FormControl
            className="inputBox"
            type="number"
            min={0}
            value={duration.value ? duration.value.asMinutes() : ''}
            onChange={event => duration.onUpdate(moment.duration(Number(event.target.value), 'minutes'))}
            step={10}
          />
          <ControlLabel>Minutes</ControlLabel>
        </FormGroup>
      ))}
    </Form>
  </div>
);

export default DurationPicker;
