import { TextField } from "@mui/material";

export type FormTextFieldProps = {
    name: string;
    label: string;
    variant?: "outlined" | "filled" | "standard";
    required?: boolean;
    type?: "text" | "date" | "email" | "password"
}

function FormTextField({name, label, variant = "standard", required, type = "text"}: FormTextFieldProps) {

    return (
        <TextField
            autoFocus
            required={required}
            name={name}
            label={label}
            fullWidth
            type={type}
            variant={variant}
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

export default FormTextField;