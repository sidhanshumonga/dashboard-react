import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";

import React, { useLayoutEffect } from "react";

import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import SideList from "../../sidelist/sidelist.js";

am4core.useTheme(am4themes_animated);

export default function LineChart(props) {
    const charttypes = [
        { name: "Vertical", value: "vertical" },
        { name: "Horizontal", value: "horizontal" },
    ];

    const stacktypes = [
        { name: "Line chart", value: "line" },
        { name: "Line with bar chart", value: "linebar" },
    ];

    const selectedPeriods = props.periods
    const selectedLocations = props.locations

    const [selectedChartType, setSelectedChartType] = React.useState("vertical");
    const [selectedType, setSelectedType] = React.useState("location");
    const [displayedLocationArray, setDisplayedLocationArray] = React.useState(
        []
    );
    const [selectedStackType, setSelectedStackType] = React.useState("line");
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

    const modifyData = (type, params) => {
        let mutedArr = {};
        for (let i = 0; i < data.length; i++) {
            if (params.location.length === 0 && params.period.length === 0) {
                if (mutedArr[data[i][type]]) {
                    if (mutedArr[data[i][type]][data[i]["indicator"]]) {
                        mutedArr[data[i][type]][data[i]["indicator"]] += parseInt(
                            data[i]["value"]
                        );
                    } else {
                        mutedArr[data[i][type]] = {
                            ...mutedArr[data[i][type]],
                            [data[i]["indicator"]]: parseInt(data[i]["value"]),
                        };
                    }
                } else {
                    mutedArr[data[i][type]] = {
                        [type]: data[i][type],
                        [data[i]["indicator"]]: parseInt(data[i]["value"]),
                    };
                }
            } else if (params.location.length === 0 && params.period.length !== 0) {
                if (params.period.includes(data[i]["period"])) {
                    if (mutedArr[data[i][type]]) {
                        if (mutedArr[data[i][type]][data[i]["indicator"]]) {
                            mutedArr[data[i][type]][data[i]["indicator"]] += parseInt(
                                data[i]["value"]
                            );
                        } else {
                            mutedArr[data[i][type]] = {
                                ...mutedArr[data[i][type]],
                                [data[i]["indicator"]]: parseInt(data[i]["value"]),
                            };
                        }
                    } else {
                        mutedArr[data[i][type]] = {
                            [type]: data[i][type],
                            [data[i]["indicator"]]: parseInt(data[i]["value"]),
                        };
                    }
                }
            } else if (params.location.length !== 0 && params.period.length === 0) {
                if (params.location.includes(data[i]["location_id"])) {
                    if (mutedArr[data[i][type]]) {
                        if (mutedArr[data[i][type]][data[i]["indicator"]]) {
                            mutedArr[data[i][type]][data[i]["indicator"]] += parseInt(
                                data[i]["value"]
                            );
                        } else {
                            mutedArr[data[i][type]] = {
                                ...mutedArr[data[i][type]],
                                [data[i]["indicator"]]: parseInt(data[i]["value"]),
                            };
                        }
                    } else {
                        mutedArr[data[i][type]] = {
                            [type]: data[i][type],
                            [data[i]["indicator"]]: parseInt(data[i]["value"]),
                        };
                    }
                }
            } else {
                if (
                    params.location.includes(data[i]["location_id"]) &&
                    params.period.includes(data[i]["period"])
                ) {
                    if (mutedArr[data[i][type]]) {
                        if (mutedArr[data[i][type]][data[i]["indicator"]]) {
                            mutedArr[data[i][type]][data[i]["indicator"]] += parseInt(
                                data[i]["value"]
                            );
                        } else {
                            mutedArr[data[i][type]] = {
                                ...mutedArr[data[i][type]],
                                [data[i]["indicator"]]: parseInt(data[i]["value"]),
                            };
                        }
                    } else {
                        mutedArr[data[i][type]] = {
                            [type]: data[i][type],
                            [data[i]["indicator"]]: parseInt(data[i]["value"]),
                        };
                    }
                }
            }
        }
        // console.log(mutedArr)
        return Object.values(mutedArr);
    };

    const createSeries = (chart, name, type) => {
        var series = chart.series.push(new am4charts.LineSeries());
        if (selectedChartType === "vertical") {
            series.dataFields.valueY = name;
            series.dataFields.categoryX = type;
            series.tooltipText = "[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY}";
        } else {
            series.dataFields.valueX = name;
            series.dataFields.categoryY = type;
            series.tooltipText = "[bold]{name}[/]\n[font-size:14px]{categoryY}: {valueX}";
        }

        series.strokeWidth = 2;
        series.name = name;
        //add bullets
        var circleBullet = series.bullets.push(new am4charts.CircleBullet());
        circleBullet.circle.fill = am4core.color("#fff");
        circleBullet.circle.strokeWidth = 2;
        // series.stacked = selectedStackType === "stacked" ? true : false;

    };

    const createBar = (chart, name, type) => {
        //create columns
        var series = chart.series.push(new am4charts.ColumnSeries());
        if (selectedChartType === "vertical") {
            series.dataFields.valueY = name;
            series.dataFields.categoryX = type;
            series.sequencedInterpolation = true;
            series.columns.template.width = am4core.percent(60);
            series.columns.template.tooltipText =
                "[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY}";
        } else {
            series.dataFields.valueX = name;
            series.dataFields.categoryY = type;
            series.columns.template.tooltipText =
                "[bold]{name}[/]\n[font-size:14px]{categoryY}: {valueX}";
        }
        series.columns.template.fillOpacity = 0.5;
        series.columns.template.strokeOpacity = 0;
        series.name = name;
        // series.stacked = true;
    }


    useLayoutEffect(() => {
        let chart = am4core.create("lineChart", am4charts.XYChart);

        chart.padding(30, 30, 10, 30);
        chart.data = modifyData(selectedType, {
            location: displayedLocationArray,
            period: displayedPeriodArray,
        });
        chart.legend = new am4charts.Legend();
        chart.legend.position = "bottom";
        var categoryAxis, valueAxis;
        if (selectedChartType === "vertical") {
            categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = selectedType;
            categoryAxis.renderer.grid.template.location = 0;

            valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            categoryAxis.renderer.minGridDistance = 20;
        } else {
            // Create axes
            categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = selectedType;
            categoryAxis.renderer.grid.template.opacity = 0;

            valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
            valueAxis.min = 1;
            valueAxis.renderer.ticks.template.length = 12;
            valueAxis.renderer.minGridDistance = 70;
        }
        categoryAxis.renderer.labels.template.fontSize = 12;
        categoryAxis.renderer.labels.template.wrap = true;
        categoryAxis.renderer.labels.template.maxWidth = 140;

        valueAxis.renderer.labels.template.fontSize = 12;
        valueAxis.renderer.labels.template.wrap = true;
        valueAxis.renderer.labels.template.maxWidth = 140;
        valueAxis.min = 0;

        if (selectedStackType === 'line') {
            //add chart cursor
            chart.cursor = new am4charts.XYCursor();
            chart.cursor.behavior = "zoomY";
        }

        for (let key of Object.keys(chart.data[0])) {
            if (key !== selectedType) {
                createSeries(chart, key, selectedType);
                if (selectedStackType === 'linebar') {
                    createBar(chart, key, selectedType);
                }
            }
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
                <ButtonGroup toggle style={{ float: "left", marginLeft: 20 }}>
                    {stacktypes.map((radio, idx) => (
                        <ToggleButton
                            key={idx}
                            type="radio"
                            variant="outline-secondary"
                            name="radio"
                            value={radio.value}
                            checked={selectedStackType === radio.value}
                            onChange={(e) => setSelectedStackType(e.currentTarget.value)}
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
                    id="lineChart"
                    style={{ width: "80%", height: "600px" }}
                ></div>

                <div
                    style={{
                        width: "20%",
                        height: "600px",
                    }}
                >
                    {selectedType === "period" ? (
                        <SideList
                            data={selectedLocations}
                            type={"Selected locations"}
                            onSelect={handleDisplayedLocationArrayChange}
                        ></SideList>
                    ) : (
                            <SideList
                                data={selectedPeriods}
                                type={"Selected periods"}
                                onSelect={handleDisplayedPeriodArrayChange}
                            ></SideList>
                        )}
                </div>
            </div>
        </div>
    );
}
