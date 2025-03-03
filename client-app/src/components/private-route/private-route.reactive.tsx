import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../store/store';
import { useMemo } from 'react';
import decodeJWT from '../../utils/decode-jwt';

interface PrivateRouteProps {
  children?: React.ReactNode | React.ReactNode[] | undefined;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const jwt = useMemo(() => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      return null;
    }

    const decodedJWT = decodeJWT(jwt);
    if (decodedJWT.expired < Date.now()) {
      localStorage.removeItem("jwt");
      return null;
    }

    return decodedJWT;
  }, []);

  if (!isAuthenticated || !jwt || jwt.expired < Date.now()) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
