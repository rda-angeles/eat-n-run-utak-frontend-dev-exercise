"use client";
import { useEffect, useState } from "react";
import { collection, getDocs, query, onSnapshot } from "firebase/firestore";
import { db } from "@/config/firebase";
// MUI components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button, { ButtonProps } from "@mui/material/Button";

export default function Products() {
  const [items, setNewItems] = useState<any[]>([]);
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
                <Button>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
