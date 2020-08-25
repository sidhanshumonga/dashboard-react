import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";

import React, { useLayoutEffect } from "react";

import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import SideList from "../../sidelist/sidelist.js";

am4core.useTheme(am4themes_animated);

export default function PieChart(props) {
  const charttypes = [
    { name: "Pie chart", value: "pie" },
    { name: "Donut chart", value: "donut" },
  ];

  const selectedPeriods = props.periods
  const selectedLocations = props.locations

  const [selectedChartType, setSelectedChartType] = React.useState("pie");
  const [selectedType, setSelectedType] = React.useState("location");
  const [displayedLocationArray, setDisplayedLocationArray] = React.useState(
    []
  );
  const [displayedPeriodArray, setDisplayedPeriodArray] = React.useState([]);

  const handleDisplayedLocationArrayChange = (value) => {
    setDisplayedLocationArray(value.map((x) => x.id));
  };

  const handleDisplayedPeriodArrayChange = (value) => {
    setDisplayedPeriodArray(value.map((x) => x.id));
  };

  const types = [
    { name: "Location", value: "location" },
    { name: "Period", value: "period" },
  ];

  const data = props.data;

  const modifyData = (params) => {
    let mutedArr = {};
    for (let i = 0; i < data.length; i++) {
      if (params.location.length === 0 && params.period.length === 0) {
        if (mutedArr[data[i]["indicator_id"]]) {
          mutedArr[data[i]["indicator_id"]]["value"] += parseInt(
            data[i]["value"]
          );
        } else {
          mutedArr[data[i]["indicator_id"]] = {
            indicator: data[i]["indicator"],
            value: parseInt(data[i]["value"]),
          };
        }
      } else if (params.location.length !== 0 && params.period.length === 0) {
        if (params.location.includes(data[i]["location_id"])) {
          if (mutedArr[data[i]["indicator_id"]]) {
            mutedArr[data[i]["indicator_id"]]["value"] += parseInt(
              data[i]["value"]
            );
          } else {
            mutedArr[data[i]["indicator_id"]] = {
              indicator: data[i]["indicator"],
              value: parseInt(data[i]["value"]),
            };
          }
        }
      } else if (params.location.length === 0 && params.period.length !== 0) {
        if (params.period.includes(data[i]["period"])) {
          if (mutedArr[data[i]["indicator_id"]]) {
            mutedArr[data[i]["indicator_id"]]["value"] += parseInt(
              data[i]["value"]
            );
          } else {
            mutedArr[data[i]["indicator_id"]] = {
              indicator: data[i]["indicator"],
              value: parseInt(data[i]["value"]),
            };
          }
        }
      } else {
        if (
          params.period.includes(data[i]["period"]) &&
          params.location.includes(data[i]["location_id"])
        ) {
          if (mutedArr[data[i]["indicator_id"]]) {
            mutedArr[data[i]["indicator_id"]]["value"] += parseInt(
              data[i]["value"]
            );
          } else {
            mutedArr[data[i]["indicator_id"]] = {
              indicator: data[i]["indicator"],
              value: parseInt(data[i]["value"]),
            };
          }
        }
      }
    }
    // console.log(mutedArr)
    return Object.values(mutedArr);
  };

  const hideSmall = (ev) => {
    if (ev.target.dataItem && (ev.target.dataItem.values.value.percent < 2)) {
      ev.target.hide();
    }
    else {
      ev.target.show();
    }
  }

  useLayoutEffect(() => {
    let chart = am4core.create("piechartByPeriod", am4charts.PieChart);
    chart.legend = new am4charts.Legend();
    chart.legend.position = "bottom";
    chart.paddingRight = 20;
    chart.data = modifyData({
      location: displayedLocationArray,
      period: displayedPeriodArray,
    });

    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "value";
    pieSeries.dataFields.category = "indicator";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeOpacity = 1;

    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;

    pieSeries.ticks.template.events.on("ready", hideSmall);
    pieSeries.ticks.template.events.on("visibilitychanged", hideSmall);
    pieSeries.labels.template.events.on("ready", hideSmall);
    pieSeries.labels.template.events.on("visibilitychanged", hideSmall);

    chart.hiddenState.properties.radius = am4core.percent(0);
    if (selectedChartType === "donut") {
      chart.innerRadius = am4core.percent(30);
    }
    return () => {
      chart.dispose();
    };
  });

  return (
    <div className="m-3">
      <div style={{ width: "100%", height: "50px" }}>
        <ButtonGroup toggle style={{ float: "left" }}>
          {charttypes.map((radio, idx) => (
            <ToggleButton
              key={idx}
              type="radio"
              variant="outline-secondary"
              name="radio"
              value={radio.value}
              checked={selectedChartType === radio.value}
              onChange={(e) => setSelectedChartType(e.currentTarget.value)}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
        <ButtonGroup toggle style={{ float: "right" }}>
          {types.map((radio, idx) => (
            <ToggleButton
              key={idx}
              type="radio"
              variant="outline-secondary"
              name="radio"
              value={radio.value}
              checked={selectedType === radio.value}
              onChange={(e) => setSelectedType(e.currentTarget.value)}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </div>
      <div className="d-inline-flex w-100">
        <div
          className="p-3"
          id="piechartByPeriod"
          style={{ width: "80%", height: "600px" }}
        ></div>

        <div
          style={{
            width: "20%",
            height: "600px",
          }}
        >
          <SideList
            data={selectedLocations}
            type={"Selected locations"}
            onSelect={handleDisplayedLocationArrayChange}
          ></SideList>

          <SideList
            data={selectedPeriods}
            type={"Selected periods"}
            onSelect={handleDisplayedPeriodArrayChange}
          ></SideList>
        </div>
      </div>
    </div>
  );
}
