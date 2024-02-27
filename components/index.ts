// MUI Imports
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";

// Components
import Header from "./Header";
import AddItemBtn from "./AddItemBtn";
import Products from "./Products";
import Modal from "./Modal";

export const drawerWidth = 240;

export const AddItemBtnComponent = styled(Button)<ButtonProps>(() => ({
  backgroundColor: "#3D8361 !important",
  float: "right",
  "&:hover": {
    backgroundColor: "#1C6758 !important",
  },
}));

export { Header, AddItemBtn, Products, Modal };
