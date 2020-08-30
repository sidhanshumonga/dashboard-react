import React from "react";
import "./cards.css";

export default function Cards() {
  const [countries, setCountries] = React.useState(0);
  const [indicators, setIndicator] = React.useState(0);
  const [reporting, setReporting] = React.useState(0);

  const getRandomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const randomC = 11;
  const randomI = getRandomNum(50, 60);
  const randomR = getRandomNum(15, 25);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (countries >= randomC) {
        clearInterval(interval);
      } else {
        setCountries(countries + 1);
      }
    }, 100);
    return () => clearInterval(interval);
  });

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (reporting >= randomR) {
        clearInterval(interval);
      } else {
        setReporting(reporting + 1);
      }
    }, 100);
    return () => clearInterval(interval);
  });

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (indicators >= randomI) {
        clearInterval(interval);
      } else {
        setIndicator(indicators + 1);
      }
    }, 70);
    return () => clearInterval(interval);
  });


  return (
    <div className="container-fluid my-5">
      <div className="row">
        <div className="col-4">
          <div className="counter">
            <div className="container-count">
              <div className="row">
                <div className="col-12 col-lg-12">
                  <div className="count-up bdr-top-s0">
                    <p className="counter-count">{countries}</p>
                    <span>+</span>
                    <h3>Countries</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="counter">
            <div className="container-count">
              <div className="row">
                <div className="col-12 col-lg-12">
                  <div className="count-up bdr-top-s1">
                    <p className="counter-count">{indicators}</p>
                    <span>+</span>
                    <h3>Indicators</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="counter">
            <div className="container-count">
              <div className="row">
                <div className="col-12 col-lg-12">
                  <div className="count-up bdr-top-s2">
                    <p className="counter-count">{reporting}</p>
                    <span>%</span>
                    <h3>Reporting rate</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
