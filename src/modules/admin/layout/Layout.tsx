import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import { MenuAdmin } from "../components/MenuAdmin";


export const AdminLayout: React.FC = () => {
  return (
    <Box
      component="div"
      sx={{
				position: "relative",
				maxWidth: "100%",
				minHeight: "80dvh",
        display: "flex",
        flexDirection: {xs: "column", md: "row"},
        justifyContent: "center",
        alignItems: {xs:"center", md: "unset"},
      }}
    >
      <MenuAdmin />
      {/* La cuestion es si dejar el main aca o en los componentes de cada pagina */}
      <Box component="main" sx={{ flexGrow: 1}}>
        <Outlet />
      </Box>
    </Box>
  );
};