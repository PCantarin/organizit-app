import { Dialog, DialogActions, DialogContent, Icon, Typography } from "@mui/material";
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import ControlButton from "../Buttons/ControlButton";

export type AlertModalProps = {
  open: boolean;
  text: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function AlertModal({ open, text, onConfirm, onCancel }: AlertModalProps) {

  return (
    <Dialog open={open}>
      <DialogContent sx={{ display:'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Icon sx={{ fontSize: 70 }}>
          <WarningAmberRoundedIcon sx={{ fontSize: 70, color: 'orange', mb: 5 }} />
        </Icon>
        <Typography sx={{ m: 2, fontSize: 20 }}>{text}</Typography>
        <DialogActions sx={{ width: '70%', justifyContent: 'space-between' }}>
          <ControlButton type="add" text="Voltar" onClick={onCancel} />
          <ControlButton type="remove" text="Excluir" onClick={onConfirm}/>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );

}

export default AlertModal;