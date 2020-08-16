import React, { useRef, useLayoutEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import XYchart from "./xy-chart/xy-chart.js";
import PieChart from "./pie-chart/pie-chart.js";
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

am4core.useTheme(am4themes_animated);

export default function ChartsDiv(props) {
  const data = props.chartData.map((x) => {
    return { ...x, value: parseInt(x.value) };
  });

  return (
    <div style={{ display: "block" }}>
      <Tabs defaultActiveKey="xyChart" id="uncontrolled-tab-example">
        <Tab eventKey="xyChart" title="XY-Chart">
          <XYchart data={data}></XYchart>
        </Tab>
        <Tab eventKey="pieChart" title="Pie Chart">
          <PieChart data={data}></PieChart>
        </Tab>
        <Tab eventKey="pointChart" title="Point Chart" disabled></Tab>
        <Tab eventKey="lineChart" title="Line Chart" disabled></Tab>
      </Tabs>
    </div>
  );
}
