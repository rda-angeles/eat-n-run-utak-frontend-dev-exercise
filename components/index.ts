// MUI Imports
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";

// Components
import SalesSummary from "./SalesSummary";
import DrawerItem from "./DrawerItem";
import AddItemBtn from "./AddItemBtn";
import Products from "./Products";
import Modal from "./Modal";
import TablePaginationActions from "./TablePagination";
import SummaryCard from "./SummaryCard";

export const drawerWidth = 240;

export const AddItemBtnComponent = styled(Button)<ButtonProps>(() => ({
  backgroundColor: "#3D8361 !important",
  float: "right",
  marginBottom: "2rem",
  "&:hover": {
    backgroundColor: "#1C6758 !important",
  },
}));

export {
  SalesSummary,
  DrawerItem,
  AddItemBtn,
  Products,
  Modal,
  TablePaginationActions,
  SummaryCard,
};
