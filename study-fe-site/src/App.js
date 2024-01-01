import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import store from "./redux/store";
import Quiz from "./site/Quiz";
import ListLesson from "./site/ListLesson";
import { Provider } from "react-redux";
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ListLesson />} />
            <Route path="/quiz/:id" element={<Quiz />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
