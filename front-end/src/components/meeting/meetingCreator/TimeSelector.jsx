import React from 'react';
import { Form, Radio, FormGroup } from 'react-bootstrap';
import TimePicker from './TimePicker';

// have to use index as key as time can be set to the same
const TimeSelector = ({ timings }) => (
  <div>
    <Form inline>
      {timings.map((time, index) => (
        <FormGroup key={index}>
          <Radio />
          <TimePicker
            value={time.value}
            onUpdate={value => time.onUpdate(value)}
          />
        </FormGroup>
        ))}
    </Form>
  </div>
);

export default TimeSelector;