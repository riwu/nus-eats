import React from 'react';

import Picker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';

import Config from '../constants/Config';

const TimePicker = ({ time, updateTime }) => (
  <Picker
    value={time}
    onChange={updateTime}
    disabledMinutes={() => Config.MINUTES_TO_HIDE}
    showSecond={false}
    use12Hours
    hideDisabledOptions
    getPopupContainer={triggerNode => triggerNode.parentNode}
  />
  );

export default TimePicker;
