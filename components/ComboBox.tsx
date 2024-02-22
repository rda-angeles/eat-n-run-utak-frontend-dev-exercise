"use client";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { ComboBoxType } from "@/types";

export default function ComboBox({ comboItems, placeholder }: ComboBoxType) {
  const [comboItem, setComboItem] = useState("");
  console.log(comboItem);
  return (
    <>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={comboItems}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label={placeholder} />}
      />
    </>
  );
}
