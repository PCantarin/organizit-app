import type { SvgIconComponent } from "@mui/icons-material";
import { Box } from "@mui/material";


type PageTitleProps = {
  text: string;
  icon: SvgIconComponent;
}

function PageTitle({ text, icon: Icon }: PageTitleProps) {
  return (
    <Box sx={{display:"flex", alignItems:"center", gap: 1, mb: 1 }}>
      <Icon sx={{ color: "#4d4d4d", fontSize: "2.5rem" }} />
      <h1 style={{ fontWeight: "bold", color: "#4d4d4d", margin: 0 }}>
        {text}
      </h1>
    </Box>
  );
}
export default PageTitle;
