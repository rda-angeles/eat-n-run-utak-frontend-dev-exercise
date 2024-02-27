import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { salesSummaryContents } from "@/constants";
import { HeaderTypes, ModalTypes } from "@/types";

import AddIcon from "@mui/icons-material/Add";
import { AddItemBtn } from "@/components";
const Header = ({ handleCloseModal, handleOpenModal, open }: ModalTypes) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between flex-col md:flex-row">
        <h1 className="font-bold text-4xl mb-6">Sales summary</h1>

        <div className="flex mb-10 justify-center">
          <AddItemBtn
            handleCloseModal={handleCloseModal}
            handleOpenModal={handleOpenModal}
            open={open}
          />
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-3 lg:max-w-[30rem] lg:gap-0">
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
