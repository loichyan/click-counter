import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  IconButton,
  Box,
  CardMedia,
  Typography,
  colors,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@material-ui/core";
import { Backspace, Settings } from "@material-ui/icons";
import Immutable from "immutable";
import React from "react";
import dateFormat from "dateformat";

export interface ClickCounterProps {
  idx: number;
  removeCounter(idx: number): void;
}

export interface ClickCounterState {
  title?: string;
  records: Immutable.List<Date>;
  open: boolean;
}

export class ClickCounter extends React.Component<
  ClickCounterProps,
  ClickCounterState
> {
  private readonly defaultTitle: string;

  constructor(props: ClickCounterProps) {
    super(props);
    this.defaultTitle = `Counter #${this.props.idx}`;
    this.state = { records: Immutable.List(), open: false };

    this.addCount = this.addCount.bind(this);
    this.setTitle = this.setTitle.bind(this);
    this.reduceCount = this.reduceCount.bind(this);
    this.setOpen = this.setOpen.bind(this);
    this.setClose = this.setClose.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.removeSelf = this.removeSelf.bind(this);
  }

  getRecords(): Immutable.List<Date> {
    return this.state.records;
  }

  render() {
    return (
      <Box>
        <Card>
          <CardActionArea onClick={this.addCount}>
            <CardMedia>
              <Box width="9rem" height="5rem" bgcolor={colors.teal[400]}>
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  <style type="text/css">
                    {`
                    .countText {
                      color: ${colors.common.white};
                      fill: currentColor;
                      stroke: currentColor;
                      text-anchor: middle;
                      dominant-baseline: middle;
                    }
                  `}
                  </style>
                  <text
                    x="50%"
                    y="50%"
                    className="countText"
                    fontSize="50"
                    fontWeight="bold"
                    transform="translate(0 1)"
                  >
                    {this.state.records.size}
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
                    {this.state.records.size}
                  </text>
                </svg>
              </Box>
            </CardMedia>
            <CardContent>
              <Box color="text.primary">
                <Typography variant="body1">
                  {this.state.title === undefined
                    ? this.defaultTitle
                    : this.state.title}
                </Typography>
              </Box>
              <Box color="text.secondary">
                {this.state.records
                  .map((v, k): [Date, number] => [v, k])
                  .slice(-3)
                  .map(([record, idx]) => (
                    <React.Fragment key={idx}>
                      <Typography variant="body1">
                        {`${dateFormat(record, "hh:mm:ss")} #${idx}`}
                      </Typography>
                    </React.Fragment>
                  ))}
              </Box>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Grid container direction="row">
              <Grid item>
                <IconButton aria-label="settings" onClick={this.setOpen}>
                  <Settings />
                </IconButton>
              </Grid>
              <Grid container item xs justify="flex-end">
                <IconButton aria-label="backspace" onClick={this.reduceCount}>
                  <Backspace />
                </IconButton>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
        <Dialog open={this.state.open} onClose={this.setClose}>
          <DialogTitle>Settings</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label={this.defaultTitle}
              defaultValue={this.state.title}
              onChange={this.setTitle}
            ></TextField>
          </DialogContent>
          <DialogActions>
            <Button color="secondary" size="medium" onClick={this.removeSelf}>
              Delete
            </Button>
            <Button color="primary" size="medium" onClick={this.handleOk}>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  }

  addCount() {
    this.setState((state) => {
      return { records: state.records.push(new Date()) };
    });
  }

  reduceCount() {
    if (this.state.records.size === 0) {
      return;
    }
    this.setState((state) => {
      return { records: state.records.pop() };
    });
  }

  setTitle(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState(() => {
      if (e.target.value.length === 0) {
        return { title: undefined };
      }
      return { title: e.target.value };
    });
  }

  setOpen() {
    this.setState(() => ({
      open: true,
    }));
  }

  setClose() {
    this.setState(() => ({
      open: false,
    }));
  }

  handleOk() {
    this.setClose();
  }

  removeSelf() {
    this.props.removeCounter(this.props.idx);
    this.setClose();
  }
}

export default ClickCounter;
