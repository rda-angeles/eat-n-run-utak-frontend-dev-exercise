"use client";
import { useEffect, useState } from "react";
import {
  collection,
  query,
  onSnapshot,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "@/config/firebase";
// MUI components
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

import { Edit, Delete } from "@mui/icons-material";
import { EditModal } from "@/components";

export default function Products() {
  const [items, setNewItems] = useState<any[]>([]);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const handleOpenUpdateModal = () => setOpenUpdateModal(true);
  const handleCloseUpdateModal = () => setOpenUpdateModal(false);

  const deleteItem = async (id: string) => {
    await deleteDoc(doc(db, "items", id));
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
      {items.length === 0 ? (
        <h1 className="text-3xl mt-[5rem] flex justify-center items-center">
          Items loading...
        </h1>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
              {items.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell align="right">{item.categ}</TableCell>
                  <TableCell align="right">
                    {item.size == "" ? "N/a" : item.size}
                  </TableCell>
                  <TableCell align="right">{item.price}php</TableCell>
                  <TableCell align="right">{item.cost}php</TableCell>
                  <TableCell align="right">{item.stock}</TableCell>
                  <TableCell align="right">
                    <Button onClick={handleOpenUpdateModal}>
                      <Edit color="action" />
                    </Button>

                    <Button onClick={() => deleteItem(item.id)}>
                      <Delete color="error" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              <EditModal
                openUpdateModal={openUpdateModal}
                handleCloseUpdateModal={handleCloseUpdateModal}
              />
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
