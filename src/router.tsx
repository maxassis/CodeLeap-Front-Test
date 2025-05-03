import { createBrowserRouter, redirect } from "react-router";
import Intro from "./pages/Intro";
import Dashboard from "./pages/Dashboard";

const checkUsernameLoader = () => {
  const username = localStorage.getItem("username");
  if (!username) {
    return redirect("/");
  }
  return null;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Intro />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    loader: checkUsernameLoader,
  },
]);

export default router;
