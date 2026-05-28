import { TextField } from "@mui/material";

export type FormNumberFieldProps = {
    name: string;
    label: string;
    variant?: "outlined" | "filled" | "standard";
    required?: boolean;
}

function FormNumberField({ name, label, variant = "standard", required}: FormNumberFieldProps) {

    return (
        <TextField
            autoFocus
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