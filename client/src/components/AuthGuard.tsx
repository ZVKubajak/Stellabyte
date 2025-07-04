import authToken from "../tokens/authToken.ts";
import starToken from "../tokens/starToken.ts";
import { Navigate } from "react-router-dom";

export const AuthGuard = ({ children }: { children: JSX.Element }) => {
  if (!authToken.get()) {
    return <Navigate to="/signup" replace />;
  }

  return children;
};

export const LoggedInAuth = ({ children }: { children: JSX.Element }) => {
  if (!!authToken.get()) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export const StarGuard = ({ children }: { children: JSX.Element }) => {
  if (!starToken.get()) {
    return <Navigate to="/upload" replace />;
  }

  return children;
};
