import React from "react";

export default class Headings extends React.Component {
  public render = () => (
    <div className={"headings"}>
      {this.props.dayLabels.map((day, index) => (
        <span className={"dayLabel"} key={index} children={day} />
      ))}
    </div>
  );
}
