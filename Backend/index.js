const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const ProductModel = require("./model/ProductModel");
const CustomerModel = require("./model/CustomerModel");
const EmployeeModel = require("./model/EmployeeModel");
const InventoryModel = require("./model/InventoryModel");
const PurchaseModel = require("./model/PurchaseModel");
const SalesModel = require("./model/SalesModel");
const SuppliersModel = require("./model/SuppliersModel");
const WarehousesModel = require("./model/WarehousesModel");
const LoginModel = require("./model/LoginModel");
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://0.0.0.0:27017/InventoryDatabase")
  .then(() => {
    console.log("database connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(4000, () => {
  console.log("listening on port 4000");
});
//login
app.post("/login", async (req, res) => {
  const LoginData = LoginModel(req.body);
  const savedlogin = await LoginData.save();
  res.send(savedlogin);
});
app.get("/login", async (req, res) => {
  const getData = await LoginModel.find();
  res.send(getData);
});

// verify login

app.post("/login/user", async (req, res) => {
  if (req.body.username && req.body.password) {
    const user = await LoginModel.findOne(req.body);
    if (user) {
      res.send(user);
    } else {
      res.send("user not found");
    }
  } else {
    res.send("Username or Password required");
  }
});

// products part

app.get("/Products", async (req, res) => {
  const getData = await ProductModel.find();
  res.send(getData);
});

app.get("/Product/single/:id", async (req, res) => {
  const data = await ProductModel.findOne({
    _id: req.params.id,
  });

  res.send(data);
});

app.post("/AddProduct", async (req, res) => {
  const newData = ProductModel(req.body);
  const saveData = await newData.save();
  res.send(saveData);
});

app.put("/Product/update/:id", async (req, res) => {
  const updateData = await ProductModel.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(updateData);
});

app.delete("/Product/delete/:id", async (req, res) => {
  const deleteData = await ProductModel.deleteOne({ _id: req.params.id });
  res.send(deleteData);
});
app.get("/product/total", async (req, res) => {
  const totalProducts = await ProductModel.find().countDocuments();
  res.send({ totalProducts });
});
app.get("/product/price", async (req, res) => {
  const totalPrice = await ProductModel.aggregate([
    {
      $group: { _id: null, total: { $sum: "$price" } },
    },
  ]);

  res.send({ totalPrice });
});

//customer part

app.get("/Customers", async (req, res) => {
  const getData = await CustomerModel.find();
  res.send(getData);
});

app.get("/Customer/single/:id", async (req, res) => {
  const data = await CustomerModel.findOne({
    _id: req.params.id,
  });

  res.send(data);
});

app.post("/AddCustomer", async (req, res) => {
  const newData = CustomerModel(req.body);
  const saveData = await newData.save();
  res.send(saveData);
});

app.put("/Customer/update/:id", async (req, res) => {
  const updateData = await CustomerModel.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(updateData);
});

app.delete("/Customer/delete/:id", async (req, res) => {
  const deleteData = await CustomerModel.deleteOne({ _id: req.params.id });
  res.send(deleteData);
});
app.get("/customer/total", async (req, res) => {
  const totalCustomers = await CustomerModel.find().countDocuments();
  res.send({ totalCustomers });
});

//employee part

app.get("/Employees", async (req, res) => {
  const getData = await EmployeeModel.find();
  res.send(getData);
});

app.get("/Employee/single/:id", async (req, res) => {
  const data = await EmployeeModel.findOne({
    _id: req.params.id,
  });

  res.send(data);
});

app.post("/AddEmployee", async (req, res) => {
  const newData = EmployeeModel(req.body);
  const saveData = await newData.save();
  res.send(saveData);
});

app.put("/Employee/update/:id", async (req, res) => {
  const updateData = await EmployeeModel.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(updateData);
});

app.delete("/Employee/delete/:id", async (req, res) => {
  const deleteData = await EmployeeModel.deleteOne({ _id: req.params.id });
  res.send(deleteData);
});
app.get("/Employee/total", async (req, res) => {
  const totalEmployee = await EmployeeModel.find().countDocuments();
  res.send({ totalEmployee });
});

//Suppliers part

app.get("/Suppliers", async (req, res) => {
  const getData = await SuppliersModel.find();
  res.send(getData);
});

app.get("/Supplier/single/:id", async (req, res) => {
  const data = await SuppliersModel.findOne({
    _id: req.params.id,
  });

  res.send(data);
});

app.post("/AddSupplier", async (req, res) => {
  const newData = SuppliersModel(req.body);
  const saveData = await newData.save();
  res.send(saveData);
});

app.put("/Supplier/update/:id", async (req, res) => {
  const updateData = await SuppliersModel.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(updateData);
});

app.delete("/Supplier/delete/:id", async (req, res) => {
  const deleteData = await SuppliersModel.deleteOne({ _id: req.params.id });
  res.send(deleteData);
});

//Warehouse part

app.get("/Warehouses", async (req, res) => {
  const getData = await WarehousesModel.find();
  res.send(getData);
});

app.get("/Warehouse/single/:id", async (req, res) => {
  const data = await WarehousesModel.findOne({
    _id: req.params.id,
  });

  res.send(data);
});

app.post("/AddWarehouse", async (req, res) => {
  const newData = WarehousesModel(req.body);
  const saveData = await newData.save();
  res.send(saveData);
});

app.put("/Warehouse/update/:id", async (req, res) => {
  const updateData = await WarehousesModel.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(updateData);
});

app.delete("/Warehouse/delete/:id", async (req, res) => {
  const deleteData = await WarehousesModel.deleteOne({ _id: req.params.id });
  res.send(deleteData);
});
app.get("/Warehouse/total", async (req, res) => {
  const totalWarehouse = await WarehousesModel.find().countDocuments();
  res.send({ totalWarehouse });
});

///calculation parts

//Inventory part

app.get("/Inventory", async (req, res) => {
  const getData = await InventoryModel.find();
  res.send(getData);
});

app.get("/Inventory/single/:id", async (req, res) => {
  const data = await InventoryModel.findOne({
    _id: req.params.id,
  });

  res.send(data);
});

app.post("/AddInventory", async (req, res) => {
  const newData = InventoryModel(req.body);
  const saveData = await newData.save();
  res.send(saveData);
});

app.put("/Inventory/update/:id", async (req, res) => {
  const updateData = await InventoryModel.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(updateData);
});

app.delete("/Inventory/delete/:id", async (req, res) => {
  const deleteData = await InventoryModel.deleteOne({ _id: req.params.id });
  res.send(deleteData);
});

//Purchase part

app.get("/Purchases", async (req, res) => {
  const getData = await PurchaseModel.find();
  res.send(getData);
});

app.get("/Purchase/single/:id", async (req, res) => {
  const data = await PurchaseModel.findOne({
    _id: req.params.id,
  });

  res.send(data);
});

app.post("/AddPurchase", async (req, res) => {
  try {
    const supplierdata = await SuppliersModel.findOne({
      _id: req.body.supplierID,
    });
    if (!supplierdata) return res.send("supplier name not found");
    const Productdata = await ProductModel.findOne({ _id: req.body.productID });
    if (!Productdata) return res.send("product name not found");
    const purchasedata = await new SalesModel(req.body);
    let productqty = Productdata.quantity + parseInt(req.body.qtyPurchased);

    await Saledata.save();
    await ProductModel.findByIdAndUpdate(
      req.body.productID,
      {
        quantity: productqty,
      },
      { new: true }
    );
    res.send(purchasedata);
  } catch (error) {
    res.send(error.message);
  }
});

app.put("/Purchase/update/:id", async (req, res) => {
  const updateData = await PurchaseModel.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(updateData);
});

app.delete("/Purchase/delete/:id", async (req, res) => {
  const deleteData = await PurchaseModel.deleteOne({ _id: req.params.id });
  res.send(deleteData);
});

//Sale part

app.get("/Sale", async (req, res) => {
  const getData = await SalesModel.find();
  // .populate({
  //   path: "customerID",
  //   model: "Customers",
  //   select: "-_id Name",
  // })
  // .populate({
  //   path: "productID",
  //   model: "Products",
  //   select: "-_id name ",
  // });
  res.send(getData);
});

app.get("/Sale/single/:id", async (req, res) => {
  const data = await SalesModel.findOne({
    _id: req.params.id,
  });

  res.send(data);
});

app.post("/AddSale", async (req, res) => {
  try {
    const customerdata = await CustomerModel.findOne({
      _id: req.body.customerID,
    });
    if (!customerdata) return res.send("customer name not found");
    const Productdata = await ProductModel.findOne({ _id: req.body.productID });
    if (!Productdata) return res.send("product name not found");
    const Saledata = await new SalesModel(req.body);
    if (Productdata.quantity < req.body.qtySold) {
      return res.send(
        `Your sales amout exceeds the current amount of products`
      );
    }
    let productqty = Productdata.quantity - parseInt(req.body.qtySold);

    await Saledata.save();
    await ProductModel.findByIdAndUpdate(
      req.body.productID,
      {
        quantity: productqty,
      },
      { new: true }
    );
    res.send(Saledata);
  } catch (error) {
    res.send(error.message);
  }
});

app.put("/Sale/update/:id", async (req, res) => {
  const updateData = await SalesModel.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(updateData);
});

app.delete("/Sale/delete/:id", async (req, res) => {
  const deleteData = await SalesModel.deleteOne({ _id: req.params.id });
  res.send(deleteData);
});
