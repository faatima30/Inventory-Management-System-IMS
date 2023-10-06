import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidenav from "../components/SideNav";
import Footer from "../components/Footer";
import {
  AiFillSetting,
  AiOutlineArrowRight,
  AiOutlineArrowUp,
} from "react-icons/ai";
import graph from "../images/gr1.PNG";
import circle from "../images/circle.PNG";
import graph2 from "../images/gr2.PNG";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import { FaProductHunt, FaWarehouse } from "react-icons/fa6";
import { BsFillPeopleFill } from "react-icons/bs";
import { BiMoneyWithdraw } from "react-icons/bi";
// import Header from "../components/Header";

function Dashbaord() {
  const [totalCustomers, setTotalCustomers] = useState("");
  const [totalProducts, setTotalProducts] = useState("");
  const [totalPrice, setTotalPrice] = useState(" ");
  const [totalWarehouse, setTotalWarehouse] = useState(" ");
  const navigte = useNavigate();

  const user = localStorage.getItem("user");
  const protectRoute = useCallback(() => {
    if (user) {
      navigte("/");
    } else {
      navigte("/login");
    }
  },[user])
  const getTotalProducts = () => {
    axios.get("http://localhost:4000/product/total").then((response) => {
      setTotalProducts(response.data.totalProducts);
    });
  };
  const getTotalCustomers = () => {
    axios.get("http://localhost:4000/customer/total").then((response) => {
      setTotalCustomers(response.data.totalCustomers);
    });
  };
  const getTotalPrice = () => {
    axios
      .get("http://localhost:4000/product/price")
      .then((response) => {
        setTotalPrice(response.data.totalPrice[0].total);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getTotalWarehouse = () => {
    axios.get("http://localhost:4000/Warehouse/total").then((response) => {
      setTotalWarehouse(response.data.totalWarehouse);
    });
  };

  useEffect(() => {
    protectRoute();
    getTotalProducts();
    getTotalCustomers();
    getTotalPrice();
    getTotalWarehouse();
  }, [protectRoute]);

  return (
    <div className="d-flex ">
      <Sidenav />
      <div className="dash">
      {/* <Header/> */}
        <div className="page-content">
          <Container>
            <Row className="align-items-center">
              <Col md={8} className="mb-4">
                <h4 className="page-title text-gray">Dashboard</h4>
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item active">
                    Welcome to IMS Dashboard
                  </li>
                </ol>
              </Col>
              <Col md="4">
                <div
                  className="float-end d-none d-md-block btn text-white pt-3"
                  style={{ backgroundColor: "rgb(43, 141, 141)" }}
                >
                  <h6>
                    <AiFillSetting style={{ fontSize: "20px" }} /> Setting
                  </h6>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xl={3} md={6}>
                <Card
                  className="text-white"
                  style={{ backgroundColor: "rgb(36, 99, 99)" }}
                >
                  <CardBody>
                    <div className="mb-4">
                      <div className="float-start fs-5 mb-2 pl-3">
                        <FaProductHunt
                          style={{ marginRight: "10px", marginTop: "-10px" }}
                        />
                      </div>
                      <h5 className="font-size-16 text-uppercase mt-0 text-white">
                        Total Products
                      </h5>
                      <h4 className="fw-medium font-size-24">
                        {totalProducts}
                        <AiOutlineArrowUp />
                      </h4>
                    </div>
                    <div className="pt-2">
                      <div className="float-end">
                        <Link to="#" className="text-white-50">
                          <AiOutlineArrowRight />
                        </Link>
                      </div>
                      <p className="text-white-50 mb-0 mt-1">Since last week</p>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col xl={3} md={6}>
                <Card
                  className=" text-white"
                  style={{ backgroundColor: "rgb(36, 99, 99)" }}
                >
                  <CardBody>
                    <div className="mb-4">
                      <div className="float-start fs-5 mb-2 pl-3">
                        <BsFillPeopleFill
                          style={{ marginRight: "10px", marginTop: "-10px" }}
                        />
                      </div>
                      <h5 className="font-size-16 text-uppercase mt-0 text-white">
                        Total Customers
                      </h5>
                      <h4 className="fw-medium font-size-24">
                        {totalCustomers}
                        <AiOutlineArrowUp />
                      </h4>
                    </div>
                    <div className="pt-2">
                      <div className="float-end">
                        <Link to="#" className="text-white-50">
                          <AiOutlineArrowRight />
                        </Link>
                      </div>

                      <p className="text-white-50 mb-0 mt-1">Since last week</p>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col xl={3} md={6}>
                <Card
                  className="text-white"
                  style={{ backgroundColor: "rgb(36, 99, 99)" }}
                >
                  <CardBody>
                    <div className="mb-4">
                      <div className="float-start fs-5 mb-2 pl-3">
                        <BiMoneyWithdraw
                          style={{ marginRight: "10px", marginTop: "-10px" }}
                        />
                      </div>
                      <h5 className="font-size-16 text-uppercase mt-0 text-white">
                        Total Price
                      </h5>
                      <h4 className="fw-medium font-size-24">
                        ${totalPrice}
                        <AiOutlineArrowUp />
                      </h4>
                    </div>
                    <div className="pt-2">
                      <div className="float-end">
                        <Link to="#" className="text-white-50">
                          <AiOutlineArrowRight />
                        </Link>
                      </div>

                      <p className="text-white-50 mb-0 mt-1">Since last week</p>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col xl={3} md={6}>
                <Card
                  className="text-white"
                  style={{ backgroundColor: "rgb(36, 99, 99)" }}
                >
                  <CardBody>
                    <div className="mb-4">
                      <div className="float-start fs-5 mb-2 pl-3">
                        <FaWarehouse
                          style={{ marginRight: "10px", marginTop: "-10px" }}
                        />
                      </div>
                      <h5 className="font-size-16 text-uppercase mt-0 text-white">
                        Warehouses
                      </h5>
                      <h4 className="fw-medium font-size-24 ">
                        {totalWarehouse}
                        <AiOutlineArrowUp />
                      </h4>
                    </div>
                    <div className="pt-2">
                      <div className="float-end">
                        <Link to="#" className="text-white-50">
                          <AiOutlineArrowRight />
                        </Link>
                      </div>
                      <p className="text-white-50 mb-0 mt-1">Since last week</p>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row className="mt-4 mb-4">
              <Col xl={9}>
                <Card>
                  <CardBody>
                    <h4 className="card-title mb-4">Monthly Earning</h4>
                    <Row>
                      <Col lg={7}>
                        <div>
                          <img
                            src={graph}
                            width={"500px"}
                            height={"350px"}
                            alt="graph"
                          />
                        </div>
                      </Col>
                      <Col lg={5}>
                        <Row>
                          <Col md={12}>
                            <div className="text-center">
                              <p className="text-muted mb-4">This month</p>
                              <h3>${totalPrice}</h3>
                              <p className="text-muted mb-5">
                                It will be as simple as in <br></br>fact it will
                                be occidental.
                              </p>
                              <img
                                src={circle}
                                style={{
                                  marginLeft: "-10px",
                                  marginTop: "-50px",
                                }}
                                width={"200px"}
                                height={"200px"}
                                alt="graph"
                              />
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>

              <Col xl={3}>
                <Card>
                  <CardBody>
                    <div>
                      <h4 className="card-title mb-4">Sales Analytics</h4>
                    </div>
                    <div className="wid-peity mb-4">
                      <div className="row">
                        <div className="col-md-6">
                          <div>
                            <p className="text-muted">July</p>
                            <h5 className="mb-4">1,542</h5>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-4">
                            <img
                              src={graph2}
                              style={{ marginLeft: "-75px" }}
                              width={"200px"}
                              height={"80px"}
                              alt="graph"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="wid-peity mb-4">
                      <div className="row">
                        <div className="col-md-6">
                          <div>
                            <p className="text-muted">Augst</p>
                            <h5 className="mb-4">6,451</h5>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-4">
                            <img
                              src={graph2}
                              style={{ marginLeft: "-75px" }}
                              width={"200px"}
                              height={"80px"}
                              alt="graph"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <div className="row">
                        <div className="col-md-6">
                          <div>
                            <p className="text-muted">Septemper</p>
                            <h5>84,574</h5>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-4">
                            <img
                              src={graph2}
                              style={{ marginLeft: "-58px" }}
                              width={"180px"}
                              height={"80px"}
                              alt="graph"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="dfooter">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Dashbaord;
