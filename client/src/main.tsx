import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Storage from "./pages/Storage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Support from "./pages/Support";
import Settings from "./pages/Settings";
import Constellation from "./pages/Constellation";
import ErrorPage from "./pages/ErrorPage";
import { AuthGuard, LoggedInAuth, StarGuard } from "./components/AuthGuard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/upload",
        element: (
          <AuthGuard>
            <Upload />
          </AuthGuard>
        ),
      },
      {
        path: "/storage",
        element: (
          <AuthGuard>
            <Storage />
          </AuthGuard>
        ),
      },
      {
        path: "/login",
        element: (
          <LoggedInAuth>
            <Login />
          </LoggedInAuth>
        ),
      },
      {
        path: "/signup",
        element: (
          <LoggedInAuth>
            <Signup />
          </LoggedInAuth>
        ),
      },
      {
        path: "/support",
        element: <Support />,
      },
      {
        path: "/settings",
        element: (
          <AuthGuard>
            <Settings />
          </AuthGuard>
        ),
      },
      {
        path: "/constellation",
        element: (
          <StarGuard>
            <Constellation />
          </StarGuard>
        ),
      },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
