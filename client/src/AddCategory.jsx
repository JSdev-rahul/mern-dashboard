import { Box, Button, Paper, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

function AddCategory() {
  const [categoryName, setCategoryName] = useState("");
  const addNewCategory = () => {
    axios
      .post("/add-category", { categoryName })
      .then((res) => {
        if (res) {
          toast.success("New category Successfully Created");
          setCategoryName("");
        }
      })
      .catch((err) => {
        toast.error(err.response?.data?.message);
        console.log("err", err);
      });
  };
  return (
    <>
      <Box
        sx={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 400,
            height: 400,
          },
        }}
      >
        <Paper elevation={3}>
          <Box
            sx={{
              display: "flex",
              alignSelf: "center",
              justifyContent: "center",
            }}
          >
            <h1>Add New Category</h1>
          </Box>
          <Box
           sx={{
            display: "flex",
            alignSelf: "center",
            justifyContent: "center",
          }}
          >
            <TextField
              placeholder="Add New Category..."
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            ></TextField>
          </Box>
        <Box
        sx={{
          mt:2,
          display: "flex",
          alignSelf: "center",
          justifyContent: "center",
        }}
        >
        <Button color="success"  
                variant="contained" onClick={() => addNewCategory()}>Add </Button>
        </Box>
        </Paper>
      </Box>
    </>
  );
}

export default AddCategory;
