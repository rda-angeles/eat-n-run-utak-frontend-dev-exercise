import { useState } from "react";
import { Button, Modal, Box } from "@mui/material";
import { ModalTypes } from "@/types";
import { BtnComponent } from "@/components";
import { addOrder } from "@/utils";

const OrderModal = ({ open, handleCloseModal, selectedItem }: ModalTypes) => {
  const [orderInput, setOrderInput] = useState("");

  const handleOrderInput = (e: any) => {
    setOrderInput(e.target.value);
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: 300,
    bgcolor: "background.paper",
    borderRadius: "5px",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className="text-3xl mb-8">Order:</h1>
          <div>
            <p>Enter order amount:</p>
            <input
              type="text"
              placeholder="Order amount"
              defaultValue={orderInput}
              onChange={handleOrderInput}
              className="input-field"
              required
            />
          </div>

          <BtnComponent
            variant="contained"
            type="submit"
            className="col-span-2 mt-[2rem]"
            onClick={() => {
              addOrder(selectedItem, orderInput, handleCloseModal);
            }}
          >
            <div className="flex items-center">
              <span className="ml-1 capitalize">Submit order</span>
            </div>
          </BtnComponent>
        </Box>
      </Modal>
    </>
  );
};

export default OrderModal;
