import React from "react";
import "./bottom-footer.css";

export default function BottomFooter() {
  return (
    <div className="row bottom-footer-container mx-0">
      <div className="col-md-4 text-left col-text pl-4">
        Privacy Legal Notice
      </div>
      <div className="col-md-4">
        <img
          className="social-logo"
          src={require("../../assets/rss.svg")}
          alt={"social-logo"}
        />
        <img
          className="social-logo"
          src={require("../../assets/youtube.svg")}
          alt={"social-logo"}
        />
        <img
          className="social-logo"
          src={require("../../assets/twitter.svg")}
          alt={"social-logo"}
        />
        <img
          className="social-logo"
          src={require("../../assets/facebook.svg")}
          alt={"social-logo"}
        />
        <img
          className="social-logo"
          src={require("../../assets/instagram.svg")}
          alt={"social-logo"}
        />
        <img
          className="social-logo"
          src={require("../../assets/linkedin.svg")}
          alt={"social-logo"}
        />
        <img
          className="social-logo"
          src={require("../../assets/snapchat.svg")}
          alt={"social-logo"}
        />

        <img
          className="social-logo"
          src={require("../../assets/pinterest.svg")}
          alt={"social-logo"}
        />
      </div>
      <div className="col-md-4 text-right col-text pr-4"> © 2020 WHO</div>
    </div>
  );
}
