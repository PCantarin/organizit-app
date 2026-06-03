import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  RadioGroup,
  Typography,
} from "@mui/material";
import ModalHeader from "../../../components/ModalHeader";
import FormTextField from "../../../components/Inputs/FormTextField";
import SimpleButton from "../../../components/Buttons/SimpleButton";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import SecretTextField from "../../../components/Inputs/SecretTextField";
import CustomRadio from "../../../components/Inputs/CustomRadio";
import PageDivider from "../../../components/PageDivider";

type ModalNewUserProps = {
  onClose: () => void;
  open: boolean;
  onSubmit: (event: React.SubmitEvent) => void;
};

function ModalNewUser({ onClose, open, onSubmit }: ModalNewUserProps) {
  return (
    <Dialog onClose={onClose} open={open}>
      <ModalHeader
        text="Adicionar novo usuário"
        icon={PersonAddAltRoundedIcon}
      />
      <DialogContent>
        <form
          onSubmit={onSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            width: "500px",
            margin: "0 auto",
            padding: "20px",
          }}
        >
          <FormTextField name="name" label="Nome" required={true} />
          <FormTextField name="username" label="Usuário" required={true} />

          <SecretTextField label="Senha" name="password" required={true} />
          <SecretTextField
            label="Repita a senha"
            name="password"
            required={true}
          />

          <Box sx={{ mt: 4 }}>
            <Typography>Selecione o nível de permissão:</Typography>

            <RadioGroup sx={{ ml: 3 }} defaultValue={"user"}>
              <FormControlLabel
                value="user"
                control={<CustomRadio />}
                label="User"
              />
              <FormControlLabel
                value="admin"
                control={<CustomRadio />}
                label="Admin"
              />
            </RadioGroup>
          </Box>

          <PageDivider marginBottom={2} marginTop={10}/>
          <DialogActions>
            <SimpleButton type="submit" text="Cadastrar" />
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ModalNewUser;
