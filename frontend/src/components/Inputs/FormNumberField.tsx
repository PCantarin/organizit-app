import { TextField } from "@mui/material";
import { useState } from "react";

export type FormNumberFieldProps = {
    name: string;
    label: string;
    variant?: "outlined" | "filled" | "standard";
    required?: boolean;
    defaultValue?: number;
}

function FormNumberField({ name, label, variant = "standard", required, defaultValue = 0 }: FormNumberFieldProps) {

    return (
        <TextField
            autoFocus
            defaultValue={defaultValue}
            required={required}
            name={name}
            label={label}
            fullWidth
            type="number"
            variant={variant}
            slotProps={{
                htmlInput: { min: 0 },
            }}
            sx={{
                "& .MuiInput-underline:after": {
                    borderBottomColor: "#7b1fa2",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                    color: "#7b1fa2",
                },
                mt: "20px",
            }}
        />
    );

}

export default FormNumberField;