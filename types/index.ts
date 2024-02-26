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

export interface ComboBoxType {
  comboItems: [] | string[];
  placeholder: string
}
