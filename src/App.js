import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Intro from "./components/Intro";
import ChooseExerciseTime from "./components/ChooseExerciseTime";
import ChooseExerciseRestTime from "./components/ChooseExerciseRestTime";
import ChooseExerciseRepeats from "./components/ChooseExerciseRepeats";
import Start from "./components/Start";
import ExerciseTimer from "./components/ExerciseTimer";
import ExerciseRestTimer from "./components/ExerciseRestTimer";
import EndExercise from "./components/EndExercise";
import "./assets/css/index.scss";
import DoingExercise from "./components/DoingExercise";
import Resting from "./components/Resting";
import sound from "./assets/img/sound-icon.svg";
export default function App() {
  const [playSound, setPlaySound] = useState(false);

  //add state of sound to localstorage
  localStorage.setItem("playSound", playSound);

  const soundOnOff = () => {
    setPlaySound(!playSound);
  };
  return (
    <Router>
      <div>
        <div
          className={`sound-icon ${playSound ? "sound-active" : ""}`}
          onClick={soundOnOff}
        >
          <img src={sound} alt=" sound icon" />
        </div>
        <Switch>
          <Route exact path="/">
            <Intro />
          </Route>
          <Route exact path="/cet">
            <ChooseExerciseTime />
          </Route>
          <Route exact path="/cert">
            <ChooseExerciseRestTime />
          </Route>
          <Route exact path="/cer">
            <ChooseExerciseRepeats />
          </Route>
          <Route exact path="/start">
            <Start />
          </Route>
          <Route exact path="/et">
            <ExerciseTimer />
          </Route>
          <Route exact path="/ert">
            <ExerciseRestTimer />
          </Route>
          <Route exact path="/ee">
            <EndExercise />
          </Route>
          <Route exact path="/de">
            <DoingExercise />
          </Route>
          <Route exact path="/r">
            <Resting />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
