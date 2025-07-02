import { Box, InputAdornment, OutlinedInput } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export const SearchField: React.FC = () => {
  // TODO: hacer la logica para el search y agregar la info en un tipo de modal
  return (
    <Box>
      <OutlinedInput
        placeholder="Buscar"
        endAdornment={
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        }
        sx={{
          height: "40px",
          width: "100%",
          maxWidth: "170px",
          borderRadius: "30px",
          paddingLeft: "10px",
        }}
      />
    </Box>
  );
};