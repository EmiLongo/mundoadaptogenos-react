import { Box } from "@mui/material";
import React from "react";

export const HeadingPage: React.FC<{text: string}> = ({text}) => {
  return <Box component="h1" sx={{color: "transparent", position: "absolute", zIndex: -1}}>{text}</Box>
};