import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./header.css";

export default function Header() {
  return (
    <div className="mx-0">
      <div className="header-logo justify-content-between d-inline-flex w-100">
        <a className="logo-link">
          <img className="logo-link" src={require("../../assets/path.png")} alt={"logo"} />
        </a>
        <p className="data-portal">OPEN DATA PORTAL</p>
      </div>
      <Navbar sticky="top" className="header-container px-5">
        <Navbar.Brand>
          <img className="home-link" src={require("../../assets/home.svg")} alt={"home"} />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link className="nav-links">
              Health Topics
              <img
                className="arrow-link mx-2"
                src={require("../../assets/arrow.svg")}
                alt={"arrow"}
              />
            </Nav.Link>
            <Nav.Link className="nav-links">
              Countries
              <img
                className="arrow-link mx-2"
                src={require("../../assets/arrow.svg")}
                alt={"arrow"}
              />
            </Nav.Link>
            <Nav.Link className="nav-links">
              Newsroom
              <img
                className="arrow-link mx-2"
                src={require("../../assets/arrow.svg")}
                alt={"arrow"}
              />
            </Nav.Link>
            <Nav.Link className="nav-links">
              Emergencies
              <img
                className="arrow-link mx-2"
                src={require("../../assets/arrow.svg")}
                alt={"arrow"}
              />
            </Nav.Link>
            <Nav.Link className="nav-links">
              Data
              <img
                className="arrow-link mx-2"
                src={require("../../assets/arrow.svg")}
                alt={"arrow"}
              />
            </Nav.Link>
            <Nav.Link className="nav-links">
              About Us
              <img
                className="arrow-link mx-2"
                src={require("../../assets/arrow.svg")}
                alt={"arrow"}
              />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
