import React from "react";

export default class DateText extends React.Component {
  public render = () => (
    <p
      style={{ textAlign: "center" }}
      children={"Selected Date: ".concat(this.props.formattedDate)}
    />
  );
}
