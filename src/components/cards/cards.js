import React from "react";
import "./cards.css";

export default function Cards() {
  const [countries, setCountries] = React.useState(0);
  const [indicators, setIndicator] = React.useState(0);
  const [reporting, setReporting] = React.useState(0);

  const getRandomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const randomC = getRandomNum(15, 25);
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
    <div className="row justify-content-around mx-5 mt-4 mb-5">
      <div className="col col-lg-3 col-md-3 col-sm-3 cards card1 p-4">
        {countries}+ Countries
      </div>
      <div className="col col-lg-3 col-md-3 col-sm-3 cards card2 p-4">
        {indicators}+ Indicators
      </div>
      <div className="col col-lg-3 col-md-3 col-sm-3 cards card3 p-4">
        {reporting}% Reporting rate
      </div>
    </div>
  );
}
