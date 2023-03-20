import React, { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import toast from "react-hot-toast";
function AddProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState([]);
  // const baseUrl = "http://localhost:5000";
  const [productInfo, setProductInfo] = useState({
    name: "",
    category: "",
    price: 0,
  });
  const addProductHandler = () => {
    axios.post(`/add-product`, { ...productInfo }).then((res) => {
      if (res) {
        toast.success("Product Add Successfully!");
        navigate("/");
      }
    });
  };
  useEffect(() => {
    axios.get(`/category-list`).then((res) => {
      setCategoryList(res?.data?.data);
    });
  }, []);
  useEffect(() => {
    if (id) {
      axios.get(`/product-details/${id}`).then((res) => {
        setProductInfo(res?.data);
      });
    }
  }, [id]);
  const editProduct = () => {
    axios.patch(`/product-update/${id}`, { ...productInfo }).then((res) => {
      if (res) {
        navigate("/");
      }
    });
  };
  const style = {};
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
              mx: 12,
            }}
          >
            <h1>Add Product</h1>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            {/* <label>Name:</label> */}
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              type="text"
              value={productInfo.name}
              onChange={(e) =>
                setProductInfo({ ...productInfo, name: e.target.value })
              }
            ></TextField>
          </Box>
          <Box
            sx={{
              mt: 2,
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <FormControl sx={{ m: 1, minWidth: 235,Hight:10 }}>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={productInfo.category}
                label="Category"
                onChange={(e) =>
                  setProductInfo({ ...productInfo, category: e.target.value })
                }
              >
                {categoryList?.map((item) => {
                  console.log("item", item);
                  return (
                    <MenuItem value={item?.categoryName}>
                      {item?.categoryName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          
          </Box>
          <Box
            sx={{
              mt: 2,
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <TextField
              id="outlined-basic"
              label="price"
              variant="outlined"
              type="number"
              value={productInfo.price}
              onChange={(e) =>
                setProductInfo({ ...productInfo, price: e.target.value })
              }
            ></TextField>
          </Box>

          <Box
            sx={{
              mt: 4,
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            {id ? (
              <Button
                color="success"
                variant="contained"
                onClick={() => editProduct()}
              >
                Edit Product
              </Button>
            ) : (
              <Button
                color="success"
                variant="contained"
                onClick={() => addProductHandler()}
              >
                Add Product
              </Button>
            )}
          </Box>
        </Paper>
      </Box>
    </>
  );
}

export default AddProduct;
