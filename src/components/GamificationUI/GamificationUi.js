import React from "react";
import "./GamificationUi.css";
import {
  dynamicBarColor,
  percentageCalculator,
} from "../../utils/jDoodle.utils";

const GamificationUI = ({ currentNumber, totalNumber }) => {
  return (
    <div className="gamification-container">
      <div
        className="gamification-progress"
        style={{
          width: `${percentageCalculator(currentNumber, totalNumber)}%`,
          backgroundColor: `${
            dynamicBarColor(currentNumber, totalNumber).color
          }`,
        }}
      ></div>
      <div className="gamification-info">
        {percentageCalculator(currentNumber, totalNumber)}%
      </div>
    </div>
  );
};

export default GamificationUI;
