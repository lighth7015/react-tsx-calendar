import React from "react";
import { formatDateToDay } from "../helpers";

export default class DateList extends React.Component {
  public render = () => (
    <div className={"calendar"}>
      {this.props.dates.map((date, index) => (
        <button
          onClick={e => this.props.setSelectedDate(date, e)}
          className={"dateButton"}
          disabled={!date.isCurrentMonth}
          key={index}
        >
          {formatDateToDay(date.date)}
        </button>
      ))}
    </div>
  );
}
