"use client";

import { useEffect, useState } from "react";
import { AddItemBtnComponent } from "./";

// Firebase
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "@/config/firebase";

// Material ui
import Box from "@mui/material/Box";
import { Button, Modal as ModalComponent } from "@mui/material";
import { HighlightOffOutlined } from "@mui/icons-material";

// Types
import { ModalTypes } from "@/types";

// Constants
import { foodCategories, foodSizes, defaultSizes } from "@/constants";

// Custom Material UI component

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  height: 500,
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

const Modal = ({ handleCloseModal, open, selectedItem }: ModalTypes) => {
  const [item, setItem] = useState({
    name: "",
    category: {
      categName: "",
      size: "",
    },
    price: "",
    cost: "",
    stock: "",
  });

  const addItem = async (e: any) => {
    e.preventDefault();
    if (
      item.name !== "" &&
      item.price !== "" &&
      item.cost !== "" &&
      item.stock !== ""
    ) {
      await addDoc(collection(db, "items"), {
        name: item.name.trim(),
        category: {
          categName: item.category.categName.trim(),
          size: item.category.size.trim(),
        },
        price: item.price.trim(),
        cost: item.cost.trim(),
        stock: item.stock.trim(),
      });

      console.log("Added:", item.stock.trim());

      setItem({
        name: "",
        category: {
          categName: "",
          size: "",
        },
        price: "",
        cost: "",
        stock: "",
      });
    }

    handleCloseModal();
  };

  const updateItem = async (id: string, e: any) => {
    e.preventDefault();

    const updateItemDoc = doc(db, "items", id);

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
      stock: item.stock === "" ? selectedItem.stock.trim() : item.stock.trim(),
    });

    setItem({
      name: "",
      category: {
        categName: "",
        size: "",
      },
      price: "",
      cost: "",
      stock: "",
    });

    handleCloseModal();
  };

  const itemName = (e: any) => {
    setItem({ ...item, name: e.target.value });
  };
  const selectedCateg = (e: any) => {
    setItem({
      ...item,
      category: { categName: e.target.value, size: item.category.size },
    });
  };
  const selectedSize = (e: any) => {
    setItem({
      ...item,
      category: { categName: item.category.categName, size: e.target.value },
    });
  };

  const itemPrice = (e: any) => {
    setItem({ ...item, price: e.target.value });
  };

  const itemCost = (e: any) => {
    setItem({ ...item, cost: e.target.value });
  };

  const itemStock = (e: any) => {
    setItem({ ...item, stock: e.target.value });
    console.log(e.target.value);
  };

  return (
    <>
      <ModalComponent
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex items-center justify-between mb-[3rem]">
            <h1 className="text-3xl font-bold ">
              {selectedItem === undefined ? "Add new product" : "Edit product"}
            </h1>

            <Button onClick={handleCloseModal}>
              <HighlightOffOutlined
                sx={{ color: "#D04848", fontSize: "2rem" }}
              />
            </Button>
          </div>

          <form
            onSubmit={() =>
              selectedItem === undefined
                ? addItem(event)
                : updateItem(selectedItem.id, event)
            }
            className="grid grid-cols-2 gap-5 form-input"
          >
            {/* Category */}

            <div>
              <p>Product Category</p>

              <select
                defaultValue={
                  selectedItem === undefined
                    ? item.category.categName
                    : selectedItem.category?.categName
                }
                onChange={selectedCateg}
                id="food-category"
                className="input-field"
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
                defaultValue={
                  selectedItem === undefined
                    ? item.category.size
                    : selectedItem.category?.size
                }
                onChange={selectedSize}
                id="food-category"
                className="input-field"
              >
                {selectedItem === undefined
                  ? item.category.categName === "Meal" ||
                    item.category.categName === "Pasta"
                    ? foodSizes.map((foodSize) => (
                        <option key={foodSize} value={foodSize}>
                          {foodSize}
                        </option>
                      ))
                    : defaultSizes.map((defaultSize) => (
                        <option key={defaultSize} value={defaultSize}>
                          {defaultSize}
                        </option>
                      ))
                  : selectedItem.category?.categName === "Meal" ||
                    selectedItem.category?.categName === "Pasta"
                  ? foodSizes.map((foodSize) => (
                      <option key={foodSize} value={foodSize}>
                        {foodSize}
                      </option>
                    ))
                  : defaultSizes.map((defaultSize) => (
                      <option key={defaultSize} value={defaultSize}>
                        {defaultSize}
                      </option>
                    ))}
              </select>
            </div>

            {/* Item name */}
            <div>
              <p>Product name</p>
              <input
                type="text"
                defaultValue={
                  selectedItem === undefined ? item.name : selectedItem.name
                }
                onChange={itemName}
                placeholder="Product name"
                className="input-field "
              />
            </div>

            {/* Items price /item */}
            <div>
              <p>Product price</p>
              <input
                type="text"
                onChange={itemPrice}
                defaultValue={
                  selectedItem === undefined ? item.price : selectedItem.price
                }
                placeholder="Product price"
                className="input-field"
              />
            </div>

            {/* Items cost */}
            <div>
              <p>Product cost</p>
              <input
                type="text"
                defaultValue={
                  selectedItem === undefined ? item.cost : selectedItem.cost
                }
                onChange={itemCost}
                placeholder="Product cost"
                className="input-field"
              />
            </div>

            {/* Amount in stock */}
            <div>
              <p>Amount in stock</p>
              <input
                type="text"
                defaultValue={
                  selectedItem === undefined ? item.stock : selectedItem.stock
                }
                onChange={itemStock}
                placeholder="Product stock"
                className="input-field"
              />
            </div>

            <AddItemBtnComponent
              variant="contained"
              type="submit"
              className="col-span-2 mt-[2rem]"
            >
              <div className="flex items-center">
                <span className="ml-1 capitalize">
                  {selectedItem === undefined ? "Add" : "Update"}
                </span>
              </div>
            </AddItemBtnComponent>
          </form>
        </Box>
      </ModalComponent>
    </>
  );
};

export default Modal;
