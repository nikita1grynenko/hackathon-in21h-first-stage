import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/home';
import { LoginPage } from './pages/login';
import { RegisterPage } from './pages/register';
import { SingleQuizPage } from './pages/single-quiz';
import { AuthPage } from './pages/auth';
import PrivateRoute from './components/private-route/private-route.reactive';
import { CreateQuizPage } from './pages/create-quiz';

const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/quiz/:id"
        element={
          <PrivateRoute>
            <SingleQuizPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/create-quiz"
        element={
          <PrivateRoute>
            <CreateQuizPage />
          </PrivateRoute>
        }
      />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};

export default AppRouter;
