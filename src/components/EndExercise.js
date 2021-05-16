import React from "react";
import { useHistory } from "react-router-dom";
import fractaLogo from "../assets/img/fracta-logo.svg";

export default function ExerciseTimer() {
  const history = useHistory();
  const start = () => {
    history.push("/");
  };
  return (
    <div className="EndExercise">
      <div></div>
      <div>
        <div>
          <h2>
            Congratulations, <p>you did it!</p>
          </h2>
        </div>
        <div className="btn" onClick={start}>
          finish
        </div>
      </div>
      <div>
        <a
          href="https://fractaart.com"
          rel="noreferrer noopener"
          target="_blank"
        >
          <img src={fractaLogo} alt="fracta art logo" />
          <p>by Fracta</p>
        </a>
      </div>
    </div>
  );
}
