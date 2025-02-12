import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from 'react-router-dom';

import { FilterComponent } from "../../components/filter";
import { QuizGridComponent } from "../../components/quiz-grid";
import { PaginationComponent } from "../../components/pagination";
import { setCurrentPage, setTotalItems, selectPagination } from '../../store/slices/pagination.slice';
import { fetchAmountOfQuests } from "../../middleware/quest.fetching";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pagination = useSelector(selectPagination);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const page = searchParams.get('page');
    if (!page || isNaN(+page)) {
      dispatch(setCurrentPage(1));
      return;
    }

    dispatch(setCurrentPage(+page));
  }, [searchParams, dispatch]);

  useEffect(() => {
    fetchAmountOfQuests().then((data) => {
      if (data) {
        dispatch(setTotalItems(data));
      }
    });
  }, [dispatch]);

  useEffect(() => {
    document.title = 'Home — QUIZIII';
  }, []);

  return (
    <>
      <FilterComponent 
        current={(pagination.currentPage - 1) * pagination.itemsPerPage + 1} 
        perPage={pagination.itemsPerPage} 
        total={pagination.totalItems} 
      />
      <QuizGridComponent key={pagination.currentPage} currentPage={pagination.currentPage} />
      <PaginationComponent 
        currentPage={pagination.currentPage} 
        totalPages={pagination.maxPage}
        onPageChange={(page) => navigate(`/?page=${page}`)} 
      />
    </>
  );
};

export default Home;