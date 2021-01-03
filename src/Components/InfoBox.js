import React from "react";
import "./InfoBox.css";
import { Card, CardContent, Typography } from "@material-ui/core";

function InfoBox({ title, cases, isGreen, isGrey, active, total, ...props }) {

  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${active && "infoBox--selected"} 
      ${active && isGreen && "infoBox--selected--green"} 
      ${active && isGrey && "infoBox--selected--grey"}`}
    >
      <CardContent>
        <Typography className="infoBox__title" color="textSecondary">
          {title}
        </Typography>
        <h2 className={`infoBox__cases ${isGreen && "font--green"} ${isGrey && "font--grey"}`}>{cases}</h2>
        <Typography className="infoBox__total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
