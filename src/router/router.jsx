import React, { Suspense } from "react";
import { Navigate, useRoutes } from "react-router";
import AdminPanelLayout from "../components/admin-panel/admin-panel-layout";
import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/authentication/Login";
import User from "../pages/User/User";

export const PrivateRoute = ({ children }) => {
  const user = localStorage.getItem("admin_store");
  return user ? children : <Navigate to="/login" />;
};

export const PublicRoute = ({ children }) => {
  const user = localStorage.getItem("admin_store");
  return user ? <Navigate to="/" /> : children;
};

// const Routes = () => {
//   return useRoutes([
//     {
//       path: "/",
//       element: (
//         <PrivateRoute>
//           <AdminPanelLayout />
//         </PrivateRoute>
//       ),
//       children: [
//         {
//           path: "/",
//           element: <Dashboard />,
//         },
//       ],
//     },
//     {
//       path: "/login",
//       element: (
//         <PublicRoute>
//           <Login />
//         </PublicRoute>
//       ),
//     },
//   ]);
// };

const routes = (isLoggedIn) => [
  {
    path: "/login",
    element: !isLoggedIn ? <Login /> : <Navigate to="/" />,
  },
  {
    path: "/",
    element: isLoggedIn ? <AdminPanelLayout /> : <Navigate to="/login" />,
    children: [
      {
        element: <Dashboard />,
        path: "/",
        index: true,
      },
      {
        element: <User />,
        path: "/users",
      },
    ],
  },
];

export default function Routes(props) {
  const { isLoggedIn } = props;
  return useRoutes(routes(isLoggedIn));
}
