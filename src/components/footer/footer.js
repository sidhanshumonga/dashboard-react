import React from "react";
import "./footer.css";

export default function Footer() {
  return (
    <div className="footer-container row mx-0">
      <div className="col-md-12 d-inline-flex pl-3 pt-5 pb-3 text-left">
        <ul className="links-list-ul">
          <li className="links-list-li links-list-li-header">Quick links</li>
          <li className="links-list-li">Newsroom</li>
          <li className="links-list-li">Data</li>
          <li className="links-list-li">Publications</li>
          <li className="links-list-li">Bookshop</li>
        </ul>
        <ul className="links-list-ul">
          <li className="links-list-li links-list-li-header">About us</li>
          <li className="links-list-li">Overview</li>
          <li className="links-list-li">Governance</li>
        </ul>
        <ul className="links-list-ul">
          <li className="links-list-li links-list-li-header">Help</li>
          <li className="links-list-li">Contact us</li>
          <li className="links-list-li">Press</li>
          <li className="links-list-li">Careers</li>
          <li className="links-list-li">Email scams</li>
        </ul>
      </div>
      <div className="col pb-5">
        <img
          className="home-logo"
          src={require("../../assets/home-logo.svg")}
          alt={"home"}
        />
      </div>
    </div>
  );
}
