import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
export default function Scorecard(props) {
  console.log(props);
  return (
    <Grid container alignItems="center" justify="center">
      <Grid item>
        <Typography variant="h3" gutterBottom>
          Your Score : {props.score}
        </Typography>
      </Grid>
    </Grid>
  );
}
