import React, { useState } from "react";
import { Row, Col, CardBody, Card, Container } from "reactstrap";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";
import { useNavigate } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";

import { Link } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const endpoint = "http://localhost:4000";
  const [singupObj, setsingupObj] = useState({
    email: "",
    username: "",
    password: "",
  });
  let token = localStorage.getItem("token");
  const headers = {
    headers: {
      "content-type": "application/json",
      token: token,
    },
  };
  const handelChange = (e) => {
    setsingupObj({ ...singupObj, [e.target.name]: e.target.value });
  };
  // async function fetcher() {
  //   const { data } = await axios.get(`http://localhost:4000/Products`);
  //   return data;
  // }
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      await axios
        .post(`${endpoint}/login`, singupObj, headers)
        .then((response) => {
          if (response.data.email) {
            alert("successfully Registered");
            navigate("/login");
            // mutate(endpoint, fetcher);
          } else if(response.data.message === "email already registered"){
            alert("email already registered");
          }
         else {
            alert("invalid email!");
          }
        })
        .catch((error) => {
          console.log(error);
          navigate("/Signup");
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="account-pages mt-3 pt-sm-4">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6} xl={4}>
            <Card className="overflow-hidden">
              <div style={{ backgroundColor: "rgb(36, 99, 99)" }}>
                <div className="text-primary text-center p-4">
                  <h5 className="text-white font-size-20">Register Here</h5>
                  <p className="text-white-50">Get your IMS account now.</p>
                </div>
              </div>
              <CardBody className="p-3">
                <div className="p-2">
                  <AvForm
                    onValidSubmit={(e, v) => {
                      handleSubmit();
                    }}
                    className="mt-4"
                  >
                    <div className="mb-3">
                      <AvField
                        id="email"
                        name="email"
                        label="Email"
                        className="form-control"
                        value={singupObj.email}
                        onChange={(e) => handelChange(e)}
                        placeholder="Enter email"
                        type="email"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <AvField
                        name="username"
                        label="Username"
                        type="text"
                        value={singupObj.username}
                        onChange={(e) => handelChange(e)}
                        required
                        placeholder="Enter username"
                      />
                    </div>
                    <div className="mb-3">
                      <AvField
                        name="password"
                        label="Password"
                        type="password"
                        value={singupObj.password}
                        onChange={(e) => handelChange(e)}
                        required
                        placeholder="Enter Password"
                      />
                    </div>

                    <div className="mb-3 row">
                      <div className="col-12 text-end">
                        <button
                          className="btn text-white w-md waves-effect waves-light"
                          type="submit"
                          style={{ backgroundColor: "rgb(36, 99, 99)" }}
                        >
                          Sing Up
                        </button>
                      </div>
                    </div>

                    <div className="mt-2 mb-0 row">
                      <div className="col-12 mt-4">
                        <p className="mb-0">
                          By registering you agree to the IMS{" "}
                          <Link to="#" className="text-primary">
                            Terms of Use
                          </Link>
                        </p>
                      </div>
                    </div>
                  </AvForm>
                </div>
              </CardBody>
            </Card>
            <div className="mt-3 text-center">
              <p>
                Already have an account ?{" "}
                <Link to="/login" className="fw-medium text-primary">
                  {" "}
                  Login
                </Link>{" "}
              </p>
              <p>
                © {new Date().getFullYear()} IMS. Crafted with
                <AiOutlineHeart
                  style={{ color: "red", marginLeft: "5px" }}
                />{" "}
                by Group E
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
