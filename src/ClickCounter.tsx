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
import React from "react";

interface ClickCounterProps {
  idx: number;
}

interface ClickCounterState {
  title: string;
  count: number;
  open: boolean;
}

export default class ClickCounter extends React.Component<
  ClickCounterProps,
  ClickCounterState
> {
  private readonly defaultTitle: string;

  constructor(props: ClickCounterProps) {
    super(props);
    this.defaultTitle = `Counter #${this.props.idx}`;
    this.state = { count: 0, title: this.defaultTitle, open: false };

    this.addCount = this.addCount.bind(this);
    this.setTitle = this.setTitle.bind(this);
    this.reduceCount = this.reduceCount.bind(this);
    this.setOpen = this.setOpen.bind(this);
    this.setClose = this.setClose.bind(this);
    this.handleOk = this.handleOk.bind(this);
  }

  render() {
    return (
      <Card>
        <CardActionArea onClick={this.addCount}>
          <CardMedia>
            <Box
              color={colors.common.white}
              width="10rem"
              height="5rem"
              bgcolor={colors.teal[400]}
            >
              <svg width="100%" height="100%" viewBox="0 0 100 100">
                <style type="text/css">
                  {`
                    .countText {
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
                  {this.state.count}
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
                  {this.state.count}
                </text>
              </svg>
            </Box>
          </CardMedia>
          <CardContent>
            <Typography variant="body1" style={{ fontWeight: "bold" }}>
              {this.state.title}
            </Typography>
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
            <Button onClick={this.handleOk} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    );
  }

  addCount() {
    const count = this.state.count + 1;
    this.setState({ count });
  }

  reduceCount() {
    if (this.state.count === 0) {
      return;
    }
    const count = this.state.count - 1;
    this.setState({ count });
  }

  setTitle(e: React.ChangeEvent<HTMLInputElement>) {
    const title =
      e.target.value.length === 0 ? this.defaultTitle : e.target.value;
    this.setState({ title });
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
