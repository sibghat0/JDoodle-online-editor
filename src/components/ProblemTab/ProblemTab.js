import React from "react";
import { typeChecking } from "../../utils/jDoodle.utils";

export default function ProblemTab({ currentProblem, currentProblemIndex }) {
  return (
    <div style={{ height: "100%", overflow: "auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h1>Problem {currentProblemIndex + 1}</h1>
        <h4>Diffculty Level : {currentProblem.diffcult}</h4>
      </div>
      <h3>{currentProblem.problemName}</h3>
      <p>{currentProblem.statement}</p>
      <div>
        <h4> Input Format</h4>
        <p>{currentProblem.inputFormat}</p>
      </div>
      <div>
        <h4> Output Format</h4>
        <p>{currentProblem.outputFormat}</p>
      </div>
      <div>
        <h4> Input </h4>
        <p>{currentProblem.testCases[0].input}</p>
      </div>
      <div>
        <h4> Output </h4>
        <p>{typeChecking(currentProblem.testCases[0].output)}</p>
      </div>
    </div>
  );
}
