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
  records: Immutable.List<Date>;
  pushRecord(date: Date): void;
  popRecord(): void;
  removeSelf(): void;
}

interface ClickCounterState {
  title?: string;
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
    this.state = { open: false };

    this.addRecord = this.addRecord.bind(this);
    this.setTitle = this.setTitle.bind(this);
    this.popRecord = this.popRecord.bind(this);
    this.setOpen = this.setOpen.bind(this);
    this.setClose = this.setClose.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.removeSelf = this.removeSelf.bind(this);
  }

  render() {
    return (
      <Box>
        <Card>
          <CardActionArea onClick={this.addRecord}>
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
                    {this.props.records.size}
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
                    {this.props.records.size}
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
                {this.props.records
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
                <IconButton aria-label="backspace" onClick={this.popRecord}>
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

  addRecord() {
    this.props.pushRecord(new Date());
  }

  popRecord() {
    this.props.popRecord();
  }

  setTitle(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value.length === 0) {
      this.setState({ title: undefined });
      return;
    }
    this.setState({ title: e.target.value });
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

  removeSelf() {
    this.props.removeSelf();
    this.setClose();
  }
}

export default ClickCounter;
