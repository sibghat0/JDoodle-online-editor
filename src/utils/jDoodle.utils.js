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
