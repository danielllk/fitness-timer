import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import fractaLogo from "../assets/img/fracta-logo.svg";

export default function Intro() {
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("exerciseRepeats")) {
      history.push("/start");
    }
  }, []);
  return (
    <div className="Intro">
      <div></div>
      <div>
        <h1>Fitness Timer</h1>
        <div className="btn" onClick={() => history.push("/cet")}>
          Start
        </div>
      </div>
      <div>
        <a href="https://fractaart.com" rel="noopener" target="_blank">
          <img src={fractaLogo} alt="fracta art logo" />
          <p>by Fracta</p>
        </a>
      </div>
    </div>
  );
}
