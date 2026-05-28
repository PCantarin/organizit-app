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
        backgroundColor: "#7e57c2",
        borderRadius: "6px",
        textTransform: "none",
        fontFamily: "inherit",
        fontWeight: 700,
        fontSize: 16,
        "&:hover": {
          backgroundColor: "#6a46b0",
        },
      }}
    >
      {text}
    </Button>
  );
}

export default SimpleButton;
