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
import moment from "moment";
import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export default function Selection() {
  const [selectedDate, setSelectedDate] = React.useState();

  const handleDateChange = (date) => {
    if (date) {
      setSelectedDate(date);
    }
    setDialogOpen(false);
  };

  const [AutocompleteOpen, setAutocompleteOpen] = React.useState(false);
  const [AutocompleteOptions, setAutocompleteOptions] = React.useState([]);
  const loading = AutocompleteOpen && AutocompleteOptions.length === 0;

  const [DialogOpen, setDialogOpen] = React.useState(false);
  const [DialogType, setDialogType] = React.useState("location");

  const handleClickOpen = (type) => {
    setDialogOpen(true);
    setDialogType(type);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const response = await fetch(urls.countries);
      await sleep(1000); // For demo purposes.
      const countries = await response.json();

      if (active) {
        setAutocompleteOptions(
          Object.keys(countries).map((key) => countries[key].item[0])
        );
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

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
              loading={loading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search Indicators"
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loading ? (
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
            className="mr-2"
            onClick={() => handleClickOpen("location")}
          >
            <i className="material-icons">add</i>
            Select location
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
          <Button variant="contained" className="btn-primary">
            Done
          </Button>
        </Col>
      </Row>
      <Dialog
        open={DialogOpen && DialogType === "location"}
        onClose={handleClose}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          {DialogType === "location" ? "Select location" : "Select Date"}
        </DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText
            id="scroll-dialog-description"
            tabIndex={-1}
          ></DialogContentText>
        </DialogContent>
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
    </div>
  );
}
