// src/modules/home/page/HomePage.tsx
import React, { lazy } from "react";
const Hero = lazy(() => import("../components/Hero").then(module => ({ default: module.Hero })));

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