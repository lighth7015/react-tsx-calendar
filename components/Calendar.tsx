import React from "react";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import { addDays, addMonths, format } from "date-fns";
import { lastDayOfMonth, isSameMonth } from "date-fns";
import { setDate, isToday, isSameDay } from "date-fns";
import { getDay, eachDayOfInterval } from "date-fns";
import { startOfMonth, endOfMonth } from "date-fns";

import { clone } from "../helpers";
import DateList from "./DateList";

import DayPickerHeader from "./DayPickerHeader";
import Headings from "./Headings";

import { ChangeDateNotifyCb } from "../App";

export interface CalendarProps {
  currDate: Date;
  changeCurrentDate: ChangeDateNotifyCb;
}

interface IDate {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
}

export default class Calendar extends React.Component<CalendarProps> {
  state = {
    today: new Date(),
    selectedDate: new Date(),
    visible: true,

    currentDateCursor: new Date(),
    dayLabels: Array.from(
      eachDayOfInterval({
        start: new Date(2014, 9, 5),
        end: new Date(2014, 9, 11)
      }).map((date: Date) => format(date, "iiii").substr(0, 2))
    ),

    monthLabels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ]
  };

  componentDidMount() {
    let date: Date = new Date(2000, 1, 1);

    //console.log(Array.from(Array(12).keys(), index => (format( date ), date = addMonths(date, 1)));
  }

  private get curMonth() {
    return this.currentDateCursor.getMonth();
  }

  private get curYear() {
    return this.currentDateCursor.getFullYear();
  }

  private get curMonthLabel() {
    return this.state.monthLabels[this.curMonth];
  }

  private get selectedMonth() {
    return this.selectedDate.getMonth();
  }

  private selectedMonthLabel = () => this.state.monthLabels[this.selectedMonth];

  private get date(): Date {
    return new Date(this.curYear, this.curMonth);
  }
  private get selectedDate() {
    return this.state.selectedDate;
  }

  /** get days from last month */
  private get fromLastMonth() {
    let date = this.currentDateCursor;
    const days = eachDayOfInterval({
      start: startOfMonth(this.currentDateCursor),
      end: endOfMonth(this.currentDateCursor)
    });

    const collection: Array<IDate> = days.map(date => ({
      date,
      isCurrentMonth: isSameMonth(this.date, date),
      isToday: isToday(date),
      isSelected: isSameDay(date, this.selectedDate)
    }));

    date = addDays(date, -1);
    let [day] = days;

    for (let i = getDay(day); i > 0; i--, date = addDays(date, -1)) {
      collection.unshift({
        date,
        isCurrentMonth: false,
        isToday: isToday(date),
        isSelected: isSameDay(this.selectedDate, date)
      } as IDate);
    }

    return [date, collection];
  }

  /** get days from next month */
  private get fromNextMonth(): Array<IDate> {
    let fromLastMonth = this.fromLastMonth;
    let date: Date = fromLastMonth.shift() as Date;
    const collection: Array<IDate> = fromLastMonth.shift() as Array<IDate>;

    const daysNeededAtEnd =
      collection.length % 7 > 0 ? 7 - (collection.length % 7) : 0;

    for (let i = 1; i <= daysNeededAtEnd; ++i, date = addDays(date, 1)) {
      collection.push({
        date,
        isCurrentMonth: false,
        isToday: isToday(date),
        isSelected: isSameDay(this.state.selectedDate, date)
      } as IDate);
    }

    return collection;
  }

  private get currentDateCursor(): Date {
    return this.state.currentDateCursor;
  }

  private nextMonth = () =>
    this.setState({
      currentDateCursor: addMonths(clone(this.currentDateCursor), 1)
    });

  private prevMonth = () =>
    this.setState({
      currentDateCursor: addMonths(clone(this.currentDateCursor), -1)
    });

  private setSelectedDate(selectedDate: Date, e) {
    this.props.changeCurrentDate({ date: selectedDate }, e);
    this.setState({ selectedDate });
  }

  public render = () => (
    <Dialog open={this.state.visible}>
      <DialogTitle id="customized-dialog-title">
        {this.props.children}
      </DialogTitle>
      <DialogContent dividers>
        <DayPickerHeader
          nextMonth={this.nextMonth}
          previousMonth={this.prevMonth}
          currentMonthLabel={this.curMonthLabel}
          currentYear={this.curYear}
        />

        <Headings dayLabels={this.state.dayLabels} />
        <DateList
          setSelectedDate={this.setSelectedDate}
          dates={this.fromNextMonth}
        />
      </DialogContent>
      <DialogActions>
        <Button autoFocus color="primary">
          Close
        </Button>
        <Button autoFocus color="primary">
          Select
        </Button>
      </DialogActions>
    </Dialog>
  );
}
