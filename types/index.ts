export interface HeaderTypes {
  id: any;
  header: string;
  content: string | number;
}

export interface ModalTypes {
  handleCloseModal: () => void;
  handleOpenModal?: () => void;
  open: boolean;
}

export interface EditModalTypes {
  openUpdateModal: boolean;
  handleCloseUpdateModal: () => void;
  handleOpenUpdateModal?: () => void;
}

export interface ComboBoxType {
  comboItems: [] | string[];
  placeholder: string;
}
