// src/shared/Layout/page/Layout.tsx
import { Outlet, useLocation } from "react-router-dom";
import React, { lazy } from "react";
const Footer = lazy(() => import("../components/Footer").then(module => ({ default: module.Footer })));
import { HeaderOneLine } from "../components/HeaderOneLine";
import { HeaderTwoLines } from "../components/HeaderTwoLines";
import { Box } from "@mui/material";
import { WhatsApp } from "../components/WhatsApp";
import { Bounce, ToastContainer } from "react-toastify";
import { navBarLines } from "../utils/info";
import { ScrollToTop } from "@/routes/ScrollToTop";

export const Layout: React.FC = () => {
  const { pathname } = useLocation();
  const isAdmin = pathname.includes("/admin/");
  return (
    <>
      {navBarLines === 2 && <HeaderTwoLines />}
      {navBarLines === 1 && <HeaderOneLine />}
      <Box 
      component={"main"}
      sx={{ flexGrow: 1 }}
      >
        <Outlet />
      </Box>
      {!isAdmin && <Footer />}
      {!isAdmin && <WhatsApp />}
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