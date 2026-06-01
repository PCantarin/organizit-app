import type { SvgIconComponent } from "@mui/icons-material";
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

export type DefaultListItemProps = {
    text: string;
    onClick: () => void;
    icon: SvgIconComponent;
};

function DefaultListItem({text, onClick, icon: Icon}: DefaultListItemProps){

    return(
        <ListItem disablePadding>
          <ListItemButton
            onClick={onClick}
            sx={{
              color: "white",
              "&:hover": {
                backgroundColor: "#8240f4",
              },
            }}
          >
            <ListItemIcon sx={{ color: "white" }}>
              <Icon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
    );

}

export default DefaultListItem;