import React, { useEffect, useState } from "react";

/**
 * define styles object for inline styling
 */
const styles = {
  wrapper: {
    padding: 50,
    textAlign: "center"
  },
  inputsWrapper: {
    width: "50%",
    display: "inline-block",
    textAlign: "center"
  },
  colorWrapper: {
    width: 100,
    height: 100,
    border: "1px solid lightgrey",
    borderRadius: "10px",
    margin: "15px auto"
  },
  winnerPopup: {
    position: "fixed",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    background: "rgba(0, 0, 0, 0.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  winnerPopupContent: {
    background: "white",
    boxShadow: "0px 0px 5px rgba(0,0,0,.45)",
    padding: 50
  }
};

/**
 * define colors array only once!
 */
const colors = [
  "blue",
  "red",
  "green",
  "orange",
  "purple",
  "pink",
  "brown",
  "black",
  "gold",
  "olive",
  "salmon",
  "yellow",
  "yellowGreen",
  "violet",
  "silver",
  "maroon",
  "lime"
];

/**
 * re-usable function to pick random color from array
 */
const pickRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

/**
 * re-usable function to compare colors
 */
const isSameColors = (first, second) => {
  if (first === null || second === null) return false;

  return first === second;
};

/**
 * use functional component instead of class
 */
const ChangeColorGame = () => {
  const [firstColor, setFirstColor] = useState(null);
  const [secondColor, setSecondColor] = useState(null);
  const [winner, setWinner] = useState(false);

  const reset = () => {
    setFirstColor(null);
    setSecondColor(null);
    setWinner(false);
  };

  const changeColor = item => {
    switch (item) {
      case "first":
        setFirstColor(pickRandomColor());
        break;
      case "second":
        setSecondColor(pickRandomColor());
        break;
      default:
        return;
    }
  };

  /**
   * this effect listening on change firstColor / secondColor and fire if statement
   */
  useEffect(() => {
    if (isSameColors(firstColor, secondColor)) setWinner(true);
  }, [firstColor, secondColor]);

  return (
    <>
      <div style={styles.wrapper}>
        <h1>Uhádni farbu</h1>
        <div>
          <div style={styles.inputsWrapper}>
            <button onClick={() => changeColor("first")}>Zvoľ si farbu</button>
            <div
              style={{
                ...styles.colorWrapper,
                background: firstColor ? firstColor : "none"
              }}
            />
          </div>

          <div style={styles.inputsWrapper}>
            <button onClick={() => changeColor("second")}>Uhádni farbu</button>
            <div
              style={{
                ...styles.colorWrapper,
                background: secondColor ? secondColor : "none"
              }}
            />
          </div>

          {winner && (
            <div style={styles.winnerPopup}>
              <div style={styles.winnerPopupContent}>
                Vyhral si!
                <div onClick={() => reset()}>Opakovať</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChangeColorGame;
