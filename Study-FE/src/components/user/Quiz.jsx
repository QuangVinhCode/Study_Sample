import React, { useEffect, useState } from "react";
import "./Quiz.css";
import { getExercisesByLesson } from "../../redux/actions/exerciseAction";
import withRouter from "../../helpers/withRouter.js";
import { useNavigate, useParams } from "react-router-dom";
function Quiz() {
  // Properties
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [data, setData] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const exercises = await getExercisesByLesson(id);
        setData(exercises);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchData();
  }, []);

  const optionClicked = (selectedAnswer) => {
    console.log("object in selectedAnswer");
    console.log(selectedAnswer.value);
    const isCorrect = selectedAnswer === data[currentQuestion].correctanswer;

    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < data.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const restartGame = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowResults(false);
  };
  const back = () => {
    navigate("/user/lesson/" + id);
  };

  return (
    <div className="question">
      <h1>Đố vui 📚</h1>

      <h2>Tổng điểm: {score}</h2>

      {showResults ? (
        <div className="final-results">
          <h1>Kết Quả</h1>
          <h2>
            {score} trong tổng số {data.length} câu hỏi - (
            {(score / data.length) * 100}%)
          </h2>
          <button onClick={() => restartGame()}>Bắt đầu lại</button>
          <button onClick={() => back()}>Trở về</button>
        </div>
      ) : (
        <div className="question-card">
          <h2>
            Câu hỏi: {currentQuestion + 1} / {data.length} câu
          </h2>
          <h3 className="question-text">
            {data[currentQuestion] ? data[currentQuestion].exercisecontent : ""}
          </h3>

          <ul className="question-ul">
            <li onClick={() => optionClicked("answera")} className="question-li">
              {data[currentQuestion] ? data[currentQuestion].answera : ""}
            </li>
            <li onClick={() => optionClicked("answerb")} className="question-li">
              {data[currentQuestion] ? data[currentQuestion].answerb : ""}
            </li>
            <li onClick={() => optionClicked("answerc")} className="question-li">
              {data[currentQuestion] ? data[currentQuestion].answerc : ""}
            </li>
            <li onClick={() => optionClicked("answerd")} className="question-li">
              {data[currentQuestion] ? data[currentQuestion].answerd : ""}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default withRouter(Quiz);
