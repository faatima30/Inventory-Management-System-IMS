import { Route, Routes } from "react-router-dom";
import Dashbaord from "./pages/Dashboard";
import Product from "./pages/Product";
import Customer from "./pages/Customer";
import Supplier from "./pages/Supplier";
import Warehouse from "./pages/Warehouse";
import Inventory from "./pages/Inventory";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Forgotpwd from "./pages/Forgotpwd";
import Sale from "./pages/Sale";
import Purchase from "./pages/Purchase";
import Employee from "./pages/Employee";
// import Gallery from "./components/Gallery";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashbaord />} />
      <Route path="/Products" element={<Product />} />
      <Route path="/Customers" element={<Customer />} />
      <Route path="/Suppliers" element={<Supplier />} />
      <Route path="/Warehouses" element={<Warehouse />} />
      <Route path="/Inventory" element={<Inventory />} />
      <Route path="/Sales" element={<Sale />} />
      <Route path="/Purchases" element={<Purchase />} />
      <Route path="/Employees" element={<Employee />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/Forgotpwd" element={<Forgotpwd />} />
      {/* <Route path="/Gallery" element={<Gallery />} /> */}
    </Routes>
  );
}

export default App;
