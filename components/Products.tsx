import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button, { ButtonProps } from "@mui/material/Button";

function createData(
  itemName: string,
  category: string,
  price: number,
  stock: number,
  actions: number
) {
  return { itemName, category, price, stock, actions };
}

const rows = [
  createData("Spaghetti", "Pasta", 150, 24, 23),
  createData("Ice cream sandwich", "Dessert", 30, 37, 4.3),
  createData("Eclair", "Dessert", 100, 24, 6.0),
  createData("Cupcake", "Dessert", 20, 67, 4.3),
  createData("Chick n' Waffle", "Rice", 250, 49, 3.9),
];

export default function Products() {
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
              Price
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
          {rows.map((row) => (
            <TableRow
              key={row.itemName}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.itemName}
              </TableCell>
              <TableCell align="right">{row.category}</TableCell>
              <TableCell align="right">{row.price}php</TableCell>
              <TableCell align="right">{row.stock}</TableCell>
              <TableCell align="right">{row.actions}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
