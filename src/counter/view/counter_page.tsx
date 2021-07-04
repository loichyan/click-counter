import React from "react";
import * as MUI from "@material-ui/core";
import * as MUI2 from "@material-ui/lab";
import * as ICONS from "@material-ui/icons";
import dateFormat from "dateformat";

import * as BLOC from "../bloc";
import { CounterView } from "./counter_view";

export class CounterPage extends React.PureComponent {
  private readonly counterViewBloc = new BLOC.CounterViewBlocInner();

  componentDidMount() {
    this.counterViewBloc.addCounter();
  }

  render() {
    return (
      <BLOC.CounterViewBloc.Provider create={() => this.counterViewBloc}>
        <React.Fragment>
          <MUI.Container>
            <CounterView />
          </MUI.Container>
          <SpeedDial />
        </React.Fragment>
      </BLOC.CounterViewBloc.Provider>
    );
  }
}

const styles = (theme: MUI.Theme) =>
  MUI.createStyles({
    speedDial: {
      position: "fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  });

export interface SpeedDialProps extends MUI.WithStyles<typeof styles> {}

interface SpeedDialState {
  readonly open: boolean;
}

class SpeedDialInner extends React.PureComponent<
  SpeedDialProps,
  SpeedDialState
> {
  static readonly contextType = BLOC.CounterViewBloc.contextType;
  readonly context!: React.ContextType<typeof BLOC.CounterViewBloc.contextType>;

  constructor(props: SpeedDialProps) {
    super(props);

    this.state = { open: false };
  }

  exportData = () => {
    return this.context.state.counters
      .filter((val) => val instanceof BLOC.CounterBlocInner)
      .map((val) => {
        const counterBloc = val!;
        return {
          title:
            counterBloc.state.title.state ||
            counterBloc.state.title.defaultTitle,
          records: counterBloc.state.records.state.toJSON(),
        };
      })
      .toJSON();
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
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
            onClick={this.context.addCounter}
          />
          <MUI2.SpeedDialAction
            tooltipTitle="Clear"
            icon={<ICONS.ClearAll />}
            onClick={() => {
              this.context.clearCounter();
              this.context.addCounter();
              this.setClose();
            }}
          />
          <MUI2.SpeedDialAction
            tooltipTitle="Export"
            icon={<ICONS.Share />}
            onClick={this.export}
          />
        </MUI2.SpeedDial>
      </React.Fragment>
    );
  }

  setOpen = () => {
    this.setState({ open: true });
  };

  setClose = () => {
    this.setState({ open: false });
  };

  export = () => {
    const data = this.exportData();
    const dataStr = JSON.stringify(data);

    console.info(data);

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
  };
}

const SpeedDial = MUI.withStyles(styles)(SpeedDialInner);
