import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./header.css";

export default function Header() {
  return (
    <div>
      <div className="header-logo text-left">
        <a className="logo-link">
          <img className="logo-link" src={require("../../assets/path.png")} />
        </a>
      </div>
      <Navbar sticky="top" className="header-container px-5">
        <Navbar.Brand href="#home">
          <img className="home-link" src={require("../../assets/home.svg")} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home" className="nav-links">
              Health Topics
              <img
                className="arrow-link mx-2"
                src={require("../../assets/arrow.svg")}
              />
            </Nav.Link>
            <Nav.Link href="#link" className="nav-links">
              Countries
              <img
                className="arrow-link mx-2"
                src={require("../../assets/arrow.svg")}
              />
            </Nav.Link>
            <Nav.Link href="#link" className="nav-links">
              Newsroom
              <img
                className="arrow-link mx-2"
                src={require("../../assets/arrow.svg")}
              />
            </Nav.Link>
            <Nav.Link href="#link" className="nav-links">
              Emergencies
              <img
                className="arrow-link mx-2"
                src={require("../../assets/arrow.svg")}
              />
            </Nav.Link>
            <Nav.Link href="#link" className="nav-links">
              Data
              <img
                className="arrow-link mx-2"
                src={require("../../assets/arrow.svg")}
              />
            </Nav.Link>
            <Nav.Link href="#link" className="nav-links">
              About Us
              <img
                className="arrow-link mx-2"
                src={require("../../assets/arrow.svg")}
              />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
