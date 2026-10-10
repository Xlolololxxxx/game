import { endOfMonth, startOfMonth } from "date-fns";
import moment from "moment";

export const getCurrentMonthDays = () => {
  const currentDate = new Date();
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);

  return {
    
    fromDate: moment(firstDayOfMonth).format("YYYY-MM-DD"),
    toDate: moment(lastDayOfMonth).format("YYYY-MM-DD"),
    // toDate: lastDayOfMonth.toISOString(),
  };
};
