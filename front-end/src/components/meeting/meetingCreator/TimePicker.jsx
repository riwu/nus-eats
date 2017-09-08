import React from 'react';

import Picker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';

import Config from '../../../constants/Config';

const TimePicker = ({ value, onUpdate, updateTimeModifierRadio }) => (
  <Picker
    style={{ marginTop: '15px' }}
    value={value}
    onChange={onUpdate}
    disabledMinutes={() => Config.MINUTES_TO_HIDE}
    showSecond={false}
    use12Hours
    open
    allowEmpty={false}
    hideDisabledOptions
    getPopupContainer={triggerNode => triggerNode.parentNode}
    onOpen={updateTimeModifierRadio}
  />
);

export default TimePicker;
