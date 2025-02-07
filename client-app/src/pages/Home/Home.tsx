import React from "react";
import Header from "./../../components/Header/header.reactive";
import QuizGrid from "./../../components/QuizGrid/quizGrid.reactive";
import Pagination from "./../../components/Pagination/pagination.reactive";
import Filter from "./../../components/Filter/filter.reactive";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SingleQuiz from "./../../components/SingleQuiz/singleQuiz.reactive";
import Login from "../Login/Login";
import Register from "../Register/Register";

const Home: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Filter current={19} total={50} />
              <QuizGrid />
              <Pagination />
            </>
          }
        />
        <Route path="/quiz/:id" element={<SingleQuiz />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default Home;
