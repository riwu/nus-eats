import React from 'react';
import moment from 'moment';
import { ButtonGroup, Button } from 'react-bootstrap';
import './DurationPicker.css';

const isBigWindow = () => Math.max(document.documentElement.clientWidth, window.innerWidth || 0) >= 580;

class DurationPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      verticalSelection: isBigWindow(),
    };
  }

  componentWillMount() {
    window.onresize = () => this.setState({ verticalSelection: isBigWindow() });
  }

  componentWillUnmount() {
    window.onresize = () => {};
  }

  render() {
    return (
      <ButtonGroup vertical={this.state.verticalSelection} className="DurationPicker">
        {[15, 30, 45, 60, 90, 120, 180].map((minutes) => {
          const duration = moment.duration(minutes, 'm');
          const currentDuration = this.props.durations[0].value;
          return (
            <Button
              key={minutes}
              bsStyle={((currentDuration ? currentDuration.asMinutes() : null) === minutes) ? 'primary' : 'default'}
              onClick={() => this.props.durations[0].onUpdate(duration)}
            >
              {minutes < 60 ? `${duration.minutes()} min` : `${duration.asMinutes() / 60} hr` }
            </Button>
          );
        })}
      </ButtonGroup>
    );
  }
}

export default DurationPicker;
