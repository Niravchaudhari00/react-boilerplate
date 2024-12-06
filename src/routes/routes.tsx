import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate, useRoutes } from "react-router-dom";

import Loading from "../shared-components/Spinner"; // Custom loading component
import { RootState } from "../store/store";

// Lazy loading pages
const Login = lazy(() => import("../page/auth/login"));
const Dashboard = lazy(() => import("../page/dashboard"));
const NotFound = lazy(() => import("../page/not-found"));

// const isToken = false;
// const userRole = "admin";

const ProtectedRoute = ({ element, roles }: { element: JSX.Element; roles?: string[] }) => {
  const { isToken, userRole } = useSelector((state: RootState) => state.auth);

  if (!isToken) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(userRole)) return <Navigate to="/not-authorized" replace />;
  return element;
};

// Routes Configuration
const Routes = () => {
  const { isToken } = useSelector((state: RootState) => state.auth);

  const routes = [
    {
      path: "/login",
      element: isToken ? (
        <Navigate to="/" replace />
      ) : (
        <Suspense fallback={<Loading />}>
          <Login />
        </Suspense>
      ),
    },

    {
      path: "/",
      element: (
        <Suspense fallback={<Loading />}>
          <ProtectedRoute element={<Dashboard />} roles={["admin", "user"]} />
        </Suspense>
      ),
      children: [
        {
          path: "dashboard",
          element: (
            <Suspense fallback={<Loading />}>
              <ProtectedRoute element={<Dashboard />} roles={["admin", "user"]} />
            </Suspense>
          ),
        },
        // {
        //   path: "profile",
        //   element: (
        //     <Suspense fallback={<Loading />}>
        //       <ProtectedRoute element={<Profile />} roles={["admin"]} />
        //     </Suspense>
        //   ),
        // },
      ],
    },
    {
      path: "*",
      element: (
        <Suspense fallback={<Loading />}>
          <NotFound />
        </Suspense>
      ),
    },
  ];

  return useRoutes(routes);
};

export default Routes;
