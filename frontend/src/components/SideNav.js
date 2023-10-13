import { useState } from "react";
import { NavLink } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { GoGraph } from "react-icons/go";
import { BiPurchaseTag } from "react-icons/bi";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { BsBox2Fill, BsFillPeopleFill } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { ImMenu } from "react-icons/im";
import { TfiGallery } from "react-icons/tfi";

function Sidenav() {
  const [isOpen, setIsOpen] = useState(false);
  const logout = () => {
    localStorage.clear();
  };
  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="sidenav"
      style={{ width: isOpen === false ? "15%" : "fit-content" }}
    >
      <div className="logo d-flex">
        <h1 style={{ display: isOpen === false ? "block" : "none" }}>
          IMS Logo
        </h1>
        <div>
          <button
            onClick={() => {
              handleIsOpen();
            }}
            style={{
              marginTop: isOpen === true ? "-20px" : "",
              display: isOpen === false ? "block" : "none",
            }}
          >
            <AiOutlineClose size="30px" color="white" />
          </button>

          <button
            onClick={() => {
              handleIsOpen();
            }}
            style={{
              marginLeft: isOpen === true ? "1px" : "15px",
              display: isOpen === true ? "block" : "none",
            }}
          >
            <ImMenu color="white" size="30px" />{" "}
          </button>
        </div>
      </div>

      <ul ul ka style={{ padding: isOpen === false ? "20px" : "0" }}>
        <li>
          <NavLink to="/">
            <MdOutlineDashboard />{" "}
            <span style={{ display: isOpen === false ? "block" : "none" }}>
              Dashboard
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/Products">
            {" "}
            <BsBox2Fill />{" "}
            <span style={{ display: isOpen === false ? "block" : "none" }}>
              Products
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/Gallery">
            {" "}
            <TfiGallery />{" "}
            <span style={{ display: isOpen === false ? "block" : "none" }}>
              Gallery
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/Warehouses">
            <FaLocationDot />{" "}
            <span style={{ display: isOpen === false ? "block" : "none" }}>
              Warehouses
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/Customers">
            {" "}
            <BsFillPeopleFill />{" "}
            <span style={{ display: isOpen === false ? "block" : "none" }}>
              Customers
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/Suppliers">
            <BsFillPeopleFill />{" "}
            <span style={{ display: isOpen === false ? "block" : "none" }}>
              Suppliers
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/Employees">
            <BsFillPeopleFill />{" "}
            <span style={{ display: isOpen === false ? "block" : "none" }}>
              Employees
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/Sales">
            <GoGraph />{" "}
            <span style={{ display: isOpen === false ? "block" : "none" }}>
              Sales
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/Purchases">
            <BiPurchaseTag />{" "}
            <span style={{ display: isOpen === false ? "block" : "none" }}>
              Purchases
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/Login" onClick={logout}>
            <RiLogoutBoxRLine />{" "}
            <span style={{ display: isOpen === false ? "block" : "none" }}>
              LogOut
            </span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidenav;
