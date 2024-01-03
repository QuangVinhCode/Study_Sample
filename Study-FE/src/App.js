import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import DashboardPage from "./pages/DashboardPage";
import { Provider } from "react-redux";
import store from "./redux/store";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import User from "./pages/User";
import Quiz from "./components/user/Quiz";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard/*" element={<DashboardPage />} />
          <Route path="/user/*" element={<User />} />
          <Route path="/quiz/:id" element={<Quiz />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
