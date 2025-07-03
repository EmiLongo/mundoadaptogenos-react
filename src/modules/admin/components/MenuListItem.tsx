// src/modules/admin/components/MenuListItem.tsx
import { greyColor, primaryColor } from "@/theme/theme";
import { Box, ListItem, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { IMenuOption } from "../utils/info";
import { Title3 } from "@/theme/textStyles";
import React from "react";

export interface IMenuListItemProps {
  item: IMenuOption;
  index: number;
  currentPath: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const MenuListItem: React.FC<IMenuListItemProps> = ({ item, index, currentPath, open, setOpen }) => {
  return (
    <ListItem
      key={`menu-item-${index}-${item.to}`}
      sx={{
        display: "block",
        backgroundColor: currentPath === item.to.split("/")[2] ? primaryColor[600] : "transparent",
        color: currentPath === item.to.split("/")[2] ? greyColor[50] : greyColor[950],
        "&:hover": {
          backgroundColor: primaryColor[400],
          color: greyColor[950],
          fontWeight: 600,
          cursor: "pointer",
          transition: "all 0.3s ease-in-out",
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
        onClick={() => setOpen(false)}
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
        <Title3
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
        </Title3>
      </Link>
    </ListItem>
  )
}