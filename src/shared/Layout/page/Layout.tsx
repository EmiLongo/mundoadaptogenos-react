// src/shared/Layout/page/Layout.tsx
import React, { lazy } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import { WhatsApp } from "../components/WhatsApp";
import { Bounce, ToastContainer } from "react-toastify";
import { ScrollToTop } from "@/routes/ScrollToTop";
import { useUserStore } from "@/store/useUserStore";
const Footer = lazy(() => import("../components/Footer").then(module => ({ default: module.Footer })));
const Header = lazy(() => import("../components/Header").then(module => ({ default: module.Header })));

export const Layout: React.FC = () => {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.includes("/admin/");
  const isAdmin = useUserStore(state => state.isAdmin);
  
  return (
    <>
      <Header />
      <Box 
      component={"main"}
      sx={{ flexGrow: 1 }}
      >
        <Outlet />
      </Box>
      {!isAdminRoute && <Footer />}
      {!isAdmin() && <WhatsApp />}
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <ScrollToTop />
    </>
  );
};