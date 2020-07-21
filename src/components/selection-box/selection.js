import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import "./selection.css";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import * as CONSTANTS from "../../CONSTANTS.js";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Checkbox from "@material-ui/core/Checkbox";
import DialogActions from "@material-ui/core/DialogActions";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { DatePicker } from "@material-ui/pickers";
import Location from "../dialog-box/location/location.js";
import Slide from "@material-ui/core/Slide";
import Loader from "../Loader/Loader.js";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import WeeklyDate from "../dialog-box/date/weekly-date";
import * as Utils from '../../Utils.js'
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

async function sendSearchParsms(params) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  };
  const response = await fetch(
    Utils.getBaseUrl() + CONSTANTS.postSearchReq,
    requestOptions
  );
  const data = await response.json();
  console.log(data);
}

export default function Selection() {
  const [selectedDate, setSelectedDate] = React.useState();
  const [selectedFormattedDate, setSelectedFormattedDate] = React.useState();
  const [periodType, setPeriodType] = React.useState("");
  const [sixMonthlyType, setSixMonthlyType] = React.useState();
  const [selectedLocation, setSelectedLocation] = React.useState({});
  const [selectedIndicators, setSelectedIndicators] = React.useState([]);
  const [AutocompleteOpen, setAutocompleteOpen] = React.useState(false);
  const [AutocompleteOptions, setAutocompleteOptions] = React.useState([]);
  const indicatorsLoading =
    AutocompleteOpen && AutocompleteOptions.length === 0;

  const [DialogOpen, setDialogOpen] = React.useState(false);
  const [DialogType, setDialogType] = React.useState(
    CONSTANTS.DIALOG_TYPE.LOCATION
  );
  const [chartsLoading, setChartsLoading] = React.useState(false);

  const [sixMonthlyPopup, setSixMonthlyPopup] = React.useState(null);
  const [tree, setData] = React.useState({});

  const handleDateChange = (date) => {
    if (date) {
      setSelectedDate(date);
      setSelectedFormattedDate(
        periodType === CONSTANTS.PERIOD_TYPE.MONTHLY
          ? moment(date).format(CONSTANTS.DATE_FORMATS.MONTHLY)
          : periodType === CONSTANTS.PERIOD_TYPE.YEARLY ||
            periodType === CONSTANTS.PERIOD_TYPE.SIX_MONTHLY
          ? moment(date).format(CONSTANTS.DATE_FORMATS.YEARLY)
          : periodType === CONSTANTS.PERIOD_TYPE.WEEKLY
          ? Utils.makeJSDateObject(date)
          : moment(date).format(CONSTANTS.DATE_FORMATS.DAILY)
      );
    }
    setDialogOpen(false);
  };

  const handleWeekChange = (date) => {
    handleDateChange(date);
  };

  const updateLocation = (location) => {
    setSelectedLocation(location);
  };

  const handleClickOpen = (type) => {
    setDialogOpen(true);
    setDialogType(type);
  };

  const handleClose = () => {
    setSelectedLocation("");
    setDialogOpen(false);
  };

  const handleSave = () => {
    setDialogOpen(false);
  };

  const loadingStart = () => {
    setChartsLoading(true);
    const payload = {
      date: Utils.getStartAndEndDates(selectedDate, periodType),
      orgunit_name: selectedLocation.name,
      orgunit_id: selectedLocation.id,
      indicators: selectedIndicators.map((i) => i.name),
    };
    sendSearchParsms(payload);
  };

  const updateIndicatorsArray = (indicators) => {
    setSelectedIndicators(indicators);
    if (indicators.length > 0) {
      setPeriodType(indicators[0].periodType);
    } else {
      resetStates();
    }
  };

  const resetStates = () => {
    setPeriodType("");
    setSelectedDate();
  };

  const handleSixMonthlyPopup = (event) => {
    setSixMonthlyPopup(event.currentTarget);
  };

  const handleSixMonthlyClose = (idx) => {
    setSixMonthlyType(idx);
    setSixMonthlyPopup(null);
    if(periodType === CONSTANTS.PERIOD_TYPE.SIX_MONTHLY) {
      let year = moment(selectedDate).format(CONSTANTS.DATE_FORMATS.YEARLY)
      if(idx == 1) {
        setSelectedDate(moment('01-01-' + year).format(CONSTANTS.DATE_FORMATS.API_FORMAT));
      }
      else {
        setSelectedDate(moment('01-07-' + year).format(CONSTANTS.DATE_FORMATS.API_FORMAT));
      }
    }
  };

  React.useEffect(() => {
    let active = true;

    if (!indicatorsLoading) {
      return undefined;
    }

    (async () => {
      const response = await fetch(
        Utils.getBaseUrl() + CONSTANTS.dataelements
      );
      await sleep(1000); // For demo purposes.
      const data = await response.json();

      if (active) {
        setAutocompleteOptions(
          data.map((x) => {
            return {
              ...x,
              periodType: x.periodType[0]
                ? x.periodType[0] === CONSTANTS.PERIOD_TYPE.FINANCIAL_APRIL
                  ? CONSTANTS.PERIOD_TYPE.YEARLY
                  : x.periodType[0] === CONSTANTS.PERIOD_TYPE.WEEKLY_WEDNESDAY
                  ? CONSTANTS.PERIOD_TYPE.WEEKLY
                  : x.periodType[0]
                : "",
            };
          })
        );
      }
    })();

    return () => {
      active = false;
    };
  }, [indicatorsLoading]);

  React.useEffect(() => {
    if (!AutocompleteOpen) {
      setAutocompleteOptions([]);
    }
  }, [AutocompleteOpen]);

  React.useEffect(() => {
    (async () => {
      const response = await fetch(Utils.getBaseUrl() + CONSTANTS.orgunits);
      const result = await response.json();
      const tree = result.organisationUnits[0];
      setData(tree);
    })();
  }, []);

  return (
    <div>
      <Row className="justify-content-center align-items-center">
        <Col className="col-8 mt-5">
          <Form>
            <Autocomplete
              id="asynchronous-demo"
              multiple
              freeSolo
              open={AutocompleteOpen}
              onOpen={() => {
                setAutocompleteOpen(true);
              }}
              onClose={() => {
                setAutocompleteOpen(false);
              }}
              getOptionSelected={(option, value) => option.name === value.name}
              getOptionLabel={(option) => option.name}
              options={AutocompleteOptions}
              getOptionDisabled={(option) =>
                selectedIndicators[0] &&
                option.periodType !== selectedIndicators[0].periodType
              }
              disableCloseOnSelect
              loading={indicatorsLoading}
              onChange={(event, value) => updateIndicatorsArray(value)}
              renderOption={(option, { selected }) => (
                <React.Fragment>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.name}
                  <Col className="text-right periodTypeInList">
                    {option.periodType}
                  </Col>
                </React.Fragment>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search Indicators"
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {indicatorsLoading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
            />
          </Form>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col className="col-5 mt-3 text-left">
          <Button
            variant="contained"
            className={"mr-2" + (selectedLocation.name ? " btn-checked" : "")}
            onClick={() => handleClickOpen(CONSTANTS.DIALOG_TYPE.LOCATION)}
          >
            <i className="material-icons">
              {selectedLocation.name
                ? CONSTANTS.LOGO.CHECK
                : CONSTANTS.LOGO.ADD}
            </i>
            {selectedLocation.name
              ? selectedLocation.name
              : CONSTANTS.PARAMETERS.SELECT_LOCATION}
          </Button>
          <Button
            variant="contained"
            className={"mx-2" + (selectedDate ? " btn-checked" : "")}
            onClick={() => handleClickOpen(CONSTANTS.DIALOG_TYPE.DATE)}
          >
            <i className="material-icons">
              {selectedDate ? CONSTANTS.LOGO.CHECK : CONSTANTS.LOGO.ADD}
            </i>
            {selectedDate
              ? selectedFormattedDate
              : periodType === CONSTANTS.PERIOD_TYPE.YEARLY ||
                periodType === CONSTANTS.PERIOD_TYPE.SIX_MONTHLY
              ? CONSTANTS.PARAMETERS.SELECT_YEAR
              : periodType === CONSTANTS.PERIOD_TYPE.MONTHLY
              ? CONSTANTS.PARAMETERS.SELECT_MONTH
              : periodType === CONSTANTS.PERIOD_TYPE.WEEKLY
              ? CONSTANTS.PARAMETERS.SELECT_WEEK
              : CONSTANTS.PARAMETERS.SELECT_DATE}
          </Button>
          {periodType === CONSTANTS.PERIOD_TYPE.SIX_MONTHLY ? (
            <Button
              variant="contained"
              className={"mx-2" + (sixMonthlyType ? " btn-checked" : "")}
              onClick={handleSixMonthlyPopup}
            >
              <i className="material-icons">
                {sixMonthlyType ? CONSTANTS.LOGO.CHECK : CONSTANTS.LOGO.ADD}
              </i>
              {sixMonthlyType === 1
                ? "January - June"
                : sixMonthlyType === 2
                ? "July - December"
                : CONSTANTS.PARAMETERS.SELECT_PERIOD}
            </Button>
          ) : null}
          <Menu
            id="simple-menu"
            keepMounted
            anchorEl={sixMonthlyPopup}
            open={Boolean(sixMonthlyPopup)}
            onClose={handleSixMonthlyClose}
          >
            <MenuItem onClick={(event) => handleSixMonthlyClose(1)}>
              January - June
            </MenuItem>
            <MenuItem onClick={(event) => handleSixMonthlyClose(2)}>
              July - December
            </MenuItem>
          </Menu>
        </Col>
        <Col className="col-3 text-right mt-3 d-flex justify-content-end">
          <Col className="mx-2 mt-1">Clear dashboard</Col>
          <Button
            variant="contained"
            className="btn-primary"
            onClick={() => loadingStart()}
          >
            Add
          </Button>
        </Col>
      </Row>
      <Dialog
        open={DialogOpen && DialogType === CONSTANTS.DIALOG_TYPE.LOCATION}
        onClose={handleClose}
        fullWidth={true}
        maxWidth="sm"
        TransitionComponent={Transition}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          {DialogType === CONSTANTS.DIALOG_TYPE.LOCATION
            ? CONSTANTS.PARAMETERS.SELECT_LOCATION
            : CONSTANTS.PARAMETERS.SELECT_DATE}
        </DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            <Location onSelect={updateLocation} tree={tree}></Location>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {/* Date picker here */}

      {periodType === CONSTANTS.PERIOD_TYPE.MONTHLY ? (
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DatePicker
            views={["year", "month"]}
            label="Year and Month"
            value={selectedDate}
            open={DialogOpen && DialogType === "date"}
            onChange={handleDateChange}
            onClose={handleDateChange}
            TextFieldComponent={() => null}
          />
        </MuiPickersUtilsProvider>
      ) : periodType === CONSTANTS.PERIOD_TYPE.YEARLY || periodType === CONSTANTS.PERIOD_TYPE.SIX_MONTHLY ? (
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DatePicker
            views={["year"]}
            label="Year only"
            value={selectedDate}
            open={DialogOpen && DialogType === CONSTANTS.DIALOG_TYPE.DATE}
            onChange={handleDateChange}
            onClose={handleDateChange}
            TextFieldComponent={() => null}
          />
        </MuiPickersUtilsProvider>
      ) : periodType === "Weekly" ? (
        <WeeklyDate
          open={DialogOpen && DialogType === CONSTANTS.DIALOG_TYPE.DATE}
          onChange={handleWeekChange}
          onClose={handleDateChange}
        />
      ) : (
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DatePicker
            margin="normal"
            disableFuture
            id="date-picker-dialog"
            label="Date picker dialog"
            format="MM/dd/yyyy"
            value={selectedDate}
            onChange={handleDateChange}
            onClose={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            open={DialogOpen && DialogType === CONSTANTS.DIALOG_TYPE.DATE}
            TextFieldComponent={() => null}
          />
        </MuiPickersUtilsProvider>
      )}

      <Row className="justify-content-center mt-5">
        <Col className="col-10 charts-container">
          {chartsLoading ? <Loader className="loader-div"></Loader> : null}
        </Col>
      </Row>
    </div>
  );
}
