import React from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";

export type SecretTextFieldProps = {
  name: string;
  label: string;
  variant?: "outlined" | "filled" | "standard";
  required?: boolean;
  initialValue?: string;
};

function SecretTextField({ name, label, variant = "standard", required, initialValue }: SecretTextFieldProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleToggle = () => setShowPassword((s) => !s);

  return (
    <TextField
      name={name}
      label={label}
      required={required}
      defaultValue={initialValue}
      fullWidth
      type={showPassword ? "text" : "password"}
      variant={variant}
      sx={{
        mt: "20px",
        "& .MuiInput-underline:after": {
          borderBottomColor: "#7b1fa2",
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "#7b1fa2",
        },
      }}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleToggle} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
}

export default SecretTextField;