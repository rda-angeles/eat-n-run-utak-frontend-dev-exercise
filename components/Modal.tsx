"use client";

import { useEffect, useState } from "react";
import { AddItemBtnComponent } from "./";

// Firebase
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "@/config/firebase";

// Material ui
import Box from "@mui/material/Box";
import { Modal as ModalComponent } from "@mui/material";

// Types
import { ModalTypes } from "@/types";

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

const Modal = ({ handleCloseModal, open, selectedItem }: ModalTypes) => {
  const [item, setItem] = useState({
    name: "",
    categ: "",
    size: "",
    price: "",
    cost: "",
    stock: "",
  });

  const [updateItem, setUpdateItem] = useState({
    name: "",
    categ: "",
    size: "",
    price: "",
    cost: "",
    stock: "",
  });

  const addItem = async (e: any) => {
    e.preventDefault();
    // add item to firbase here

    if (
      item.name !== "" &&
      item.price !== "" &&
      item.cost !== "" &&
      item.stock !== ""
    ) {
      await addDoc(collection(db, "items"), {
        name: item.name.trim(),
        categ: item.categ.trim(),
        size: item.size.trim(),
        price: item.price.trim(),
        cost: item.cost.trim(),
        stock: item.stock.trim(),
      });

      setItem({
        name: "",
        categ: "",
        size: "",
        price: "",
        cost: "",
        stock: "",
      });

      handleCloseModal();
    }
  };

  const updatedItem = async (id: string, event: any) => {
    event.preventDefault();
    const updateItemDoc = doc(db, "items", id);

    await updateDoc(updateItemDoc, {
      name: selectedItem.name,
      categ: selectedItem.categ,
      size: selectedItem.size,
      price: selectedItem.price,
      cost: selectedItem.cost,
      stock: selectedItem.stock,
    });
  };

  const itemName = (e: any) => {
    if (selectedItem === undefined) {
      setUpdateItem({ ...updateItem, name: e.target.value });
    } else {
      setItem({ ...item, name: e.target.value });
    }
  };
  const selectedCateg = (e: any) => {
    setItem({ ...item, categ: e.target.value });
  };
  const selectedSize = (e: any) => {
    setItem({ ...item, size: e.target.value });
  };

  const itemPrice = (e: any) => {
    setItem({ ...item, price: e.target.value });
  };

  const itemCost = (e: any) => {
    setItem({ ...item, cost: e.target.value });
  };

  const itemStock = (e: any) => {
    setItem({ ...item, stock: e.target.value });
  };

  return (
    <>
      <ModalComponent
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className="text-xl font-bold">Add new product</h2>

          <form
            onSubmit={() =>
              selectedItem === undefined
                ? addItem
                : updatedItem(selectedItem.id, event)
            }
          >
            {/* Item name */}
            <div>
              <p>Product name</p>
              <input
                type="text"
                value={selectedItem === undefined ? item.name : updateItem.name}
                onChange={itemName}
                placeholder="Product name"
                className="search-field"
              />
            </div>

            {/* Category */}
            <div>
              <p>Product Category</p>
              <select
                value={
                  selectedItem === undefined ? item.categ : selectedItem.categ
                }
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
                value={
                  selectedItem === undefined ? item.size : selectedItem.size
                }
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
                onChange={itemPrice}
                value={
                  selectedItem === undefined ? item.price : selectedItem.price
                }
                placeholder="Product price"
                className="search-field"
              />
            </div>

            {/* Items cost */}
            <div>
              <p>Product cost</p>
              <input
                type="text"
                value={
                  selectedItem === undefined ? item.cost : selectedItem.cost
                }
                onChange={itemCost}
                placeholder="Product cost"
                className="search-field"
              />
            </div>

            {/* Amount in stock */}
            <div>
              <p>Amount in stock</p>
              <input
                type="text"
                value={
                  selectedItem === undefined ? item.stock : selectedItem.stock
                }
                onChange={itemStock}
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

export default Modal;
