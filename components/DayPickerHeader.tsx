import React from "react";

export default class DayPickerHeader extends React.Component {
  public render = () => (
    <header className={"header"}>
      <span>{this.props.currentMonthLabel + " " + this.props.currentYear}</span>
      <button onClick={this.props.previousMonth}>&lt;</button>
      <button onClick={this.props.nextMonth}>&gt;</button>
    </header>
  );
}
