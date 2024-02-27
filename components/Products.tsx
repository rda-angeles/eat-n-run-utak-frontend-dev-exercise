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
  Button,
} from "@mui/material";

import { Edit, Delete } from "@mui/icons-material";

//Component import
import {
  TablePaginationActions,
  Modal,
} from "@/components";

// Firebase imports
import {
  collection,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/config/firebase";

export default function Products() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [items, setNewItems] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const handleOpenUpdateModal = (item: {}) => {
    setOpenUpdateModal(true);
    setSelectedItem(item);
  };
  const handleCloseUpdateModal = () => setOpenUpdateModal(false);

  const deleteItem = async (id: string) => {
    await deleteDoc(doc(db, "items", id));
  };
  // Avoid a layout jump when reaching the last page with empty rows.
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
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Item name</TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Category
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Size
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Price
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Cost
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Stock
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                {item.price}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {item.cost}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {item.cost}
              </TableCell>
              <TableCell align="right">
                <Button onClick={() => handleOpenUpdateModal(item)}>
                  <Edit color="action" />
                </Button>

                <Button onClick={() => deleteItem(item.id)}>
                  <Delete sx={{ color: "#D04848" }} />
                </Button>
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
  );
}
