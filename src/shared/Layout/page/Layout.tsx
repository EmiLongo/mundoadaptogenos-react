// src/shared/Layout/page/Layout.tsx
import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";
import { HeaderOneLine } from "../components/HeaderOneLine";
import { HeaderTwoLines } from "../components/HeaderTwoLines";
import React from "react";
import { Box } from "@mui/material";
import { WhatsApp } from "../components/WhatsApp";
import { Bounce, ToastContainer } from "react-toastify";
import { navBarLines } from "../utils/info";

export const Layout: React.FC = () => {
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
      <Footer />
      <WhatsApp />
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
    </>
  );
};