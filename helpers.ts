import * as DateFns from "date-fns";
export const formatDateToDay = date => DateFns.format(date, "d");

export const clone = d => new Date(d.getTime());
export const getCurrentDate = () => new Date();