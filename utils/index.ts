// Firebase imports
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/config/firebase";

export const deleteItem = async (id: string) => {
  await deleteDoc(doc(db, "items", id));
};

export const addItem = async (
  item: {
    name: string;
    category: {
      categName: string;
      size: string;
    };
    price: string;
    cost: string;
    stock: {
      count: string;
      measurement: string;
    };
  },
  handleCloseModal: () => void,
  event: any
) => {
  event.preventDefault();
  if (
    item.name !== "" &&
    item.price !== "" &&
    item.cost !== "" &&
    item.stock.count !== "" &&
    item.stock.measurement !== ""
  ) {
    await addDoc(collection(db, "items"), {
      name: item.name.trim(),
      category: {
        categName: item.category.categName.trim(),
        size: item.category.size.trim(),
      },
      price: item.price.trim(),
      cost: item.cost.trim(),
      stock: {
        count: item.stock.count.trim(),
        measurement: item.stock.measurement.trim(),
      },
    });
  }

  handleCloseModal();

  return {
    name: (item.name = ""),
    category: {
      categName: (item.category.categName = ""),
      size: (item.category.size = ""),
    },
    price: (item.price = ""),
    cost: (item.cost = ""),
    stock: {
      count: (item.stock.count = ""),
      measurement: (item.stock.measurement = ""),
    },
  };
};

export const updateItem = async (
  selectedItem: {
    id: string;
    name: string;
    category: {
      categName: string;
      size: string;
    };
    price: string;
    cost: string;
    stock: {
      count: string;
      measurement: string;
    };
  },
  item: {
    name: string;
    category: {
      categName: string;
      size: string;
    };
    price: string;
    cost: string;
    stock: {
      count: string;
      measurement: string;
    };
  },
  handleCloseModal: () => void,
  event: any
) => {
  event.preventDefault();

  const updateItemDoc = doc(db, "items", selectedItem.id);

  await updateDoc(updateItemDoc, {
    name: item.name === "" ? selectedItem.name.trim() : item.name.trim(),
    category: {
      categName:
        item.category.categName === ""
          ? selectedItem.category.categName.trim()
          : item.category.categName.trim(),
      size:
        item.category.size === ""
          ? selectedItem.category.size.trim()
          : item.category.size.trim(),
    },
    price: item.price === "" ? selectedItem.price.trim() : item.price.trim(),
    cost: item.cost === "" ? selectedItem.cost.trim() : item.cost.trim(),
    stock: {
      count:
        item.stock.count === ""
          ? selectedItem.stock.count.trim()
          : item.stock.count.trim(),
      measurement:
        item.stock.measurement === ""
          ? selectedItem.stock.measurement.trim()
          : item.stock.measurement.trim(),
    },
  });

  handleCloseModal();

  return {
    name: (item.name = ""),
    category: {
      categName: (item.category.categName = ""),
      size: (item.category.size = ""),
    },
    price: (item.price = ""),
    cost: (item.cost = ""),
    stock: {
      count: (item.stock.count = ""),
      measurement: (item.stock.measurement = ""),
    },
  };
};
