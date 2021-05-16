import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Timer from "react-compound-timer";
import Sound from "react-sound";

import alarm from "../assets/sound/alarm.wav";

export default function Resting() {
  const history = useHistory();
  const [exerciseTimeTotal] = useState(
    localStorage.getItem("exerciseRestTimeTotal")
  );
  const [exerciseRepeatsInitial] = useState(
    localStorage.getItem("exerciseRepeatsInitial")
  );
  const [exerciseRepeats] = useState(localStorage.getItem("exerciseRepeats"));

  //get sound state from the localstorage
  const [soundState] = useState(localStorage.getItem("playSound"));

  const goResting = () => {
    history.push("/de");
  };
  const goHome = () => {
    history.push("/");
    localStorage.setItem("exerciseRepeats", exerciseRepeatsInitial);
  };
  return (
    <div className="Resting">
      {soundState === "true" ? (
        <Sound url={alarm} playStatus={Sound.status.PLAYING} />
      ) : (
        ""
      )}
      <div className="resting-time-container">
        <p>
          {exerciseRepeats}/{exerciseRepeatsInitial}
        </p>
        <h2>Rest</h2>
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
