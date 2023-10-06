import React from "react";
import { Container, Row } from "reactstrap";
import {AiOutlineHeart} from "react-icons/ai"
const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer">
        <Container fluid={true}>
          <Row>
            <div className="col-12">
              © {new Date().getFullYear()} IMS
              <span className="d-none d-sm-inline-block">
                {" "}
                - Crafted with
                <AiOutlineHeart
                  style={{ color: "red", marginLeft: "5px" }}
                />{" "}
                by Group E.
              </span>
            </div>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
