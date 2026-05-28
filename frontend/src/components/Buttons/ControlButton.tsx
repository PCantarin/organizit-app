import { Button } from "@mui/material";
import type { MouseEvent } from "react";

export type ControlButtonProps = {
    text: string;
    type: "add" | "remove";
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

function ControlButton({ text, type, onClick }: ControlButtonProps) {

    const styles = {
        add: {
            backgroundColor: "#2e7d32",
            "&:hover": {
                backgroundColor: "#1b5e20",
            },
        },
        remove: {
            backgroundColor: "#ae0000",
            "&:hover": {
                backgroundColor: "#7f0000",
            },
        },
    };

    return (
        <Button
            size="small"
            variant="contained"
            onClick={onClick}
            sx={styles[type]}
        >
            {text}
        </Button>
    );
}

export default ControlButton;