import { Divider } from "@mui/material";

export type DrawerDividerProps = {
  text: string;
  textAlign?: "left" | "center" | "right";
};

function DrawerDivider({ text, textAlign = "left" }: DrawerDividerProps) {
  return (
    <Divider
      textAlign={textAlign}
      sx={{
        mt: 1.25,
        fontSize: 14,
        color: "#b4a6e9", // roxo claro discreto

        "&::before, &::after": {
          borderColor: "#9389bd",
          borderTopWidth: "1px",
        },
      }}
    >
      {text}
    </Divider>
  );
}

export default DrawerDivider;
