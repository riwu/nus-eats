const Config = {
  TIME_PICKER_MINUTE_INTERVAL: 10,
};

Config.MINUTES_TO_HIDE = [...Array(60).keys()]
  .filter(min => min % Config.TIME_PICKER_MINUTE_INTERVAL !== 0);

Config.getDefaultTitle = (time, canteenName) => {
  const getMealName = (hour) => {
    switch (true) {
      case (hour < 9):
        return 'Breakfast';
      case (hour < 15):
        return 'Lunch';
      case (hour < 20):
        return 'Dinner';
      default:
        return 'Supper';
    }
  };
  return `${getMealName(time.hour())} at ${canteenName}`;
};

Object.freeze(Config);

export default Config;
