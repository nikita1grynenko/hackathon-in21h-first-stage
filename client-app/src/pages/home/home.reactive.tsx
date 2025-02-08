import React from "react";

import { QuizGridComponent } from "../../components/quiz-grid";
import { PaginationComponent } from "../../components/pagination";
import { FilterComponent } from "../../components/filter";

const Home: React.FC = () => {
  return (
    <>
      <FilterComponent current={19} total={50} />
      <QuizGridComponent />
      <PaginationComponent />
    </>
  );
};

export default Home;
