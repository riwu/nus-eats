import React from 'react';

import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';

import Config from '../../../constants/Config';
import './TimePicker.css';

const isMobile = 'ontouchstart' in window || navigator.msMaxTouchPoints;
const className = isMobile ? 'TimePickerMobile' : 'TimePicker';

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
