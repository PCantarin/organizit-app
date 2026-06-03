import { Box } from "@mui/material";
import type React from "react";

type FullWidthBoxProps = {
    children?: React.ReactNode;
}

function FullWidthBox({children}: FullWidthBoxProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "top",
        gap: 2,
      }}
    >
        {children}
    </Box>
  );
}

export default FullWidthBox;
