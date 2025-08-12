// src\shared\Layout\components\SubproductsMenu.tsx
import React from "react"
import { Box } from "@mui/material"
import { Heading5 } from "@theme/textStyles"
import { brownColor, greyColor } from "@theme/theme"
import { subproductsItems } from "../utils/info"

interface ISubproductsMenu {
  sx?: object;
}
export const SubproductsMenu: React.FC<ISubproductsMenu> = ({sx = {}}) => {
  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      gap: "4px", 
      width: "240px",
      paddingY: "12px",
      border: `1px solid ${greyColor[950]}`,
      borderRadius: "8px",
      backgroundColor: greyColor[50],
      zIndex: 100,
      ...sx
    }}>
      {subproductsItems.map((item, index) => (
        <Box
        component="a"
        href={item.path}
        key={`subproduct-item-${index}`}
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          height: "42px",
          textDecoration: "none",
          color: greyColor[950],
          cursor: "pointer",
          paddingLeft: "36px",
          "&:hover": {
            color: brownColor[950],
            backgroundColor: greyColor[200],
            textDecoration: "underline",
            transition: "all 0.3s ease-in-out",
          },
        }}
        >
          <Heading5 sx={{textAlign: "left"}}>{item.text}</Heading5>
        </Box>
      ))}
    </Box>
  )
}