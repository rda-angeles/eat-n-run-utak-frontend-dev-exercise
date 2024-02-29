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
import OrderModal from "./OrderModal";

export const drawerWidth = 240;

export const BtnComponent = styled(Button)<ButtonProps>(() => ({
  backgroundColor: "#289672 !important",
  float: "right",
  marginBottom: "2rem",
  "&:hover": {
    backgroundColor: "#1E6F5C !important",
  },
}));

export const OrderBtnComponent = styled(Button)<ButtonProps>(() => ({
  backgroundColor: "#289672 !important",
  padding: ".5rem",
  "&:hover": {
    backgroundColor: "#1E6F5C !important",
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
  OrderModal,
};
