import React from 'react';
import moment from 'moment';
import { Form, FormControl, Radio, FormGroup, ControlLabel } from 'react-bootstrap';
import './DurationPicker.css';

const DurationPicker = ({ duration, updateDuration, showRadio = true }) => (
  <div>
    <Form inline>
      <FormGroup>
        {!showRadio ? null : <Radio defaultChecked /> }
        <FormControl
          className="inputBox"
          type="number"
          min={0}
          value={duration.asMinutes()}
          onChange={event => updateDuration(moment.duration(Number(event.target.value), 'minutes'))}
          step={10}
        />
        <ControlLabel>Minutes</ControlLabel>
      </FormGroup>
    </Form>
  </div>
);

export default DurationPicker;
