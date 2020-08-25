import PieChart from "./pie-chart/pie-chart.js";
import React from "react";
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import XYchart from "./xy-chart/xy-chart.js";
import LineChart from "./line-chart/line-chart.js";
import TableChart from './table/table.js'

export default function ChartsDiv(props) {
  const data = props.chartData.map((x) => {
    return { ...x, value: parseInt(x.value) };
  });

  return (
    <div style={{ display: "block" }}>
      <Tabs defaultActiveKey="tableChart" id="uncontrolled-tab-example">
        <Tab eventKey="tableChart" data={data} title="Table">
          <TableChart data={data} periods={props.periods} />
        </Tab>
        <Tab eventKey="xyChart" title="XY-Chart">
          <XYchart data={data} indicators={props.indicators} periods={props.periods} locations={props.locations} />
        </Tab>
        <Tab eventKey="pieChart" title="Pie Chart">
          <PieChart data={data} indicators={props.indicators} periods={props.periods} locations={props.locations}></PieChart>
        </Tab>
        <Tab eventKey="lineChart" title="Line Chart">
          <LineChart data={data} indicators={props.indicators} periods={props.periods} locations={props.locations}></LineChart>
        </Tab>
        <Tab eventKey="pointChart" title="Point Chart" disabled></Tab>
      </Tabs>
    </div>
  );
}
