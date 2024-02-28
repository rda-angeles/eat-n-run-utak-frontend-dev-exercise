import { getCountFromServer, collection } from "firebase/firestore";
import { db } from "@/config/firebase";

const getProductCount = async () => {
  const coll = collection(db, "items");
  const snapshot = await getCountFromServer(coll);
  return snapshot.data().count;
};

export const salesSummaryContents = [
  {
    id: 1,
    header: "Total Product",
    bgColor: "#1B6B93",
  },
  {
    id: 2,
    header: "Sales",
    content: "10,000php",
    bgColor: "#EE4266",
  },
  {
    id: 3,
    header: "Access Type",
    content: "Admin",
    bgColor: "#FFA447",
  },
];

export const foodCategories = [
  "",
  "Dessert",
  "Meal",
  "Snack",
  "Pasta",
  "Beverage",
];
export const defaultSizes = ["", "Small", "Medium", "Large"];
export const foodSizes = ["", "Regular", "Family"];
