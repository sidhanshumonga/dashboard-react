import React, { useRef, useLayoutEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import XYchart from './xy-chart/xy-chart.js'
import PieChart from './pie-chart/pie-chart.js'

am4core.useTheme(am4themes_animated);

export default function ChartsDiv(props) {
  const data = props.chartData.map(x=> {return {...x, "value" : parseInt(x.value)}})

  return (
    <div style={{display:'block'}}>
      <XYchart data={data}></XYchart>
      <PieChart data={data}></PieChart>
    </div>
  );
}
