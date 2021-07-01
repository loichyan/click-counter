import React from "react";
import {
  Grid,
  Container,
  createStyles,
  WithStyles,
  withStyles,
  Theme,
} from "@material-ui/core";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@material-ui/lab";
import { Add, ClearAll } from "@material-ui/icons";
import { ClickCounter, ClickCounterProps } from "./ClickCounter";
import Immutable from "immutable";

const styles = (theme: Theme) =>
  createStyles({
    speedDial: {
      position: "fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  });

export interface AppProps extends WithStyles<typeof styles> {}

export interface AppState {
  counters: Immutable.Map<
    number,
    React.ComponentElement<ClickCounterProps, ClickCounter>
  >;
  open: boolean;
}

export class App extends React.Component<AppProps, AppState> {
  counterNum: number = 0;

  constructor(props: AppProps) {
    super(props);
    this.state = {
      counters: Immutable.Map(),
      open: false,
    };

    this.addCounter = this.addCounter.bind(this);
    this.removeCounter = this.removeCounter.bind(this);
    this.setOpen = this.setOpen.bind(this);
    this.setClose = this.setClose.bind(this);
    this.clearCounters = this.clearCounters.bind(this);
  }

  componentDidMount() {
    this.addCounter();
  }

  render() {
    const { classes } = this.props;

    return (
      <Container>
        <Grid container justify="center" spacing={2}>
          {[...this.state.counters].map(([idx, counter]) => (
            <React.Fragment key={idx}>
              <Grid item>{counter}</Grid>
            </React.Fragment>
          ))}
        </Grid>
        <SpeedDial
          ariaLabel="speed dial"
          className={classes.speedDial}
          icon={<SpeedDialIcon />}
          open={this.state.open}
          onOpen={this.setOpen}
          onClose={this.setClose}
        >
          <SpeedDialAction
            tooltipTitle="Add"
            icon={<Add />}
            onClick={this.addCounter}
          />
          <SpeedDialAction
            tooltipTitle="Clear"
            icon={<ClearAll />}
            onClick={this.clearCounters}
          />
        </SpeedDial>
      </Container>
    );
  }

  addCounter() {
    this.setState((state) => {
      this.counterNum += 1;
      return {
        counters: state.counters.set(
          this.counterNum,
          <ClickCounter
            idx={this.counterNum}
            removeCounter={this.removeCounter}
          />
        ),
      };
    });
  }

  removeCounter(idx: number) {
    this.setState((state) => {
      return { counters: state.counters.delete(idx) };
    });
  }

  clearCounters() {
    this.setState(
      (state) => {
        this.counterNum = 0;
        return { counters: state.counters.clear() };
      },
      () => {
        this.addCounter();
        this.setClose();
      }
    );
  }

  setOpen() {
    this.setState(() => ({ open: true }));
  }

  setClose() {
    this.setState(() => ({ open: false }));
  }
}

export default withStyles(styles)(App);
