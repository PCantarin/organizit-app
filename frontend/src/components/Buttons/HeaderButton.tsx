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
            backgroundColor: "#7e57c2",
            borderRadius: "8px",
            textTransform: "none",
            fontFamily: "inherit",
            fontWeight: 700,
            fontSize: 16,
            height: 40,
            "&:hover": {
              backgroundColor: "#6a46b0",
            },
          }}
        >
          {text}
        </Button>
    );
}

export default HeaderButton;