// src/modules/home/page/HomePage.tsx
import { Hero } from "../components/Hero";
import { Highlights } from "../components/Highlights";
import { Sections } from "../components/Sections";

export const HomePage = () => {
  return (
    <>
      <Hero />
      <Sections />
      <Highlights />
    </>
  );
};