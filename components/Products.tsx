"use client";
import { useEffect, useState } from "react";

// MUI imports
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";

import { Edit, Delete } from "@mui/icons-material";

//Component import
import { TablePaginationActions, Modal, AddItemBtn } from "@/components";

// Type import
import { ModalTypes } from "@/types";

// Utils
import { deleteItem } from "@/utils";

// Firebase imports
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "@/config/firebase";
import { tableHeads } from "@/constants";

export default function Products({
  handleCloseModal,
  handleOpenModal,
  open,
}: ModalTypes) {
  // Table Row Variables
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Items and modal variables
  const [items, setNewItems] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const handleOpenUpdateModal = (item: {}) => {
    setOpenUpdateModal(true);
    setSelectedItem(item);
  };
  const handleCloseUpdateModal = () => setOpenUpdateModal(false);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - items.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const getProducts = async () => {
      const fbQuery = query(collection(db, "items"));
      const unsubscribe = onSnapshot(fbQuery, (querySnapshot) => {
        let itemsArr: any = [];
        querySnapshot.forEach((doc) => {
          itemsArr.push({ ...doc.data(), id: doc.id });
        });

        setNewItems(itemsArr);
      });
    };
    getProducts();
  }, []);

  return (
    <>
      <h1 className="text-4xl font-bold">Inventory.</h1>

      <AddItemBtn
        handleCloseModal={handleCloseModal}
        handleOpenModal={handleOpenModal}
        open={open}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              {tableHeads.map((tableHeadItem) => (
                <TableCell
                  align={tableHeadItem.alignRight ? "right" : "left"}
                  key={tableHeadItem.id}
                  sx={{ fontWeight: "bold" }}
                >
                  {tableHeadItem.tableName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? items.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : items
            ).map((item) => (
              <TableRow key={item.name}>
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {item.category.categName}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {item.category.size}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {item.price}php
                </TableCell>

                <TableCell style={{ width: 160 }} align="right">
                  {item.cost}php
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {item.stock.count} {item.stock.measurement}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    display: "flex",
                    flexDirection: "revert",
                    justifyContent: "end",
                  }}
                >
                  <IconButton onClick={() => handleOpenUpdateModal(item)}>
                    <Edit color="action" />
                  </IconButton>

                  <IconButton onClick={() => deleteItem(item.id)}>
                    <Delete sx={{ color: "#D04848" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}

            <Modal
              open={openUpdateModal}
              handleCloseModal={handleCloseUpdateModal}
              selectedItem={selectedItem}
            />
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={7}
                count={items.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}
