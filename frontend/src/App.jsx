import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import Category from "./pages/Category";
import Sale from "./pages/Sale";
import AddProduct from "./components/products/AddProduct";
import ListProduct from "./components/products/ListProduct";
import ProductUnit from "./components/products/ProductUnit";
import AddStaff from "./components/staffs/AddStaff";
import ListStaff from "./components/staffs/ListStaff";
import AddCustomer from "./components/customers/AddCustomer";
import ListCustomer from "./components/customers/ListCustomer";
import ProductBrands from "./components/products/ProductBrands";
import NotFound from './pages/NotFound'
import Login from "./pages/Login";
import PrivateRoutes from "./utls/PrivateRoutes";
import PublicRoute from './utls/PublicRoute'
import ResetPassword from "./components/login/ResetPassword";
import NewPassword from "./pages/NewPassword";
import { AuthProvider } from "./utls/auth";
import RequireAuth from "./utls/RequireAuth";
import AddUser from "./pages/users/AddUser";
import ListUsers from "./pages/users/ListUsers";
import { useMemo } from 'react'
import EditeProduct from "./components/products/EditeProduct";
import { ToastContainer } from "react-toastify";
import ProductReport from "./pages/reports/ProductReport";
function App() {

  return (
    <AuthProvider>
      <div className="flex">
        {
          useMemo(() => {
            return <Sidebar />
          }, [])
        }

        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/category" element={<Category />} />
            <Route path="/sale" element={<Sale />} />
            <Route path="/productunit" element={<ProductUnit />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/listproduct" element={<ListProduct />} />
            <Route path="/addcustomer" element={<AddCustomer />} />
            <Route path="/listcustomer" element={<ListCustomer />} />
            <Route path="/product-brands" element={<ProductBrands />} />
            <Route path="/update-product/:id" element={<EditeProduct />} />
            <Route element={<RequireAuth />}>
              <Route path="/adduser" element={<AddUser />} />
              <Route path="/listuser" element={<ListUsers />} />
            </Route>
            <Route path="/productReport" element={<ProductReport />} />
          </Route>

          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
          </Route>
          <Route
            path="/forgotpassword/:id/:token"
            element={<NewPassword />}
          ></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
        {/* toast message */}
        <ToastContainer />
      </div>
    </AuthProvider>
  );
}

export default App;
