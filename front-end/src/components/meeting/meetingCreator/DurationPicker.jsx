import React from 'react';
import moment from 'moment';
import { ButtonGroup, Button } from 'react-bootstrap';
import './DurationPicker.css';

const DurationPicker = ({ durations }) => (
  <ButtonGroup vertical className="DurationPicker">
    {[15, 30, 45, 60, 90, 120, 180].map((minutes) => {
      const duration = moment.duration(minutes, 'm');
      const currentDuration = durations[0].value;
      return (
        <Button
          key={minutes}
          bsStyle={((currentDuration ? currentDuration.asMinutes() : null) === minutes) ? 'primary' : 'default'}
          onClick={() => durations[0].onUpdate(duration)}
        >
          {minutes < 60 ? `${duration.minutes()} min` : `${duration.asMinutes() / 60} hr` }
        </Button>
      );
    })}
  </ButtonGroup>
);

export default DurationPicker;
