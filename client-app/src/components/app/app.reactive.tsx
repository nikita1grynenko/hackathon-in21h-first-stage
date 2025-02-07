import "./app.style.css";
import Header from "./../Header/header.reactive";
import QuizGrid from "../QuizGrid/quizGrid.reactive";
import Pagination from "../Pagination/pagination.reactive";
import Filter from "./../Filter/filter.reactive";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SingleQuiz from "../SingleQuiz/singleQuiz.reactive";

function App() {
  return (
    <Router>
      <Header />
      <Filter current={19} total={50} />
      <Routes>
        <Route path="/" element={<QuizGrid />} />
        <Route path="/quiz/:id" element={<SingleQuiz />} />
      </Routes>
      <Pagination />
    </Router>
  );
}

export default App;
