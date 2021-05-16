import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function ChooseExerciseTime() {
  const history = useHistory();

  //main state
  const [exerciseTime, setExerciseTime] = useState(0);

  const [showCustom, setShowCustom] = useState(false);
  const [addMin, setAddMin] = useState(0);
  const [addSec, setAddSec] = useState(0);
  const [addSecMin, setAddSecMin] = useState(0);
  const [btnActive, setBtnActive] = useState(false);
  const dataExerciseTime = [
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

  const saveExerciseTime = (e) => {
    //check if elements have active and remove it
    let elem = document.querySelector(".active");
    if (elem !== null) {
      elem.classList.remove("active");
    }

    //get value of the button
    setExerciseTime(parseInt(e.target.textContent));
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
    setAddSecMin(0);
    setExerciseTime(0);

    //disable button
    setBtnActive(false);
  };

  const backToStart = () => {
    //back to start screen
    history.push("/");
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
    localStorage.setItem("exerciseTimeTotal", `${calculateSecMin}`);

    //validade if the button is active
    if (btnActive) {
      history.push("/cert");
    }
  };

  const btnValidade = () => {
    //send to local storage
    localStorage.setItem("exerciseTimeTotal", `${exerciseTime}`);

    //validade if the button is active
    if (btnActive) {
      history.push("/cert");
    }
  };

  return (
    <div className="ChooseExerciseTime">
      {!showCustom ? (
        <div>
          <div className="dots-container">
            <div className="dots active-dot"></div>
            <div className="dots"></div>
            <div className="dots"></div>
          </div>
          <h2>Choose the exercise time</h2>
          <div className="choose-exercise-time">
            {dataExerciseTime.map((item) => (
              <div
                key={item.id}
                className={`time item-${item.id}`}
                id={item.id}
                onClick={saveExerciseTime}
              >
                {item.text}
              </div>
            ))}
          </div>
          <div className="choose-custom-time">
            {" "}
            <div className="btn-box">
              <div className="btn" onClick={backToStart}>
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
            <div className="dots active-dot"></div>
            <div className="dots"></div>
            <div className="dots"></div>
          </div>
          <h2>Custom exercise time</h2>
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
