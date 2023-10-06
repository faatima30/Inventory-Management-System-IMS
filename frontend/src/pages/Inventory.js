import React, { useEffect } from "react";
import axios from "axios";
import useSWR from "swr";
import { MDBDataTable } from "mdbreact";
import { Col, Card, CardBody, CardTitle } from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import Sidenav from "../components/SideNav";
import Footer from "../components/Footer";

export default function Inventory() {
  const endpoint = "http://localhost:4000";
  async function fetcher() {
    const { data } = await axios.get(`http://localhost:4000/Inventory`);
    return data;
  }
  useEffect(() => {
    fetcher();
  }, []);

  const { data: InventoryData } = useSWR(endpoint, fetcher);
  const data = {
    columns: [
      {
        label: "Product category",
        field: "ProductCategory",
        sort: "asc",
        width: 100,
      },
      {
        label: "Warehouse",
        field: "Warehouse",
        sort: "asc",
        width: 270,
      },
      {
        label: "Quantity in stock",
        field: "Quantity_in_stock",
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
    ],
    rows: InventoryData?.map((data) => {
      return data;
    }),
  };
  return (
    <div className="d-flex">
      <Sidenav />
      <Col className="col-11 dash" style={{ marginLeft: "30px" }}>
        <Card>
          <CardBody>
            <CardTitle className="h4">Inventory table </CardTitle>
            <MDBDataTable responsive striped bordered data={data} />
          </CardBody>
        </Card>
      </Col>
      <Footer />
    </div>
  );
}
