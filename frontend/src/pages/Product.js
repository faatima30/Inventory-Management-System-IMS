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
// import Header from "../components/Header";

export default function Product() {
  const endpoint = "http://localhost:4000";
  const [isedit, setisedit] = useState(false);
  const [isopen, setisopen] = useState(false);
  const [productObj, setproductObj] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    quantity: "",
    // image: "",
  });
  
  let token = localStorage.getItem("token");
  const headers = {
    headers: {
      "content-type": "application/json",
      token: token,
    },
  };
  const handelEdit = (data) => {
    setisopen(true);
    setproductObj(data);
    setisedit(true);
  };
  const deleteProduct = (id) => {
    axios
      .delete(`${endpoint}/Product/delete/${id}`)
      .then((response) => {
        alert("Product is deleted successfully");
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
          name: productObj.name,
          description: productObj.description,
          category: productObj.category,
          price: productObj.price,
          quantity: productObj.quantity,
          //   image: productObj.image,
        };
        let updatedEndPoint = `${endpoint}/Product/update/${productObj._id}`;
        await axios
          .put(updatedEndPoint, obj, headers)
          .then((response) => {
            alert("Product has been updated successfully");
            mutate(endpoint, fetcher);
            setisedit(false);
            setisopen(false);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        await axios
          .post(`${endpoint}/AddProduct`, productObj, headers)
          .then((response) => {
            alert("product has been save successfully");
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
    setproductObj({ ...productObj, [e.target.name]: e.target.value });
  };

  const tog_standard = () => {
    setisopen(!isopen);
  };
  async function fetcher() {
    const { data } = await axios.get(`http://localhost:4000/Products`);
    return data;
  }
  useEffect(() => {
    fetcher();
  }, []);
  const { data: ProductData } = useSWR(endpoint, fetcher);
  const data = {
    columns: [
      {
        label: "Name",
        field: "name",
        sort: "asc",
        width: 100,
      },
      {
        label: "Description",
        field: "description",
        sort: "asc",
        width: 270,
      },
      {
        label: "Category",
        field: "category",
        sort: "asc",
        width: 100,
      },
      {
        label: "Price",
        field: "price",
        sort: "asc",
        width: 100,
      },
      {
        label: "Quantity",
        field: "quantity",
        sort: "asc",
        width: 100,
      },
      //   {
      //     label: "Image",
      //     field: "image",
      //     sort: "asc",
      //     width: 200,
      //   },

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
    rows: ProductData?.map((data) => {
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
                  Add Product
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
                        <Label htmlFor="validationCustom01">
                          Product Name:
                        </Label>
                        <AvField
                          name="name"
                          placeholder="Enter Product name"
                          type="text"
                          value={productObj.name}
                          onChange={(e) => handelChange(e)}
                          errorMessage="Enter Product name"
                          className="form-control"
                          validate={{ required: { value: true } }}
                          id="validationCustom01"
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="12" md="6" lg="12">
                      <FormGroup className="mb-3">
                        <Label htmlFor="validationCustom02">Description:</Label>
                        <AvField
                          name="description"
                          placeholder="Enter description"
                          type="text"
                          value={productObj.description}
                          onChange={(e) => handelChange(e)}
                          errorMessage="Enter description"
                          className="form-control"
                          validate={{ required: { value: true } }}
                          id="validationCustom02"
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="12" md="6" lg="12">
                      <FormGroup className="mb-3">
                        <Label htmlFor="validationCustom02">Category:</Label>
                        <AvField
                          name="category"
                          placeholder="Enter category"
                          type="text"
                          value={productObj.category}
                          onChange={(e) => handelChange(e)}
                          errorMessage="Enter category"
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
                          name="price"
                          placeholder="Enter the price"
                          type="text"
                          value={productObj.price}
                          onChange={(e) => handelChange(e)}
                          errorMessage="Enter the price"
                          className="form-control"
                          validate={{ required: { value: true } }}
                          id="validationCustom02"
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="12" md="6" lg="12">
                      <FormGroup className="mb-3">
                        <Label htmlFor="validationCustom02">Quantity:</Label>
                        <AvField
                          name="quantity"
                          placeholder="Enter quantity"
                          type="text"
                          value={productObj.quantity}
                          onChange={(e) => handelChange(e)}
                          errorMessage="Enter quantity"
                          className="form-control"
                          validate={{ required: { value: true } }}
                          id="validationCustom02"
                        />
                      </FormGroup>
                    </Col>
                    {/* <Col sm="12" md="6" lg="12">
                    <FormGroup className="mb-3">
                      <Label htmlFor="validationCustom02">Choose image:</Label>
                      <AvField
                        name="totalamount"
                        placeholder="Enter total amount"
                        type="file"
                        value={productObj.totalamount}
                        onChange={(e) => handelChange(e)}
                        errorMessage="Choose image"
                        className="form-control"
                        validate={{ required: { value: true } }}
                        id="validationCustom02"
                      />
                    </FormGroup>
                  </Col> */}
                  </Row>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    onClick={() => {
                      tog_standard();
                      setproductObj({
                        name: "",
                        description: "",
                        category: "",
                        price: "",
                        quantity: "",
                        // image: "",
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
            data-target="#myModal"
          >
            +Add Product
          </button>
          <Card>
            <CardBody>
              <CardTitle className="h4">Product table </CardTitle>
              <MDBDataTable responsive striped bordered data={data} />
            </CardBody>
          </Card>
        </Col>
      </div>
      <Footer />
    </div>
  );
}
