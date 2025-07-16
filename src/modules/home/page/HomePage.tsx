// src/modules/home/page/HomePage.tsx
import { Hero } from "../components/Hero";
import { Highlights } from "../components/Highlights";
import { PresentationPower } from "../components/PresentationPower";

export const HomePage = () => {
  return (
    <>
      <Hero />
      <PresentationPower />
      <Highlights />
    </>
  );
};