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

export default function Customer() {
  const endpoint = "http://localhost:4000";
  const [isedit, setisedit] = useState(false);
  const [isopen, setisopen] = useState(false);
  const [employeeObj, setemployeeObj] = useState({
    Name: "",
    address: "",
    number: "",
    email: "",
    title: "",
    role: "",
    Gender: "",
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
    setemployeeObj(data);
    setisedit(true);
  };
  const deleteProduct = (id) => {
    axios
      .delete(`${endpoint}/Employee/delete/${id}`)
      .then((response) => {
        alert("Employee is deleted successfully");
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
          Name: employeeObj.Name,
          address: employeeObj.address,
          number: employeeObj.number,
          email: employeeObj.email,
          title: employeeObj.title,
          role: employeeObj.role,
          Gender: employeeObj.Gender,
        };
        let updatedEndPoint = `${endpoint}/Employee/update/${employeeObj._id}`;
        await axios
          .put(updatedEndPoint, obj, headers)
          .then((response) => {
            alert("Employee has been updated successfully");
            mutate(endpoint, fetcher);
            setisedit(false);
            setisopen(false);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        await axios
          .post(`${endpoint}/AddEmployee`, employeeObj, headers)
          .then((response) => {
            alert("Employee has been save successfully");
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
    setemployeeObj({ ...employeeObj, [e.target.name]: e.target.value });
  };

  const tog_standard = () => {
    setisopen(!isopen);
  };
  async function fetcher() {
    const { data } = await axios.get(`http://localhost:4000/Employees`);
    return data;
  }
  useEffect(() => {
    fetcher();
  }, []);
  const { data: employeedata } = useSWR(endpoint, fetcher);
  const data = {
    columns: [
      {
        label: "Name",
        field: "Name",
        sort: "asc",
        width: 100,
      },
      {
        label: "Address",
        field: "address",
        sort: "asc",
        width: 100,
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
        label: "Title",
        field: "title",
        sort: "asc",
        width: 100,
      },
      {
        label: "Role",
        field: "role",
        sort: "asc",
        width: 100,
      },
      {
        label: "Gender",
        field: "Gender",
        sort: "asc",
        width: 100,
      },

      // {
      //   label: "date created",
      //   field: "createdAt",
      //   sort: "asc",
      //   width: 100,
      // },
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
    rows: employeedata?.map((data) => {
      data.action = (
        <div className="d-flex">
          <button
            onClick={() => handelEdit(data)}
            className="btn text-white mx-2 "
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
                  Add Employee
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
                          Employee Name:
                        </Label>
                        <AvField
                          name="Name"
                          placeholder="Enter Employee name"
                          type="text"
                          value={employeeObj.Name}
                          onChange={(e) => handelChange(e)}
                          errorMessage="Enter Employee name"
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
                          value={employeeObj.address}
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
                        <Label htmlFor="validationCustom02">Number:</Label>
                        <AvField
                          name="number"
                          placeholder="Enter number"
                          type="number"
                          value={employeeObj.number}
                          onChange={(e) => handelChange(e)}
                          errorMessage="Enter number"
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
                          placeholder="Enter your email"
                          type="text"
                          value={employeeObj.email}
                          onChange={(e) => handelChange(e)}
                          errorMessage="Enter your email"
                          className="form-control"
                          validate={{ required: { value: true } }}
                          id="validationCustom02"
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="12" md="6" lg="12">
                      <FormGroup className="mb-3">
                        <Label htmlFor="validationCustom02">Title:</Label>
                        <AvField
                          name="title"
                          placeholder="Enter Employee title"
                          type="text"
                          value={employeeObj.title}
                          onChange={(e) => handelChange(e)}
                          errorMessage="Enter Employee title"
                          className="form-control"
                          validate={{ required: { value: true } }}
                          id="validationCustom02"
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="12" md="6" lg="12">
                      <FormGroup className="mb-3">
                        <Label htmlFor="validationCustom02">Role:</Label>
                        <AvField
                          name="role"
                          placeholder="select role"
                          type="select"
                          value={employeeObj.role}
                          onChange={(e) => handelChange(e)}
                          errorMessage="select employee role"
                          className="form-control"
                          validate={{ required: { value: true } }}
                          id="validationCustom02"
                        >
                          <option value="">select Employee</option>
                          <option value="admin">Admin</option>
                          <option value="Stuff">Stuff</option>
                        </AvField>
                      </FormGroup>
                    </Col>
                    <Col sm="12" md="6" lg="12">
                      <FormGroup className="mb-3">
                        <Label htmlFor="validationCustom02">Gender:</Label>
                        <AvField
                          name="Gender"
                          placeholder="Enter your gender"
                          type="select"
                          value={employeeObj.Gender}
                          onChange={(e) => handelChange(e)}
                          errorMessage="Enter your gender"
                          className="form-control"
                          validate={{ required: { value: true } }}
                          id="validationCustom02"
                        >
                          <option value="">select gender</option>
                          <option value="male">male</option>
                          <option value="female">female</option>
                        </AvField>
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    onClick={() => {
                      tog_standard();
                      setemployeeObj({
                        Name: "",
                        address: "",
                        number: "",
                        email: "",
                        title: "",
                        role: "",
                        Gender: "",
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
            +Add Employee
          </button>
          <Card>
            <CardBody>
              <CardTitle className="h4">Employee table </CardTitle>
              <MDBDataTable responsive striped bordered data={data} />
            </CardBody>
          </Card>
        </Col>
      </div>
      <Footer />
    </div>
  );
}
