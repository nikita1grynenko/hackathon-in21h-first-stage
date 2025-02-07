import React from "react";
import Header from "./../../components/Header/header.reactive";
import QuizGrid from "./../../components/QuizGrid/quizGrid.reactive";
import Pagination from "./../../components/Pagination/pagination.reactive";
import Filter from "./../../components/Filter/filter.reactive";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SingleQuiz from "./../../components/SingleQuiz/singleQuiz.reactive";

const Home: React.FC = () => {
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
};

export default Home;
