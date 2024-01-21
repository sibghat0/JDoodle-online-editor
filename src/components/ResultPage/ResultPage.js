import React from "react";
import { dynamicBarColor, typeChecking } from "../../utils/jDoodle.utils";
import GamificationUI from "../GamificationUI/GamificationUi";

export default function ResultPage({ userAnswers }) {
  const correctAnswer = userAnswers.filter(
    (data) => data.isCorrect === true
  )?.length;

  const totalAnswer = userAnswers?.length;
  return (
    <div>
      <h2 style={{ margin: "20px" }}>Your Results</h2>
      <h4 style={{ margin: "0 20px" }}>
        You have scored {correctAnswer} out of {totalAnswer}
      </h4>
      <div className="game-ui">
        <h4 style={{ margin: "0 20px" }}>
          {dynamicBarColor(correctAnswer, totalAnswer).value}
        </h4>
        <div style={{ width: "400px", marginRight: "10px" }}>
          <GamificationUI
            totalNumber={totalAnswer}
            currentNumber={correctAnswer}
          />
        </div>
      </div>
      <div style={{ width: "2px" }} />
      <div className="detailed-solution">
        <h2 style={{ marginLeft: "20px" }}>Solution</h2>
        <div className="test-case-container">
          {userAnswers.map((answer, index) => (
            <div
              className={`test-case ${
                answer.isCorrect ? "test-pass" : "test-fail"
              }`}
              key={index}
            >
              <h3 style={{ display: "flex", justifyContent: "center" }}>
                {answer.question.problemName}
              </h3>
              <h4> Test Case {answer.testCase.testId}</h4>
              <div className="test-case-details">
                <span>Input :</span>
                <p>{answer.testCase.input}</p>
              </div>
              <div className="test-case-details">
                <span>Output :</span>
                <p>{answer.output ?? "Empty"}</p>
              </div>
              <div className="test-case-details">
                <span>Expected Output :</span>
                <p>{typeChecking(answer.testCase.output)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
