import type { SvgIconComponent } from "@mui/icons-material";
import { DialogTitle } from "@mui/material";

type ModalHeaderProps = {
  text: string;
  icon: SvgIconComponent;
};

function ModalHeader({text, icon: Icon}: ModalHeaderProps) {
  return (
     <DialogTitle
      sx={{
        m: 0,
        p: 2,
        backgroundColor: "#6d28d9",
        color: "white",
        fontSize: 30,
        fontWeight: 700,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Icon sx={{ fontSize: 40, mr: "10px" }} />
      {text}
    </DialogTitle>
  );
}

export default ModalHeader;
