import React from 'react';
import { Form, FormControl, Radio, FormGroup, ControlLabel } from 'react-bootstrap';
import './DurationPicker.css';

const DurationPicker = ({ duration, updateNewMeetingDuration }) => (
  <div>
    <Form inline>
      <FormGroup>
        <Radio defaultChecked />
        <FormControl
          className="inputBox"
          type="number"
          min={0}
          value={duration}
          onChange={event => updateNewMeetingDuration(Number(event.target.value))}
          step={10}
        />
        <ControlLabel>Minutes</ControlLabel>
      </FormGroup>
    </Form>
  </div>
);

export default DurationPicker;
