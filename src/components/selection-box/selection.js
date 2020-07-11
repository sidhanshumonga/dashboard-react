import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import "./selection.css";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import * as urls from "../../urls.js";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Location from "../dialog-box/location/location.js";
import Slide from "@material-ui/core/Slide";
import Loader from "../Loader/Loader.js";
function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Selection() {
  const [selectedDate, setSelectedDate] = React.useState();
  const [selectedLocation, setSelectedLocation] = React.useState({});
  const [AutocompleteOpen, setAutocompleteOpen] = React.useState(false);
  const [AutocompleteOptions, setAutocompleteOptions] = React.useState([]);
  const indicatorsLoading =
    AutocompleteOpen && AutocompleteOptions.length === 0;

  const [DialogOpen, setDialogOpen] = React.useState(false);
  const [DialogType, setDialogType] = React.useState("location");
  const [chartsLoading, setChartsLoading] = React.useState(false);

  const handleDateChange = (date) => {
    if (date) {
      setSelectedDate(date);
    }
    setDialogOpen(false);
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
  };

  React.useEffect(() => {
    let active = true;

    if (!indicatorsLoading) {
      return undefined;
    }

    (async () => {
      const response = await fetch(urls.indicators);
      await sleep(1000); // For demo purposes.
      const data = await response.json();

      if (active) {
        setAutocompleteOptions(
          data.indicators
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

  return (
    <div>
      <Row className="justify-content-center align-items-center">
        <Col className="col-6 mt-5">
          <Form>
            <Autocomplete
              id="asynchronous-demo"
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
              loading={indicatorsLoading}
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
        <Col className="col-4 mt-3 text-left">
          <Button
            variant="contained"
            className={"mr-2" + (selectedLocation.name ? " btn-checked" : "")}
            onClick={() => handleClickOpen("location")}
          >
            <i className="material-icons">
              {selectedLocation ? "check" : "add"}
            </i>
            {selectedLocation.name ? selectedLocation.name : "Select location"}
          </Button>
          <Button
            variant="contained"
            className={"mx-2" + (selectedDate ? " btn-checked" : "")}
            onClick={() => handleClickOpen("date")}
          >
            <i className="material-icons">{selectedDate ? "check" : "add"}</i>
            {selectedDate
              ? moment(selectedDate).format("MMM DD, YYYY")
              : "Select date"}
          </Button>
        </Col>
        <Col className="col-2 text-right mt-3">
          <Button
            variant="contained"
            className="btn-primary"
            onClick={() => loadingStart()}
          >
            Done
          </Button>
        </Col>
      </Row>
      <Dialog
        open={DialogOpen && DialogType === "location"}
        onClose={handleClose}
        fullWidth={true}
        maxWidth="sm"
        TransitionComponent={Transition}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          {DialogType === "location" ? "Select location" : "Select Date"}
        </DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            <Location onSelect={updateLocation}></Location>
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
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <KeyboardDatePicker
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
          open={DialogOpen && DialogType === "date"}
          TextFieldComponent={() => null}
        />
      </MuiPickersUtilsProvider>
      <Row className="justify-content-center mt-5">
        <Col className="col-10 charts-container">
          {chartsLoading ? <Loader className="loader-div"></Loader> : null}
        </Col>
      </Row>
    </div>
  );
}
