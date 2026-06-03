import { Divider } from "@mui/material";

type PageDividerProps = {
  height?: number; 
  marginBottom?: number;
  marginTop?: number;
}

function PageDivider({ height = 1, marginBottom = 20, marginTop }: PageDividerProps){
    return(
        <Divider
        sx={{ marginBottom: `${marginBottom}px`, marginTop:`${marginTop}px`, border: `solid ${height}px`, borderRadius: "10px" }}
      />
    )
}

export default PageDivider;