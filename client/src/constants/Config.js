const Config = {
  TIME_PICKER_MINUTE_INTERVAL: 10,
};

Config.MINUTES_TO_HIDE = [...Array(60).keys()]
  .filter(min => min % Config.TIME_PICKER_MINUTE_INTERVAL !== 0);

Object.freeze(Config);

export default Config;
