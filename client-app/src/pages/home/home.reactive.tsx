import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HeaderComponent } from "../../components/header";
import { QuizGridComponent } from "../../components/quiz-grid";
import { PaginationComponent } from "../../components/pagination";
import Filter from "../../components/filter"; // ! TODO: what is this??
import { SingleQuizComponent } from "../../components/single-quiz";
import { LoginPage } from "../login";
import Register from "../register/register.reactive";

const Home: React.FC = () => {
  return (
    <Router>
      <HeaderComponent />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Filter current={19} total={50} />
              <QuizGridComponent />
              <PaginationComponent />
            </>
          }
        />
        <Route path="/quiz/:id" element={<SingleQuizComponent />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default Home;
