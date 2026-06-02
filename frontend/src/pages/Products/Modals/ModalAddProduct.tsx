import { Dialog, DialogActions, DialogContent, Divider } from "@mui/material";
import ModalHeader from "../../../components/ModalHeader";
import FormNumberField from "../../../components/Inputs/FormNumberField";
import SimpleButton from "../../../components/Buttons/SimpleButton";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";

import type React from "react";

type ModalAddProductProps = {
  onClose: () => void;
  open: boolean;
  onSubmit: (event: React.SubmitEvent) => void;
};

function ModalAddProduct({ onClose, open, onSubmit }: ModalAddProductProps) {
  return (
    <Dialog onClose={onClose} open={open}>
      <ModalHeader text="Inserir" icon={AddCircleOutlineRoundedIcon} />
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

export default ModalAddProduct;
