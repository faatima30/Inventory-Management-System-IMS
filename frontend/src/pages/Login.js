import { React, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Col, Row, Card } from "reactstrap";
import { AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const loginUSer = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:4000/login/user", {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.data.username) {
          //store admin data in localStorage
          localStorage.setItem("user", JSON.stringify(response.data));
          navigate("/");
        } else if (username === "" || password === "") {
          alert("fill empty boxes");
        } else {
          alert("username or password is incorrect!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const url =
    "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80";
  return (
    <div className="account-pages">
      <div
        className="accountbg"
        style={{
          backgroundImage: `url(${url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="wrapper-page account-page-full">
        <Card className="shadow-none">
          <div className="card-block">
            <div className="account-box">
              <div className="card-box shadow-none p-4">
                <div className="p-1">
                  <div className="text-center mt-5">
                    <h1>IMS Logo</h1>
                  </div>

                  <h4 className="font-size-18 mt-5 text-center">
                    Welcome Back !
                  </h4>
                  <p className="text-muted text-center">
                    Sign in to continue to IM system .
                  </p>
                  <form className="mt-4" action="#">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="username">
                        Username
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={username}
                        onChange={(event) => {
                          setUsername(event.target.value);
                        }}
                        placeholder="Enter username"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label" htmlFor="userpassword">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="userpassword"
                        value={password}
                        onChange={(event) => {
                          setPassword(event.target.value);
                        }}
                        placeholder="Enter password"
                        required
                      />
                    </div>

                    <Row className="mb-2 mt-5 ">
                      <Col sm={6}>
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="customControlInline"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="customControlInline"
                          >
                            Remember me
                          </label>
                        </div>
                      </Col>

                      <Col sm="6" className="text-end">
                        <button
                          className="btn w-md waves-effect waves-light text-white "
                          type="submit"
                          onClick={loginUSer}
                          style={{backgroundColor:"rgb(36, 99, 99)"}}
                        >
                          Log In
                        </button>
                      </Col>
                    </Row>

                    <Row className="mb-3 mt-2 mb-0">
                      <div className="col-12 mt-3">
                        <Link to="pages-recoverpw-2">
                          <i className="mdi mdi-lock"></i> Forgot your password?
                        </Link>
                      </div>
                    </Row>
                  </form>

                  <div className="mt-5  pt-5 text-center">
                    <p>
                      © {new Date().getFullYear()} IMS. Crafted with
                      <AiOutlineHeart
                        style={{ color: "red", marginLeft: "5px" }}
                      />{" "}
                      by Group E
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Login;
