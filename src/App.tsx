import React from "react";
import { Grid } from "@material-ui/core";
import ClickCounter from "./ClickCounter";

export default class App extends React.Component {
  render() {
    return (
      <Grid container justify="center">
        <ClickCounter idx={1}></ClickCounter>
      </Grid>
    );
  }
}
