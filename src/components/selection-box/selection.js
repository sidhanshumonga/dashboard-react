import "./selection.css";

import * as CONSTANTS from "../../CONSTANTS.js";
import * as Utils from "../../Utils.js";

import { Col, Form, Row } from "react-bootstrap";

import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import ChartsDiv from "../charts/charts.js";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import Checkbox from "@material-ui/core/Checkbox";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Location from "../dialog-box/location/location.js";
import Period from "../dialog-box/period/period.js";
import React from "react";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Selection() {
  const [selectedPeriod, setSelectedPeriod] = React.useState([]);
  const [selectedLocation, setSelectedLocation] = React.useState([]);
  const [selectedIndicators, setSelectedIndicators] = React.useState([]);
  const [chartData, setChartData] = React.useState([]);
  const [AutocompleteOpen, setAutocompleteOpen] = React.useState(false);
  const [AutocompleteOptions, setAutocompleteOptions] = React.useState([]);
  const indicatorsLoading =
    AutocompleteOpen && AutocompleteOptions.length === 0;

  const [DialogOpen, setDialogOpen] = React.useState(false);
  const [DialogType, setDialogType] = React.useState(
    CONSTANTS.DIALOG_TYPE.LOCATION
  );
  const [, setChartsLoading] = React.useState(false);

  const [tree, setData] = React.useState({});

  const updateLocation = (location) => {
    setSelectedLocation(location);
  };

  const updatePeriod = (period) => {
    setSelectedPeriod(period);
  };

  const handleClickOpen = (type) => {
    setDialogOpen(true);
    setDialogType(type);
  };

  const handleClose = () => {
    setSelectedLocation([]);
    setDialogOpen(false);
  };

  const handleSave = () => {
    setDialogOpen(false);
  };

  const resetState = () => {
    setSelectedPeriod([]);
    setSelectedLocation([]);
    setChartData([]);
    setAutocompleteOptions([]);
    setSelectedIndicators([]);
    setChartsLoading(false);
  };

  const sendSearchParams = async (params) => {
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

    // console.log(JSON.parse(data).data);
    setChartData(JSON.parse(data).data);
  };

  const loadingStart = () => {
    setChartsLoading(true);
    const payload = {
      date: selectedPeriod.map((x) => "" + x.id),
      orgunit_id: selectedLocation,
      indicators: selectedIndicators.map((i) => i.id),
    };
    sendSearchParams(payload);
  };

  const updateIndicatorsArray = (indicators) => {
    setSelectedIndicators(indicators);
  };

  React.useEffect(() => {
    let active = true;

    if (!indicatorsLoading) {
      return undefined;
    }

    (async () => {
      const response = await fetch(Utils.getBaseUrl() + CONSTANTS.dataelements);
      // await sleep(1000); // For demo purposes.
      const data = await response.json();
      // filter data elements if no period is there.
      if (active) {
        setAutocompleteOptions(
          data.filter((x) => {
            if (x.periodType.length > 0) {
              return {
                ...x,
                periodType: x.periodType[0],
              };
            }
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
      <div className="px-5 pb-5 gradient-div">
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
                getOptionSelected={(option, value) =>
                  option.name === value.name
                }
                getOptionLabel={(option) => option.name}
                options={AutocompleteOptions}
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
              className={
                "mr-2 selection-btn" +
                (selectedLocation.length ? " btn-checked" : "")
              }
              onClick={() => handleClickOpen(CONSTANTS.DIALOG_TYPE.LOCATION)}
            >
              <i className="material-icons">
                {selectedLocation.length
                  ? CONSTANTS.LOGO.CHECK
                  : CONSTANTS.LOGO.ADD}
              </i>
              {selectedLocation.length
                ? "Location: " + selectedLocation.length + " selected"
                : "Select Location"}
            </Button>
            <Button
              variant="contained"
              className={
                "mx-2 selection-btn" +
                (selectedPeriod.length ? " btn-checked" : "")
              }
              onClick={() => handleClickOpen(CONSTANTS.DIALOG_TYPE.DATE)}
            >
              <i className="material-icons">
                {selectedPeriod.length
                  ? CONSTANTS.LOGO.CHECK
                  : CONSTANTS.LOGO.ADD}
              </i>
              {selectedPeriod.length
                ? "Period: " + selectedPeriod.length + " selected"
                : "Select Period"}
            </Button>
          </Col>
          <Col className="col-3 text-right mt-3 d-flex justify-content-end">
            <Col className="mx-2 mt-1 clear-link" onClick={resetState}>
              <i className="material-icons" style={{ verticalAlign: "bottom" }}>
                close
              </i>
              Clear dashboard
            </Col>
            <Button
              variant="contained"
              className="btn-primary btn-add"
              onClick={() => loadingStart()}
            >
              Add
            </Button>
          </Col>
        </Row>
        <Dialog
          open={DialogOpen}
          onClose={handleClose}
          fullWidth={true}
          maxWidth="sm"
          className="dialogNoPadding"
          TransitionComponent={Transition}
          scroll={"paper"}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">
            {DialogType === CONSTANTS.DIALOG_TYPE.LOCATION
              ? CONSTANTS.PARAMETERS.SELECT_LOCATION
              : CONSTANTS.PARAMETERS.SELECT_PERIOD}
          </DialogTitle>
          <DialogContent dividers={true}>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              {DialogType === CONSTANTS.DIALOG_TYPE.LOCATION ? (
                <Location
                  onSelect={updateLocation}
                  selected={selectedLocation}
                  tree={tree}
                ></Location>
              ) : (
                <Period
                  onSelect={updatePeriod}
                  selected={selectedPeriod}
                ></Period>
              )}
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
      </div>
      <Row className="justify-content-center mt-5">
        <Col className="col-11 charts-container">
          {/* {chartsLoading && chartData.length === 0 ? (
            <Loader className="loader-div"></Loader>
          ) : chartData.length !== 0 ? ( */}
          <ChartsDiv chartData={chartData} indicators={selectedIndicators} periods={selectedPeriod} />
          {/* ) : <p className="charts-text">PLEASE MAKE SELECTION TO DISPLAY CHARTS</p>} */}
        </Col>
      </Row>
    </div>
  );
}
