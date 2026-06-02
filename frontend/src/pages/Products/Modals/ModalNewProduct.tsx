import { Dialog, DialogActions, DialogContent, Divider } from "@mui/material";
import ModalHeader from "../../../components/ModalHeader";
import FormTextField from "../../../components/Inputs/FormTextField";
import FormNumberField from "../../../components/Inputs/FormNumberField";
import SimpleButton from "../../../components/Buttons/SimpleButton";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

type ModalNewProductProps = {
    onClose: () => void;
    open: boolean;
    onSubmit: (event: React.SubmitEvent) => void;
}

function ModalNewProduct({onClose, open, onSubmit}: ModalNewProductProps) {
  return (
    <Dialog onClose={onClose} open={open}>
      <ModalHeader text="Salvar novo produto" icon={AddRoundedIcon} />
      <DialogContent>
        <form onSubmit={onSubmit}>
          <FormTextField name="name" label="Nome" required={true} />
          <FormTextField name="description" label="Descrição" required={true} />
          <FormNumberField
            name="quantity"
            label="Quantidade inicial"
            required={true}
          />

          <Divider sx={{ mt: 1 }} />
          <DialogActions>
            <SimpleButton type="submit" text="Cadastrar" />
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ModalNewProduct;
