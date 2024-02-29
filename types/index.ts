export interface HeaderTypes {
  id: any;
  header: string;
  content?: string | number;
  bgColor: string;
  productCount?: number;
  salesCount?: number;
}

export interface ModalTypes {
  handleCloseModal: () => void;
  handleOpenModal?: () => void;
  open: boolean;
  selectedItem?: any;
}

export interface ComboBoxType {
  comboItems: [] | string[];
  placeholder: string;
}
