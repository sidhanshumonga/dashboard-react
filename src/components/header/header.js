import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./header.css";

export default function Header() {
  return (
    <header>
      <div className="mx-0">
        <div className="container-fluid top-head px-4">
          <div className="row">
            <div className="col-6 text-left">
              <ul className="top-menu">
                <li><a href="#">Global &nbsp;</a></li>
                <li><a href="#">Regions  &nbsp;<i className="fa fa-angle-down"></i></a></li>
                <li><a href="#">Countries  &nbsp;<i className="fa fa-angle-down"></i></a></li>
              </ul>
            </div>
            <div className="col-6">
              <div className=" text-right">
                <a href="#" className="search-top"><i className="fa fa-search"></i></a>
              </div>
            </div>
          </div>
        </div>
        <div className="header-logo justify-content-between d-inline-flex w-100">
          <a className="logo-link">
            <img src={require("../../assets/logo.png")} alt={"logo"} />
          </a>
        </div>
        <nav className="navbar navbar-expand-lg navbar-sticky">

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbars" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbar">
            <ul className="navbar-nav mr-auto">

              <li><a href="#" className="nav-link home-link"><i className="fa fa-home"></i></a></li>

              <li className="nav-item dropdown megamenu-li">
                <a className="nav-link dropdown-toggle" href="" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Health topics</a>
                <div className="dropdown-menu megamenu" aria-labelledby="dropdown01">
                  <div className="row">
                    <div className="col-sm-6 col-lg-3">
                      <div className="menu-links">
                        <h3><a href="#">All Health Topics »</a></h3>
                        <span>
                          <a href="#">A</a>
                          <a href="#">B</a>
                          <a href="#">C</a>
                          <a href="#">D</a>
                          <a href="#">E</a>
                          <a href="#">F</a>
                          <a href="#">G</a>
                          <a href="#">H</a>
                          <a href="#">I</a>
                          <a href="#">J</a>
                          <a href="#">K</a>
                          <a href="#">L</a>
                          <a href="#">M</a>
                          <a href="#">N</a>
                          <a href="#">O</a>
                          <a href="#">P</a>
                          <a href="#">Q</a>
                          <a href="#">R</a>
                          <a href="#">S</a>
                          <a href="#">T</a>
                          <a href="#">U</a>
                          <a href="#">V</a>
                          <a href="#">W</a>
                          <a href="#">X</a>
                          <a href="#">Y</a>
                          <a href="#">Z</a>
                        </span>
                      </div>
                    </div>

                    <div className="col-sm-6 col-lg-6">
                      <div className="menu-links">
                        <h4><a href="#">Popular topics »</a></h4>

                        <div className="row bdr-0">
                          <div className="col-sm-6 col-lg-6">
                            <ul>
                              <li><a href="#">Immunization</a></li>
                              <li><a href="#">Infant and young child feeding</a></li>
                              <li><a href="#">Health financing</a></li>
                              <li><a href="#">Health workforce</a></li>
                            </ul>
                          </div>

                          <div className="col-sm-6 col-lg-6 bdr-0">
                            <ul>
                              <li><a href="#">Health data and health information systems</a></li>
                              <li><a href="#">Traditional medicine</a></li>
                              <li><a href="#">Essential Medicines</a></li>
                              <li><a href="#">Tuberculosis</a></li>
                            </ul>
                          </div>
                        </div>

                      </div>
                    </div>

                    <div className="col-sm-6 col-lg-3">
                      <div className="menu-links">
                        <h3><a href="#">Featured topic »</a></h3>
                        <a href="#">Infant and young child feeding</a>
                      </div>

                      <img src={require("../../assets/infant-feeding.jpg")} alt="..." style={{ width: "100%" }} />
                    </div>
                  </div>
                </div>
              </li>

              <li className="nav-item dropdown megamenu-li">
                <a className="nav-link dropdown-toggle" href="" id="dropdown02" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Our Work</a>
                <div className="dropdown-menu megamenu list2" aria-labelledby="dropdown02">
                  <div className="row">
                    <div className="col-sm-6 col-lg-3">
                      <div className="menu-links">
                        <h3><a href="#">Vaccine preventable disease »</a></h3>
                      </div>
                    </div>

                    <div className="col-sm-6 col-lg-3">
                      <div className="menu-links">
                        <h3><a href="#">Universal health coverage »</a></h3>
                      </div>
                    </div>

                    <div className="col-sm-6 col-lg-3">
                      <div className="menu-links">
                        <h3><a href="#">Resources »</a></h3>
                        <a href="#">Publications</a>
                        <a href="#">Data</a>
                      </div>
                    </div>

                    <div className="col-sm-6 col-lg-3">
                      <div className="menu-links">
                        <h3><a href="#">Flagships</a></h3>
                      </div>

                      <img src={require("../../assets/achini-mekala-with-her-newborn-child.jpg")} alt="..." style={{ width: "100%" }} />
                    </div>

                  </div>

                </div>
              </li>

              <li className="nav-item dropdown megamenu-li">
                <a className="nav-link dropdown-toggle" href="" id="dropdown03" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">News</a>
                <div className="dropdown-menu megamenu list3" aria-labelledby="dropdown03">
                  <div className="row">
                    <div className="col-sm-6 col-lg-3">
                      <div className="menu-links">
                        <h3><a href="#">Newsroom »</a></h3>
                        <a href="#">Newsroom</a>
                        <a href="#">News releases</a>
                        <a href="#">Media Statements</a>
                        <a href="#">Feature stories</a>
                        <a href="#">Opinion Editorials</a>
                        <a href="#">World Health Day 2020</a>
                      </div>
                    </div>

                    <div className="col-sm-6 col-lg-3">
                      <div className="menu-links">
                        <h3><a href="#">News releases</a></h3>
                        <ul>
                          <li>
                            <a href="#">World breastfeeding week 2020: Focus on access to skilled support</a>
                            <span>7 August 2020 News release</span>
                          </li>
                          <li>
                            <a href="#">Maintain essential health services during COVID-19 response: WHO</a>
                            <span>6 August 2020 News release</span>
                          </li>
                          <li>
                            <a href="#">Maldives, Sri Lanka eliminate measles and rubella, ahead of 2023 target</a>
                            <span>8 July 2020 News release</span>
                          </li>
                        </ul>

                      </div>
                    </div>

                    <div className="col-sm-6 col-lg-3">
                      <div className="menu-links">
                        <h3><a href="#">World Health Day 2020</a></h3>
                      </div>
                    </div>

                    <div className="col-sm-6 col-lg-3">
                      <div className="menu-links">
                        <h3><a href="#">Featured story »</a></h3>
                        <a href="#">Step up efforts to eliminate measles: WHO</a>
                      </div>

                      <img src={require("../../assets/day-2--6.jpg")} alt="..." style={{ width: "100%" }} />
                    </div>

                  </div>

                </div>
              </li>

              <li className="nav-item dropdown megamenu-li">
                <a className="nav-link dropdown-toggle" href="" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Emergencies</a>
                <div className="dropdown-menu megamenu list4" aria-labelledby="dropdown04">
                  <div className="row">
                    <div className="col-sm-6 col-lg-3">
                      <div className="menu-links">
                        <h3><a href="#">Outbreaks and emergencies</a></h3>
                        <a href="#">Outbreaks and emergencies</a>
                        <a href="#">Novel Coronavirus 2019</a>
                        <a href="#">Emergency Operations</a>
                        <a href="#">Country Health Emergency Preparedness & IHR</a>
                        <a href="#">Infectious Hazard Management</a>
                        <a href="#">Health Emergency Information & Risk Assessment</a>
                      </div>
                    </div>

                    <div className="col-sm-6 col-lg-3">
                      <div className="menu-links">
                        <h3><a href="#">Thailand becomes first in SEAR with WHO classified emergency medical team</a></h3>
                        <img src={require("../../assets/thailand-emt-689.jpg")} alt="..." style={{ width: "100%" }} />

                      </div>
                    </div>

                    <div className="col-sm-6 col-lg-3">
                      <div className="menu-links">
                        <h3><a href="#">Health Ministers Commit to Emergency Preparedness</a></h3>
                        <img src={require("../../assets/rc72-health-ministers-commit-to-emergency-preparedness.jpg")} alt="..." style={{ width: "100%" }} />
                      </div>
                    </div>

                    <div className="col-sm-6 col-lg-3">
                      <div className="menu-links">
                        <h3><a href="#">Major Earthquake Hits Sulawesi, Indonesia</a></h3>
                      </div>

                      <img src={require("../../assets/sulawesi-earthquake-630px.jpg")} alt="..." style={{ width: "100%" }} />
                    </div>

                  </div>

                </div>
              </li>

              <li className="nav-item dropdown megamenu-li">
                <a className="nav-link dropdown-toggle" href="" id="dropdown05" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">About</a>
                <div className="dropdown-menu megamenu list5" aria-labelledby="dropdown05">
                  <div className="row">
                    <div className="col-sm-6 col-lg-3">
                      <div className="menu-links">
                        <h3><a href="#">Overview »</a></h3>
                        <a href="#">Our focus</a>
                        <a href="#">Where we work</a>
                      </div>
                    </div>

                    <div className="col-sm-6 col-lg-3">
                      <div className="menu-links">
                        <h3><a href="#">Governance »</a></h3>
                        <a href="#">Regional Director</a>
                        <a href="#">Regional Committee</a>
                        <a href="#">Seventy-third Session of the Regional Committee</a>
                      </div>
                    </div>

                    <div className="col-sm-6 col-lg-3">
                      <div className="menu-links">
                        <h3><a href="#">Careers  »</a></h3>
                        <h3><a href="#">Contact Us  »</a></h3>
                      </div>
                    </div>

                    <div className="col-sm-6 col-lg-3">
                      <div className="menu-links">
                        <h3><a href="#">From vision to results: advancing health for billions in the South-East Asia Region</a></h3>
                      </div>

                      <img src={require("../../assets/searo-health-cards.jpg")} alt="..." style={{ width: "100%" }} />
                    </div>

                  </div>

                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 px-4">
            <ul className="breadcrumb px-4">
              <li><a href="#">Home</a></li>
              <li><a href="#">Health topics</a></li>
              <li>Traditional medicine</li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
