import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from 'react-router-dom';

import { QuizGridComponent } from "../../components/quiz-grid";
import { PaginationComponent } from "../../components/pagination";
import { setCurrentPage, setTotalItems, selectPagination } from '../../store/slices/pagination.slice';
import { fetchAmountOfQuests } from "../../middleware/quest.fetching";
import decodeJWT from "../../utils/decode-jwt";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pagination = useSelector(selectPagination);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    console.log('Decoding JWT');
    console.log(decodeJWT("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZiYWYyNDA0LTlhYTgtNDY5ZC1jNjY0LTA4ZGQ1MGUwZjNkMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6IjEyM0BnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMTIzIiwiQXZhdGFyVXJsIjoiIiwiZXhwIjoxNzM5OTcwMTk3LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo1MDAwIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6MzAwMCJ9.6gn8uvUiHAxAppszC4vUrCRFVMbpEcGZqaLdpdQFlUw"));
  }, []);

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
      {/* <FilterComponent 
        current={(pagination.currentPage - 1) * pagination.itemsPerPage + 1} 
        perPage={pagination.itemsPerPage} 
        total={pagination.totalItems} 
      /> */}
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