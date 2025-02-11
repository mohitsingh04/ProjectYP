import React from "react";
import { accessToken } from "../../context/Api";
import { matchPath, Navigate, useLocation } from "react-router-dom";
import DataRequest from "../../context/DataRequest";

export default function ProtectedRoutes({ children }) {
  const authenticate = accessToken;
  const { User } = DataRequest();
  const location = useLocation();
  const path = location.pathname;

  // Paths that do not require authentication
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

  // Role-based protected routes
  const roleRoutes = {
    User: [
      "/dashboard",
      "/dashboard/property",
      "/dashboard/property/add",
      "/dashboard/property/view/:uniqueId",
      "/dashboard/test/:id",
      "/dashboard/enquiry",
      "/dashboard/edit/teacher/:property_name/:uniqueId",
      "/dashboard/view/teacher/:property_name/:uniqueId",
      "/dashboard/my-profile",
      "/dashboard/edit/my-profile",
      "/dashboard/edit/seo/:property_name/:uniqueId",
      "/dashboard/edit/faqs/:property_name/:uniqueId",
      "/dashboard/edit/gallery/:property_name/:uniqueId",
    ],
    Editor: [
      "/dashboard",
      "/dashboard/status",
      "/dashboard/status/add",
      "/dashboard/status/edit/:uniqueId",
      "/dashboard/status/view/:uniqueId",
      "/dashboard/category",
      "/dashboard/category/add",
      "/dashboard/category/edit/:uniqueId",
      "/dashboard/category/view/:uniqueId",
      "/dashboard/property",
      "/dashboard/property/add",
      "/dashboard/property/view/:uniqueId",
      "/dashboard/test/:id",
      "/dashboard/enquiry",
      "/dashboard/my-profile",
      "/dashboard/edit/my-profile",
      "/dashboard/edit/course/:uniqueId",
      "/dashboard/view/course/:uniqueId",
      "/dashboard/edit/teacher/:property_name/:uniqueId",
      "/dashboard/view/teacher/:property_name/:uniqueId",
      "/dashboard/edit/faqs/:property_name/:uniqueId",
      "/dashboard/edit/seo/:property_name/:uniqueId",
      "/dashboard/edit/gallery/:property_name/:uniqueId",
    ],
    Admin: [
      "/dashboard",
      "/dashboard/status",
      "/dashboard/status/add",
      "/dashboard/status/edit/:uniqueId",
      "/dashboard/status/view/:uniqueId",
      "/dashboard/category",
      "/dashboard/category/add",
      "/dashboard/category/edit/:uniqueId",
      "/dashboard/category/view/:uniqueId",
      "/dashboard/property",
      "/dashboard/property/add",
      "/dashboard/property/view/:uniqueId",
      "/dashboard/test/:id",
      "/dashboard/enquiry",
      "/dashboard/my-profile",
      "/dashboard/edit/my-profile",
      "/dashboard/user",
      "/dashboard/user/view/:uniqueId",
      "/dashboard/user/edit/:uniqueId",
      "/dashboard/edit/course/:property_name/:uniqueId",
      "/dashboard/view/course/:property_name/:uniqueId",
      "/dashboard/edit/teacher/:property_name/:uniqueId",
      "/dashboard/view/teacher/:property_name/:uniqueId",
      "/dashboard/edit/faqs/:property_name/:uniqueId",
      "/dashboard/edit/seo/:property_name/:uniqueId",
      "/dashboard/edit/gallery/:property_name/:uniqueId",
      "/dashboard/course",
      "/dashboard/course/add",
      "/dashboard/course/edit/:uniqueId",
      "/dashboard/course/view/:uniqueId",
      "/dashboard/course-seo/add/:uniqueId",
      "/dashboard/course-seo/edit/:uniqueId",
    ],
  };

  const isPathMatching = (paths) =>
    paths.some((route) => matchPath(route, path));

  if (authenticate && isPathMatching(nonLoginPaths)) {
    return <Navigate to="/dashboard" replace />;
  }

  if (!authenticate && !isPathMatching(nonLoginPaths)) {
    return <Navigate to="/login" replace />;
  }

  if (User?.role) {
    const allowedRoutes = roleRoutes[User.role] || [];
    if (!isPathMatching(allowedRoutes)) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
}
