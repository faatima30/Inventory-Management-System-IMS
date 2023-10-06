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

export default function Warehouse() {
  const endpoint = "http://localhost:4000";
  const [isedit, setisedit] = useState(false);
  const [isopen, setisopen] = useState(false);
  const [WarehouseObj, setWarehouseObj] = useState({
    name: "",
    address: "",
    number: "",
    email: "",
    capacity: "",
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
    setWarehouseObj(data);
    setisedit(true);
  };
  const deleteWarehouse = (id) => {
    axios
      .delete(`${endpoint}/Warehouse/delete/${id}`)
      .then((response) => {
        alert("Warehouse is deleted successfully");
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
          name: WarehouseObj.name,
          address: WarehouseObj.address,
          number: WarehouseObj.number,
          email: WarehouseObj.email,
          capacity: WarehouseObj.capacity,
        };
        let updatedEndPoint = `${endpoint}/Warehouse/update/${WarehouseObj._id}`;
        await axios
          .put(updatedEndPoint, obj, headers)
          .then((response) => {
            alert("Warehouse has been updated successfully");
            mutate(endpoint, fetcher);
            setisedit(false);
            setisopen(false);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        await axios
          .post(`${endpoint}/AddWarehouse`, WarehouseObj, headers)
          .then((response) => {
            alert("Warehouse has been save successfully");
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
    setWarehouseObj({ ...WarehouseObj, [e.target.name]: e.target.value });
  };

  const tog_standard = () => {
    setisopen(!isopen);
  };
  async function fetcher() {
    const { data } = await axios.get(`http://localhost:4000/Warehouses`);
    return data;
  }
  useEffect(() => {
    fetcher();
  }, []);
  const { data: WarehouseData } = useSWR(endpoint, fetcher);
  const data = {
    columns: [
      {
        label: "Name",
        field: "name",
        sort: "asc",
        width: 100,
      },
      {
        label: "Address",
        field: "address",
        sort: "asc",
        width: 270,
      },
      {
        label: "Number",
        field: "number",
        sort: "asc",
        width: 100,
      },
      {
        label: "Email",
        field: "email",
        sort: "asc",
        width: 100,
      },
      {
        label: "Capacity",
        field: "capacity",
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
    rows: WarehouseData?.map((data) => {
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
            onClick={() => deleteWarehouse(data._id)}
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
                  Add Warehouse
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
                          Warehouse Name:
                        </Label>
                        <AvField
                          name="name"
                          placeholder="Enter Warehouse name"
                          type="text"
                          value={WarehouseObj.name}
                          onChange={(e) => handelChange(e)}
                          errorMessage="Enter Warehouse name"
                          className="form-control"
                          validate={{ required: { value: true } }}
                          id="validationCustom01"
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="12" md="6" lg="12">
                      <FormGroup className="mb-3">
                        <Label htmlFor="validationCustom02">Address:</Label>
                        <AvField
                          name="address"
                          placeholder="Enter address"
                          type="text"
                          value={WarehouseObj.address}
                          onChange={(e) => handelChange(e)}
                          errorMessage="Enter address"
                          className="form-control"
                          validate={{ required: { value: true } }}
                          id="validationCustom02"
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="12" md="6" lg="12">
                      <FormGroup className="mb-3">
                        <Label htmlFor="validationCustom02">
                          Warehouse Number:
                        </Label>
                        <AvField
                          name="number"
                          placeholder="Enter Warehouse number"
                          type="text"
                          value={WarehouseObj.number}
                          onChange={(e) => handelChange(e)}
                          errorMessage="Enter Warehouse number"
                          className="form-control"
                          validate={{ required: { value: true } }}
                          id="validationCustom02"
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="12" md="6" lg="12">
                      <FormGroup className="mb-3">
                        <Label htmlFor="validationCustom02">Email:</Label>
                        <AvField
                          name="email"
                          placeholder="Enter Warehouse email"
                          type="text"
                          value={WarehouseObj.email}
                          onChange={(e) => handelChange(e)}
                          errorMessage="Enter Warehouse email "
                          className="form-control"
                          validate={{ required: { value: true } }}
                          id="validationCustom02"
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="12" md="6" lg="12">
                      <FormGroup className="mb-3">
                        <Label htmlFor="validationCustom02">Capacity:</Label>
                        <AvField
                          name="capacity"
                          placeholder="Enter Warehouse capacity"
                          type="text"
                          value={WarehouseObj.capacity}
                          onChange={(e) => handelChange(e)}
                          errorMessage="Enter Warehouse capacity "
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
                      setWarehouseObj({
                        name: "",
                        address: "",
                        number: "",
                        email: "",
                        capacity: "",
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
            +Add Warehouse
          </button>
          <Card>
            <CardBody>
              <CardTitle className="h4">Warehouse table </CardTitle>
              <MDBDataTable responsive striped bordered data={data} />
            </CardBody>
          </Card>
        </Col>
      </div>
      <Footer />
    </div>
  );
}
