import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";
import Scorecard from "./Scorecard";

export default function Quizrender(props) {
  console.log(props);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(20);
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState({ ques: "", ans: "" });
  const [questionIndex, setQuestionIndex] = useState(0);
  let array = [];

  useEffect(() => {
    generateQuestion();

    let initialTime = setInterval(() => {
      setTime((times) => {
        if (times === 0) {
          submitHandler();
          setTime(time);
        }
        return times - 1;
      });
    }, 1000);

    return () => {
      clearInterval(initialTime);
    };
  }, []);

  const generateQuestion = () => {
    function getRandom(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
    let x, y, symbol;
    const operators = ["+", "-", "*", "/"];

    x = getRandom(0, 10);
    y = getRandom(0, 10);
    symbol = operators[getRandom(0, 4)];
    let question = `${x} ${symbol} ${y} = ?`;
    let answer;
    switch (symbol) {
      case "+":
        answer = x + y;
        break;
      case "-":
        answer = x - y;
        break;
      case "÷":
        answer = x / y;
        break;
      case "*":
        answer = x * y;
        break;
      default:
        break;
    }
    array = [...array, { question, answer }];
    setQuestion({ ques: question, ans: answer });
  };

  const checkAnswer = () => {
    if (parseInt(answer) === question.ans) {
      changeScore(1);
    } else {
      changeScore(-1);
    }
  };
  const changeScore = (value) => {
    setScore((score) => score + value);
  };

  const submitHandler = () => {
    array = [...array, { question: question.ques, answer: question.ans }];
    checkAnswer();
    generateQuestion();
    setAnswer("");
    setQuestionIndex(questionIndex + 1);
    setTime(20);
  };
  const handleReset = () => {
    setTimeout(() => {
      setScore(0);
      setQuestion("");
      setTime(0);
      setQuestionIndex(0);
    }, 100);
  };
  return (
    <Grid container direction="column" style={{ marginTop: "1rem" }}>
      {questionIndex < 20 && (
        <Grid container direction="column">
          <Grid item container justify="space-around">
            <Grid item>
              <Typography variant="h3" gutterBottom>
                Question {questionIndex} /20
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                style={{ marginRight: "1em" }}
              >
                Time : {time} sec
              </Button>
              <Button variant="outlined" color="primary">
                Score : {score}
              </Button>
            </Grid>
          </Grid>
          <Grid item style={{ marginLeft: "15rem", marginTop: "2rem" }}>
            <Typography variant="h4" gutterBottom>
              {question.ques}
            </Typography>
            <form noValidate autoComplete="off">
              <TextField
                id="standard-basic"
                label="Answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    submitHandler();
                  }
                }}
              />
            </form>
          </Grid>
          <Grid item style={{ marginLeft: "15rem", marginTop: "2rem" }}>
            <Button variant="contained" color="primary" onClick={submitHandler}>
              Submit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleReset}
              style={{ marginLeft: "1rem" }}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      )}

      {questionIndex > 19 && (
        <>
          <Scorecard score={score} array={array} />
        </>
      )}
    </Grid>
  );
}
