import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";

import React, { useLayoutEffect } from "react";

import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import SideList from "../../sidelist/sidelist.js";
import "./xy-chart.css"
am4core.useTheme(am4themes_animated);

export default function XYchart(props) {
  const types = [
    { name: "Location", value: "location" },
    { name: "Period", value: "period" },
  ];

  const charttypes = [
    { name: "Horizontal", value: "horizontal" },
    { name: "Vertical", value: "vertical" },
  ];

  const stacktypes = [
    { name: "Stacked", value: "stacked" },
    { name: "Non-stacked", value: "nstacked" },
  ];

  // const indicators = [
  //   "Anaemia follow-up",
  //   "ANC 2nd visit",
  //   "ANC 1st visit",
  //   "Anaemia new",
  //   "Accute Flaccid Paralysis (Deaths < 5 yrs)",
  //   "Acute Flaccid Paralysis (AFP) referrals",
  //   "Acute Flaccid Paralysis (AFP) new",
  //   "Acute Flaccid Paralysis (AFP) follow-up",
  // ];

  const selectedLocations = [
    { id: "eIQbndfxQMb", name: "Tonkolili" },
    { id: "fdc6uOvgoji", name: "Bombali" },
    { id: "bL4ooGhyHRQ", name: "Pujehun" },
    { id: "kJq2mPyFEHo", name: "Kenema" },
    { id: "O6uvpzGd5pu", name: "Bo" },
    { id: "jUb8gELQApl", name: "Kailahun" },
    { id: "ImspTQPwCqd", name: "Sierra Leone" },
    { id: "Vth0fbpFcsO", name: "Kono" },
  ];

  const selectedPeriods = [
    { id: "2020Q1", name: "Jan - Mar 2020" },
    { id: "202005", name: "May 2020" },
    { id: "202004", name: "April 2020" },
    { id: "202003", name: "March 2020" },
    { id: "202002", name: "February 2020" },
    { id: "202001", name: "January 2020" },
    { id: "2020", name: "2020" },
    { id: "2020S1", name: "Jan- Jun 2020" },
  ];
  const periodsMap = {};
  selectedPeriods.forEach((x) => {
    periodsMap[x.id] = x.name;
  });

  const [selectedType, setSelectedType] = React.useState("location");
  const [selectedChartType, setSelectedChartType] = React.useState("vertical");
  const [selectedStackType, setSelectedStackType] = React.useState("stacked");
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
  // const data = props.data;
  const data = [
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "2020Q1",
      location_id: "eIQbndfxQMb",
      location: "Tonkolili",
      value: "135.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "2020Q1",
      location_id: "fdc6uOvgoji",
      location: "Bombali",
      value: "3776.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "202005",
      location_id: "bL4ooGhyHRQ",
      location: "Pujehun",
      value: "992.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "2020S1",
      location_id: "eIQbndfxQMb",
      location: "Tonkolili",
      value: "2510.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "2020Q1",
      location_id: "bL4ooGhyHRQ",
      location: "Pujehun",
      value: "2637.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "2020S1",
      location_id: "kJq2mPyFEHo",
      location: "Kenema",
      value: "15250.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "2020Q1",
      location_id: "O6uvpzGd5pu",
      location: "Bo",
      value: "7496.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "202003",
      location_id: "jUb8gELQApl",
      location: "Kailahun",
      value: "128.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "202001",
      location_id: "ImspTQPwCqd",
      location: "Sierra Leone",
      value: "732.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "202004",
      location_id: "jUb8gELQApl",
      location: "Kailahun",
      value: "256.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "2020",
      location_id: "jUb8gELQApl",
      location: "Kailahun",
      value: "3213.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "202005",
      location_id: "jUb8gELQApl",
      location: "Kailahun",
      value: "403.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "202003",
      location_id: "eIQbndfxQMb",
      location: "Tonkolili",
      value: "50.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "202001",
      location_id: "bL4ooGhyHRQ",
      location: "Pujehun",
      value: "1000.0",
    },
    {
      indicator_id: "FTRrcoaog83",
      indicator: "Accute Flaccid Paralysis (Deaths < 5 yrs)",
      period: "2020",
      location_id: "fdc6uOvgoji",
      location: "Bombali",
      value: "57.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "202002",
      location_id: "eIQbndfxQMb",
      location: "Tonkolili",
      value: "45.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "202004",
      location_id: "ImspTQPwCqd",
      location: "Sierra Leone",
      value: "675.0",
    },
    {
      indicator_id: "M62VHgYT2n0",
      indicator: "Acute Flaccid Paralysis (AFP) referrals",
      period: "2020",
      location_id: "O6uvpzGd5pu",
      location: "Bo",
      value: "1.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "202002",
      location_id: "bL4ooGhyHRQ",
      location: "Pujehun",
      value: "865.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "202004",
      location_id: "bL4ooGhyHRQ",
      location: "Pujehun",
      value: "982.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "2020",
      location_id: "fdc6uOvgoji",
      location: "Bombali",
      value: "14646.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "2020Q1",
      location_id: "jUb8gELQApl",
      location: "Kailahun",
      value: "428.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "202003",
      location_id: "ImspTQPwCqd",
      location: "Sierra Leone",
      value: "737.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "202002",
      location_id: "ImspTQPwCqd",
      location: "Sierra Leone",
      value: "867.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "202001",
      location_id: "eIQbndfxQMb",
      location: "Tonkolili",
      value: "40.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "202001",
      location_id: "O6uvpzGd5pu",
      location: "Bo",
      value: "236.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "202003",
      location_id: "bL4ooGhyHRQ",
      location: "Pujehun",
      value: "772.0",
    },
    {
      indicator_id: "FQ2o8UBlcrS",
      indicator: "Acute Flaccid Paralysis (AFP) new",
      period: "202005",
      location_id: "eIQbndfxQMb",
      location: "Tonkolili",
      value: "1.0",
    },
    {
      indicator_id: "FTRrcoaog83",
      indicator: "Accute Flaccid Paralysis (Deaths < 5 yrs)",
      period: "2020Q1",
      location_id: "fdc6uOvgoji",
      location: "Bombali",
      value: "57.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "202002",
      location_id: "O6uvpzGd5pu",
      location: "Bo",
      value: "137.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "202001",
      location_id: "O6uvpzGd5pu",
      location: "Bo",
      value: "2533.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "2020S1",
      location_id: "fdc6uOvgoji",
      location: "Bombali",
      value: "364.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "202003",
      location_id: "O6uvpzGd5pu",
      location: "Bo",
      value: "219.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "202004",
      location_id: "O6uvpzGd5pu",
      location: "Bo",
      value: "244.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "2020S1",
      location_id: "ImspTQPwCqd",
      location: "Sierra Leone",
      value: "23371.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "202005",
      location_id: "eIQbndfxQMb",
      location: "Tonkolili",
      value: "105.0",
    },
    {
      indicator_id: "FQ2o8UBlcrS",
      indicator: "Acute Flaccid Paralysis (AFP) new",
      period: "2020",
      location_id: "bL4ooGhyHRQ",
      location: "Pujehun",
      value: "1.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "202005",
      location_id: "O6uvpzGd5pu",
      location: "Bo",
      value: "320.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "2020S1",
      location_id: "ImspTQPwCqd",
      location: "Sierra Leone",
      value: "132609.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "2020S1",
      location_id: "bL4ooGhyHRQ",
      location: "Pujehun",
      value: "211.0",
    },
    {
      indicator_id: "FTRrcoaog83",
      indicator: "Accute Flaccid Paralysis (Deaths < 5 yrs)",
      period: "202002",
      location_id: "fdc6uOvgoji",
      location: "Bombali",
      value: "57.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "202005",
      location_id: "O6uvpzGd5pu",
      location: "Bo",
      value: "3076.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "2020S1",
      location_id: "Vth0fbpFcsO",
      location: "Kono",
      value: "5660.0",
    },
    {
      indicator_id: "FQ2o8UBlcrS",
      indicator: "Acute Flaccid Paralysis (AFP) new",
      period: "202001",
      location_id: "eIQbndfxQMb",
      location: "Tonkolili",
      value: "1.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "2020",
      location_id: "bL4ooGhyHRQ",
      location: "Pujehun",
      value: "8999.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "2020Q1",
      location_id: "jUb8gELQApl",
      location: "Kailahun",
      value: "3582.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "202003",
      location_id: "O6uvpzGd5pu",
      location: "Bo",
      value: "2482.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "202004",
      location_id: "O6uvpzGd5pu",
      location: "Bo",
      value: "2575.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "202002",
      location_id: "O6uvpzGd5pu",
      location: "Bo",
      value: "2481.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "202001",
      location_id: "eIQbndfxQMb",
      location: "Tonkolili",
      value: "1106.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "2020",
      location_id: "fdc6uOvgoji",
      location: "Bombali",
      value: "17031.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "2020",
      location_id: "ImspTQPwCqd",
      location: "Sierra Leone",
      value: "53693.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "202002",
      location_id: "eIQbndfxQMb",
      location: "Tonkolili",
      value: "1237.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "202005",
      location_id: "eIQbndfxQMb",
      location: "Tonkolili",
      value: "1697.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "202003",
      location_id: "eIQbndfxQMb",
      location: "Tonkolili",
      value: "1246.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "202004",
      location_id: "eIQbndfxQMb",
      location: "Tonkolili",
      value: "1413.0",
    },
    {
      indicator_id: "M62VHgYT2n0",
      indicator: "Acute Flaccid Paralysis (AFP) referrals",
      period: "2020S1",
      location_id: "O6uvpzGd5pu",
      location: "Bo",
      value: "1.0",
    },
    {
      indicator_id: "P3jJH5Tu5VC",
      indicator: "Acute Flaccid Paralysis (AFP) follow-up",
      period: "2020Q1",
      location_id: "O6uvpzGd5pu",
      location: "Bo",
      value: "12.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "2020Q1",
      location_id: "eIQbndfxQMb",
      location: "Tonkolili",
      value: "3589.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "2020S1",
      location_id: "Vth0fbpFcsO",
      location: "Kono",
      value: "101.0",
    },
    {
      indicator_id: "FQ2o8UBlcrS",
      indicator: "Acute Flaccid Paralysis (AFP) new",
      period: "2020",
      location_id: "fdc6uOvgoji",
      location: "Bombali",
      value: "1.0",
    },
    {
      indicator_id: "P3jJH5Tu5VC",
      indicator: "Acute Flaccid Paralysis (AFP) follow-up",
      period: "2020S1",
      location_id: "O6uvpzGd5pu",
      location: "Bo",
      value: "12.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "202002",
      location_id: "jUb8gELQApl",
      location: "Kailahun",
      value: "117.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "202001",
      location_id: "jUb8gELQApl",
      location: "Kailahun",
      value: "183.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "2020S1",
      location_id: "bL4ooGhyHRQ",
      location: "Pujehun",
      value: "820.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "2020Q1",
      location_id: "eIQbndfxQMb",
      location: "Tonkolili",
      value: "789.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "2020",
      location_id: "jUb8gELQApl",
      location: "Kailahun",
      value: "604.0",
    },
    {
      indicator_id: "P3jJH5Tu5VC",
      indicator: "Acute Flaccid Paralysis (AFP) follow-up",
      period: "202001",
      location_id: "O6uvpzGd5pu",
      location: "Bo",
      value: "12.0",
    },
    {
      indicator_id: "FQ2o8UBlcrS",
      indicator: "Acute Flaccid Paralysis (AFP) new",
      period: "2020S1",
      location_id: "Vth0fbpFcsO",
      location: "Kono",
      value: "2.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "2020Q1",
      location_id: "jUb8gELQApl",
      location: "Kailahun",
      value: "96.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "202004",
      location_id: "Vth0fbpFcsO",
      location: "Kono",
      value: "1013.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "2020Q1",
      location_id: "kJq2mPyFEHo",
      location: "Kenema",
      value: "5507.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "2020Q1",
      location_id: "Vth0fbpFcsO",
      location: "Kono",
      value: "2921.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "2020S1",
      location_id: "jUb8gELQApl",
      location: "Kailahun",
      value: "1334.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "202004",
      location_id: "kJq2mPyFEHo",
      location: "Kenema",
      value: "2294.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "2020S1",
      location_id: "eIQbndfxQMb",
      location: "Tonkolili",
      value: "288.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "202005",
      location_id: "ImspTQPwCqd",
      location: "Sierra Leone",
      value: "23726.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "2020Q1",
      location_id: "ImspTQPwCqd",
      location: "Sierra Leone",
      value: "57458.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "202001",
      location_id: "eIQbndfxQMb",
      location: "Tonkolili",
      value: "268.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "202004",
      location_id: "kJq2mPyFEHo",
      location: "Kenema",
      value: "2074.0",
    },
    {
      indicator_id: "M62VHgYT2n0",
      indicator: "Acute Flaccid Paralysis (AFP) referrals",
      period: "202003",
      location_id: "eIQbndfxQMb",
      location: "Tonkolili",
      value: "2.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "202005",
      location_id: "fdc6uOvgoji",
      location: "Bombali",
      value: "64.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "202001",
      location_id: "fdc6uOvgoji",
      location: "Bombali",
      value: "51.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "202002",
      location_id: "kJq2mPyFEHo",
      location: "Kenema",
      value: "2282.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "2020S1",
      location_id: "bL4ooGhyHRQ",
      location: "Pujehun",
      value: "5796.0",
    },
    {
      indicator_id: "M62VHgYT2n0",
      indicator: "Acute Flaccid Paralysis (AFP) referrals",
      period: "202002",
      location_id: "ImspTQPwCqd",
      location: "Sierra Leone",
      value: "2.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "202002",
      location_id: "kJq2mPyFEHo",
      location: "Kenema",
      value: "1773.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "202001",
      location_id: "ImspTQPwCqd",
      location: "Sierra Leone",
      value: "2998.0",
    },
    {
      indicator_id: "FQ2o8UBlcrS",
      indicator: "Acute Flaccid Paralysis (AFP) new",
      period: "2020",
      location_id: "eIQbndfxQMb",
      location: "Tonkolili",
      value: "4.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "202003",
      location_id: "O6uvpzGd5pu",
      location: "Bo",
      value: "45.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "202003",
      location_id: "fdc6uOvgoji",
      location: "Bombali",
      value: "26.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "202004",
      location_id: "ImspTQPwCqd",
      location: "Sierra Leone",
      value: "21877.0",
    },
    {
      indicator_id: "FTRrcoaog83",
      indicator: "Accute Flaccid Paralysis (Deaths < 5 yrs)",
      period: "2020S1",
      location_id: "fdc6uOvgoji",
      location: "Bombali",
      value: "57.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "202004",
      location_id: "bL4ooGhyHRQ",
      location: "Pujehun",
      value: "9.0",
    },
    {
      indicator_id: "FQ2o8UBlcrS",
      indicator: "Acute Flaccid Paralysis (AFP) new",
      period: "2020S1",
      location_id: "bL4ooGhyHRQ",
      location: "Pujehun",
      value: "1.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "202005",
      location_id: "ImspTQPwCqd",
      location: "Sierra Leone",
      value: "5666.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "202002",
      location_id: "bL4ooGhyHRQ",
      location: "Pujehun",
      value: "34.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "2020",
      location_id: "eIQbndfxQMb",
      location: "Tonkolili",
      value: "18047.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "202001",
      location_id: "O6uvpzGd5pu",
      location: "Bo",
      value: "23.0",
    },
    {
      indicator_id: "P3jJH5Tu5VC",
      indicator: "Acute Flaccid Paralysis (AFP) follow-up",
      period: "2020",
      location_id: "eIQbndfxQMb",
      location: "Tonkolili",
      value: "1.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "202003",
      location_id: "ImspTQPwCqd",
      location: "Sierra Leone",
      value: "3025.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "2020S1",
      location_id: "jUb8gELQApl",
      location: "Kailahun",
      value: "8051.0",
    },
    {
      indicator_id: "M62VHgYT2n0",
      indicator: "Acute Flaccid Paralysis (AFP) referrals",
      period: "2020Q1",
      location_id: "ImspTQPwCqd",
      location: "Sierra Leone",
      value: "6.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "2020S1",
      location_id: "kJq2mPyFEHo",
      location: "Kenema",
      value: "399.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "2020Q1",
      location_id: "Vth0fbpFcsO",
      location: "Kono",
      value: "2882.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "202004",
      location_id: "jUb8gELQApl",
      location: "Kailahun",
      value: "22.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "2020Q1",
      location_id: "kJq2mPyFEHo",
      location: "Kenema",
      value: "6868.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "202003",
      location_id: "ImspTQPwCqd",
      location: "Sierra Leone",
      value: "18418.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "2020Q1",
      location_id: "bL4ooGhyHRQ",
      location: "Pujehun",
      value: "69.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "202002",
      location_id: "Vth0fbpFcsO",
      location: "Kono",
      value: "1199.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "202002",
      location_id: "jUb8gELQApl",
      location: "Kailahun",
      value: "33.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "202002",
      location_id: "Vth0fbpFcsO",
      location: "Kono",
      value: "1272.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "202002",
      location_id: "ImspTQPwCqd",
      location: "Sierra Leone",
      value: "18862.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "202004",
      location_id: "Vth0fbpFcsO",
      location: "Kono",
      value: "963.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "202001",
      location_id: "ImspTQPwCqd",
      location: "Sierra Leone",
      value: "17347.0",
    },
    {
      indicator_id: "FQ2o8UBlcrS",
      indicator: "Acute Flaccid Paralysis (AFP) new",
      period: "202001",
      location_id: "ImspTQPwCqd",
      location: "Sierra Leone",
      value: "26.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "202005",
      location_id: "eIQbndfxQMb",
      location: "Tonkolili",
      value: "2492.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "2020Q1",
      location_id: "O6uvpzGd5pu",
      location: "Bo",
      value: "592.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "2020S1",
      location_id: "eIQbndfxQMb",
      location: "Tonkolili",
      value: "10260.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "2020Q1",
      location_id: "Vth0fbpFcsO",
      location: "Kono",
      value: "256.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "202004",
      location_id: "jUb8gELQApl",
      location: "Kailahun",
      value: "1264.0",
    },
    {
      indicator_id: "FQ2o8UBlcrS",
      indicator: "Acute Flaccid Paralysis (AFP) new",
      period: "2020Q1",
      location_id: "eIQbndfxQMb",
      location: "Tonkolili",
      value: "1.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "2020",
      location_id: "fdc6uOvgoji",
      location: "Bombali",
      value: "717.0",
    },
    {
      indicator_id: "FQ2o8UBlcrS",
      indicator: "Acute Flaccid Paralysis (AFP) new",
      period: "2020S1",
      location_id: "jUb8gELQApl",
      location: "Kailahun",
      value: "3.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "202002",
      location_id: "jUb8gELQApl",
      location: "Kailahun",
      value: "1146.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "202004",
      location_id: "Vth0fbpFcsO",
      location: "Kono",
      value: "171.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "2020Q1",
      location_id: "kJq2mPyFEHo",
      location: "Kenema",
      value: "915.0",
    },
    {
      indicator_id: "FQ2o8UBlcrS",
      indicator: "Acute Flaccid Paralysis (AFP) new",
      period: "202005",
      location_id: "bL4ooGhyHRQ",
      location: "Pujehun",
      value: "1.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "202002",
      location_id: "Vth0fbpFcsO",
      location: "Kono",
      value: "102.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "2020",
      location_id: "kJq2mPyFEHo",
      location: "Kenema",
      value: "771.0",
    },
    {
      indicator_id: "P3jJH5Tu5VC",
      indicator: "Acute Flaccid Paralysis (AFP) follow-up",
      period: "2020Q1",
      location_id: "ImspTQPwCqd",
      location: "Sierra Leone",
      value: "13.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "2020",
      location_id: "Vth0fbpFcsO",
      location: "Kono",
      value: "241.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "202002",
      location_id: "bL4ooGhyHRQ",
      location: "Pujehun",
      value: "1011.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "2020",
      location_id: "O6uvpzGd5pu",
      location: "Bo",
      value: "682.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "202002",
      location_id: "kJq2mPyFEHo",
      location: "Kenema",
      value: "235.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "202004",
      location_id: "fdc6uOvgoji",
      location: "Bombali",
      value: "202.0",
    },
    {
      indicator_id: "FTRrcoaog83",
      indicator: "Accute Flaccid Paralysis (Deaths < 5 yrs)",
      period: "202001",
      location_id: "O6uvpzGd5pu",
      location: "Bo",
      value: "23.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "2020",
      location_id: "eIQbndfxQMb",
      location: "Tonkolili",
      value: "22505.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "2020Q1",
      location_id: "ImspTQPwCqd",
      location: "Sierra Leone",
      value: "2336.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "202004",
      location_id: "kJq2mPyFEHo",
      location: "Kenema",
      value: "451.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "2020",
      location_id: "eIQbndfxQMb",
      location: "Tonkolili",
      value: "7284.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "202001",
      location_id: "eIQbndfxQMb",
      location: "Tonkolili",
      value: "1370.0",
    },
    {
      indicator_id: "FQ2o8UBlcrS",
      indicator: "Acute Flaccid Paralysis (AFP) new",
      period: "202005",
      location_id: "ImspTQPwCqd",
      location: "Sierra Leone",
      value: "8.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "202003",
      location_id: "eIQbndfxQMb",
      location: "Tonkolili",
      value: "1409.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "202004",
      location_id: "fdc6uOvgoji",
      location: "Bombali",
      value: "1207.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "2020Q1",
      location_id: "fdc6uOvgoji",
      location: "Bombali",
      value: "799.0",
    },
    {
      indicator_id: "FQ2o8UBlcrS",
      indicator: "Acute Flaccid Paralysis (AFP) new",
      period: "202003",
      location_id: "ImspTQPwCqd",
      location: "Sierra Leone",
      value: "4.0",
    },
    {
      indicator_id: "FQ2o8UBlcrS",
      indicator: "Acute Flaccid Paralysis (AFP) new",
      period: "2020S1",
      location_id: "ImspTQPwCqd",
      location: "Sierra Leone",
      value: "46.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "202002",
      location_id: "fdc6uOvgoji",
      location: "Bombali",
      value: "1256.0",
    },
    {
      indicator_id: "FTRrcoaog83",
      indicator: "Accute Flaccid Paralysis (Deaths < 5 yrs)",
      period: "202003",
      location_id: "O6uvpzGd5pu",
      location: "Bo",
      value: "1.0",
    },
    {
      indicator_id: "FTRrcoaog83",
      indicator: "Accute Flaccid Paralysis (Deaths < 5 yrs)",
      period: "2020S1",
      location_id: "O6uvpzGd5pu",
      location: "Bo",
      value: "28.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "2020S1",
      location_id: "ImspTQPwCqd",
      location: "Sierra Leone",
      value: "121541.0",
    },
    {
      indicator_id: "FTRrcoaog83",
      indicator: "Accute Flaccid Paralysis (Deaths < 5 yrs)",
      period: "2020",
      location_id: "O6uvpzGd5pu",
      location: "Bo",
      value: "418.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "2020S1",
      location_id: "Vth0fbpFcsO",
      location: "Kono",
      value: "5615.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "202004",
      location_id: "O6uvpzGd5pu",
      location: "Bo",
      value: "2522.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "202005",
      location_id: "O6uvpzGd5pu",
      location: "Bo",
      value: "3031.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "2020Q1",
      location_id: "bL4ooGhyHRQ",
      location: "Pujehun",
      value: "3260.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "2020S1",
      location_id: "jUb8gELQApl",
      location: "Kailahun",
      value: "185.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "2020S1",
      location_id: "kJq2mPyFEHo",
      location: "Kenema",
      value: "12660.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "2020Q1",
      location_id: "O6uvpzGd5pu",
      location: "Bo",
      value: "7351.0",
    },
    {
      indicator_id: "M62VHgYT2n0",
      indicator: "Acute Flaccid Paralysis (AFP) referrals",
      period: "2020S1",
      location_id: "eIQbndfxQMb",
      location: "Tonkolili",
      value: "3.0",
    },
    {
      indicator_id: "P3jJH5Tu5VC",
      indicator: "Acute Flaccid Paralysis (AFP) follow-up",
      period: "202004",
      location_id: "ImspTQPwCqd",
      location: "Sierra Leone",
      value: "1.0",
    },
    {
      indicator_id: "P3jJH5Tu5VC",
      indicator: "Acute Flaccid Paralysis (AFP) follow-up",
      period: "202005",
      location_id: "ImspTQPwCqd",
      location: "Sierra Leone",
      value: "8.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "202002",
      location_id: "fdc6uOvgoji",
      location: "Bombali",
      value: "219.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "202005",
      location_id: "bL4ooGhyHRQ",
      location: "Pujehun",
      value: "1363.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "202003",
      location_id: "fdc6uOvgoji",
      location: "Bombali",
      value: "265.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "2020",
      location_id: "O6uvpzGd5pu",
      location: "Bo",
      value: "32412.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "202003",
      location_id: "bL4ooGhyHRQ",
      location: "Pujehun",
      value: "1005.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "202004",
      location_id: "bL4ooGhyHRQ",
      location: "Pujehun",
      value: "1306.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "202001",
      location_id: "fdc6uOvgoji",
      location: "Bombali",
      value: "315.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "202003",
      location_id: "kJq2mPyFEHo",
      location: "Kenema",
      value: "89.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "202002",
      location_id: "Vth0fbpFcsO",
      location: "Kono",
      value: "25.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "202003",
      location_id: "Vth0fbpFcsO",
      location: "Kono",
      value: "14.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "202001",
      location_id: "Vth0fbpFcsO",
      location: "Kono",
      value: "8.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "202005",
      location_id: "kJq2mPyFEHo",
      location: "Kenema",
      value: "83.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "202001",
      location_id: "kJq2mPyFEHo",
      location: "Kenema",
      value: "62.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "202004",
      location_id: "kJq2mPyFEHo",
      location: "Kenema",
      value: "87.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "2020",
      location_id: "jUb8gELQApl",
      location: "Kailahun",
      value: "15730.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "202001",
      location_id: "O6uvpzGd5pu",
      location: "Bo",
      value: "2234.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "2020",
      location_id: "Vth0fbpFcsO",
      location: "Kono",
      value: "1520.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "2020Q1",
      location_id: "jUb8gELQApl",
      location: "Kailahun",
      value: "3518.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "202003",
      location_id: "O6uvpzGd5pu",
      location: "Bo",
      value: "2524.0",
    },
    {
      indicator_id: "FQ2o8UBlcrS",
      indicator: "Acute Flaccid Paralysis (AFP) new",
      period: "2020",
      location_id: "jUb8gELQApl",
      location: "Kailahun",
      value: "5.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "202002",
      location_id: "kJq2mPyFEHo",
      location: "Kenema",
      value: "34.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "202002",
      location_id: "O6uvpzGd5pu",
      location: "Bo",
      value: "2593.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "202001",
      location_id: "jUb8gELQApl",
      location: "Kailahun",
      value: "1228.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "202002",
      location_id: "jUb8gELQApl",
      location: "Kailahun",
      value: "1136.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "2020",
      location_id: "kJq2mPyFEHo",
      location: "Kenema",
      value: "5142.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "202005",
      location_id: "jUb8gELQApl",
      location: "Kailahun",
      value: "1571.0",
    },
    {
      indicator_id: "M62VHgYT2n0",
      indicator: "Acute Flaccid Paralysis (AFP) referrals",
      period: "2020Q1",
      location_id: "O6uvpzGd5pu",
      location: "Bo",
      value: "1.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "2020Q1",
      location_id: "bL4ooGhyHRQ",
      location: "Pujehun",
      value: "259.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "202003",
      location_id: "jUb8gELQApl",
      location: "Kailahun",
      value: "1154.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "2020Q1",
      location_id: "kJq2mPyFEHo",
      location: "Kenema",
      value: "185.0",
    },
    {
      indicator_id: "FQ2o8UBlcrS",
      indicator: "Acute Flaccid Paralysis (AFP) new",
      period: "202001",
      location_id: "O6uvpzGd5pu",
      location: "Bo",
      value: "23.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "202004",
      location_id: "jUb8gELQApl",
      location: "Kailahun",
      value: "1420.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "2020",
      location_id: "O6uvpzGd5pu",
      location: "Bo",
      value: "33398.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "2020S1",
      location_id: "O6uvpzGd5pu",
      location: "Bo",
      value: "328.0",
    },
    {
      indicator_id: "M62VHgYT2n0",
      indicator: "Acute Flaccid Paralysis (AFP) referrals",
      period: "2020",
      location_id: "eIQbndfxQMb",
      location: "Tonkolili",
      value: "4.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "2020Q1",
      location_id: "O6uvpzGd5pu",
      location: "Bo",
      value: "100.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "2020Q1",
      location_id: "Vth0fbpFcsO",
      location: "Kono",
      value: "47.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "202005",
      location_id: "Vth0fbpFcsO",
      location: "Kono",
      value: "19.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "2020",
      location_id: "ImspTQPwCqd",
      location: "Sierra Leone",
      value: "10769.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "202004",
      location_id: "Vth0fbpFcsO",
      location: "Kono",
      value: "13.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "2020",
      location_id: "Vth0fbpFcsO",
      location: "Kono",
      value: "9254.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "2020",
      location_id: "eIQbndfxQMb",
      location: "Tonkolili",
      value: "1085.0",
    },
    {
      indicator_id: "M62VHgYT2n0",
      indicator: "Acute Flaccid Paralysis (AFP) referrals",
      period: "202001",
      location_id: "O6uvpzGd5pu",
      location: "Bo",
      value: "1.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "202004",
      location_id: "O6uvpzGd5pu",
      location: "Bo",
      value: "85.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "202005",
      location_id: "O6uvpzGd5pu",
      location: "Bo",
      value: "64.0",
    },
    {
      indicator_id: "FQ2o8UBlcrS",
      indicator: "Acute Flaccid Paralysis (AFP) new",
      period: "2020S1",
      location_id: "O6uvpzGd5pu",
      location: "Bo",
      value: "23.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "202005",
      location_id: "fdc6uOvgoji",
      location: "Bombali",
      value: "2122.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "2020",
      location_id: "bL4ooGhyHRQ",
      location: "Pujehun",
      value: "445.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "202001",
      location_id: "bL4ooGhyHRQ",
      location: "Pujehun",
      value: "87.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "202003",
      location_id: "bL4ooGhyHRQ",
      location: "Pujehun",
      value: "72.0",
    },
    {
      indicator_id: "FTRrcoaog83",
      indicator: "Accute Flaccid Paralysis (Deaths < 5 yrs)",
      period: "2020S1",
      location_id: "ImspTQPwCqd",
      location: "Sierra Leone",
      value: "85.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "202004",
      location_id: "fdc6uOvgoji",
      location: "Bombali",
      value: "1566.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "202004",
      location_id: "bL4ooGhyHRQ",
      location: "Pujehun",
      value: "119.0",
    },
    {
      indicator_id: "FQ2o8UBlcrS",
      indicator: "Acute Flaccid Paralysis (AFP) new",
      period: "2020Q1",
      location_id: "O6uvpzGd5pu",
      location: "Bo",
      value: "23.0",
    },
    {
      indicator_id: "FTRrcoaog83",
      indicator: "Accute Flaccid Paralysis (Deaths < 5 yrs)",
      period: "2020Q1",
      location_id: "ImspTQPwCqd",
      location: "Sierra Leone",
      value: "85.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "202005",
      location_id: "bL4ooGhyHRQ",
      location: "Pujehun",
      value: "268.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "2020S1",
      location_id: "eIQbndfxQMb",
      location: "Tonkolili",
      value: "8301.0",
    },
    {
      indicator_id: "P3jJH5Tu5VC",
      indicator: "Acute Flaccid Paralysis (AFP) follow-up",
      period: "2020",
      location_id: "ImspTQPwCqd",
      location: "Sierra Leone",
      value: "25.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "2020Q1",
      location_id: "fdc6uOvgoji",
      location: "Bombali",
      value: "4290.0",
    },
    {
      indicator_id: "FTRrcoaog83",
      indicator: "Accute Flaccid Paralysis (Deaths < 5 yrs)",
      period: "202002",
      location_id: "ImspTQPwCqd",
      location: "Sierra Leone",
      value: "61.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "202003",
      location_id: "eIQbndfxQMb",
      location: "Tonkolili",
      value: "280.0",
    },
    {
      indicator_id: "FQ2o8UBlcrS",
      indicator: "Acute Flaccid Paralysis (AFP) new",
      period: "202002",
      location_id: "Vth0fbpFcsO",
      location: "Kono",
      value: "2.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "202004",
      location_id: "eIQbndfxQMb",
      location: "Tonkolili",
      value: "404.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "202005",
      location_id: "eIQbndfxQMb",
      location: "Tonkolili",
      value: "643.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "2020S1",
      location_id: "fdc6uOvgoji",
      location: "Bombali",
      value: "9696.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "2020",
      location_id: "kJq2mPyFEHo",
      location: "Kenema",
      value: "24347.0",
    },
    {
      indicator_id: "FTRrcoaog83",
      indicator: "Accute Flaccid Paralysis (Deaths < 5 yrs)",
      period: "202001",
      location_id: "ImspTQPwCqd",
      location: "Sierra Leone",
      value: "23.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "202002",
      location_id: "fdc6uOvgoji",
      location: "Bombali",
      value: "1387.0",
    },
    {
      indicator_id: "FQ2o8UBlcrS",
      indicator: "Acute Flaccid Paralysis (AFP) new",
      period: "2020Q1",
      location_id: "Vth0fbpFcsO",
      location: "Kono",
      value: "2.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "202003",
      location_id: "fdc6uOvgoji",
      location: "Bombali",
      value: "1380.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "202001",
      location_id: "fdc6uOvgoji",
      location: "Bombali",
      value: "1523.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "2020",
      location_id: "fdc6uOvgoji",
      location: "Bombali",
      value: "3836.0",
    },
    {
      indicator_id: "FTRrcoaog83",
      indicator: "Accute Flaccid Paralysis (Deaths < 5 yrs)",
      period: "202003",
      location_id: "ImspTQPwCqd",
      location: "Sierra Leone",
      value: "1.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "202002",
      location_id: "bL4ooGhyHRQ",
      location: "Pujehun",
      value: "100.0",
    },
    {
      indicator_id: "M62VHgYT2n0",
      indicator: "Acute Flaccid Paralysis (AFP) referrals",
      period: "2020Q1",
      location_id: "eIQbndfxQMb",
      location: "Tonkolili",
      value: "3.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "2020Q1",
      location_id: "ImspTQPwCqd",
      location: "Sierra Leone",
      value: "54343.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "202003",
      location_id: "kJq2mPyFEHo",
      location: "Kenema",
      value: "2282.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "202005",
      location_id: "Vth0fbpFcsO",
      location: "Kono",
      value: "815.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "2020S1",
      location_id: "O6uvpzGd5pu",
      location: "Bo",
      value: "16513.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "2020S1",
      location_id: "O6uvpzGd5pu",
      location: "Bo",
      value: "15895.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "2020S1",
      location_id: "fdc6uOvgoji",
      location: "Bombali",
      value: "8174.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "202005",
      location_id: "kJq2mPyFEHo",
      location: "Kenema",
      value: "3164.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "2020",
      location_id: "ImspTQPwCqd",
      location: "Sierra Leone",
      value: "233360.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "202002",
      location_id: "eIQbndfxQMb",
      location: "Tonkolili",
      value: "241.0",
    },
    {
      indicator_id: "M62VHgYT2n0",
      indicator: "Acute Flaccid Paralysis (AFP) referrals",
      period: "202002",
      location_id: "eIQbndfxQMb",
      location: "Tonkolili",
      value: "1.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "202004",
      location_id: "fdc6uOvgoji",
      location: "Bombali",
      value: "56.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "202002",
      location_id: "fdc6uOvgoji",
      location: "Bombali",
      value: "61.0",
    },
    {
      indicator_id: "FTRrcoaog83",
      indicator: "Accute Flaccid Paralysis (Deaths < 5 yrs)",
      period: "2020",
      location_id: "ImspTQPwCqd",
      location: "Sierra Leone",
      value: "475.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "202002",
      location_id: "ImspTQPwCqd",
      location: "Sierra Leone",
      value: "2790.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "2020S1",
      location_id: "bL4ooGhyHRQ",
      location: "Pujehun",
      value: "7277.0",
    },
    {
      indicator_id: "M62VHgYT2n0",
      indicator: "Acute Flaccid Paralysis (AFP) referrals",
      period: "202001",
      location_id: "ImspTQPwCqd",
      location: "Sierra Leone",
      value: "1.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "202003",
      location_id: "kJq2mPyFEHo",
      location: "Kenema",
      value: "1778.0",
    },
    {
      indicator_id: "M62VHgYT2n0",
      indicator: "Acute Flaccid Paralysis (AFP) referrals",
      period: "202003",
      location_id: "ImspTQPwCqd",
      location: "Sierra Leone",
      value: "3.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "202001",
      location_id: "kJq2mPyFEHo",
      location: "Kenema",
      value: "1956.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "202001",
      location_id: "kJq2mPyFEHo",
      location: "Kenema",
      value: "2304.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "202005",
      location_id: "bL4ooGhyHRQ",
      location: "Pujehun",
      value: "90.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "202003",
      location_id: "ImspTQPwCqd",
      location: "Sierra Leone",
      value: "18576.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "202005",
      location_id: "ImspTQPwCqd",
      location: "Sierra Leone",
      value: "29461.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "2020",
      location_id: "Vth0fbpFcsO",
      location: "Kono",
      value: "9148.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "202003",
      location_id: "bL4ooGhyHRQ",
      location: "Pujehun",
      value: "8.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "202002",
      location_id: "O6uvpzGd5pu",
      location: "Bo",
      value: "32.0",
    },
    {
      indicator_id: "FQ2o8UBlcrS",
      indicator: "Acute Flaccid Paralysis (AFP) new",
      period: "2020",
      location_id: "ImspTQPwCqd",
      location: "Sierra Leone",
      value: "57.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "202001",
      location_id: "bL4ooGhyHRQ",
      location: "Pujehun",
      value: "27.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "202001",
      location_id: "Vth0fbpFcsO",
      location: "Kono",
      value: "741.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "202005",
      location_id: "Vth0fbpFcsO",
      location: "Kono",
      value: "241.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "202004",
      location_id: "ImspTQPwCqd",
      location: "Sierra Leone",
      value: "3639.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "202005",
      location_id: "kJq2mPyFEHo",
      location: "Kenema",
      value: "3013.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "2020Q1",
      location_id: "fdc6uOvgoji",
      location: "Bombali",
      value: "138.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "202005",
      location_id: "jUb8gELQApl",
      location: "Kailahun",
      value: "33.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "202005",
      location_id: "Vth0fbpFcsO",
      location: "Kono",
      value: "818.0",
    },
    {
      indicator_id: "FQ2o8UBlcrS",
      indicator: "Acute Flaccid Paralysis (AFP) new",
      period: "2020S1",
      location_id: "eIQbndfxQMb",
      location: "Tonkolili",
      value: "2.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "202004",
      location_id: "ImspTQPwCqd",
      location: "Sierra Leone",
      value: "19574.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "202002",
      location_id: "ImspTQPwCqd",
      location: "Sierra Leone",
      value: "18578.0",
    },
    {
      indicator_id: "M62VHgYT2n0",
      indicator: "Acute Flaccid Paralysis (AFP) referrals",
      period: "2020",
      location_id: "jUb8gELQApl",
      location: "Kailahun",
      value: "1.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "2020Q1",
      location_id: "ImspTQPwCqd",
      location: "Sierra Leone",
      value: "8813.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "202001",
      location_id: "Vth0fbpFcsO",
      location: "Kono",
      value: "482.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "202003",
      location_id: "jUb8gELQApl",
      location: "Kailahun",
      value: "17.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "202001",
      location_id: "ImspTQPwCqd",
      location: "Sierra Leone",
      value: "20020.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "2020",
      location_id: "kJq2mPyFEHo",
      location: "Kenema",
      value: "29478.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "202003",
      location_id: "Vth0fbpFcsO",
      location: "Kono",
      value: "981.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "2020",
      location_id: "O6uvpzGd5pu",
      location: "Bo",
      value: "3815.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "202003",
      location_id: "Vth0fbpFcsO",
      location: "Kono",
      value: "1128.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "202001",
      location_id: "jUb8gELQApl",
      location: "Kailahun",
      value: "46.0",
    },
    {
      indicator_id: "FQ2o8UBlcrS",
      indicator: "Acute Flaccid Paralysis (AFP) new",
      period: "202002",
      location_id: "ImspTQPwCqd",
      location: "Sierra Leone",
      value: "4.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "2020Q1",
      location_id: "eIQbndfxQMb",
      location: "Tonkolili",
      value: "4220.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "2020",
      location_id: "ImspTQPwCqd",
      location: "Sierra Leone",
      value: "252510.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "202005",
      location_id: "jUb8gELQApl",
      location: "Kailahun",
      value: "1501.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "2020S1",
      location_id: "jUb8gELQApl",
      location: "Kailahun",
      value: "7712.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "2020S1",
      location_id: "Vth0fbpFcsO",
      location: "Kono",
      value: "839.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "2020S1",
      location_id: "kJq2mPyFEHo",
      location: "Kenema",
      value: "2401.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "2020S1",
      location_id: "O6uvpzGd5pu",
      location: "Bo",
      value: "1549.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "202004",
      location_id: "eIQbndfxQMb",
      location: "Tonkolili",
      value: "1465.0",
    },
    {
      indicator_id: "FQ2o8UBlcrS",
      indicator: "Acute Flaccid Paralysis (AFP) new",
      period: "2020",
      location_id: "Vth0fbpFcsO",
      location: "Kono",
      value: "2.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "202001",
      location_id: "jUb8gELQApl",
      location: "Kailahun",
      value: "1219.0",
    },
    {
      indicator_id: "FQ2o8UBlcrS",
      indicator: "Acute Flaccid Paralysis (AFP) new",
      period: "2020",
      location_id: "O6uvpzGd5pu",
      location: "Bo",
      value: "23.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "202003",
      location_id: "jUb8gELQApl",
      location: "Kailahun",
      value: "1217.0",
    },
    {
      indicator_id: "M62VHgYT2n0",
      indicator: "Acute Flaccid Paralysis (AFP) referrals",
      period: "2020S1",
      location_id: "ImspTQPwCqd",
      location: "Sierra Leone",
      value: "6.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "202003",
      location_id: "Vth0fbpFcsO",
      location: "Kono",
      value: "129.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "2020",
      location_id: "bL4ooGhyHRQ",
      location: "Pujehun",
      value: "1536.0",
    },
    {
      indicator_id: "M62VHgYT2n0",
      indicator: "Acute Flaccid Paralysis (AFP) referrals",
      period: "2020",
      location_id: "ImspTQPwCqd",
      location: "Sierra Leone",
      value: "11.0",
    },
    {
      indicator_id: "P3jJH5Tu5VC",
      indicator: "Acute Flaccid Paralysis (AFP) follow-up",
      period: "2020S1",
      location_id: "ImspTQPwCqd",
      location: "Sierra Leone",
      value: "22.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "202001",
      location_id: "Vth0fbpFcsO",
      location: "Kono",
      value: "25.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "202001",
      location_id: "kJq2mPyFEHo",
      location: "Kenema",
      value: "332.0",
    },
    {
      indicator_id: "P3jJH5Tu5VC",
      indicator: "Acute Flaccid Paralysis (AFP) follow-up",
      period: "2020",
      location_id: "O6uvpzGd5pu",
      location: "Bo",
      value: "12.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "202001",
      location_id: "bL4ooGhyHRQ",
      location: "Pujehun",
      value: "1244.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "2020S1",
      location_id: "ImspTQPwCqd",
      location: "Sierra Leone",
      value: "5241.0",
    },
    {
      indicator_id: "FTRrcoaog83",
      indicator: "Accute Flaccid Paralysis (Deaths < 5 yrs)",
      period: "202002",
      location_id: "O6uvpzGd5pu",
      location: "Bo",
      value: "4.0",
    },
    {
      indicator_id: "FQ2o8UBlcrS",
      indicator: "Acute Flaccid Paralysis (AFP) new",
      period: "202004",
      location_id: "jUb8gELQApl",
      location: "Kailahun",
      value: "3.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "2020S1",
      location_id: "fdc6uOvgoji",
      location: "Bombali",
      value: "1920.0",
    },
    {
      indicator_id: "jmWyJFtE7Af",
      indicator: "Anaemia follow-up",
      period: "202005",
      location_id: "ImspTQPwCqd",
      location: "Sierra Leone",
      value: "1172.0",
    },
    {
      indicator_id: "FQ2o8UBlcrS",
      indicator: "Acute Flaccid Paralysis (AFP) new",
      period: "2020Q1",
      location_id: "ImspTQPwCqd",
      location: "Sierra Leone",
      value: "34.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "202005",
      location_id: "kJq2mPyFEHo",
      location: "Kenema",
      value: "588.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "202003",
      location_id: "kJq2mPyFEHo",
      location: "Kenema",
      value: "348.0",
    },
    {
      indicator_id: "HLPuaFB7Frw",
      indicator: "Anaemia new",
      period: "202005",
      location_id: "fdc6uOvgoji",
      location: "Bombali",
      value: "495.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "2020",
      location_id: "jUb8gELQApl",
      location: "Kailahun",
      value: "15145.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "2020",
      location_id: "bL4ooGhyHRQ",
      location: "Pujehun",
      value: "10662.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "202005",
      location_id: "fdc6uOvgoji",
      location: "Bombali",
      value: "1690.0",
    },
    {
      indicator_id: "fbfJHSPpUQD",
      indicator: "ANC 1st visit",
      period: "202002",
      location_id: "eIQbndfxQMb",
      location: "Tonkolili",
      value: "1441.0",
    },
    {
      indicator_id: "FTRrcoaog83",
      indicator: "Accute Flaccid Paralysis (Deaths < 5 yrs)",
      period: "2020Q1",
      location_id: "O6uvpzGd5pu",
      location: "Bo",
      value: "28.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "202003",
      location_id: "fdc6uOvgoji",
      location: "Bombali",
      value: "1212.0",
    },
    {
      indicator_id: "FQ2o8UBlcrS",
      indicator: "Acute Flaccid Paralysis (AFP) new",
      period: "202004",
      location_id: "ImspTQPwCqd",
      location: "Sierra Leone",
      value: "4.0",
    },
    {
      indicator_id: "cYeuwXTCPkU",
      indicator: "ANC 2nd visit",
      period: "202001",
      location_id: "fdc6uOvgoji",
      location: "Bombali",
      value: "1308.0",
    },
    {
      indicator_id: "P3jJH5Tu5VC",
      indicator: "Acute Flaccid Paralysis (AFP) follow-up",
      period: "202001",
      location_id: "ImspTQPwCqd",
      location: "Sierra Leone",
      value: "13.0",
    },
  ];

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
    series.name = name;
    series.stacked = selectedStackType === "stacked" ? true : false;
  };

  useLayoutEffect(() => {
    let chart = am4core.create("xychartByLocation", am4charts.XYChart);

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
      // valueAxis.logarithmic = true;
    }
    categoryAxis.renderer.labels.template.fontSize = 12;
    categoryAxis.renderer.labels.template.wrap = true;
    categoryAxis.renderer.labels.template.maxWidth = 140;

    valueAxis.renderer.labels.template.fontSize = 12;
    valueAxis.renderer.labels.template.wrap = true;
    valueAxis.renderer.labels.template.maxWidth = 140;
    valueAxis.min = 0;

    for (let key of Object.keys(chart.data[0])) {
      if (key !== selectedType) {
        createSeries(chart, key, selectedType);
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
          id="xychartByLocation"
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