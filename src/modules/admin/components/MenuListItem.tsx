// src/modules/admin/components/MenuListItem.tsx
import { greyColor, brownColor } from "@/theme/theme";
import { Box, ListItem, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { IMenuOption } from "../utils/info";
import { Heading5 } from "@/theme/textStyles";
import React from "react";

export interface IMenuListItemProps {
  item: IMenuOption;
  index: number;
  currentPath: string;
  open: boolean;
  // setOpen: (open: boolean) => void;
}

export const MenuListItem: React.FC<IMenuListItemProps> = ({ item, index, currentPath, open }) => {
  const pathComparison = currentPath ? currentPath.includes(item.to.split("/")[2]) : false;
  return (
    <ListItem
      key={`menu-item-${index}-${item.to}`}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: open ? "flex-start" : "center",
        backgroundColor: pathComparison ? brownColor[800] : "transparent",
        color: pathComparison ? greyColor[50] : greyColor[950],
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          backgroundColor: pathComparison ? brownColor[800] : brownColor[200],
          color: pathComparison ? greyColor[50] : greyColor[950],
          fontWeight: 600,
          cursor: "pointer",
        },
      }}
    >
      <Link
        to={item.to}
        style={{
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          color: "inherit",
        }}
      >
        <Tooltip title={item.title} placement="right">
          <Box
            component="span"
            sx={{
              // minWidth: 44,
              fontSize: "1.5rem",
              display: "flex",
              justifyContent: "center",
              marginX: open ? "10px" : "auto",
              paddingY: "10px",
              transition: "all 0.3s ease-in-out",
            }}
          >
            {item.icon}
          </Box>
        </Tooltip>
        <Heading5
          sx={{ 
            fontWeight: 400, 
            whiteSpace: "nowrap",
            color: "inherit", 
            width: open ? "100%" : "1px",
            overflow: "hidden",
            opacity: open ? 1 : 0,
            paddingLeft: {xs: 0, md: "10px"},
            transition: {xs: "opacity 0.5s ease-in-out", md: "all 0.5s ease-in-out"},
          }}
        >
          {item.title}
        </Heading5>
      </Link>
    </ListItem>
  )
}