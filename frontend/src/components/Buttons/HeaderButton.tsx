import { Button } from "@mui/material";
import type { MouseEvent } from "react";

type HeaderButtonProps = {
    text: string;
    type?: "button" | "submit" | "reset";
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

function HeaderButton({text, type, onClick}: HeaderButtonProps){
    return(
        <Button
          onClick={onClick}
          variant="contained"
          type={type}
          sx={{
            backgroundColor: "#6d28d9",
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: 600,
            fontSize: 15,
            height: 40,
            "&:hover": {
              backgroundColor: "#5417b5",
            },
          }}
        >
          {text}
        </Button>
    );
}

export default HeaderButton;