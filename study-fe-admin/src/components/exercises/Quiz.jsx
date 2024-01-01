import React, { useState } from "react";
import "./Quiz.css";
import withRouter from "../../helpers/withRouter";
import { connect } from "react-redux";
import { getExercises } from "../../redux/actions/exerciseAction";
function Quiz() {
  // Properties
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const data = [
    {
      id: "1",
      question: "Câu hỏi 1",
      answera: "Đáp án A",
      answerb: "Đáp án B",
      answerc: "Đáp án C",
      answerd: "Đáp án D",
      correctanswer: "answera",
    },
    {
      id: "2",
      question: "Câu hỏi 2",
      answera: "Đáp án A",
      answerb: "Đáp án B",
      answerc: "Đáp án C",
      answerd: "Đáp án D",
      correctanswer: "answerb",
    },
    {
      id: "3",
      question: "Câu hỏi 3",
      answera: "Đáp án A",
      answerb: "Đáp án B",
      answerc: "Đáp án C",
      answerd: "Đáp án D",
      correctanswer: "answerd",
    },
    {
      id: "4",
      question: "Câu hỏi 4",
      answera: "Đáp án A",
      answerb: "Đáp án B",
      answerc: "Đáp án C",
      answerd: "Đáp án D",
      correctanswer: "answera",
    },
    {
      id: "5",
      question: "Câu hỏi 5",
      answera: "Đáp án A",
      answerb: "Đáp án B",
      answerc: "Đáp án C",
      answerd: "Đáp án D",
      correctanswer: "answerb",
    },
    // Add more questions here
  ];

  // Helper Functions

  /* A possible answer was clicked */
  const optionClicked = (selectedAnswer) => {
    const isCorrect = selectedAnswer === data[currentQuestion].correctanswer;

    // Increment the score
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < data.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  /* Resets the game back to default */
  const restartGame = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowResults(false);
  };

  return (
    <div className="App">
      {/* 1. Header  */}
      <h1>Quiz 📚</h1>

      {/* 2. Current Score  */}
      <h2>Score: {score}</h2>

      {/* 3. Show results or show the question game  */}
      {showResults ? (
        /* 4. Final Results */
        <div className="final-results">
          <h1>Final Results</h1>
          <h2>
            {score} out of {data.length} correct - (
            {(score / data.length) * 100}%)
          </h2>
          <button onClick={() => restartGame()}>Restart game</button>
        </div>
      ) : (
        /* 5. Question Card  */
        <div className="question-card">
          {/* Current Question  */}
          <h2>
            Question: {currentQuestion + 1} out of {data.length}
          </h2>
          <h3 className="question-text">{data[currentQuestion].question}</h3>

          {/* List of possible answers  */}
          <ul className="ul-quiz">
            <li className="li-quiz" onClick={() => optionClicked("answera")}>
              {data[currentQuestion].answera}
            </li>
            <li className="li-quiz" onClick={() => optionClicked("answerb")}>
              {data[currentQuestion].answerb}
            </li>
            <li className="li-quiz" onClick={() => optionClicked("answerc")}>
              {data[currentQuestion].answerc}
            </li>
            <li className="li-quiz" onClick={() => optionClicked("answerd")}>
              {data[currentQuestion].answerd}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  exercises: state.exerciseReducer.exercises,
  isLoading: state.commonReducer.isLoading,
});

const mapDispatchToProps = {
  getExercises,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Quiz));
