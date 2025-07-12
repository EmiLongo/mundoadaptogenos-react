// src/routes/AppRoutes.tsx
import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy } from "react";

//import Loading from "@/shared/components/Loading";
import { Layout } from "@/shared/Layout/page/Layout";
import { HomePage } from "@/modules/home/page/HomePage";
import { RegisterPage } from "@/shared/components/auth/RegisterPage";
import { Profile } from "@/shared/components/user/Profile";
import { AdminLayout } from "@/modules/admin/layout/Layout";

const ManageSectionsPage = lazy(() => import("@/modules/admin/page/ManageSectionsPage").then(module => ({ default: module.ManageSectionsPage })));
const ManageProductsPage = lazy(() => import("@/modules/admin/page/ManageProductsPage").then(module => ({ default: module.ManageProductsPage })));
const ManageDiscountsPage = lazy(() => import("@/modules/admin/page/ManageDiscountsPage").then(module => ({ default: module.ManageDiscountsPage })));
const ManageHistoryPage = lazy(() => import("@/modules/admin/page/ManageHistoryPage").then(module => ({ default: module.ManageHistoryPage })));
const ManageAdminsPage = lazy(() => import("@/modules/admin/page/ManageAdminsPage").then(module => ({ default: module.ManageAdminsPage })));
const CartPage = lazy(() => import("@/modules/cart/page/CartPage").then(module => ({ default: module.CartPage })));

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/profile", element: <Profile /> },
      { path: "/cart", element: <CartPage /> },
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          { index: true, element: <Navigate to="sections" replace /> },
          { path: "sections", element: <ManageSectionsPage /> },
          { path: "products", element: <ManageProductsPage /> },
          { path: "discounts", element: <ManageDiscountsPage /> },
          { path: "history", element: <ManageHistoryPage /> },
          { path: "set-admins", element: <ManageAdminsPage /> },
        ]
      },
      { path: "*", element: <Navigate to="/404" replace /> },
    ],
  },
]);
