import { Dialog, DialogActions, DialogContent, Divider } from "@mui/material";
import ModalHeader from "../../../components/ModalHeader";
import FormTextField from "../../../components/Inputs/FormTextField";
import SimpleButton from "../../../components/Buttons/SimpleButton";
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import SecretTextField from "../../../components/Inputs/SecretTextField";

type ModalNewUserProps = {
    onClose: () => void;
    open: boolean;
    onSubmit: (event: React.SubmitEvent) => void;
}

function ModalNewUser({onClose, open, onSubmit}: ModalNewUserProps) {
  return (
    <Dialog onClose={onClose} open={open}>
      <ModalHeader text="Adicionar novo usuário" icon={PersonAddAltRoundedIcon} />
      <DialogContent>
        <form onSubmit={onSubmit}>
          <FormTextField name="name" label="Nome" required={true} />
          <FormTextField name="username" label="Usuário" required={true} />

          <SecretTextField label="Senha" name="password" required={true} />
          <SecretTextField label="Repita a senha" name="password" required={true} />

          <Divider sx={{ mt: 1 }} />
          <DialogActions>
            <SimpleButton type="submit" text="Cadastrar" />
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ModalNewUser;
