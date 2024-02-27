import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { salesSummaryContents } from "@/constants";
import { HeaderTypes, ModalTypes } from "@/types";

import AddIcon from "@mui/icons-material/Add";
import { AddItemBtn } from "@/components";
const Header = ({ handleCloseModal, handleOpenModal, open }: ModalTypes) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between flex-row mb-[4rem]">
        <h1 className="font-bold text-4xl">Sales summary</h1>

        <div className="flex justify-center">
          <AddItemBtn
            handleCloseModal={handleCloseModal}
            handleOpenModal={handleOpenModal}
            open={open}
          />
        </div>
      </div>
      <div className="grid grid-cols-3 lg:max-w-[40rem]">
        {salesSummaryContents.map(({ id, header, content }: HeaderTypes) => (
          <div key={id}>
            <h5 className="text-gray-500 font-bold uppercase text-sm">
              {header}
            </h5>
            <h2 className="text-xl font-bold">{content}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Header;
