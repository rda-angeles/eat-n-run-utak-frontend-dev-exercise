"use client";

import { useState } from "react";
import { AddItemBtnComponent } from "../";

// Firebase
import { collection, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

// Material ui
import Box from "@mui/material/Box";
import { Modal as ModalComponent } from "@mui/material";

// Types
import { EditModalTypes, ModalTypes } from "@/types";

// Constants
import { foodCategories, foodSizes } from "@/constants";

// Custom Material UI component

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

const EditModal = ({ handleCloseUpdateModal, openUpdateModal }: EditModalTypes) => {
  const [newItem, setNewItem] = useState({
    name: "",
    categ: "",
    size: "",
    price: "",
    cost: "",
    stock: "",
  });

  const updateItem = async (e: any) => {
    e.preventDefault();
    // add item to firbase here

    if (
      newItem.name !== "" &&
      newItem.price !== "" &&
      newItem.cost !== "" &&
      newItem.stock !== ""
    ) {
    //   await addDoc(collection(db, "items"), {
    //     name: newItem.name.trim(),
    //     categ: newItem.categ.trim(),
    //     size: newItem.size.trim(),
    //     price: newItem.price.trim(),
    //     cost: newItem.cost.trim(),
    //     stock: newItem.stock.trim(),
    //   });

    //   setNewItem({
    //     name: "",
    //     categ: "",
    //     size: "",
    //     price: "",
    //     cost: "",
    //     stock: "",
    //   });

      handleCloseUpdateModal();
    }
  };

  const newItemName = (e: any) => {
    setNewItem({ ...newItem, name: e.target.value });
  };
  const selectedCateg = (e: any) => {
    setNewItem({ ...newItem, categ: e.target.value });
  };
  const selectedSize = (e: any) => {
    setNewItem({ ...newItem, size: e.target.value });
  };

  const newItemPrice = (e: any) => {
    setNewItem({ ...newItem, price: e.target.value });
  };

  const newItemCost = (e: any) => {
    setNewItem({ ...newItem, cost: e.target.value });
  };

  const newItemStock = (e: any) => {
    setNewItem({ ...newItem, stock: e.target.value });
  };

  return (
    <>
      <ModalComponent
        open={openUpdateModal}
        onClose={handleCloseUpdateModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className="text-xl font-bold">Add new product</h2>

          <form onSubmit={updateItem}>
            {/* Item name */}
            <div>
              <p>Product name</p>
              <input
                type="text"
                value={newItem.name}
                onChange={newItemName}
                placeholder="Product name"
                className="search-field"
              />
            </div>

            {/* Category */}
            <div>
              <p>Product Category</p>
              <select
                value={newItem.categ}
                onChange={selectedCateg}
                id="food-category"
              >
                {foodCategories.map((foodCategory) => (
                  <option key={foodCategory} value={foodCategory}>
                    {foodCategory}
                  </option>
                ))}
              </select>
            </div>

            {/* Size */}
            <div>
              <p>Product Size</p>
              <select
                value={newItem.size}
                onChange={selectedSize}
                id="food-category"
              >
                {foodSizes.map((foodSize) => (
                  <option key={foodSize} value={foodSize}>
                    {foodSize}
                  </option>
                ))}
              </select>
            </div>
            {/* Items price /item */}
            <div>
              <p>Product price</p>
              <input
                type="text"
                onChange={newItemPrice}
                value={newItem.price}
                placeholder="Product price"
                className="search-field"
              />
            </div>

            {/* Items cost */}
            <div>
              <p>Product cost</p>
              <input
                type="text"
                value={newItem.cost}
                onChange={newItemCost}
                placeholder="Product cost"
                className="search-field"
              />
            </div>

            {/* Amount in stock */}
            <div>
              <p>Amount in stock</p>
              <input
                type="text"
                value={newItem.stock}
                onChange={newItemStock}
                placeholder="Product stock"
                className="search-field"
              />
            </div>

            <AddItemBtnComponent variant="contained" type="submit">
              <div className="flex items-center">
                <span className="ml-1 capitalize">Add</span>
              </div>
            </AddItemBtnComponent>
          </form>
        </Box>
      </ModalComponent>
    </>
  );
};

export default EditModal;
