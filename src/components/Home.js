import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Quizrender from "./Quizrender";

export default function Home() {
  const [initial, setInitial] = useState(false);
  const [initial1, setInitial1] = useState(false);

  const handleChange = () => {
    setInitial(true);
  };
  const handleChange1 = () => {
    setInitial1(true);
  };

  const button = (
    <>
      <Grid
        item
        container
        style={{ height: "50vh", width: "100%" }}
        justify="center"
      >
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleChange}>
            Lets Play
          </Button>
        </Grid>
      </Grid>
    </>
  );
  const button2 = (
    <>
      <Grid
        item
        container
        style={{ height: "50vh", width: "100%", marginTop: "2rem" }}
        justify="center"
      >
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleChange1}>
            Lets Play
          </Button>
        </Grid>
      </Grid>
    </>
  );

  return (
    <Grid container direction="column">
      <Grid item>
        <Typography variant="h2" gutterBottom align="center">
          Arithmetic Quiz
        </Typography>
      </Grid>

      <Grid item container style={{ marginTop: "2rem" }}>
        {initial ? <Quizrender /> : button}
        {initial1 ? <Quizrender /> : button2}
      </Grid>
    </Grid>
  );
}
