import React from 'react';
import { Form, Radio, FormGroup } from 'react-bootstrap';
import TimePicker from './TimePicker';

// have to use index as key as time can be set to the same
const TimeSelector = ({ timings, activeTimeModifierIndex, updateTimeModifierRadio }) => (
  <div>
    <Form inline>
      {timings.map((time, index) => (
        <FormGroup key={index}>
          <Radio
            checked={index === activeTimeModifierIndex}
            onChange={() => updateTimeModifierRadio(index)}
          />
          <TimePicker
            value={time.value}
            onUpdate={value => time.onUpdate(value)}
            updateTimeModifierRadio={() => updateTimeModifierRadio(index)}
          />
        </FormGroup>
        ))}
    </Form>
  </div>
);

export default TimeSelector;
