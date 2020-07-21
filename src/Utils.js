import * as CONSTANTS from "./CONSTANTS.js";
import moment from "moment";

export const getBaseUrl = () => {
  const baseUrl = "https://who.aeturn.dev/"; //server calls

  return baseUrl;
};

export const makeJSDateObject = (date) => {
  let dateTo = moment(date).format(CONSTANTS.DATE_FORMATS.WEEKLY);
  let dateFrom = moment(date).add(7, "d").format(CONSTANTS.DATE_FORMATS.WEEKLY);
  return dateTo + " to " + dateFrom;
};

export const getStartAndEndDates = (date, type) => {
  switch (type) {
    case CONSTANTS.PERIOD_TYPE.WEEKLY: {
      let dateTo = moment(date).format(CONSTANTS.DATE_FORMATS.API_FORMAT);
      let dateFrom = moment(date)
        .add(7, "d")
        .format(CONSTANTS.DATE_FORMATS.API_FORMAT);
      return { startDate: dateTo, endDate: dateFrom };
    }

    case CONSTANTS.PERIOD_TYPE.MONTHLY: {
      let month = moment(date).format("M");
      let year = moment(date).format("YYYY");
      if (
        month === "1" ||
        month === "3" ||
        month === "5" ||
        month === "7" ||
        month === "8" ||
        month === "10" ||
        month === "12"
      ) {
        if (
          month === "1" ||
          month === "3" ||
          month === "5" ||
          month === "7" ||
          month === "8"
        ) {
          return {
            startDate: "01-0" + month + '-' + year,
            endDate: "31-0" + month + '-' + year,
          };
        } else {
          return {
            startDate: "01-" + month + '-' + year,
            endDate: "31-" + month + '-' + year,
          };
        }
      } else if (
        month === "4" ||
        month === "6" ||
        month === "9" ||
        month === "11"
      ) {
        if (month === "4" || month === "6" || month === "9") {
          return {
            startDate: "01-0" + month + '-' + year,
            endDate: "30-0" + month + '-' + year,
          };
        } else {
          return {
            startDate: "01-" + month + '-' + year,
            endDate: "30-" + month + '-' + year,
          };
        }
      } else if (month === "2") {
        return {
          startDate: "01-0" + month + '-' + year,
          endDate: "29-0" + month + '-' + year,
        };
      }
      break;
    }
    case CONSTANTS.PERIOD_TYPE.SIX_MONTHLY: {
      let month = moment(date).format("M");
      let year = moment(date).format("YYYY");
      if (month < 7) {
        return {
          startDate: "01-01-" + year,
          endDate: "30-06-" + year,
        };
      } else {
        return {
          startDate: "01-07-" + year,
          endDate: "31-12-" + year,
        };
      }
    }
    case CONSTANTS.PERIOD_TYPE.QUARTERLY: {
      break;
    }
    case CONSTANTS.PERIOD_TYPE.YEARLY: {
      let year = moment(date).format("YYYY");
      return {
        startDate: "01-01-" + year,
        endDate: "31-12-" + year,
      };
    }
    default: {
    }
  }
};
