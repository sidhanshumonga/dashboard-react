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
// import moment from "moment";
// import MomentUtils from "@date-io/moment";
// import { MuiPickersUtilsProvider } from "@material-ui/pickers";
// import { DatePicker } from "@material-ui/pickers";
import Location from "../dialog-box/location/location.js";
import Period from "../dialog-box/period/period.js"
import Slide from "@material-ui/core/Slide";
import Loader from "../loader/loader.js";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import * as Utils from "../../Utils.js";
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
  const [selectedPeriod, setSelectedPeriod] = React.useState([]);
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

  const [tree, setData] = React.useState({});

  const updateLocation = (location) => {
    setSelectedLocation(location);
  };

  const updatePeriod = (period) => {
    setSelectedPeriod(period)
  }

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
      date: selectedPeriod,
      orgunit_name: selectedLocation.name,
      orgunit_id: selectedLocation.id,
      indicators: selectedIndicators.map((i) => i.name),
    };
    sendSearchParsms(payload);
    console.log(payload)
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
            className={"mx-2" + (selectedPeriod.length ? " btn-checked" : "")}
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
              <Location onSelect={updateLocation} tree={tree}></Location>
            ) : (
              <Period onSelect={updatePeriod}></Period>
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

      <Row className="justify-content-center mt-5">
        <Col className="col-10 charts-container">
          {chartsLoading ? <Loader className="loader-div"></Loader> : null}
        </Col>
      </Row>
    </div>
  );
}
