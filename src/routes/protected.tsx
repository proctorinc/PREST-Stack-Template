import { Suspense } from "react";

import { Navigate, Outlet } from "react-router-dom";
import Home from "../pages/Home";

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Outlet />
    </Suspense>
  );
};

export const protectedRoutes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      { path: "*", element: <Navigate to="." /> },
    ],
  },
];
