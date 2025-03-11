import React, { useEffect, useMemo, useState } from "react";
import { API } from "../../context/Api";
import { matchPath, Navigate, useLocation } from "react-router-dom";
import DataRequest from "../../context/DataRequest";

export default function ProtectedRoutes({ children }) {
  const { User } = DataRequest();
  const location = useLocation();
  const path = location.pathname;
  const memoizedUser = useMemo(() => User, [User]);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const getToken = async () => {
    try {
      const response = await API.get("/get-token");
      setToken(response.data.token);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getToken();
  }, []);

  const nonLoginPaths = [
    "/login",
    "/register",
    "/send/verify-email/success/:email",
    "/verify-email",
    "/verify-user/:token",
    "/forgot-password",
    "/reset/:token",
    "/email-verified/:token",
  ];

  //? const extraRoutes = [
  //?   "/dashboard/edit/gallery/:property_name/:uniqueId",
  //?   "/dashboard/test/:id",
  //? ];

  const roleRoutes = {
    User: [
      "/",
      "/dashboard",
      "/dashboard/my-profile",
      "/dashboard/edit/my-profile",
      "/dashboard/enquiry",
    ],
    "Property Manager": [
      "/",
      "/dashboard",
      "/dashboard/my-profile",
      "/dashboard/edit/my-profile",
      "/dashboard/property",
      "/dashboard/property/add",
      "/dashboard/property/view/:uniqueId",
      "/dashboard/edit/course/:property_name/:uniqueId",
      "/dashboard/view/course/:property_name/:uniqueId",
      "/dashboard/edit/teacher/:property_name/:uniqueId",
      "/dashboard/view/teacher/:property_name/:uniqueId",
      "/dashboard/edit/seo/:property_name/:uniqueId",
      "/dashboard/edit/faqs/:property_name/:uniqueId",
      "/dashboard/enquiry",
    ],
    Editor: [
      "/",
      "/dashboard",
      "/dashboard/my-profile",
      "/dashboard/edit/my-profile",
      "/dashboard/status",
      "/dashboard/status/add",
      "/dashboard/status/edit/:uniqueId",
      "/dashboard/status/view/:uniqueId",
      "/dashboard/course",
      "/dashboard/course/view/:uniqueId",
      "/dashboard/course/add",
      "/dashboard/course/edit/:uniqueId",
      "/dashboard/category",
      "/dashboard/category/add",
      "/dashboard/category/edit/:uniqueId",
      "/dashboard/category/view/:uniqueId",
      "/dashboard/property",
      "/dashboard/property/add",
      "/dashboard/property/view/:uniqueId",
      "/dashboard/enquiry",
      "/dashboard/edit/course/:property_name/:uniqueId",
      "/dashboard/view/course/:property_name/:uniqueId",
      "/dashboard/edit/teacher/:property_name/:uniqueId",
      "/dashboard/view/teacher/:property_name/:uniqueId",
      "/dashboard/edit/faqs/:property_name/:uniqueId",
      "/dashboard/edit/seo/:property_name/:uniqueId",
    ],
    "Super Admin": [
      "/",
      "/dashboard",
      "/dashboard/my-profile",
      "/dashboard/edit/my-profile",
      "/dashboard/user",
      "/dashboard/user/add",
      "/dashboard/user/view/:uniqueId",
      "/dashboard/user/edit/:uniqueId",
      "/dashboard/status",
      "/dashboard/status/add",
      "/dashboard/status/edit/:uniqueId",
      "/dashboard/status/view/:uniqueId",
      "/dashboard/course",
      "/dashboard/course/add",
      "/dashboard/course/view/:uniqueId",
      "/dashboard/course/edit/:uniqueId",
      "/dashboard/category",
      "/dashboard/category/add",
      "/dashboard/category/edit/:uniqueId",
      "/dashboard/category/view/:uniqueId",
      "/dashboard/property",
      "/dashboard/property/add",
      "/dashboard/property/view/:uniqueId",
      "/dashboard/edit/course/:property_name/:uniqueId",
      "/dashboard/view/course/:property_name/:uniqueId",
      "/dashboard/edit/teacher/:property_name/:uniqueId",
      "/dashboard/view/teacher/:property_name/:uniqueId",
      "/dashboard/edit/faqs/:property_name/:uniqueId",
      "/dashboard/edit/seo/:property_name/:uniqueId",
      "/dashboard/enquiry",
      "/dashboard/archive/enquiry",
      "/dashboard/enquiry/:objectId",
      "/dashboard/archive/enquiry/:objectId",
      "/dashboard/course-seo/add/:uniqueId",
      "/dashboard/course-seo/edit/:uniqueId",
    ],
  };

  const isPathMatching = (paths) =>
    paths.some((route) => matchPath(route, path));

  if (!loading) {
    if (token && isPathMatching(nonLoginPaths)) {
      return <Navigate to="/dashboard" replace />;
    }

    if (!token && !isPathMatching(nonLoginPaths)) {
      return <Navigate to="/login" replace />;
    }

    if (memoizedUser?.role) {
      const allowedRoutes = roleRoutes[memoizedUser.role] || [];
      if (!isPathMatching(allowedRoutes)) {
        return <Navigate to="/dashboard" replace />;
      }
    }
  }

  return children;
}
