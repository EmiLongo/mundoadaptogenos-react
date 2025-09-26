// src/modules/shop/page/ShopPage.tsx
import React from "react";
import { Shop } from "../components/Shop";
import { HeadingPage } from "@/shared/components/HeadingPage";

export const ShopPage: React.FC = () => {
  return (
    <>
    <HeadingPage text="Página con los productos de la tienda" />
    <Shop />
    </>
  )
}