import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function ChooseExerciseRepeats() {
  const history = useHistory();

  //main state
  const [exerciseRepeats, setExerciseRepeats] = useState(0);

  const [showCustom, setShowCustom] = useState(false);
  const [addRepeats, setAddRepeats] = useState(0);
  const [btnActive, setBtnActive] = useState(false);
  const dataExerciseRepeats = [
    { id: 1, text: "1" },
    { id: 2, text: "2" },
    { id: 3, text: "3" },
    { id: 4, text: "4" },
    { id: 5, text: "5" },
    { id: 6, text: "6" },
    { id: 7, text: "7" },
    { id: 8, text: "8" },
    { id: 9, text: "9" },
    { id: 10, text: "10" },
    { id: 11, text: "12" },
    { id: 12, text: "13" },
    { id: 13, text: "14" },
    { id: 14, text: "15" },
    { id: 15, text: "Custom" },
  ];

  const saveExerciseRepeats = (e) => {
    //check if elements have active and remove it
    let elem = document.querySelector(".active");
    if (elem !== null) {
      elem.classList.remove("active");
    }

    //get value of the button
    setExerciseRepeats(parseInt(e.target.textContent));
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
    setAddRepeats(0);
    setExerciseRepeats(0);

    //disable button
    setBtnActive(false);
  };

  const backToExerciseTime = () => {
    //back to start screen
    history.push("/cet");
  };

  const setCustomRepeats = (e) => {
    //set repeats to state
    setAddRepeats(parseInt(e.target.value) || 0);

    if (e.target.value > 0) {
      //enable button
      setBtnActive(true);
    } else {
      //disable button
      setBtnActive(false);
    }
  };

  const repeatsReady = () => {
    //send to local storage
    localStorage.setItem("exerciseRepeats", `${addRepeats}`);
    localStorage.setItem("exerciseRepeatsInitial", `${addRepeats}`);

    //validade if the button is active
    if (btnActive) {
      history.push("/start");
    }
  };

  const btnValidade = () => {
    //send to local storage
    localStorage.setItem("exerciseRepeats", `${exerciseRepeats}`);
    localStorage.setItem("exerciseRepeatsInitial", `${exerciseRepeats}`);

    //validade if the button is active
    if (btnActive) {
      history.push("/start");
    }
  };

  return (
    <div className="ChooseExerciseRepeats">
      {!showCustom ? (
        <div>
          <div className="dots-container">
            <div className="dots"></div>
            <div className="dots"></div>
            <div className="dots active-dot"></div>
          </div>
          <h2>Exercise Repeats</h2>
          <div className="choose-exercise-time">
            {dataExerciseRepeats.map((item) => (
              <div
                key={item.id}
                className={`time item-${item.id}`}
                id={item.id}
                onClick={saveExerciseRepeats}
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
            <div className="dots"></div>
            <div className="dots active-dot"></div>
          </div>
          <h2>Custom repeats</h2>
          <div className="choose-custom-time">
            <div
              className="choose-time-box"
              style={{ gridTemplateColumns: "auto" }}
            >
              <div>
                <input
                  type="text"
                  pattern="[\d]{9}"
                  maxLength="2"
                  onChange={setCustomRepeats}
                />
                <p>repeats</p>
              </div>
            </div>
            <div className="btn-box">
              <div className="btn" onClick={customTimeBack}>
                Back
              </div>
              <div
                className={`btn ${btnActive ? "btn-active" : "disabled"}`}
                onClick={repeatsReady}
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
