// src/modules/home/page/HomePage.tsx
import React from "react";
import { Hero } from "../components/Hero";
import { Highlights } from "../components/Highlights";
import { PresentationPower } from "../components/PresentationPower";

export const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <PresentationPower />
      <Highlights />
    </>
  );
};