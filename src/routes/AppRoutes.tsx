// src/routes/AppRoutes.tsx
import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy } from "react";

//import Loading from "@/shared/components/Loading";
import { Layout } from "@shared/Layout/page/Layout";
import { HomePage } from "@modules/home/page/HomePage";
import { AdminLayout } from "@modules/admin/layout/Layout";
import { UserAdminPrivateRoutes } from "./UserAdminPrivateRoutes";
import { UserAuthenticatedPrivateRoutes } from "./UserAuthenticatedPrivateRoutes";

const ManageSectionsPage = lazy(() => import("@modules/admin/page/ManageSectionsPage").then(module => ({ default: module.ManageSectionsPage })));
const ManageProductsPage = lazy(() => import("@modules/admin/page/ManageProductsPage").then(module => ({ default: module.ManageProductsPage })));
const ManageDiscountsPage = lazy(() => import("@modules/admin/page/ManageDiscountsPage").then(module => ({ default: module.ManageDiscountsPage })));
const ManageHistoryPage = lazy(() => import("@modules/admin/page/ManageHistoryPage").then(module => ({ default: module.ManageHistoryPage })));
const ManageAdminsPage = lazy(() => import("@modules/admin/page/ManageAdminsPage").then(module => ({ default: module.ManageAdminsPage })));
const CartPage = lazy(() => import("@modules/cart/page/CartPage").then(module => ({ default: module.CartPage })));
const FAQPage = lazy(() => import("@modules/faq/page/FAQPage").then(module => ({ default: module.FAQPage })));
const ShopPage = lazy(() => import("@modules/shop/page/ShopPage").then(module => ({ default: module.ShopPage })));
const MushroomTypePage = lazy(() => import("@modules/mushroom-type/page/MushroomTypePage").then(module => ({ default: module.MushroomTypePage })));
const ProductPage = lazy(() => import("@modules/products/page/ProductPage").then(module => ({ default: module.ProductPage })));
const ContactPage = lazy(() => import("@modules/contact/page/ContactPage").then(module => ({ default: module.ContactPage })));
const ShoppingHistoryPage = lazy(() => import("@modules/shopping-history/page/ShoppingHistoryPage").then(module => ({ default: module.ShoppingHistoryPage })));
const RegisterPage = lazy(() => import("@modules/auth/page/RegisterPage").then(module => ({ default: module.RegisterPage })));
const RecoveryPass = lazy(() => import("@modules/auth/page/RecoveryPass").then(module => ({ default: module.RecoveryPass })));
const Profile = lazy(() => import("@/modules/user/page/Profile").then(module => ({ default: module.Profile })));
const ProductDetailsPage = lazy(() => import("@/modules/admin/page/ProductDetailsPage").then(module => ({ default: module.ProductDetailsPage })));
const Error404 = lazy(() => import("@/modules/404/page/Error404").then(module => ({ default: module.Error404 })));
const BookSuggestionPage = lazy(() => import("@/modules/bookSuggestion/page/BookSuggestionPage").then(module => ({ default: module.BookSuggestionPage })));

// utils
import { infoReishi } from "@modules/mushroom-type/utils/Reishi";
import { infoColaPavo } from "@modules/mushroom-type/utils/ColaPavo";
import { infoMelena } from "@modules/mushroom-type/utils/Melena";
import { infoCordyceps } from "@modules/mushroom-type/utils/Cordyceps";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/shop", element: <ShopPage /> },
      { path: "/shop/product", element: <ProductPage /> },
      { path: "/mushroom/cordyceps-militaris", element: <MushroomTypePage mushroom={infoCordyceps} /> },
      { path: "/mushroom/melena-de-leon", element: <MushroomTypePage mushroom={infoMelena} /> },
      { path: "/mushroom/cola-de-pavo", element: <MushroomTypePage mushroom={infoColaPavo} /> },
      { path: "/mushroom/reishi", element: <MushroomTypePage mushroom={infoReishi} /> },
      { path: "/faq", element: <FAQPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/suggestions", element: <BookSuggestionPage /> },
      { path: "/recovery", element: <RecoveryPass /> },
      { path: "/404", element: <Error404 /> },

      
      // Ruta protegida del cliente  TODO: hacer lógica
      { path: "/shopping-history", element:
      <UserAuthenticatedPrivateRoutes>
        <ShoppingHistoryPage /> 
      </UserAuthenticatedPrivateRoutes>
      },
      { path: "/profile", element: 
      <UserAuthenticatedPrivateRoutes>
        <Profile /> 
      </UserAuthenticatedPrivateRoutes>
      },
      
      // Ruta protegida del admin  TODO: hacer lógica
      {
        path: "/admin",
        element: <UserAdminPrivateRoutes><AdminLayout /></UserAdminPrivateRoutes>,
        children: [
          { index: true, element: <Navigate to="products" replace /> },
          { path: "sections", element: <ManageSectionsPage /> },
          { path: "products", element: <ManageProductsPage /> },
          { path: "create-products", element: <ProductDetailsPage /> },
          { path: "products-details", element: <ProductDetailsPage /> },
          { path: "discounts", element: <ManageDiscountsPage /> },
          { path: "history", element: <ManageHistoryPage /> },
          { path: "set-admins", element: <ManageAdminsPage /> },
        ]
      },
      { path: "*", element: <Navigate to="/404" replace /> },
    ],
  },
]);
