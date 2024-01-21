import React, { useState, useEffect } from "react";
import MonacoEditor from "react-monaco-editor";
import { submitProgramAPI } from "../../service/service.api";
import WebSockets from "../../websockets/Websockets";
import {
  colorChange,
  conditionalChecking,
  typeChecking,
} from "../../utils/jDoodle.utils";
import Dropdown from "../../components/Dropdown";
import Loader from "../../components/Loader";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import EditorOutput from "../../components/EditorOutput/EditorOutput";
import {
  ColorDropdownMenu,
  DropdownMenu,
  clientData,
} from "../../constants/JDoodleConstant";
import ResultPage from "../../components/ResultPage/ResultPage";

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

  const changeTab = (type) => {
    return type ? "#e8f0fc" : "#eee";
  };

  return (
    <div className={colorChange(colorMode)}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {finalOutput ? (
            <ResultPage userAnswers={userAnswers} />
          ) : (
            currentProblem && (
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
            )
          )}
        </>
      )}
    </div>
  );
}

export default ContestPage;
