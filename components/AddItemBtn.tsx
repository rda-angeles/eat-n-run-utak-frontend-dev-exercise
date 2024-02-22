import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";

// Types
import { ModalTypes } from "@/types";
import { ComboBox } from "./";

// Constants
import { foodCategory, foodSizes } from "@/constants";

const AddItemBtnComponent = styled(Button)<ButtonProps>(() => ({
  backgroundColor: "#3D8361 !important",
  float: "right",
  "&:hover": {
    backgroundColor: "#1C6758 !important",
  },
}));

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

const AddItemBtn = ({
  handleCloseModal,
  handleOpenModal,
  open,
}: ModalTypes) => {
  return (
    <div className="">
      <AddItemBtnComponent variant="contained" onClick={handleOpenModal}>
        <div className="flex items-center">
          <AddIcon />
          <span className="ml-1 capitalize">Add item</span>
        </div>
      </AddItemBtnComponent>

      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className="text-xl font-bold">Add new product</h2>
          {/* Item name */}
          <div>
            <p>Product name</p>
            <input
              type="text"
              placeholder="Product name"
              className="search-field"
            />
          </div>

          {/* Category */}
          <div>
            <p>Product Category</p>
            <ComboBox
              comboItems={foodCategory}
              placeholder="Product Category"
            />
          </div>

          {/* Size */}
          <div>
            <p>Product Size</p>
            <ComboBox comboItems={foodSizes} placeholder="Product Size" />
          </div>

          {/* Items price /item */}
          <div>
            <p>Product price</p>
            <input
              type="text"
              placeholder="Product price"
              className="search-field"
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default AddItemBtn;
