import axios from "axios";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddCategory from "./AddCategory";
import AddProduct from "./AddProduct";
import Home from "./Home";
import Nav from "./Nav";
import PrivateComponentPage from "./PrivateComponent";
import { SignUpPage } from "./SignUpPage";

function App() {
  const token = localStorage.getItem("token");

  axios.defaults.headers.common["Authorization"] =
    "Bearer" + " " + JSON.parse(token);
  axios.defaults.baseURL = "http://localhost:3300";
  return (
    <BrowserRouter>
      <Toaster />
      <Nav />
      <Routes>
        <Route element={<PrivateComponentPage />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/add" element={<AddProduct />}></Route>
          <Route
            path="/add/:id"
            element={<AddProduct formType="updateProduct" />}
          ></Route>
          <Route path="/update" element={<h1>update page</h1>}></Route>
          <Route path="/logout" element={<h1>logout page</h1>}></Route>
          <Route path="/profile" element={<h1>profile page</h1>}></Route>
          <Route path="/add-category" element={<AddCategory />}></Route>
        </Route>
        <Route path="/sign-up" element={<SignUpPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
