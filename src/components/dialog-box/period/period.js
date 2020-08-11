import React from "react";
import { Row, Col } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import "./period.css";
import * as CONSTANTS from "../../../CONSTANTS.js";
import moment from "moment";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import * as UTILS from "../../../Utils.js";
import Icon from "@material-ui/core/Icon";

import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  root: {
    height: 350,
    flexGrow: 1,
  },
  formControl: {
    minWidth: "120px",
    marginRight: 20,
  },
  periodBox: {
    height: 280,
    marginTop: 20,
    marginLeft: 10,
    border: "1px solid lightgray",
    borderRadius: 4,
    overflow: "scroll",
    padding: 0,
  },
  paperRoot: {
    height: 350,
    listStyle: "none",
    padding: 1,
    margin: 0,
    overflow: "scroll",
    border: "1px solid lightgray",
    borderRadius: 4,
    boxShadow: "none",
  },
});

export default function Period(props) {
  const classes = useStyles();

  const [checked, setChecked] = React.useState([]);
  const [selectedPeriodType, setSelectedPeriodType] = React.useState("m");
  const [openYearSelect, setOpenYearSelect] = React.useState(false);
  const [selectedYear, setSelectedYear] = React.useState(
    parseInt(moment(new Date()).format("YYYY"))
  );
  const [dropdownYears, setDropdownYears] = React.useState(
    UTILS.getYearlyArray(selectedYear, 9)
  );
  const [periodArray, setPeriodArray] = React.useState([]);

  const updatePeriod = (period) => {
    setChecked(period);
    props.onSelect(period.map((x) => '' + x.id));
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.findIndex((i) => i.id === value.id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    updatePeriod(newChecked);
  };

  const removeSelectedPeriod = (value) => () => {
    const currentIndex = checked.findIndex((i) => i.id === value.id);
    const newChecked = [...checked];
    newChecked.splice(currentIndex, 1);
    updatePeriod(newChecked);
  };

  const handlePeriodTypeChange = (event) => {
    setSelectedPeriodType(event.target.value);
  };

  const handleSelectedYearChange = (event) => {
    if (event.target.value !== "prev" && event.target.value !== "next") {
      if (selectedPeriodType === "y") {
        setPeriodArray(UTILS.getYearlyPeriodArray(event.target.value));
      } else if (selectedPeriodType === "d") {
        setPeriodArray(UTILS.getDailyArray(event.target.value));
      } else if (selectedPeriodType === "w") {
        setPeriodArray(UTILS.getWeeklyArray(event.target.value));
      }

      setSelectedYear(event.target.value);
      setOpenYearSelect(false);
    } else {
      if (event.target.value === "prev") {
        setDropdownYears(UTILS.getYearlyArray(dropdownYears[0] - 1));
      } else {
        setDropdownYears(UTILS.getYearlyArray(dropdownYears[8] + 1));
      }
      setOpenYearSelect(true);
    }
  };

  React.useEffect(() => {
    switch (selectedPeriodType) {
      case "d": {
        setPeriodArray(UTILS.getDailyArray(selectedYear));
        break;
      }
      case "w": {
        setPeriodArray(UTILS.getWeeklyArray(selectedYear));
        break;
      }
      case "m": {
        setPeriodArray(UTILS.getMonthlyArray(CONSTANTS.MONTHS, selectedYear));
        break;
      }
      case "q": {
        setPeriodArray(
          UTILS.getQuarterlyArray(CONSTANTS.QUARTERS, selectedYear)
        );
        break;
      }
      case "sm": {
        setPeriodArray(
          UTILS.getSixMonthlyArray(CONSTANTS.SIX_MONTHS, selectedYear)
        );
        break;
      }
      case "y": {
        setPeriodArray(UTILS.getYearlyPeriodArray(selectedYear));
        break;
      }
    }
  }, [selectedPeriodType, selectedYear]);

  return (
    <Row className={classes.root}>
      <Col className="col col-lg-8 col-md-8 col-sm-8">
        <Row>
          <Col>
            <FormControl className={classes.formControl}>
              <InputLabel>Period type</InputLabel>
              <Select
                onChange={handlePeriodTypeChange}
                value={selectedPeriodType}
              >
                {CONSTANTS.PERIOD_TYPES.map((period) => (
                  <MenuItem value={period.id}>{period.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel>Year</InputLabel>
              <Select
                className="year-selection"
                onChange={handleSelectedYearChange}
                onClose={() => {
                  setOpenYearSelect(false);
                }}
                onOpen={() => {
                  setOpenYearSelect(true);
                }}
                value={selectedYear}
                open={openYearSelect}
              >
                <MenuItem value="prev">
                  <Icon>expand_less</Icon>
                </MenuItem>
                {dropdownYears.map((year) => (
                  <MenuItem value={year}>{year}</MenuItem>
                ))}
                <MenuItem value="next">
                  <Icon>expand_more</Icon>
                </MenuItem>
              </Select>
            </FormControl>
          </Col>
        </Row>
        <Row>
          <Col className={classes.periodBox}>
            <List>
              {periodArray.map((value, index) => {
                return (
                  <ListItem
                    key={index}
                    role={undefined}
                    dense
                    button
                    onClick={handleToggle(value)}
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        tabIndex={-1}
                        disableRipple
                        checked={
                          checked.findIndex((j) => j.id === value.id) !== -1
                        }
                      />
                    </ListItemIcon>
                    {selectedPeriodType === "w"
                      ? "WEEK " + (index + 1) + " - " + value.name
                      : value.name}
                  </ListItem>
                );
              })}
            </List>
          </Col>
        </Row>
      </Col>
      <Col className="col col-lg-4 col-md-4 col-sm-4">
        <Paper component="ul" className={classes.paperRoot}>
          {checked.map((data) => {
            return (
              <li key={data.key}>
                <Chip
                  label={data.name}
                  onDelete={removeSelectedPeriod(data)}
                  className="my-1 ml-2"
                />
              </li>
            );
          })}
        </Paper>
      </Col>
    </Row>
  );
}
