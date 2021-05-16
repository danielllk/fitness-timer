import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function Start() {
  const history = useHistory();

  const [exerciseRestTimeTotal] = useState(
    localStorage.getItem("exerciseRestTimeTotal")
  );
  const [exerciseRepeats] = useState(localStorage.getItem("exerciseRepeats"));
  const [exerciseTimeTotal] = useState(
    localStorage.getItem("exerciseTimeTotal")
  );
  //minutesExerciseTimeTotal
  const [mett, setMett] = useState();

  //secondsExerciseTimeTotal
  const [sett, setSett] = useState();

  //minutesRestTimeTotal
  const [mrtt, setMrtt] = useState();

  //secondsRestTimeTotal
  const [srtt, setSrtt] = useState();

  const btnChange = () => {
    history.push("/cet");
  };
  useEffect(() => {
    setSett(exerciseTimeTotal);
    if (exerciseTimeTotal > 60) {
      setMett(Math.floor(exerciseTimeTotal / 60));
      setSett(exerciseTimeTotal - mett * 60);
      console.log(mett);
      console.log(sett);
    }
    setSrtt(exerciseRestTimeTotal);
    if (exerciseRestTimeTotal > 60) {
      setMrtt(Math.floor(exerciseRestTimeTotal / 60));
      setSrtt(exerciseRestTimeTotal - mrtt * 60);
      console.log(mrtt);
      console.log(srtt);
    }
  });
  const start = () => {
    history.push("/de");
  };
  return (
    <div className="Start">
      <div className="total-info-container">
        <h2>Main info</h2>
        <div className="total-info-box">
          <p>
            Exercise Time:
            <span>
              {mett < 10 ? `0${mett}` : mett >= 10 ? mett : "00"}
              {sett < 10 ? `:0${sett}` : sett >= 10 ? `:${sett}` : ":00"}
            </span>
          </p>
          <p>
            Rest Time:
            <span>
              {mrtt < 10 ? `0${mrtt}` : mrtt >= 10 ? mrtt : "00"}
              {srtt < 10 ? `:0${srtt}` : srtt >= 10 ? `:${srtt}` : ":00"}
            </span>
          </p>
          <p>
            Repeats: <span>{exerciseRepeats}</span>
          </p>
        </div>
        <div className="btn-box">
          {" "}
          <div className={`btn`} onClick={btnChange}>
            Change
          </div>
        </div>
        <div className="start-btn" onClick={start}>
          start
        </div>
      </div>
    </div>
  );
}
