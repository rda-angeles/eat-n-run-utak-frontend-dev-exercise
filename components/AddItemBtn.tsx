// Types
import { ModalTypes } from "@/types";
import { Modal, BtnComponent } from "./";
import { AddCircle } from "@mui/icons-material";

const AddItemBtn = ({
  handleCloseModal,
  handleOpenModal,
  open,
}: ModalTypes) => {
  return (
    <div>
      <BtnComponent variant="contained" onClick={handleOpenModal}>
        <div className="flex items-center">
          <AddCircle sx={{ marginRight: ".5rem" }} />
          <span className="ml-1 capitalize">Add item</span>
        </div>
      </BtnComponent>

      <Modal handleCloseModal={handleCloseModal} open={open} />
    </div>
  );
};

export default AddItemBtn;
