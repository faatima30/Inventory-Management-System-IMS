import React, { useState } from "react";
import { Row, Col, CardBody, Card, Container } from "reactstrap";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";
import { AiOutlineHeart } from "react-icons/ai";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Forgotpwd() {
  const endpoint = "http://localhost:4000";
  const [forgetpwd, setforgetpwd] = useState({
    email: "",
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
    setforgetpwd({ ...forgetpwd, [e.target.name]: e.target.value });
  };
  // async function fetcher() {
  //   const { data } = await axios.get(`http://localhost:4000/Products`);
  //   return data;
  // }
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      await axios
        .put(`${endpoint}/login/forgotpwd`, forgetpwd, headers)
        .then((response) => {
          if (response.data.message==="password successfully updated") {
            alert("password successfully updated");
            navigate("/login");
            // mutate(endpoint, fetcher);
          } else if (response.data.message === "please confirm password") {
            alert("please confirm password");
          } else {
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
    <div className="account-pages mt-5 pt-sm-4">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6} xl={4}>
            <Card className="overflow-hidden">
              <div style={{ backgroundColor: "rgb(36, 99, 99)" }}>
                <div className="text-primary text-center p-4">
                  <h5 className="text-white font-size-20">Password recovery</h5>
                  <p className="text-white-50">Get a new password right now.</p>
                </div>
              </div>
              <CardBody className="p-3">
                <div className="p-2">
                  <AvForm
                    className="mt-4"
                    onValidSubmit={(e, v) => {
                      handleSubmit();
                    }}
                  >
                    <div className="mb-3">
                      <AvField
                        id="email"
                        name="email"
                        label="Email"
                        className="form-control"
                        placeholder="Enter email"
                        type="email"
                        value={forgetpwd.email}
                        onChange={(e) => handelChange(e)}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <AvField
                        name="password"
                        label="password"
                        type="text"
                        required
                        value={forgetpwd.password}
                        onChange={(e) => handelChange(e)}
                        placeholder="Enter new password"
                      />
                    </div>
                    <div className="mb-3">
                      <AvField
                        name="confirm"
                        label="confirm"
                        type="confirm"
                        required
                        value={forgetpwd.confirm}
                        onChange={(e) => handelChange(e)}
                        placeholder="confirm new password"
                      />
                    </div>

                    <div className="mb-3 row">
                      <div className="col-12 text-end">
                        <button
                          className="btn text-white w-md waves-effect waves-light"
                          type="submit"
                          style={{ backgroundColor: "rgb(36, 99, 99)" }}
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  </AvForm>
                </div>
              </CardBody>
            </Card>
            <div className="mt-3 text-center">
              <p>
                You Remember ?{" "}
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
