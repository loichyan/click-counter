import React from "react";
import * as MUI from "@material-ui/core";
import * as ICONS from "@material-ui/icons";
import dateFormat from "dateformat";

import * as BLOC from "../bloc";

export class CounterView extends React.PureComponent {
  render() {
    return (
      <MUI.Box>
        <BLOC.CounterViewBloc.Builder
          builder={(state) => (
            <MUI.Grid container justify="center" spacing={2}>
              {state.counters
                .filter((val) => val instanceof BLOC.CounterBlocInner)
                .map((val) => {
                  const counterBloc = val!;
                  return (
                    <React.Fragment key={counterBloc.idx}>
                      <MUI.Grid item>
                        <BLOC.CounterBloc.Provider create={() => counterBloc!}>
                          <Counter />
                        </BLOC.CounterBloc.Provider>
                      </MUI.Grid>
                    </React.Fragment>
                  );
                })}
            </MUI.Grid>
          )}
        />
      </MUI.Box>
    );
  }
}

interface CounterState {
  open: boolean;
}

class Counter extends React.PureComponent<{}, CounterState> {
  constructor(props: {}) {
    super(props);
    this.state = { open: false };

    this.setOpen = this.setOpen.bind(this);
    this.setClose = this.setClose.bind(this);
    this.handleOk = this.handleOk.bind(this);
  }

  render() {
    return (
      <BLOC.CounterBloc.WithContext
        builder={(counterBloc) => (
          <BLOC.RecordsBloc.Provider create={() => counterBloc.state.records}>
            <BLOC.TitleBloc.Provider create={() => counterBloc.state.title}>
              <MUI.Box>
                <MUI.Card>
                  <BLOC.RecordsBloc.WithContext
                    builder={(recordsBloc) => (
                      <MUI.CardActionArea
                        onClick={() => recordsBloc.pushRecord()}
                      >
                        <MUI.CardMedia>
                          <CounterNum />
                        </MUI.CardMedia>
                        <MUI.CardContent>
                          <CounterInfo />
                        </MUI.CardContent>
                      </MUI.CardActionArea>
                    )}
                  />
                  <MUI.CardActions>
                    <MUI.Grid container direction="row">
                      <MUI.Grid item>
                        <MUI.IconButton
                          aria-label="settings"
                          onClick={this.setOpen}
                        >
                          <ICONS.Settings />
                        </MUI.IconButton>
                      </MUI.Grid>
                      <MUI.Grid container item xs justify="flex-end">
                        <BLOC.RecordsBloc.WithContext
                          builder={(recordsBloc) => (
                            <MUI.IconButton
                              aria-label="backspace"
                              onClick={() => recordsBloc.popRecord()}
                            >
                              <ICONS.Backspace />
                            </MUI.IconButton>
                          )}
                        />
                      </MUI.Grid>
                    </MUI.Grid>
                  </MUI.CardActions>
                </MUI.Card>
                <MUI.Dialog open={this.state.open} onClose={this.setClose}>
                  <MUI.DialogTitle>Settings</MUI.DialogTitle>
                  <MUI.DialogContent>
                    <BLOC.TitleBloc.WithContext
                      builder={(titleBloc) => (
                        <MUI.TextField
                          fullWidth
                          label={titleBloc.defaultTitle}
                          defaultValue={titleBloc.state}
                          onChange={(e) => titleBloc.setTitle(e.target.value)}
                        ></MUI.TextField>
                      )}
                    />
                  </MUI.DialogContent>
                  <MUI.DialogActions>
                    <BLOC.CounterViewBloc.WithContext
                      builder={(counterViewBloc) => (
                        <MUI.Button
                          color="secondary"
                          size="medium"
                          onClick={() => {
                            counterViewBloc.removeCounter(counterBloc.idx);
                            this.setClose();
                          }}
                        >
                          Delete
                        </MUI.Button>
                      )}
                    />
                    <MUI.Button
                      color="primary"
                      size="medium"
                      onClick={this.handleOk}
                    >
                      Ok
                    </MUI.Button>
                  </MUI.DialogActions>
                </MUI.Dialog>
              </MUI.Box>
            </BLOC.TitleBloc.Provider>
          </BLOC.RecordsBloc.Provider>
        )}
      />
    );
  }

  setOpen() {
    this.setState({ open: true });
  }

  setClose() {
    this.setState({ open: false });
  }

  handleOk() {
    this.setClose();
  }
}

class CounterNum extends React.PureComponent {
  render() {
    return (
      <MUI.Box width="9rem" height="5rem" bgcolor={MUI.colors.teal[400]}>
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <style type="text/css">
            {`
              .countText {
                color: ${MUI.colors.common.white};
                fill: currentColor;
                stroke: currentColor;
                text-anchor: middle;
                dominant-baseline: middle;
              }
            `}
          </style>
          <BLOC.RecordsBloc.Builder
            builder={(records) => (
              <g>
                <text
                  x="50%"
                  y="50%"
                  className="countText"
                  fontSize="50"
                  fontWeight="bold"
                  transform="translate(0 1)"
                >
                  {records.size}
                </text>
                <text
                  x="50%"
                  y="50%"
                  className="countText"
                  fontSize="150"
                  fontWeight="bold"
                  strokeWidth="10"
                  opacity="0.3"
                  transform="translate(0 10)"
                >
                  {records.size}
                </text>
              </g>
            )}
          />
        </svg>
      </MUI.Box>
    );
  }
}

class CounterInfo extends React.PureComponent {
  render() {
    return (
      <MUI.Box>
        <BLOC.TitleBloc.Builder
          builder={(title, titleBloc) => (
            <MUI.Box color="text.primary">
              <MUI.Typography variant="body1">
                {title || titleBloc.defaultTitle}
              </MUI.Typography>
            </MUI.Box>
          )}
        />
        <BLOC.RecordsBloc.Builder
          builder={(records) => {
            console.log(records);
            return (
              <MUI.Box color="text.secondary">
                {records
                  .map((v, k): [Date, number] => [v, k])
                  .slice(-3)
                  .map(([record, idx]) => (
                    <React.Fragment key={idx}>
                      <MUI.Typography variant="body1">
                        {`${dateFormat(record, "hh:mm:ss")} #${idx}`}
                      </MUI.Typography>
                    </React.Fragment>
                  ))}
              </MUI.Box>
            );
          }}
        />
      </MUI.Box>
    );
  }
}
