import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { AuthGuard, LoggedInAuth } from "./components/AuthGuard";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Support from "./pages/Support";
import Settings from "./pages/Settings";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/upload",
        element: (
          <AuthGuard>
            <Upload />
          </AuthGuard>
        )
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
        )
      }
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}