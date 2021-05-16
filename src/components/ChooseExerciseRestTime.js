import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function ChooseExerciseRestTime() {
  const history = useHistory();

  //main state
  const [exerciseRestTime, setexerciseRestTime] = useState(0);

  const [showCustom, setShowCustom] = useState(false);
  const [addMin, setAddMin] = useState(0);
  const [addSec, setAddSec] = useState(0);
  const [btnActive, setBtnActive] = useState(false);
  const dataexerciseRestTime = [
    { id: 1, text: "5s" },
    { id: 2, text: "10s" },
    { id: 3, text: "15s" },
    { id: 4, text: "20s" },
    { id: 5, text: "25s" },
    { id: 6, text: "30s" },
    { id: 7, text: "35s" },
    { id: 8, text: "40s" },
    { id: 9, text: "45s" },
    { id: 10, text: "50s" },
    { id: 11, text: "55s" },
    { id: 12, text: "60s" },
    { id: 13, text: "55s" },
    { id: 14, text: "60s" },
    { id: 15, text: "Custom" },
  ];

  const saveExerciseRestTime = (e) => {
    //check if elements have active and remove it
    let elem = document.querySelector(".active");
    if (elem !== null) {
      elem.classList.remove("active");
    }

    //get value of the button
    setexerciseRestTime(parseInt(e.target.textContent));
    console.log(e.target.id);

    //add active class
    document.getElementById(e.target.id).classList.add("active");

    //show custom time state view
    if (e.target.textContent === "Custom") {
      setShowCustom(true);

      //disable button
      setBtnActive(false);
    } else {
      //enable button
      setBtnActive(true);
    }
  };

  const customTimeBack = () => {
    //show custom time menu
    setShowCustom(false);
    //reset custom min and sec
    setAddMin(0);
    setAddSec(0);
    setexerciseRestTime(0);

    //disable button
    setBtnActive(false);
  };

  const backToExerciseTime = () => {
    //back to start screen
    history.push("/cet");
  };

  const setCustomMin = (e) => {
    //set min to state
    setAddMin(parseInt(e.target.value) || 0);

    if (e.target.value > 0 || addSec > 0) {
      //enable button
      setBtnActive(true);
    } else {
      //disable button
      setBtnActive(false);
    }
  };

  const setCustomSec = (e) => {
    //set sec to state
    setAddSec(parseInt(e.target.value) || 0);

    if (e.target.value > 2 || addMin > 0) {
      //enable button
      setBtnActive(true);
    } else {
      //disable button
      setBtnActive(false);
    }
  };

  const minToSec = () => {
    //convert min to sec
    let calculateSecMin = addMin * 60 + addSec;
    //send to local storage
    localStorage.setItem("exerciseRestTimeTotal", `${calculateSecMin}`);
    //validade if the button is active
    if (btnActive) {
      history.push("/cer");
    }
  };

  const btnValidade = () => {
    //send to local storage
    localStorage.setItem("exerciseRestTimeTotal", `${exerciseRestTime}`);

    //validade if the button is active
    if (btnActive) {
      history.push("/cer");
    }
  };

  return (
    <div className="ChooseExerciseRestTime">
      {!showCustom ? (
        <div>
          <div className="dots-container">
            <div className="dots"></div>
            <div className="dots active-dot"></div>
            <div className="dots"></div>
          </div>
          <h2>Choose Rest time</h2>
          <div className="choose-exercise-time">
            {dataexerciseRestTime.map((item) => (
              <div
                key={item.id}
                className={`time item-${item.id}`}
                id={item.id}
                onClick={saveExerciseRestTime}
              >
                {item.text}
              </div>
            ))}
          </div>
          <div className="choose-custom-time">
            {" "}
            <div className="btn-box">
              <div className="btn" onClick={backToExerciseTime}>
                Back
              </div>
              <div
                className={`btn ${btnActive ? "btn-active" : "disabled"}`}
                onClick={btnValidade}
              >
                Next
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="dots-container">
            <div className="dots"></div>
            <div className="dots active-dot"></div>
            <div className="dots"></div>
          </div>
          <h2>Custom Rest Time</h2>
          <div className="choose-custom-time">
            <div className="choose-time-box">
              <div>
                <input
                  type="text"
                  pattern="[\d]{9}"
                  maxLength="2"
                  onChange={setCustomMin}
                />
                <p>min</p>
              </div>
              <div>
                <input
                  type="text"
                  pattern="[\d]{9}"
                  maxLength="2"
                  onChange={setCustomSec}
                />
                <p>sec</p>
              </div>
            </div>
            <div className="btn-box">
              <div className="btn" onClick={customTimeBack}>
                Back
              </div>
              <div
                className={`btn ${btnActive ? "btn-active" : "disabled"}`}
                onClick={minToSec}
              >
                Next
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
