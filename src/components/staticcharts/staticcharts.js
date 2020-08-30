import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";

import React from "react";
import Cards from '../cards/cards.js'

import "./staticcharts.css";
import * as Utils from "../../Utils.js";
import * as CONSTANTS from "../../CONSTANTS.js";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

export default function StaticChart() {
    const [tableData, setDynamicTableData] = React.useState([])
    const [rawData, setRawData] = React.useState([])
    const [columns, setColumns] = React.useState([])

    const selectedType = "period"
    React.useEffect(() => {
        (async () => {
            const response = await fetch(Utils.getBaseUrl() + CONSTANTS.staticChart1);
            const result = await response.json();
            const data = result.data;
            displayChart(data, "chart1");
        })();
    }, []);

    React.useEffect(() => {
        (async () => {
            const response = await fetch(Utils.getBaseUrl() + CONSTANTS.staticChart2);
            const result = await response.json();
            const data = result.data;
            displayChart(data, "chart2");
        })();
    }, []);

    React.useEffect(() => {
        (async () => {
            const response = await fetch(Utils.getBaseUrl() + CONSTANTS.staticChart3);
            const result = await response.json();
            const data = result.data;
            displayChartBar(data, "chart3");
        })();
    }, []);

    React.useEffect(() => {
        (async () => {
            const response = await fetch(Utils.getBaseUrl() + CONSTANTS.staticChart4);
            const result = await response.json();
            const data = result.data;
            displayChartBar(data, "chart4");
        })();
    }, []);

    React.useEffect(() => {
        (async () => {
            const response = await fetch(Utils.getBaseUrl() + CONSTANTS.staticTable);
            const result = await response.json();
            const data = result.data
            const cols = data
                .filter(
                    (thing, index, self) =>
                        index === self.findIndex((t) => t.location === thing.location)
                )
                .map((x) => {
                    return { location: x.location, location_id: x.location_id };
                })
            setRawData(data)
            setColumns(cols)
            setDynamicTableData(modifyDataForTable(data, 'period'))
        })();
    }, []);

    const modifyDataForTable = (chart1, type) => {
        let mutedArr = {};
        for (let i = 0; i < chart1.length; i++) {
            if (mutedArr[chart1[i][type]]) {
                if (mutedArr[chart1[i][type]][chart1[i]["indicator_id"] + '_' + chart1[i]["location_id"]]) {
                    mutedArr[chart1[i][type]][chart1[i]["indicator_id"] + '_' + chart1[i]["location_id"]] += parseInt(
                        chart1[i]["value"]
                    );
                } else {
                    mutedArr[chart1[i][type]] = {
                        ...mutedArr[chart1[i][type]],
                        [chart1[i]["indicator_id"] + '_' + chart1[i]["location_id"]]: parseInt(chart1[i]["value"]),
                    };
                }

                if (mutedArr[chart1[i][type]]['total_' + chart1[i]["location_id"]]) {
                    mutedArr[chart1[i][type]]['total_' + chart1[i]["location_id"]] += parseInt(
                        chart1[i]["value"]
                    );
                } else {
                    mutedArr[chart1[i][type]] = {
                        ...mutedArr[chart1[i][type]],
                        ['total_' + chart1[i]["location_id"]]: parseInt(chart1[i]["value"]),
                    };
                }

            } else {
                mutedArr[chart1[i][type]] = {
                    [type]: chart1[i][type],
                    [chart1[i]["indicator_id"] + '_' + chart1[i]["location_id"]]: parseInt(chart1[i]["value"]),
                    ['total_' + chart1[i]["location_id"]]: parseInt(chart1[i]["value"]),
                };
            }
        }
        return Object.values(mutedArr);
    };

    const modifyData = (chart1, type) => {
        let mutedArr = {};
        for (let i = 0; i < chart1.length; i++) {
            if (mutedArr[chart1[i][type]]) {
                if (mutedArr[chart1[i][type]][chart1[i]["location"]]) {
                    mutedArr[chart1[i][type]][chart1[i]["location"]] += parseInt(
                        chart1[i]["value"]
                    );
                } else {
                    mutedArr[chart1[i][type]] = {
                        ...mutedArr[chart1[i][type]],
                        [chart1[i]["location"]]: parseInt(chart1[i]["value"]),
                    };
                }
            } else {
                mutedArr[chart1[i][type]] = {
                    [type]: chart1[i][type],
                    [chart1[i]["location"]]: parseInt(chart1[i]["value"]),
                };
            }
        }
        return Object.values(mutedArr);
    };


    const modifyDataBar = (chart1, type) => {
        let mutedArr = {};
        for (let i = 0; i < chart1.length; i++) {
            if (mutedArr[chart1[i][type]]) {
                if (mutedArr[chart1[i][type]][chart1[i]["location"]]) {
                    mutedArr[chart1[i][type]]["value"] += parseInt(
                        chart1[i]["value"]
                    );
                } else {
                    mutedArr[chart1[i][type]] = {
                        ...mutedArr[chart1[i][type]],
                        value: parseInt(chart1[i]["value"]),
                    };
                }
            } else {
                mutedArr[chart1[i][type]] = {
                    [type]: chart1[i][type],
                    value: parseInt(chart1[i]["value"]),
                };
            }
        }
        return Object.values(mutedArr).filter(x => x.value !== 0);
    }

    const createSeries = (chart, name, type) => {
        var series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = name;
        series.dataFields.categoryX = type;
        series.tooltipText = "[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY}";

        series.strokeWidth = 2;
        series.name = name;
        //add bullets
        var circleBullet = series.bullets.push(new am4charts.CircleBullet());
        circleBullet.circle.fill = am4core.color("#fff");
        circleBullet.circle.strokeWidth = 2;
        // series.stacked = selectedStackType === "stacked" ? true : false;

    };

    const displayChart = (data, id) => {
        let chart = am4core.create(id, am4charts.XYChart);

        // chart.padding(30, 30, 10, 30);
        chart.data = modifyData(data, selectedType);
        chart.legend = new am4charts.Legend();
        chart.legend.position = "bottom";
        var categoryAxis, valueAxis;

        // Create axes
        categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = selectedType;
        categoryAxis.renderer.grid.template.location = 0;

        valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        categoryAxis.renderer.minGridDistance = 20;

        valueAxis.renderer.labels.template.fontSize = 12;
        valueAxis.renderer.labels.template.wrap = true;
        valueAxis.renderer.labels.template.maxWidth = 140;
        valueAxis.min = 0;
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.behavior = "zoomY";
        for (let key of Object.keys(chart.data[0])) {
            if (key !== selectedType) {
                createSeries(chart, key, selectedType);
            }
        }

        return () => {
            chart.dispose();
        };
    };

    const displayChartBar = (data, id) => {
        let chart = am4core.create(id, am4charts.XYChart);

        // chart.padding(30, 30, 10, 30);
        chart.data = modifyDataBar(data, "location");
        // chart.legend = new am4charts.Legend();
        // chart.legend.position = "bottom";

        // console.log(chart.data)
        // Create axes
        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "location";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 60;

        // Create series
        var series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = "value";
        series.dataFields.categoryX = "location";
        series.name = "Locations";
        series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
        series.columns.template.fillOpacity = .8;

        var columnTemplate = series.columns.template;
        columnTemplate.strokeWidth = 2;
        columnTemplate.strokeOpacity = 1;

        valueAxis.renderer.labels.template.fontSize = 12;
        valueAxis.renderer.labels.template.wrap = true;
        valueAxis.renderer.labels.template.maxWidth = 140;
        // for (let key of Object.keys(chart.data[0])) {
        //     if (key !== selectedType) {
        //         console.log(key)
        //         createBar(chart, key, "location");
        //     }
        // }

        return () => {
            chart.dispose();
        };
    };

    return (
        <section>
            <Cards></Cards>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-4">
                        <div className="chart-area bdr-top-s3">
                            <div className="container-chart">
                                <div className="row" style={{ height: "400px" }}>
                                    <div className="col-12 col-lg-12">
                                        Per capita TCM expenditure
                                        <div id="chart1" style={{ height: "95%" }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="chart-area bdr-top-s2">
                            <div className="container-chart">
                                <div className="row" style={{ height: "400px" }}>
                                    <div className="col-12 col-lg-12">
                                        TCM department visits as % of all OPD visits
                                        <div id="chart2" style={{ height: "95%" }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="chart-area bdr-top-s0">
                            <div className="container-chart">
                                <div className="row" style={{ height: "400px" }}>
                                    <div className="col-12 col-lg-12">
                                        TCM Hospitals and Clinical density
                                        <div id="chart3" style={{ height: "95%" }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row my-4">
                    <div className="col-7">
                        <div className="chart-area bdr-top-s3">
                            <div className="container-chart">
                                <div className="row" style={{ height: "400px" }}>
                                    <div className="col-12 col-lg-12">
                                        TCM regulated practitioner density and distribution
                                        <div id="chart4" style={{ height: "95%" }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-5">
                        <div className="chart-area bdr-top-s3">
                            <div className="container-chart">
                                <div className="row" style={{ height: "400px", overflow: "scroll" }}>
                                    <div className="col-12 col-lg-12">
                                        Top 10 health problems for seeking TCM service
                                        <table className="table table-bordered table-fn-xs p-3">
                                            <thead>
                                                <tr>
                                                    <th colSpan="4">Top 10 health problems for seeking TCM service</th>
                                                </tr>
                                                <tr>
                                                    <th>Bhutan</th>
                                                    <th>Myanmar</th>
                                                    <th>Sri Lanka</th>
                                                    <th>Thailand</th>
                                                </tr>
                                                <tr>
                                                    <th>2014</th>
                                                    <th>2015</th>
                                                    <th></th>
                                                    <th>2015</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Arthritis</td>
                                                    <td>Arthritis</td>
                                                    <td rowSpan="10">NA*</td>
                                                    <td>Back pain</td>
                                                </tr>
                                                <tr>
                                                    <td>DD</td>
                                                    <td>Abdominal & Pelvic pain</td>
                                                    <td>Leg/knee/foot/waist/hip pain</td>
                                                </tr>
                                                <tr>
                                                    <td>Common cold/Cough/Sinus</td>
                                                    <td>Common cold/Cough</td>
                                                    <td>Common cold/Cough</td>
                                                </tr>
                                                <tr>
                                                    <td>Skin Diseases</td>
                                                    <td>Disturbances of skin sensation(Numbness)</td>
                                                    <td>Back pain</td>
                                                </tr>
                                                <tr>
                                                    <td>Hypertension</td>
                                                    <td>Essential Primary Hypertension</td>
                                                    <td>Muscle pain</td>
                                                </tr>
                                                <tr>
                                                    <td>Gout</td>
                                                    <td>Spondylosis</td>
                                                    <td rowSpan="5"></td>
                                                </tr>
                                                <tr>
                                                    <td>Liver & Kidney disorder</td>
                                                    <td>Dyspepsia</td>
                                                </tr>
                                                <tr>
                                                    <td>Neuro Disorder</td>
                                                    <td>Stroke</td>
                                                </tr>
                                                <tr>
                                                    <td rowSpan="2"></td>
                                                    <td>Injury</td>
                                                </tr>
                                                <tr>
                                                    <td>Soft tissue disorders</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row my-4">
                    <div className="col-6">
                        <div className="chart-area bdr-top-s2">
                            <div className="container-chart">
                                <div className="row mx-1" style={{ height: "400px", overflow: "scroll", width: "100%" }}>
                                    <div className="col-12 col-lg-12">
                                        Number of Diploma/Graduates/Higher studies in TCM
                                        <table className="table table-bordered table-fn-xs p-3">
                                            <thead>
                                                <tr>
                                                    <th>Period</th>
                                                    <th>Data / Organisation unit</th>
                                                    {columns.map(col => (
                                                        <th>{col.location}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            {
                                                tableData.map((row, idx) => (
                                                    <tbody key={idx}>
                                                        <tr>
                                                            <td rowSpan="5" className="tr-head">{row.period}</td>
                                                            <td className="tr-head">Number of TCM graduates with diploma degree</td>
                                                            {columns.map((col, idxx) => (
                                                                <td key={idxx}>{row['mK5Op4WwSYN_' + col.location_id] ? row['mK5Op4WwSYN_' + col.location_id] : 0}</td>
                                                            ))}
                                                        </tr>
                                                        <tr>
                                                            <td className="tr-head">Number of TCM graduates with bachelor degree</td>
                                                            {columns.map((col, idxx) => (
                                                                <td key={idxx}>{row['BKTB9rgmAA3_' + col.location_id] ? row['BKTB9rgmAA3_' + col.location_id] : 0}</td>
                                                            ))}
                                                        </tr>
                                                        <tr>
                                                            <td className="tr-head">Number of TCM Graduates in Higher studies (PhD/Master Degree/Clinical Doctorate/PG Diploma)</td>
                                                            {columns.map((col, idxx) => (
                                                                <td key={idxx}>{row['G6c8YXupKVg_' + col.location_id] ? row['G6c8YXupKVg_' + col.location_id] : 0}</td>
                                                            ))}
                                                        </tr>
                                                        <tr>
                                                            <td className="tr-head">Total</td>
                                                            {columns.map((col, idxx) => (
                                                                <td className="tr-head" key={idxx}>
                                                                    {row['total_' + col.location_id] ? row['total_' + col.location_id] : 0}
                                                                </td>
                                                            ))}
                                                        </tr>
                                                    </tbody>
                                                ))
                                            }
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="chart-area bdr-top-s1">
                            <div className="container-chart">
                                <div className="row" style={{ height: "400px", overflow: "scroll" }}>
                                    <div className="col-12 col-lg-12">
                                        POLICY
                                        <table className="table table-bordered table-fn-xs p-3">
                                            <thead>
                                                <tr><th colSpan="6">POLICY</th></tr>
                                                <tr>
                                                    <th></th>
                                                    <th>Indicator name</th>
                                                    <th>Bhutan</th>
                                                    <th>Myanmar</th>
                                                    <th>Srilanka</th>
                                                    <th>Thailand</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>9</td>
                                                    <td>TCM reflected in national health sector plan</td>
                                                    <td>Yes <br />(2017)</td>
                                                    <td>Yes <br />(2017)</td>
                                                    <td>No <br />Not reflected in national health sector plan but included in government manifestos</td>
                                                    <td>Yes <br />(2015)</td>
                                                </tr>
                                                <tr>
                                                    <td>6</td>
                                                    <td>Existence of a national body to oversee T&CM-related research</td>
                                                    <td>Yes <br />(2017)<br />Research Ethics Board of Health (REBH)</td>
                                                    <td>Yes <br />(2017)<br />Academic board and Ethical board of University of Traditional Medicine, Department of Traditional Medicine</td>
                                                    <td>Yes <br />(2017)<br />Annual Progress Reports of Department of Ayurveda </td>
                                                    <td>Yes <br />(2018)</td>
                                                </tr>
                                                <tr>
                                                    <td>27</td>
                                                    <td>Number of agricultural and collection practice (GACP) guidelines for medicinal plants</td>
                                                    <td>Yes <br />(2017)<br />Menjong Sorig Pharmaceuticals Corporation limited (MSPCL)</td>
                                                    <td>Partly<br />(2017)</td>
                                                    <td>NA</td>
                                                    <td>NA</td>
                                                </tr>
                                                <tr>
                                                    <td>35</td>
                                                    <td>Existence of T&CM practice guidelines</td>
                                                    <td>Yes <br />(2017)<br />SoP for TMS, Classification of diseases and related health problems,TM formulatory of Bhutan,Lay-nga guideline</td>
                                                    <td>Yes <br />(2017)</td>
                                                    <td>No <br />(2017)</td>
                                                    <td>Yes <br />(2016)</td>
                                                </tr>
                                                <tr>
                                                    <td>36</td>
                                                    <td>Existence of a protocol or guidelines for referral between T&CM and modern medical services</td>
                                                    <td>Yes <br />(2017)<br />National collaboration committee</td>
                                                    <td>Yes <br />(2017)</td>
                                                    <td>No <br />(2017)</td>
                                                    <td>NA</td>
                                                </tr>
                                                <tr>
                                                    <td>37</td>
                                                    <td>Number of T&CM products included in the national essential medicines list</td>
                                                    <td>Yes <br />(2017)<br />128 products as per the Essential Drug List(EDL)</td>
                                                    <td>Partly<br />(2017)<br />TM hospitals and TM Clinics are using TM formulation only</td>
                                                    <td>0<br />(2017)<br />Steps are being taken to prepare T&CM national essential medicines list </td>
                                                    <td>74</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row my-4">
                    <div className="col-6">
                        <div className="chart-area bdr-top-s3">
                            <div className="container-chart">
                                <div className="row" style={{ height: "400px", overflow: "scroll" }}>
                                    <div className="col-12 col-lg-12">
                                        RESEARCH
                                        <table className="table table-bordered table-fn-xs p-3">
                                            <thead>
                                                <tr><th colSpan="6">RESEARCH</th></tr>
                                                <tr>
                                                    <th></th>
                                                    <th>Indicator name</th>
                                                    <th>Bhutan</th>
                                                    <th>Myanmar</th>
                                                    <th>Srilanka</th>
                                                    <th>Thailand</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>22</td>
                                                    <td>22. Incorporation of TCM in the national health research strategy</td>
                                                    <td>Yes <br />(2017)</td>
                                                    <td>Partly (2017)<br />TM related research wroks are done by researchers in DMR, DTM and Post Graduate students for academic dissertation under MoHS</td>
                                                    <td>Yes <br />(2017)</td>
                                                    <td>Yes <br />(2018)</td>
                                                </tr>
                                                <tr>
                                                    <td>23</td>
                                                    <td>23. Integration of TCM in a national research council or national health council</td>
                                                    <td>Yes <br />(2017)</td>
                                                    <td>NA</td>
                                                    <td>Yes <br />(2017)<br />(partially integrated in national research council)<br /></td>
                                                    <td>Yes <br />(2018)</td>
                                                </tr>
                                                <tr>
                                                    <td>24</td>
                                                    <td>24. Number of research institutions or centers that conduct research on TCM including network universities</td>
                                                    <td>Yes <br />(2017)<br />Khesar Gyalpo University of Medical Sciences of Bhutan</td>
                                                    <td>Largely<br />(2017)<br />Universities Under Ministry of Education, and Ministry of Health & Sports (Yangon Univ.Mandalay Univ., Mawlamine Univ., Pathein Univ., Taung-gu. Univ…….etc under Ministry of Education and Universities of Medicine; Universities of Pharmacy, University of traditional Medicine under Ministry of health and Sports</td>
                                                    <td>5<br />(2017)</td>
                                                    <td>62<br />(2018)<br />First National Master Plan on Thai Herbal Development</td>
                                                </tr>
                                                <tr>
                                                    <td>25</td>
                                                    <td>25. Number of TCM research results in the national research registry</td>
                                                    <td>Yes
                                                    <br />(2017)</td>
                                                    <td>Partly <br />(2017)</td>
                                                    <td>NA</td>
                                                    <td>NA</td>
                                                </tr>
                                                <tr>
                                                    <td>31</td>
                                                    <td>31. Proportion of TCM manufacturers that are licensed</td>
                                                    <td>Yes <br />(2017)</td>
                                                    <td>Largely<br />(2017)</td>
                                                    <td>NA</td>
                                                    <td>NA</td>
                                                </tr>
                                                <tr>
                                                    <td>34</td>
                                                    <td>34. Existence of a continuing professional development program for TCM practitioners</td>
                                                    <td>Yes <br />(2017)<br />Department of Traditional Medicine Services(DTMS)<br />Screen reader support enabled</td>
                                                    <td>Largely<br />(2017)<br />CTME (Continous TM Education) Programs are being organized in the TM hospitals & TM University.</td>
                                                    <td>Yes <br />(2017)<br />Short term programmes conducted by the National Institute of Traditional Medicine (NITM) annualy</td>
                                                    <td>Yes <br />(2018)</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="chart-area bdr-top-s0">
                            <div className="container-chart">
                                <div className="row" style={{ height: "400px", overflow: "scroll" }}>
                                    <div className="col-12 col-lg-12">
                                        REGULATION
                                        <table className="table table-bordered table-fn-xs p-3">
                                            <thead>
                                                <tr><th colSpan="6">REGULATION</th></tr>
                                                <tr>
                                                    <th></th>
                                                    <th>Indicator name</th>
                                                    <th>Bhutan</th>
                                                    <th>Myanmar</th>
                                                    <th>Srilanka</th>
                                                    <th>Thailand</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>7</td>
                                                    <td>7. Proportion of licensed TCM manufacturers that meet good manufacturing practice (GMP) standards</td>
                                                    <td>Yes <br />(2017)<br />Menjong Sorig Pharmaceuticals Corporation limited (MSPCL)</td>
                                                    <td>2/2962<br />(2017)</td>
                                                    <td>NA<br />(Data not available)</td>
                                                    <td>7</td>
                                                </tr>
                                                <tr>
                                                    <td>9</td>
                                                    <td>9. Existence of a national adverse event reporting system for TCM practice</td>
                                                    <td>Yes <br />(2017)<br />Drug Regulatory Authority of Bhutan(DRA)</td>
                                                    <td>Yes <br />(2017)<br />Department of Traditional Medicine, Ministry of Health and Sports</td>
                                                    <td>No <br />(2017)</td>
                                                    <td>NA</td>
                                                </tr>
                                                <tr>
                                                    <td>10</td>
                                                    <td>10. Existence of a national mechanism to ensure quality of TCM education and training</td>
                                                    <td>Yes <br />(2017)<br />Bhutan Medical and Health Council(BMHC)</td>
                                                    <td>Yes <br />(2017)<br />Department of Traditional Medicine, Ministry of Health and Sports</td>
                                                    <td>Yes <br />(2017)<br />Education & Hospital Board established under the Ayurveda act, University Grants Commission</td>
                                                    <td>Yes, 2012(TQF), 2013 (Thai Traditional Medicine Profession Act B.E. 2556</td>
                                                </tr>
                                                <tr>
                                                    <td>11</td>
                                                    <td>11. Existence of a regulatory mechanism to oversee advertising of TCM products</td>
                                                    <td>Yes <br />(2017)<br />Drug Regulatory Authority of Bhutan(DRA)</td>
                                                    <td>Yes <br />(2017)<br />Director General of DTM/ Chair Person of Central Traditional Drug SDirector General of DTM/ Chair Person of Central Traditional Drug Supervising Board</td>
                                                    <td>No<br />(2017)</td>
                                                    <td>Yes <br />(2018)</td>
                                                </tr>
                                                <tr>
                                                    <td>12</td>
                                                    <td>12. Existence of a communication mechanism to provide public information related to TCM products and services</td>
                                                    <td>No<br />(2017)<br />No separate entity as such but TM practitioner provides public information on TCM products and services simlutaenously while dispensing and delivering ORC</td>
                                                    <td>Yes <br />(2017)<br />Director General of DTM/ Chair Person of Central Traditional Drug SDirector General of DTM/ Chair Person of Central Traditional Drug Supervising Board</td>
                                                    <td>No<br />(2017)</td>
                                                    <td>Yes <br />(2018)</td>
                                                </tr>
                                                <tr>
                                                    <td>15</td>
                                                    <td>15. Existence and continuing development of a mechanism and database to protect traditional knowledge and associated genetic resources</td>
                                                    <td>Yes  <br />(2017) <br />Division of Local Healing and Spiritual Health under DTMS</td>
                                                    <td>Partly <br />(2017) <br />We are learning about Sui generic system and also planning to implement some program in the Thailand Myanmar bilateral collaboration.                     In the Mekong meetings among member countries, we are also discussing about Nagoya protocol for ABS and TK and  related to GR. </td>
                                                    <td>Yes  <br />(2017) <br />(Bandaranaike Memorial Ayurvedic Research Institute (BMARI), the programme still under development)</td>
                                                    <td>Yes <br />(2018)</td>
                                                </tr>
                                                <tr>
                                                    <td>16</td>
                                                    <td>16. Existence of conservation and cultivation program to protect biodiversity and endangered species of medicinal plants and non-plants</td>
                                                    <td>Yes <br />(2017)<br />Division of Pharmacology and Research under DTMS</td>
                                                    <td>Partly<br />(2017)<br />Nine Herbal Gardens in different States and Regions</td>
                                                    <td>Yes <br />(2017)<br />(nation wide medicinal plants gardens managed by the Department of Ayurveda)</td>
                                                    <td>Yes <br />(2018)</td>
                                                </tr>
                                                <tr>
                                                    <td>28/29</td>
                                                    <td>28. Number of monographs for herbal raw materials/29. Number of TCM products with a pharmacopoeia or monograph</td>
                                                    <td>Yes <br />(2017)<br />Vol.1 Monograph on herbal raw materials;Vol.2 Monograph of TM products (MSPCL)</td>
                                                    <td>4</td>
                                                    <td>1193<br />(2017)<br />(The pharmacopoeias available for Ayurveda, Siddha & Unani separately, not revised recently, lacks information on physical, chemical & analytical properties of drugs. Ayurveda - 773 drugs, Siddha - 133 & Unani - 287 drugs)</td>
                                                    <td>82</td>
                                                </tr>
                                                <tr>
                                                    <td>30</td>
                                                    <td>30. Existence of a reference laboratory for testing of TCM products</td>
                                                    <td>Yes <br />(2017)<br />National Drug Testing Laboratory under RCDC</td>
                                                    <td>Yes <br />(2017)<br />We have QC laboratory including Botany secion, Chemistry section and Microbiology secction, and related instruments and equipmens such as AAS, TLC, HPLC, UV-VIS spectrophotometer, GCMS etc.With funding supported by Nippon Foundation have also developed 2 volumes of Myanmar Herbal Pharmacopoeia (MHP) for standards of Myanmar Medicinal Plants.  So far, our lab is not accredated ISO 17025. We are learning to apply ISO 17025. The problem is skilled constraint of technicians and funding</td>
                                                    <td>Yes <br />(2017)<br />Bandaranaike Memorial Ayurvedic Research Institute (BMARI), not fully functional</td>
                                                    <td>NA</td>
                                                </tr>
                                                <tr>
                                                    <td>32</td>
                                                    <td>32. Number of reported TCM-related adverse events for TCM products</td>
                                                    <td>Yes <br />(2017)<br />Traditional Medicine Pharmacovigilance Centre</td>
                                                    <td>Partly<br />(2017)</td>
                                                    <td>NA</td>
                                                    <td>NA</td>
                                                </tr>
                                                <tr>
                                                    <td>33</td>
                                                    <td>33. Number of reported TCM-related adverse events for TCM practice</td>
                                                    <td>Yes <br />(2017)<br />Drug Regulatory Authority of Bhutan(DRA)</td>
                                                    <td>Partly<br />(2017)</td>
                                                    <td>NA</td>
                                                    <td>NA</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
