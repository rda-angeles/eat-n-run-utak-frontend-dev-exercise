import AddIcon from "@mui/icons-material/Add";

// Types
import { ModalTypes } from "@/types";
import { Modal, AddItemBtnComponent } from "./";

const AddItemBtn = ({
  handleCloseModal,
  handleOpenModal,
  open,
}: ModalTypes) => {
  return (
    <div>
      <AddItemBtnComponent variant="contained" onClick={handleOpenModal}>
        <div className="flex items-center">
          <AddIcon />
          <span className="ml-1 capitalize">Add item</span>
        </div>
      </AddItemBtnComponent>

      <Modal handleCloseModal={handleCloseModal} open={open} />
    </div>
  );
};

export default AddItemBtn;
