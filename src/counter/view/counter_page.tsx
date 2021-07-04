import React from "react";
import * as MUI from "@material-ui/core";
import * as MUI2 from "@material-ui/lab";
import * as ICONS from "@material-ui/icons";
import dateFormat from "dateformat";

import * as BLOC from "../bloc";
import { CounterView } from "./counter_view";

const styles = (theme: MUI.Theme) =>
  MUI.createStyles({
    speedDial: {
      position: "fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  });

export interface CounterPageProps extends MUI.WithStyles<typeof styles> {}

interface CounterPageState {
  open: boolean;
}

class CounterPageInner extends React.PureComponent<
  CounterPageProps,
  CounterPageState
> {
  private readonly counterViewBloc;

  constructor(props: CounterPageProps) {
    super(props);
    this.state = {
      open: false,
    };

    this.counterViewBloc = new BLOC.CounterViewBlocInner();
    this.counterViewBloc.addCounter();

    this.setOpen = this.setOpen.bind(this);
    this.setClose = this.setClose.bind(this);
    this.export = this.export.bind(this);
  }

  render() {
    const { classes } = this.props;

    return (
      <BLOC.CounterViewBloc.Provider create={() => this.counterViewBloc}>
        <MUI.Container>
          <CounterView />
          <MUI2.SpeedDial
            ariaLabel="speed dial"
            className={classes.speedDial}
            icon={<MUI2.SpeedDialIcon />}
            open={this.state.open}
            onOpen={this.setOpen}
            onClose={this.setClose}
          >
            <MUI2.SpeedDialAction
              tooltipTitle="Add"
              icon={<ICONS.Add />}
              onClick={this.counterViewBloc.addCounter}
            />
            <MUI2.SpeedDialAction
              tooltipTitle="Clear"
              icon={<ICONS.ClearAll />}
              // TODO: add a new counter after clear
              onClick={this.counterViewBloc.clearCounter}
            />
            <MUI2.SpeedDialAction
              tooltipTitle="Export"
              icon={<ICONS.Share />}
              onClick={this.export}
            />
          </MUI2.SpeedDial>
        </MUI.Container>
      </BLOC.CounterViewBloc.Provider>
    );
  }

  setOpen() {
    this.setState({ open: true });
  }

  setClose() {
    this.setState({ open: false });
  }

  export() {
    const data = this.counterViewBloc.state.counters
      .filter((val) => val instanceof BLOC.CounterBlocInner)
      .map((val) => {
        const counterBloc = val!;
        return {
          title:
            counterBloc.state.title.state ||
            counterBloc.state.title.defaultTitle,
          records: counterBloc.state.records.state,
        };
      });
    const dataStr = JSON.stringify(data);

    console.info(`${dataStr}`);

    const blob = new Blob([dataStr], {
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

export const CounterPage = MUI.withStyles(styles)(CounterPageInner);
