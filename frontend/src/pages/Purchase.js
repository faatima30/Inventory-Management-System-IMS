import React, { useEffect, useState } from "react";
import axios from "axios";
import useSWR, { mutate } from "swr";
import { MDBDataTable } from "mdbreact";
import {
  Col,
  Modal,
  Card,
  CardBody,
  CardTitle,
  Row,
  Label,
  FormGroup,
} from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import "react-toastify/dist/ReactToastify.css";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDeleteSweep } from "react-icons/md";
import Sidenav from "../components/SideNav";
import Footer from "../components/Footer";

export default function Sale() {
  const endpoint = "http://localhost:4000";
  const [isedit, setisedit] = useState(false);
  const [isopen, setisopen] = useState(false);
  const [getsup, setgetsup] = useState([]);
  const [getpro, setgetpro] = useState([]);
  const [purchaseObj, setpurchaseObj] = useState({
    supplier: "",
    Product: "",
    qtyPurchased: "",
    Price: "",
    datePurchased: "",
  });
 
  useEffect(() => {
    fetcher();
    // alldata();
  }, []);
  // const alldata = async () => {
  //   const cusdata = await axios
  //     .get("http://localhost:4000/Customers", headers)
  //     .then((res) => setgetsup(res.data))
  //     .catch((err) => console.log(err));
  //   const prodata = await axios
  //     .get("http://localhost:4000/Products", headers)
  //     .then((res) => setgetpro(res.data))
  //     .catch((err) => console.log(err));
  //     const { products } = prodata;
  //     const { customers } = cusdata;
  //     const allData = { products, customers };
  //   return (allData)
  // };
  let token = localStorage.getItem("token");
  const headers = {
    headers: {
      "content-type": "application/json",
      token: token,
    },
  };
  const handelEdit = (data) => {
    setisopen(true);
    setpurchaseObj(data);
    setisedit(true);
  };
  const deleteProduct = (id) => {
    axios
      .delete(`${endpoint}/Purchase/delete/${id}`)
      .then((response) => {
        alert("Sale is deleted successfully");
      })
      .catch((error) => {
        console.log(error);
        console.log(data._id);
      });
  };

  const HandelSubmit = async (e) => {
    try {
      if (isedit) {
        let obj = {
          CusName: purchaseObj.customerID,
          Product: purchaseObj.productID,
          qtySold: purchaseObj.qtySold,
          Price: purchaseObj.Price,
          dateSold: purchaseObj.dateSold,
        };
        let updatedEndPoint = `${endpoint}/Sale/update/${purchaseObj._id}`;
        await axios
          .put(updatedEndPoint, obj, headers)
          .then((response) => {
            alert("Sale has been updated successfully");
            mutate(endpoint, fetcher);
            setisedit(false);
            setisopen(false);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        await axios
          .post(`${endpoint}/AddSale`, purchaseObj, headers)
          .then((response) => {
            alert("Sale has been save successfully");
            setisopen(false);
            setisedit(false);
            mutate(endpoint, fetcher);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handelChange = (e) => {
    setpurchaseObj({ ...purchaseObj, [e.target.name]: e.target.value });
  };
  const tog_standard = () => {
    setisopen(!isopen);
  };
  async function fetcher() {
    const { data } = await axios.get(`http://localhost:4000/Sale`);
    return data;
  }

  const { data: SaleData  } = useSWR(endpoint, fetcher);
  const data = {
    columns: [
      {
        label: "Customer Name",
        field: "customerID",
        sort: "asc",
        width: 100,
      },
      {
        label: "Product",
        field: "productID",
        sort: "asc",
        width: 100,
      },
      {
        label: "Quantity Sold",
        field: "qtySold",
        sort: "asc",
        width: 100,
      },
      {
        label: "Price",
        field: "Price",
        sort: "asc",
        width: 100,
      },
      {
        label: "Date Sold",
        field: "dateSold",
        sort: "asc",
        width: 100,
      },
      {
        label: "date created",
        field: "createdAt",
        sort: "asc",
        width: 100,
      },
      {
        label: "date updated",
        field: "updatedAt",
        sort: "asc",
        width: 100,
      },
      {
        label: "Action",
        field: "action",
        sort: "asc",
        width: 100,
      },
    ],
    rows: SaleData?.map((data) => {
      data.action = (
        <div className="d-flex">
          <button
            onClick={() => handelEdit(data)}
            className="btn text-white mx-2"
            style={{ backgroundColor: "rgb(174, 174, 186)" }}
          >
            <BiSolidEditAlt />
          </button>
          <button
            onClick={() => deleteProduct(data._id)}
            id="sa-success"
            className="btn btn-danger"
          >
            <MdDeleteSweep />
          </button>
        </div>
      );
      return data;
    }),
  };
  return (
    <div className="d-flex">
      <Sidenav />

      <div className="dash">
        <Col sm={6} md={4} xl={3}>
          <div className="my-4 text-center">
            <Modal isOpen={isopen}>
              <div className="modal-header">
                <h5 className="modal-title mt-0" id="myModalLabel">
                  Add Sale
                </h5>
                <button
                  type="button"
                  onClick={() => {
                    setisopen(false);
                  }}
                  className="close"
                  style={{
                    border: "none",
                    padding: "5px 15px",
                    fontSize: "25px",
                  }}
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <AvForm
                className="needs-validation"
                onValidSubmit={(e, v) => {
                  HandelSubmit();
                }}
              >
                <div className="modal-body">
                  <Row>
                    <Col sm="12" md="6" lg="12">
                      <FormGroup className="mb-3">
                        <Label htmlFor="validationCustom02">
                          select customer name:
                        </Label>
                        <AvField
                          name="customerID"
                          placeholder="select customer name"
                          type="select"
                          value={purchaseObj.CusName}
                          onChange={(e) => handelChange(e)}
                          errorMessage="select customer name"
                          className="form-control"
                          validate={{ required: { value: true } }}
                          id="validationCustom02"
                        >
                          <option selected>Select customer name</option>
                          {getsup.map((cust) => {
                            return (
                              <option value={cust._id}>{cust.Name}</option>
                            );
                          })}
                        </AvField>
                      </FormGroup>
                    </Col>
                    <Col sm="12" md="6" lg="12">
                      <FormGroup className="mb-3">
                        <Label htmlFor="validationCustom02">
                          select Product name:
                        </Label>
                        <AvField
                          name="productID"
                          placeholder="select product name"
                          type="select"
                          value={purchaseObj.Product}
                          onChange={(e) => handelChange(e)}
                          errorMessage="select product name"
                          className="form-control"
                          validate={{ required: { value: true } }}
                          id="validationCustom02"
                        >
                          <option selected>Select product name</option>
                          {getpro.map((pro) => {
                            return <option value={pro._id}>{pro.name}</option>;
                          })}
                        </AvField>
                      </FormGroup>
                    </Col>
                    <Col sm="12" md="6" lg="12">
                      <FormGroup className="mb-3">
                        <Label htmlFor="validationCustom02">
                          Quantity Sold:
                        </Label>
                        <AvField
                          name="qtySold"
                          placeholder="Enter Quantity Sold"
                          type="number"
                          value={purchaseObj.qtySold}
                          onChange={(e) => handelChange(e)}
                          errorMessage="Enter Quantity sold"
                          className="form-control"
                          validate={{ required: { value: true } }}
                          id="validationCustom02"
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="12" md="6" lg="12">
                      <FormGroup className="mb-3">
                        <Label htmlFor="validationCustom02">Price:</Label>
                        <AvField
                          name="Price"
                          placeholder="Enter Price"
                          type="number"
                          value={purchaseObj.Price}
                          onChange={(e) => handelChange(e)}
                          errorMessage="Enter Price"
                          className="form-control"
                          validate={{ required: { value: true } }}
                          id="validationCustom02"
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="12" md="6" lg="12">
                      <FormGroup className="mb-3">
                        <Label htmlFor="validationCustom02">Date Sold:</Label>
                        <AvField
                          name="dateSold"
                          placeholder="Enter date Sold"
                          type="date"
                          value={purchaseObj.dateSold}
                          onChange={(e) => handelChange(e)}
                          errorMessage="Enter date Sold"
                          className="form-control"
                          validate={{ required: { value: true } }}
                          id="validationCustom02"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    onClick={() => {
                      tog_standard();
                      setpurchaseObj({
                        CusName: "",
                        Product: "",
                        qtySold: "",
                        Price: "",
                        dateSold: "",
                      });
                    }}
                    className="btn btn-secondary waves-effect"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn btn-info waves-effect waves-light"
                  >
                    Save
                  </button>
                </div>
              </AvForm>
            </Modal>
          </div>
        </Col>

        <Col className="col-11" style={{ marginLeft: "30px" }}>
          <button
            type="button"
            onClick={() => {
              tog_standard();
            }}
            className="btn waves-effect waves-light text-white "
            style={{
              backgroundColor: "rgb(36, 99, 99)",
              marginBottom: "10px",
            }}
            data-toggle="modal"
        