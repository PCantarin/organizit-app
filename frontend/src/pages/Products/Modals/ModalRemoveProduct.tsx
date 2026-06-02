import { Dialog, DialogActions, DialogContent, Divider } from "@mui/material";
import ModalHeader from "../../../components/ModalHeader";
import FormNumberField from "../../../components/Inputs/FormNumberField";
import SimpleButton from "../../../components/Buttons/SimpleButton";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";

type ModalRemoveProductProps = {
  onClose: () => void;
  open: boolean;
  onSubmit: (event: React.SubmitEvent) => void;
};

function ModalRemoveProduct({ onClose, open, onSubmit }: ModalRemoveProductProps) {
  return (
    <Dialog onClose={onClose} open={open}>
      <ModalHeader text="Retirar" icon={RemoveCircleOutlineRoundedIcon} />
      <DialogContent>
        <form onSubmit={onSubmit}>
          <FormNumberField name="quantity" label="Quantidade" required={true} />

          <Divider sx={{ mt: 1 }} />
          <DialogActions>
            <SimpleButton type="submit" text="Confirmar" />
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ModalRemoveProduct;
