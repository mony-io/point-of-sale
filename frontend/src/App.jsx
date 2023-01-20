import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import Category from "./pages/Category";
import Navbar from "./components/Navbar";
import Sale from "./pages/Sale";
import AddProduct from "./components/products/AddProduct";
import ListProduct from "./components/products/ListProduct";
import ProductUnit from "./components/products/ProductUnit";
import AddStaff from "./components/staffs/AddStaff";
import ListStaff from "./components/staffs/ListStaff";
import AddCustomer from "./components/customers/AddCustomer";
import ListCustomer from "./components/customers/ListCustomer";
import ProductBrands from "./components/products/ProductBrands";

function App() {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/category" element={<Category />} />
            <Route path="/sale" element={<Sale />} />
            <Route path="/productunit" element={<ProductUnit />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/listproduct" element={<ListProduct />} />
            <Route path="/addstaff" element={<AddStaff />} />
            <Route path="/liststaff" element={<ListStaff />} />
            <Route path="/addcustomer" element={<AddCustomer />} />
            <Route path="/listcustomer" element={<ListCustomer />} />
            <Route path="/product-brands" element={<ProductBrands />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
