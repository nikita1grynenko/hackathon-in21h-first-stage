import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/home';
import { SingleQuizPage } from './pages/single-quiz';
import { AuthPage } from './pages/auth';
import PrivateRoute from './components/private-route/private-route.reactive';
import { CreateQuizPage } from './pages/create-quiz';
import { ProfilePage } from './pages/profile';
import { RootState } from './store/store';
import { loadUserFromToken } from './store/slices/auth.slice';
import { QuestAttemptPage } from './pages/quest-attempt';

const AppRouter = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    dispatch(loadUserFromToken());
  }, [dispatch]);

  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz/:id" element={<SingleQuizPage />} />
        <Route path="/quiz/:id/attempt" element={<QuestAttemptPage />} />
        <Route path="/create-quiz" element={<CreateQuizPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="*" element={<Navigate to={!isAuthenticated ? "/auth" : "/"} />} />
    </Routes>
  );
};

export default AppRouter;
