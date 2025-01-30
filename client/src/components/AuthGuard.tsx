import { Navigate } from "react-router-dom";
import auth from "../utils/auth.ts";
import starAuth from "../utils/star.ts";

export const AuthGuard = ({ children }: { children: JSX.Element }) => {
  if (!auth.loggedIn()) {
    return <Navigate to="/signup" replace />;
  }
  return children;
};

export const LoggedInAuth = ({ children }: { children: JSX.Element }) => {
  if (auth.loggedIn()) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export const StarGuard = ({ children }: { children: JSX.Element }) => {
  if (!starAuth.getStarToken()) {
    return <Navigate to="/upload" replace />;
  }
  return children;
};
