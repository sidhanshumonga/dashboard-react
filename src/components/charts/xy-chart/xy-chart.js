import React, { useRef, useLayoutEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

export default function XYchart(props) {
  const chart = useRef(null);
  const data = props.data;

  useLayoutEffect(() => {
    let chart = am4core.create("xychartByLocation", am4charts.XYChart);

    chart.paddingRight = 20;
    chart.data = data;

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "location";
    categoryAxis.title.text = "Locations";
    categoryAxis.renderer.minGridDistance = 20;
    categoryAxis.renderer.cellStartLocation = 0.2;
    categoryAxis.renderer.cellEndLocation = 0.8;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "values";

    let series1 = chart.series.push(new am4charts.ColumnSeries());
    series1.name = "Trend";
    series1.columns.template.tooltipText =
      "series: {name}\nLocation: {categoryX}\nvalue: {valueY}\nIndicator name: {valueInd}\nperiod: {valuePer}";
    series1.columns.template.fill = am4core.color("#104547"); // fill
    series1.dataFields.valueY = "value";
    series1.dataFields.valueInd = "indicator";
    series1.dataFields.valuePer = "period";
    series1.dataFields.categoryX = "location";

    series1.columns.template.width = am4core.percent(50);
    chart.cursor = new am4charts.XYCursor();
    return () => {
      chart.dispose();
    };
  }, [data]);

  useLayoutEffect(() => {
    let chart = am4core.create("xychartByPeriod", am4charts.XYChart);

    chart.paddingRight = 20;
    chart.data = data;

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "period";
    categoryAxis.title.text = "Periods";
    categoryAxis.renderer.minGridDistance = 20;
    categoryAxis.renderer.cellStartLocation = 0.2;
    categoryAxis.renderer.cellEndLocation = 0.8;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "values";

    let series1 = chart.series.push(new am4charts.ColumnSeries());
    series1.name = "Trend";
    series1.columns.template.tooltipText =
      "series: {name}\nPeriod: {categoryX}\nvalue: {valueY}Indicator Name: {indicator}\nLocation: {valueLoc}";
    series1.columns.template.fill = am4core.color("#104547"); // fill
    series1.dataFields.valueY = "value";
    series1.dataFields.valueInd = "indicator";
    series1.dataFields.valueLoc = "location";
    series1.dataFields.categoryX = "period";

    series1.columns.template.width = am4core.percent(50);
    chart.cursor = new am4charts.XYCursor();
    return () => {
      chart.dispose();
    };
  }, [data]);

  return (
    <div className="m-3" style={{ display: "flex" }}>
      <div
        className="p-3"
        id="xychartByLocation"
        style={{ width: "100%", height: "500px" }}
      ></div>
      <div
        className="p-3"
        id="xychartByPeriod"
        style={{ width: "100%", height: "500px" }}
      ></div>
    </div>
  );
}
