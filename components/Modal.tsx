"use client";

import { useEffect, useState } from "react";
import { BtnComponent } from "./";

// Material ui
import Box from "@mui/material/Box";
import { Button, Modal as ModalComponent } from "@mui/material";
import { HighlightOffOutlined } from "@mui/icons-material";

// Types
import { ModalTypes } from "@/types";

// Utils
import { updateItem, addItem } from "@/utils";

// Constants
import {
  foodCategories,
  foodSizes,
  defaultSizes,
  measurements,
} from "@/constants";

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
    stock: {
      count: "",
      measurement: "",
    },
  });

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
    setItem({
      ...item,
      stock: {
        count: e.target.value,
        measurement: item.stock.measurement,
      },
    });
  };

  const selectedMeasurement = (e: any) => {
    setItem({
      ...item,
      stock: {
        count: item.stock.count,
        measurement: e.target.value,
      },
    });
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
                ? addItem(item, handleCloseModal, event)
                : updateItem(selectedItem, item, handleCloseModal, event)
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
                required
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
                required
              >
                {selectedItem === undefined
                  ? // For add item modal
                    item.category.categName === "Meal" ||
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
                  : // Edit item modal
                  selectedItem.category?.categName === "Meal" ||
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
                className="input-field"
                required
              />
            </div>

            {/* Items price /item */}
            <div>
              <p>Product price</p>
              <input
                type="number"
                onChange={itemPrice}
                defaultValue={
                  selectedItem === undefined ? item.price : selectedItem.price
                }
                placeholder="Product price"
                className="input-field"
                required
              />
            </div>

            {/* Items cost */}
            <div>
              <p>Product cost</p>
              <input
                type="number"
                defaultValue={
                  selectedItem === undefined ? item.cost : selectedItem.cost
                }
                onChange={itemCost}
                placeholder="Product cost"
                className="input-field"
                required
              />
            </div>

            {/* Amount in stock */}
            <div>
              <p>Amount in stock</p>
              <div className="flex items-center">
                <input
                  type="number"
                  defaultValue={
                    selectedItem === undefined
                      ? item.stock.count
                      : selectedItem.stock?.count
                  }
                  onChange={itemStock}
                  placeholder="Enter stock"
                  className="input-field "
                  required
                />
                <select
                  defaultValue={
                    selectedItem === undefined
                      ? item.stock.measurement
                      : selectedItem.stock?.measurement
                  }
                  onChange={selectedMeasurement}
                  id="food-category"
                  className="input-field"
                  required
                >
                  {measurements.map((measurement) => (
                    <option key={measurement} value={measurement}>
                      {measurement}
                    </option>
                  ))}
                </select>
              </div>

              {parseFloat(item.stock.count) < 5 && (
                <p className="text-red-500 text-sm mt-1">
                  Stock input must not be less than 5
                </p>
              )}
            </div>

            <BtnComponent
              variant="contained"
              type="submit"
              className="col-span-2 mt-[2rem]"
            >
              <div className="flex items-center">
                <span className="ml-1 capitalize">
                  {selectedItem === undefined ? "Add" : "Update"}
                </span>
              </div>
            </BtnComponent>
          </form>
        </Box>
      </ModalComponent>
    </>
  );
};

export default Modal;
