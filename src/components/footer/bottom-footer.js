import React from "react";
import "./bottom-footer.css";

export default function BottomFooter() {
  return (
    <div className="row bottom-footer-container">
      <div className="col-md-4 text-left col-text pl-4">
        Privacy Legal Notice
      </div>
      <div className="col-md-4">
        <img
          className="social-logo"
          src={require("../../assets/rss.svg")}
        />
        <img
          className="social-logo"
          src={require("../../assets/youtube.svg")}
        />
        <img
          className="social-logo"
          src={require("../../assets/twitter.svg")}
        />
        <img
          className="social-logo"
          src={require("../../assets/facebook.svg")}
        />
        <img
          className="social-logo"
          src={require("../../assets/instagram.svg")}
        />
        <img
          className="social-logo"
          src={require("../../assets/linkedin.svg")}
        />
        <img
          className="social-logo"
          src={require("../../assets/snapchat.svg")}
        />

        <img
          className="social-logo"
          src={require("../../assets/pinterest.svg")}
        />
      </div>
      <div className="col-md-4 text-right col-text pr-4"> © 2020 WHO</div>
    </div>
  );
}
