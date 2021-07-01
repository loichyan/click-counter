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
import { Add, ClearAll, Share } from "@material-ui/icons";
import ClickCounter from "./ClickCounter";
import Immutable from "immutable";
import dateFormat from "dateformat";

const styles = (theme: Theme) =>
  createStyles({
    speedDial: {
      position: "fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  });

export interface AppProps extends WithStyles<typeof styles> {}

interface AppState {
  records: Immutable.OrderedMap<number, Immutable.List<Date>>;
  open: boolean;
}

export class App extends React.Component<AppProps, AppState> {
  counterNum: number = 0;

  constructor(props: AppProps) {
    super(props);
    this.state = {
      records: Immutable.OrderedMap(),
      open: false,
    };

    this.addCounter = this.addCounter.bind(this);
    this.removeCounter = this.removeCounter.bind(this);
    this.setOpen = this.setOpen.bind(this);
    this.setClose = this.setClose.bind(this);
    this.clearCounters = this.clearCounters.bind(this);
    this.export = this.export.bind(this);
  }

  pushRecord(idx: number, date: Date) {
    this.setState((state) => ({
      records: state.records.update(idx, (records) => records.push(date)),
    }));
  }

  popRecord(idx: number) {
    this.setState((state) => ({
      records: state.records.update(idx, (records) => records.pop()),
    }));
  }

  removeCounter(idx: number) {
    this.setState((state) => {
      return { records: state.records.delete(idx) };
    });
  }

  componentDidMount() {
    this.addCounter();
  }

  render() {
    const { classes } = this.props;

    return (
      <Container>
        <Grid container justify="center" spacing={2}>
          {[...this.state.records].map(([counter, records]) => (
            <React.Fragment key={counter}>
              <Grid item>
                <ClickCounter
                  idx={counter}
                  records={records}
                  pushRecord={(date) => this.pushRecord(counter, date)}
                  popRecord={() => this.popRecord(counter)}
                  removeSelf={() => this.removeCounter(counter)}
                />
              </Grid>
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
          <SpeedDialAction
            tooltipTitle="Export"
            icon={<Share />}
            onClick={this.export}
          />
        </SpeedDial>
      </Container>
    );
  }

  addCounter() {
    this.counterNum += 1;
    this.setState((state) => {
      return {
        records: state.records.set(this.counterNum, Immutable.List()),
      };
    });
  }

  clearCounters() {
    this.counterNum = 0;
    this.setState(
      (state) => {
        return { records: state.records.clear() };
      },
      () => {
        this.addCounter();
        this.setClose();
      }
    );
  }

  setOpen() {
    this.setState({ open: true });
  }

  setClose() {
    this.setState({ open: false });
  }

  export() {
    const blob = new Blob([JSON.stringify(this.state.records)], {
      type: "application/json;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `${dateFormat(new Date(), "yyyy-mm-dd-HH-MM-ss")}.json`
    );
    link.click();
    this.setClose();
  }
}

export default withStyles(styles)(App);
