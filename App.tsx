import React from "react";
import Calendar from "./components/Calendar";
import { getCurrentDate } from "./helpers";

export interface DateProps {
  date: Date;
}

export type ChangeDateNotifyCb = (props: DateProps, e: any) => any;

export default class DayPicker extends React.Component {
  state = {
    visible: true,
    currentDate: getCurrentDate()
  };

  private changeCurrentDate: ChangeDateNotifyCb = (
    { date: currentDate }: DateProps,
    e
  ) => this.setState({ currentDate });

  public render = () => (
    <Calendar
      currDate={this.state.currentDate}
      changeCurrentDate={this.changeCurrentDate}
    >
      Calendar
    </Calendar>
  );
}