import { ReactElement, useMemo } from "react";
import { Route, RouteProps } from "react-router-dom";
import decodeJWT from "./utils/decode-jwt";

const GuardedRoute = (props: RouteProps): ReactElement | null => {
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

  if (!jwt) {
    return <Navigate to="/auth" replace />;
  }

  return <Route {...props} />
};

export default GuardedRoute;
