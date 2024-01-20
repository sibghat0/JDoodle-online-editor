import { Link } from "react-router-dom";
import "./style.css";
import { useState } from "react";
import { problems, selectingTypeConstant } from "../constants/JDoodleConstant";
import Dropdown from "../components/Dropdown";
import homepage from "../assets/Homepage.webp";

function JDoodleContainer({ selectedQuestions, setSelectedQuestions }) {
  const [contestOption, setContestOption] = useState(false);
  const [contestCheckOption, setContestCheckOption] = useState({
    random: false,
    selected: false,
  });
  const [questionAmount, setQuestionAmount] = useState("");

  const totalQuestion = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const updateContestCheckOption = (optionName, value) => {
    setContestCheckOption((prevState) => ({
      ...prevState,
      [optionName]: value,
    }));
  };
  const getRandomQuestions = () => {
    const randomQuestions = [];
    while (randomQuestions.length < (questionAmount ?? 5)) {
      const randomIndex = Math.floor(Math.random() * problems.length);
      if (!randomQuestions.includes(randomIndex)) {
        randomQuestions.push(randomIndex);
      }
    }
    return randomQuestions.map((index) => problems[index]);
  };

  const handleRandomQuestionSelect = () => {
    const randomQuestions = getRandomQuestions();
    setSelectedQuestions(randomQuestions);
  };

  const handleSelectiveQuestionToggle = (question, totalLength) => {
    if (
      selectedQuestions.length < totalLength ||
      selectedQuestions.includes(question)
    ) {
      setSelectedQuestions((prevSelection) => {
        const isSelected = prevSelection.some(
          (selected) => selected.id === question.id
        );

        if (isSelected) {
          return prevSelection.filter(
            (selected) => selected.id !== question.id
          );
        } else {
          return [...prevSelection, question];
        }
      });
    }
  };

  const selectQuestionType = {
    random_contest: {
      name: "Select Random Question",
      optionChange: () => {
        updateContestCheckOption(
          selectingTypeConstant.RANDOM,
          !contestCheckOption.random
        );
        handleRandomQuestionSelect();
      },
      disabled: contestCheckOption.selected && true,
    },
    selected_contenst: {
      name: "Selective Question",
      optionChange: () =>
        updateContestCheckOption(
          selectingTypeConstant.SELECTED,
          !contestCheckOption.selected
        ),
      disabled: contestCheckOption.random && true,
    },
  };

  const selectingType = (type) => {
    switch (type) {
      case selectingTypeConstant.RANDOM:
        return selectQuestionType.random_contest;

      case selectingTypeConstant.SELECTED:
        return selectQuestionType.selected_contenst;

      default:
        break;
    }
  };

  return (
    <div className="jd-container">
      <div className="jd-header-cont">
        <div className="jd-header">
          <div className="jd-header-data">Skills speak louder than words</div>
          <div className="jd-secondary-header">
            We help companies develop the strongest tech teams around. We help
            candidates sharpen their tech skills and pursue job opportunities.
          </div>
        </div>
        <button
          className="contest-page-button"
          onClick={() => setContestOption(!contestOption)}
        >
          Create a contest
        </button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "flex-start",
          width: "100%",
          margin: "2rem",
        }}
      >
        <div
          className="jd-header-data"
          style={{
            width: "40%",
            alignItems: "center",
            height: "100%",
            display: "flex",
          }}
        >
          Increase your students' learning productivity by 25% within giving
          more contest
        </div>
        <div>
          <img src={homepage} alt="" style={{ width: "300px" }} />
        </div>
      </div>
      {contestOption && (
        <div className="contest-options">
          <div style={{ width: "100%" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "10px",
              }}
            >
              <h2 style={{ margin: 0 }}>Create a contest</h2>
              <Link
                to={questionAmount && "/contest"}
                className="contest-page-button-1"
              >
                Create the contest
              </Link>
            </div>
            <div className="select-options">
              <Dropdown
                options={totalQuestion}
                selectedOption={questionAmount}
                setSelectedOption={setQuestionAmount}
              />
              {[
                selectingTypeConstant.RANDOM,
                selectingTypeConstant.SELECTED,
              ].map((type, index) => (
                <div key={index} style={{ display: "flex", gap: "4px" }}>
                  <input
                    type="checkbox"
                    onChange={selectingType(type)?.optionChange}
                    disabled={
                      !questionAmount
                        ? !questionAmount
                        : selectingType(type)?.disabled
                    }
                  />
                  <label>{selectingType(type)?.name}</label>
                </div>
              ))}
            </div>
            {contestCheckOption.selected && (
              <div
                style={{
                  overflow: "auto",
                  height: "50vh",
                  margin: "1rem",
                }}
              >
                {problems.map((problem, index) => (
                  <SelectiveDiv
                    key={index}
                    problem={problem}
                    isSelected={selectedQuestions.some(
                      (selected) => selected.id === problem.id
                    )}
                    onSelect={() =>
                      handleSelectiveQuestionToggle(problem, questionAmount)
                    }
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default JDoodleContainer;

const SelectiveDiv = ({ problem, isSelected, onSelect }) => {
  return (
    <div
      className={isSelected ? "selected-question" : "unselected-question"}
      onClick={onSelect}
    >
      <h3 style={{ padding: 0, margin: 0 }}> {problem.problemName}</h3>
      <div> {problem.statement}</div>
    </div>
  );
};
