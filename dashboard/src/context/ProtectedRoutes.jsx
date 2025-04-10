import React, { useEffect, useMemo, useState } from "react";
import { matchPath, Navigate, useLocation } from "react-router-dom";
import { API } from "./API";

export default function ProtectedRoutes({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const path = location.pathname;

  const memoizedUser = useMemo(() => authUser, [authUser]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse, tokenResponse] = await Promise.all([
          API.get("profile"),
          API.get("/get-token"),
        ]);
        setAuthUser(userResponse.data);
        setToken(tokenResponse.data.token);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Paths accessible by everyone (both logged-in and non-logged-in users)
  const publicPaths = [
    "/forgot-password",
    "/forgot-password/send/:email",
    "/reset-password/:token",
  ];

  // Paths only accessible when NOT logged in
  const nonLoginPaths = [
    "/",
    "/register",
    "/verify-email/send/:email",
    "/verify-email/:token",
  ];

  // Role-based restricted paths
  const roleRoutes = {
    User: ["/dashboard", "/dashboard/profile", "/dashboard/profile/:objectId"],
    "Property Manager": [
      "/dashboard",
      "/dashboard/profile",
      "/dashboard/profile/:objectId",
      "/dashboard/property",
      "/dashboard/property/create",
      "/dashboard/property/view/:objectId",
    ],
    Editor: [
      "/dashboard",
      "/dashboard/profile",
      "/dashboard/profile/:objectId",
      "/dashboard/status",
      "/dashboard/status/create",
      "/dashboard/status/view/:objectId",
      "/dashboard/status/edit/:objectId",
      "/dashboard/course",
      "/dashboard/course/create",
      "/dashboard/course/view/:objectId",
      "/dashboard/course/edit/:objectId",
      "/dashboard/category",
      "/dashboard/category/create",
      "/dashboard/category/view/:objectId",
      "/dashboard/category/edit/:objectId",
      "/dashboard/property",
      "/dashboard/property/create",
      "/dashboard/property/view/:objectId",
    ],
    "Super Admin": [
      "/dashboard",
      "/dashboard/profile",
      "/dashboard/profile/:objectId",
      "/dashboard/user",
      "/dashboard/user/create",
      "/dashboard/user/view/:objectId",
      "/dashboard/user/edit/:objectId",
      "/dashboard/status",
      "/dashboard/status/create",
      "/dashboard/status/view/:objectId",
      "/dashboard/status/edit/:objectId",
      "/dashboard/course",
      "/dashboard/course/create",
      "/dashboard/course/view/:objectId",
      "/dashboard/course/edit/:objectId",
      "/dashboard/category",
      "/dashboard/category/create",
      "/dashboard/category/view/:objectId",
      "/dashboard/category/edit/:objectId",
      "/dashboard/property",
      "/dashboard/property/create",
      "/dashboard/property/view/:objectId",
      "/dashboard/enquiry",
      "/dashboard/enquiry/view/:objectId",
      "/dashboard/enquiry/archive",
      "/dashboard/enquiry/archive/view/:objectId",
    ],
  };

  const isPathMatching = (paths) =>
    paths.some((route) => matchPath(route, path));

  if (loading) return null;

  // Redirect logged-in users away from non-login-only paths
  if (token && isPathMatching(nonLoginPaths)) {
    return <Navigate to="/dashboard" replace />;
  }

  if (!token && !isPathMatching([...nonLoginPaths, ...publicPaths])) {
    return <Navigate to="/" replace />;
  }

  if (memoizedUser?.role) {
    const allowedRoutes = roleRoutes[memoizedUser.role] || [];
    if (!isPathMatching([...allowedRoutes, ...publicPaths])) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
}
