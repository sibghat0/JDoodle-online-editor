import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import JDoodleContainer from "./containers/JDoodleContainer";
import ContestPage from "./pages/contestPage/ContestPage";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  return (
    <div>
      <Navbar />
      <Router>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <JDoodleContainer
                selectedQuestions={selectedQuestions}
                setSelectedQuestions={setSelectedQuestions}
              />
            }
          />
          <Route
            path="/contest"
            exact
            element={
              <ContestPage
                selectedQuestions={selectedQuestions}
                setSelectedQuestions={setSelectedQuestions}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
