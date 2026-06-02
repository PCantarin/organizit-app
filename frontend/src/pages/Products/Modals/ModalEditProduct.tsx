import { Dialog, DialogActions, DialogContent, Divider } from "@mui/material";
import ModalHeader from "../../../components/ModalHeader";
import FormTextField from "../../../components/Inputs/FormTextField";
import SimpleButton from "../../../components/Buttons/SimpleButton";
import type { Product } from "../../../services/productService";
import ModeRoundedIcon from "@mui/icons-material/ModeRounded";


type ModalEditProductProps = {
    onClose: () => void;
    open: boolean;
    onSubmit: (event: React.SubmitEvent) => void;
    selectedProduct: Product | null;
}

function ModalEditProduct({ onClose, open, onSubmit, selectedProduct }: ModalEditProductProps) {
  return (
    <Dialog onClose={onClose} open={open}>
      <ModalHeader text="Editar" icon={ModeRoundedIcon} />
      <DialogContent>
        <form onSubmit={onSubmit}>
          <FormTextField
            name="name"
            label="Nome"
            required={false}
            initialValue={selectedProduct?.name}
          />
          <FormTextField
            initialValue={selectedProduct?.description}
            name="description"
            label="Descrição"
            required={false}
          />

          <Divider sx={{ mt: 1 }} />
          <DialogActions>
            <SimpleButton type="submit" text="Confirmar" />
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ModalEditProduct;
