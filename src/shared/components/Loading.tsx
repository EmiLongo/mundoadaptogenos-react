import { Box, CircularProgress } from "@mui/material";
import logo from "@img/logo.svg";
const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
				gap: "2rem",
				backgroundColor: "#FFFFFF",
        position: "relative",
      }}
    >
			<CircularProgress size={150} />
      <Box component="img" src={logo} alt="Logo Óptica Villagra" width={100}
        sx={{ 
          position: "absolute", 
          top: "50%", 
          left: "50%", 
          transform: "translate(-50%, -50%)" 
        }}
      />
    </Box>
  );
};

export default Loading;