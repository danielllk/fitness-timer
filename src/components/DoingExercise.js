import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Timer from "react-compound-timer";
import Sound from "react-sound";

import alarm from "../assets/sound/alarm.wav";

export default function DoingExercise() {
  const history = useHistory();
  const [exerciseTimeTotal] = useState(
    localStorage.getItem("exerciseTimeTotal")
  );
  const [exerciseRepeats] = useState(localStorage.getItem("exerciseRepeats"));
  const [exerciseRepeatsInitial] = useState(
    localStorage.getItem("exerciseRepeatsInitial")
  );

  //get sound state from the localstorage
  const [soundState] = useState(localStorage.getItem("playSound"));
  console.log(soundState);

  const goResting = () => {
    if (exerciseRepeats < 2) {
      history.push("/ee");
      localStorage.setItem("exerciseRepeats", exerciseRepeatsInitial);
    } else {
      history.push("/r");
      localStorage.setItem("exerciseRepeats", exerciseRepeats - 1);
    }
  };

  const goHome = () => {
    history.push("/");
    localStorage.setItem("exerciseRepeats", exerciseRepeatsInitial);
  };
  return (
    <div className="DoingExercise">
      {soundState === "true" ? (
        <Sound url={alarm} playStatus={Sound.status.PLAYING} />
      ) : (
        ""
      )}
      <div className="exercise-time-container">
        <p>
          {exerciseRepeats}/{exerciseRepeatsInitial}
        </p>
        <h2>Exercise</h2>
        <div className="start-btn">
          <Timer
            initialTime={exerciseTimeTotal * 1000 + 100}
            direction="backward"
            formatValue={(value) => `${value < 10 ? `0${value}` : value}`}
            startImmediately={true}
            checkpoints={[
              {
                time: 0,
                callback: () => goResting(),
              },
            ]}
          >
            {() => (
              <React.Fragment>
                <Timer.Minutes />:
                <Timer.Seconds />
              </React.Fragment>
            )}
          </Timer>
        </div>
        <div className="btn" onClick={goHome}>
          exit
        </div>
      </div>
    </div>
  );
}
