import React, { useState, useEffect } from "react";
import MonacoEditor from "react-monaco-editor";
import { submitProgramAPI } from "../../service/service.api";
import WebSockets from "../../websockets/Websockets";
import {
  conditionalChecking,
  dynamicBarColor,
} from "../../utils/jDoodle.utils";
import Dropdown from "../../components/Dropdown";
import Loader from "../../components/Loader";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import GamificationUI from "../../components/GamificationUI/GamificationUi";
import EditorOutput from "../../components/EditorOutput/EditorOutput";
import { clientData } from "../../constants/JDoodleConstant";

function ContestPage({ selectedQuestions, setSelectedQuestions }) {
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [code, setCode] = useState("");
  const [selectedOption, setSelectedOption] = useState("cpp");
  const [colorMode, setColorMode] = useState("vs-dark");
  const [finalOutput, setFinalOutput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [changeProblemTab, setChangeProblemTab] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setChangeProblemTab(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [userAnswers]);

  const currentProblem = selectedQuestions[currentProblemIndex];

  const DropdownMenu = ["java", "cpp", "python3"];
  const ColorDropdownMenu = ["vs-dark", "vs-light"];

  useEffect(() => {
    setCode("");
  }, [currentProblemIndex]);

  const handleCodeChange = (newValue) => {
    setCode(newValue);
  };

  const handleAnswerSubmit = async () => {
    setLoading(true);
    const userAnswersArray = [];

    for (let i = 0; i < currentProblem.testCases.length; i++) {
      const testCase = currentProblem.testCases[i];
      const question = selectedQuestions[currentProblemIndex];

      const jDoodleData = {
        clientId: clientData.CLIENTID,
        clientSecret: clientData.CLIENTSECRET,
        script: code,
        stdin: testCase.input,
        language: selectedOption,
        versionIndex: "0",
      };

      try {
        const responseOutput = await submitProgramAPI(jDoodleData);
        const jdoodleOutput = responseOutput.data.output;

        const isCorrect =
          jdoodleOutput?.replace(/[\r\n]/gm, "") ===
          JSON.stringify(testCase.output);

        userAnswersArray.push({
          code,
          isCorrect,
          testCase,
          question,
          output: jdoodleOutput,
        });
      } catch (error) {
        console.error("Error submitting program:", error);
      }
    }

    setUserAnswers([...userAnswers, ...userAnswersArray]);

    conditionalChecking(currentProblemIndex, selectedQuestions.length - 1)
      ? setCurrentProblemIndex(currentProblemIndex + 1)
      : settingData();
  };

  const settingData = () => {
    setSelectedQuestions([]);
    setFinalOutput(true);
  };

  const correctAnswer = userAnswers.filter(
    (data) => data.isCorrect === true
  )?.length;

  const totalAnswer = userAnswers?.length;

  const displayResult = () => {
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
  };

  const typeChecking = (type) => {
    return isNaN(+type) ? type : JSON.stringify(type);
  };

  const handleTabChange = (option) => {
    const noData = `Solution is availabe in Different Language.\nPlease switch to different Language`;
    switch (option) {
      case "cpp":
        return currentProblem?.cppAnswer ?? noData;
      case "java":
        return currentProblem?.javaAnswer ?? noData;

      default:
        break;
    }
  };
  console.log(changeProblemTab);

  const changeTab = (type) => {
    return type ? "#e8f0fc" : "#eee";
  };

  return (
    <div
      className={
        colorMode === "vs-light" ? "dark-background" : "light-background"
      }
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          {finalOutput
            ? displayResult()
            : currentProblem && (
                <div className="contest-page">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <div
                      className="test-case-details"
                      style={{ justifyContent: "space-between", width: "70%" }}
                    >
                      <button
                        className="contest-page-button"
                        style={{
                          width: "100%",
                          backgroundColor: changeTab(changeProblemTab),
                        }}
                        onClick={() => setChangeProblemTab(true)}
                      >
                        Problem
                      </button>
                      <button
                        className="contest-page-button"
                        style={{
                          width: "100%",
                          backgroundColor: changeTab(!changeProblemTab),
                        }}
                        onClick={() => setChangeProblemTab(false)}
                      >
                        Solution
                      </button>
                    </div>
                    <div className="contest-header">
                      {changeProblemTab ? (
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
                            <p>
                              {typeChecking(currentProblem.testCases[0].output)}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <h1>Solution</h1>
                          <SyntaxHighlighter language={selectedOption}>
                            {handleTabChange(selectedOption)}
                          </SyntaxHighlighter>
                        </div>
                      )}
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        width: "100%",
                        gap: "4px",
                      }}
                    >
                      <Dropdown
                        options={ColorDropdownMenu}
                        setSelectedOption={setColorMode}
                        selectedOption={colorMode}
                      />
                      <Dropdown
                        options={DropdownMenu}
                        setSelectedOption={setSelectedOption}
                        selectedOption={selectedOption}
                      />
                    </div>

                    <MonacoEditor
                      height="500"
                      width="800"
                      language={selectedOption}
                      theme={colorMode}
                      value={code}
                      onChange={handleCodeChange}
                      options={{
                        minimap: { enabled: false },
                        wordWrap: "on",
                        automaticLayout: true,
                      }}
                      editorDidMount={(editor) => editor.focus()}
                    />
                    <div className="editor-submit">
                      <div>
                        <h3>Output:</h3>
                        <EditorOutput
                          colorMode={colorMode}
                          script={code}
                          codeLanguage={selectedOption}
                        />
                      </div>
                      <button
                        className="contest-page-button-1"
                        onClick={handleAnswerSubmit}
                      >
                        {conditionalChecking(
                          currentProblemIndex,
                          selectedQuestions.length - 1
                        )
                          ? "Next"
                          : "Submit Answer"}
                      </button>
                    </div>
                    <div>
                      {/* <pre>{output}</pre> */}
                      {/* <WebSockets /> */}
                    </div>
                  </div>
                </div>
              )}
        </>
      )}
    </div>
  );
}

export default ContestPage;
