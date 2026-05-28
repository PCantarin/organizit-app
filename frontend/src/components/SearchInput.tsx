import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";


type SearchInputProps = {
    value: string;
    onChange: (value: string) => void;
  }

function SearchInput(props: SearchInputProps) {

  return (
    <TextField
      value={props.value}
      onChange={(event) => props.onChange(event.target.value)}
      placeholder="Pesquisar..."
      variant="outlined"
      size="small"
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        },
      }}
      sx={{ mb: 2,
        "& .MuiOutlinedInput-root": {
          borderRadius: "12px",
          backgroundColor: "#f5f5f5",

          "& input": {
            justifyContent: "center"
          },

          "& fieldset": {
            borderColor: "transparent",
            borderRadius: "12px",
          },

          "&:hover fieldset": {
            borderColor: "transparent",
          },

          "&.Mui-focused fieldset": {
            borderColor: "#7c3aed",
          },
        },
      }}
    />
  );
}
export default SearchInput;