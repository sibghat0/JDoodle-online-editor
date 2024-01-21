import { barColor } from "../constants/JDoodleConstant";

export const conditionalChecking = (number, totalNumber) => {
  if (number < totalNumber) {
    return true;
  }
  return false;
};

export const percentageCalculator = (value, totalValue) =>
  (value / totalValue) * 100;

export const dynamicBarColor = (value, totalValue) => {
  const percentageCalculated = percentageCalculator(value, totalValue);

  switch (true) {
    case percentageCalculated > 50:
      return barColor(value).green;
    case percentageCalculated < 50 && percentageCalculated > 20:
      return barColor(value).yellow;
    case percentageCalculated < 20:
      return barColor(value).red;
    default:
      break;
  }
};

export const typeChecking = (type) => {
  return isNaN(+type) ? type : JSON.stringify(type);
};

export const colorChange = (colorMode, colorChecker = "vs-light") => {
  return colorMode === colorChecker ? "dark-background" : "light-background";
};
