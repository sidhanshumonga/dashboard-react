import React from "react";
import "./footer.css";

export default function Footer() {
  return (
    <div className="footer-container row">
      <div className="col-md-9 d-inline-flex pl-3 pt-5 pb-3 text-left">
        <ul className="links-list-ul">
          <li className="links-list-li links-list-li-header">What we do</li>
          <li className="links-list-li">Countries</li>
          <li className="links-list-li">Programmes</li>
          <li className="links-list-li">Frequently asked questions</li>
          <li className="links-list-li">Employment</li>
          <li className="links-list-li">Procurement</li>
        </ul>
        <ul className="links-list-ul">
          <li className="links-list-li links-list-li-header">Regions</li>
          <li className="links-list-li">Africa</li>
          <li className="links-list-li">Americas</li>
          <li className="links-list-li">South-East Asia</li>
          <li className="links-list-li">Europe</li>
          <li className="links-list-li">Eastern Mediterranean</li>
          <li className="links-list-li">Western Pacific</li>
        </ul>
        <ul className="links-list-ul">
          <li className="links-list-li links-list-li-header">About Us</li>
          <li className="links-list-li">Director-General</li>
          <li className="links-list-li">World Health Assembly</li>
          <li className="links-list-li">Executive Board</li>
          <li className="links-list-li">Member States</li>
          <li className="links-list-li">Ethics</li>
          <li className="links-list-li">Permissions and licensing</li>
          <li className="links-list-li">Cyber security</li>
        </ul>
      </div>
      <div className="col-md-3 text-left pt-5">
        <button className="button-dark-background">
          Subscribe to our newsletters
        </button>
      </div>
      <div className="col pb-5">
        <img
          className="home-logo"
          src={require("../../assets/home-logo.svg")}
        />
      </div>
    </div>
  );
}
