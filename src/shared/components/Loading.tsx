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
      }}
    >
			<CircularProgress />
      <img src={logo} alt="Logo Mundo Adaptogenos" width={200} />
    </Box>
  );
};

export default Loading;