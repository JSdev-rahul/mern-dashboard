import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import _debounce from "lodash/debounce";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button, InputAdornment, TextField } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { Box } from "@mui/system";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const columns = [
  { id: "_id", label: "Id", Width: 60 },
  { id: "name", label: "Name", minWidth: 60 },
  { id: "price", label: "Price", minWidth: 100 },
  { id: "category", label: "Category", minWidth: 100 },
  { id: "delete", label: "Delete", minWidth: 60 },
  { id: "edit", label: "Edit", minWidth: 60 },
];

function Home() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [categoryList, setCategoryList] = useState([]);
  const navigate = useNavigate();
  const [productList, setProductList] = useState([]);
  const [count, setCount] = useState("");
  const [pageData, setPageData] = useState({
    page: 1,
    limit: 10,
    product_category_in: [],
  });
  // filter by category
  const handleChangeRowsPerPage = (event) => {
    setPageData({ ...pageData, limit: +event.target.value });
    //  console.log()
    setRowsPerPage(+event.target.value);
    // setPage(0);
  };
  const handleChangePage = (event, newPage) => {
    console.log("newPage", newPage);
    setPage(newPage);
    if (newPage == 1) {
      setPageData({ ...pageData, page: ++newPage });
    } else if (newPage == 0) {
      setPageData({ ...pageData, page: 1 });
    } else {
      setPageData({ ...pageData, page: newPage });
    }
  };
  const handleChange = async (e) => {
    const {
      target: { value },
    } = e;
    console.log("value", e);

    setPageData({
      ...pageData,
      product_category_in: typeof value === "string" ? value.split(",") : value,
    });
  };
  useEffect(() => {
    axios.get(`/category-list`).then((res) => {
      setCategoryList(res?.data?.data);
    });
  }, []);

  const getProductList = () => {
    axios.get(`/product-list`, { params: pageData }).then((res) => {
      setProductList(res.data?.result?.reverse());
      setCount(res?.data?.count);
    });
  };
  console.log("productList");
  useEffect(() => {
    getProductList();
  }, [pageData]);

  const deleteProductHandler = (id) => {
    axios.delete(`/product-delete/${id}`).then((res) => {
      if (res) {
        toast.success("Successfully deleted!");

        getProductList();
      }
    });
  };
  const updateObject = (id) => {
    navigate(`/add/${id}`);
  };
  const searchProduct = _debounce((e) => {
    if (e.target.value) {
      axios.get(`/search-product/${e.target.value}`).then((res) => {
        setProductList(res.data);
      });
    } else {
      getProductList();
    }
  }, 1000);

  return (
    <>
      <h1>All Product List</h1>

   <Box>
   <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Filter</InputLabel>
        <Select
          size="medium"
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={pageData?.product_category_in}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {categoryList?.map((name) => (
            <MenuItem key={name?.categoryName} value={name?.categoryName}>
              <Checkbox
                checked={
                  pageData?.product_category_in.indexOf(name?.categoryName) > -1
                }
              />
              <ListItemText primary={name?.categoryName} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

     
      <TextField
      sx={{
        mt:1
      }}
     
       size="medium"
        id="outlined-basic"
        label="Search"
        variant="outlined"
        onChange={(e) => searchProduct(e)}
      ></TextField>
   </Box>
     
      <div style={{ height: 900, width: "100%" }}>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 900 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        backgroundColor: "gray",
                        color: "white",
                        fontSize: 20,
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {productList?.map((row, index) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                      style={{
                        backgroundColor:
                          index % 2 == 0 && "#EBECF0",
                        color: "white",
                        fontSize: 20,
                      }}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <>
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                              {column?.id == "delete" && (
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={() => deleteProductHandler(row?._id)}
                                >
                                  Delete
                                </Button>
                              )}
                              {column?.id == "edit" && (
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={() => updateObject(row?._id)}
                                >
                                  Edit
                                </Button>
                              )}
                            </TableCell>
                          </>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
          lazy={true}
            rowsPerPageOptions={[10, 25, 100]}
            count={count && +count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </>
  );
}

export default Home;
