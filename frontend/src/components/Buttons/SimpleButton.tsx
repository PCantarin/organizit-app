import { Button } from "@mui/material";
import type { MouseEvent } from "react";

type SimpleButtonProps = {
    text: string;
    type?: "button" | "submit" | "reset";
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

function SimpleButton({text, type, onClick}: SimpleButtonProps) {
  return (
    <Button
      autoFocus
      variant="contained"
      type={type}
      onClick={onClick}
      sx={{
        backgroundColor: "#6d28d9",
        borderRadius: "6px",
        textTransform: "none",
        fontWeight: 600,
        fontSize: 16,
        "&:hover": {
          backgroundColor: "#5417b5",
        },
      }}
    >
      {text}
    </Button>
  );
}

export default SimpleButton;
