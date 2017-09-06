import React from 'react';

import Picker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';

import Config from '../../../constants/Config';

const TimePicker = ({ value, onUpdate }) => (
  <Picker
    value={value}
    onChange={onUpdate}
    disabledMinutes={() => Config.MINUTES_TO_HIDE}
    showSecond={false}
    use12Hours
    hideDisabledOptions
    getPopupContainer={triggerNode => triggerNode.parentNode}
  />
);

export default TimePicker;
