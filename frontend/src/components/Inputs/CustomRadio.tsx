import { Radio, type RadioProps} from "@mui/material";

function CustomRadio(props: RadioProps) {
  return (
    <Radio
      {...props}
      sx={{
        color: "#6d28d9",
        "&.Mui-checked": {
          color: "#6d28d9",
        },
      }}
    />
  );
}

export default CustomRadio;