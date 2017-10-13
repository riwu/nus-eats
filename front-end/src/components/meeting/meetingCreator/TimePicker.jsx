import React from 'react';

import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';

import Config from '../../../constants/Config';
import './TimePicker.css';

// needed due to TimePicker different appearance only on Android (irrespective of screen size)
const ua = navigator.userAgent.toLowerCase();
const isAndroid = ua.indexOf('android') > -1;
const className = isAndroid ? 'TimePickerAndroid' : 'TimePicker';

const TimePickerComponent = ({ value, onUpdate, updateTimeModifierRadio }) => (
  <TimePicker
    className={className}
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

export default TimePickerComponent;
