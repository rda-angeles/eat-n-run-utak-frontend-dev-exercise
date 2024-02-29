import { HeaderTypes } from "@/types";
import { Inventory, PointOfSale, AccountCircle } from "@mui/icons-material";

const SummaryCard = ({
  id,
  header,
  content,
  bgColor,
  productCount,
  salesCount,
}: HeaderTypes) => {
  return (
    <div
      className="h-[12rem] text-white p-4 rounded-lg flex flex-col items-center justify-center xl:h-[8rem] xl:flex-row xl:gap-[2rem] "
      style={{ backgroundColor: `${bgColor}` }}
      key={id}
    >
      <div>
        {id === 1 ? (
          <Inventory sx={{ fontSize: 50 }} />
        ) : id === 2 ? (
          <PointOfSale sx={{ fontSize: 50 }} />
        ) : id === 3 ? (
          <AccountCircle sx={{ fontSize: 55 }} />
        ) : (
          ""
        )}
      </div>

      <div className="text-center p-3 xl:text-left ">
        <span>{header}</span>
        <h2 className="font-bold text-2xl">
          {id === 1 ? productCount : id === 2 ? salesCount + " php" : content}
        </h2>
      </div>
    </div>
  );
};

export default SummaryCard;
