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
import { loadUserFromToken } from './store/slices/authSlice';
import { QuestAttemptPage } from './pages/quest-attempt';
import TestCompletion from './pages/test-completion/TestCompletion';

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
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          ) : (
            <Navigate to="/auth" />
          )
        }
      />
      <Route path="/quiz/:id" element={<SingleQuizPage />} />
      <Route path="/quiz/:id/attempt" element={<QuestAttemptPage />} />
      <Route path="/create-quiz" element={<CreateQuizPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/test-completion" element={<TestCompletion />} />
    </Routes>
  );
};

export default AppRouter;
