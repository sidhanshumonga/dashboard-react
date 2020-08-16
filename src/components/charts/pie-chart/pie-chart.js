import React, { useRef, useLayoutEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

export default function PieChart(props) {
  const chart = useRef(null);
  const data = props.data;

  useLayoutEffect(() => {
    let chart = am4core.create("piechartByLocation", am4charts.PieChart);

    chart.paddingRight = 20;
    chart.data = data;
    // Let's cut a hole in our Pie chart the size of 40% the radius
    chart.innerRadius = am4core.percent(40);
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.category = "location";
    pieSeries.dataFields.value = "value";

    // chart.innerRadius = am4core.percent(40);
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;
    pieSeries.labels.template.disabled = true;
    pieSeries.ticks.template.disabled = true;
    // Disable sliding out of slices
    pieSeries.slices.template.states.getKey("hover").properties.shiftRadius = 0;
    pieSeries.slices.template.states.getKey("hover").properties.scale = 0.9;

    // Add second series
    var pieSeries2 = chart.series.push(new am4charts.PieSeries());
    pieSeries2.dataFields.value = "value";
    pieSeries2.dataFields.category = "period";
    pieSeries2.slices.template.stroke = am4core.color("#fff");
    pieSeries2.slices.template.strokeWidth = 2;
    pieSeries2.slices.template.strokeOpacity = 1;
    pieSeries2.slices.template.states.getKey(
      "hover"
    ).properties.shiftRadius = 0;
    pieSeries2.slices.template.states.getKey("hover").properties.scale = 1.1;

    pieSeries2.labels.template.disabled = true;
    pieSeries2.ticks.template.disabled = true;
    // chart.legend = new am4charts.Legend();
    return () => {
      chart.dispose();
    };
  }, [data]);

  useLayoutEffect(() => {
    let chart = am4core.create("piechartByPeriod", am4charts.PieChart);

    chart.paddingRight = 20;
    chart.data = data;

    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.category = "period";
    pieSeries.dataFields.value = "value";

    // chart.innerRadius = am4core.percent(40);

    pieSeries.labels.template.disabled = true;
    pieSeries.ticks.template.disabled = true;
    // chart.legend = new am4charts.Legend();
    return () => {
      chart.dispose();
    };
  }, [data]);

  return (
    <div className="m-3" style={{ display: "flex" }}>
      <div
        className="p-3"
        id="piechartByLocation"
        style={{ width: "100%", height: "500px" }}
      ></div>
      <div
        className="p-3"
        id="piechartByPeriod"
        style={{ width: "100%", height: "500px" }}
      ></div>
    </div>
  );
}
