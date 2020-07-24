import { eachDayOfInterval, eachWeekOfInterval } from "date-fns";
import moment from "moment";

export const getBaseUrl = () => {
  const baseUrl = "https://who.aeturn.dev/"; //server calls
  return baseUrl;
};

export const getDailyArray = (year) => {
  var arrayOfDates = eachDayOfInterval({
    start: new Date(year, 0, 1),
    end: new Date(year, 11, 31),
  });

  return arrayOfDates.map((date) => {
    return {
      id: moment(date).format("YYYYMMDD"),
      name: moment(date).format("YYYY-MM-DD"),
    };
  });
};

export const getWeeklyArray = (year) => {
  var arrayOfWeeks = eachWeekOfInterval({
    start: new Date(year, 0, 1),
    end: new Date(year, 11, 31),
  });
  return arrayOfWeeks.map((date, index) => {
    return {
      id: index + 1 < 10 ? "W0" + (index + 1) : "W" + (index + 1),
      name:
        moment(date).format("YYYY-MM-DD") +
        " - " +
        moment(date).add(6, "d").format("YYYY-MM-DD"),
    };
  });
};

export const getMonthlyArray = (months, year) => {
  return months.map((month) => {
    return { id: year + month.id, name: month.name + ' ' + year};
  });
};

export const getQuarterlyArray = (quarters, year) => {
  return quarters.map((quarter) => {
    return { id: year + quarter.id, name: quarter.name + ' ' + year };
  });
};

export const getSixMonthlyArray = (months, year) => {
  return months.map((month) => {
    return { id: year + month.id, name: month.name + ' ' + year };
  });
};

export const getYearlyPeriodArray = (year) => {
  var mutedYear = parseInt(year);
  var yearsArray = [{ id: mutedYear, name: mutedYear }];
  for (let i = 1; i < 10; i++) {
    yearsArray.push({ id: mutedYear - i, name: mutedYear - i });
  }
  return yearsArray;
};

export const getYearlyArray = (year) => {
  var mutedYear = parseInt(year);
  var yearsArray = [mutedYear];
  for (let i = 1; i < 5; i++) {
    yearsArray.push(mutedYear + i);
    yearsArray.unshift(mutedYear - i);
  }
  return yearsArray;
};
