import { useState, useEffect } from "react";
import "./App.css";
import Die from "./components/Die";
import Confetti from "react-confetti";
import { nanoid } from "nanoid";

function App() {
  // State
  const [allNewDice, setAllNewDice] = useState(numberArray);
  const [tenzies, setTenzies] = useState(true);
  const [winGame, setwinGame] = useState(false);

  const [time, setTime] = useState({
    minutes: 0,
    seconds: 0,
  });

  const [bestTime, setBestTime] = useState(
    JSON.parse(window.localStorage.getItem("bestTimeEver"))
  );
  const [isActive, setIsActive] = useState(false);

  // Side Effects
  //Timer
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevState) => {
          if (prevState.seconds == 60) {
            prevState.minutes++;
            prevState.seconds = 0;
            return {
              ...prevState,
            };
          } else {
            return {
              ...prevState,
              seconds: prevState.seconds++,
            };
          }
        });
      }, 1000);
    } else if (!isActive) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);
  //Win conditions
  useEffect(() => {
    const winConditionTest = allNewDice.every((die) => {
      return die.isHeld === true && allNewDice[0].value === die.value;
    });

    if (winConditionTest) {
      setwinGame(true);
      setTenzies(true);
      setIsActive(false);
      if (bestTime == null) {
        localStorage.setItem("bestTimeEver", JSON.stringify(time));
        setBestTime(time);
      } else {
        if (time.minutes == bestTime.minutes) {
          if (time.seconds < bestTime.seconds) {
            localStorage.setItem("bestTimeEver", JSON.stringify(time));
            setBestTime(time);
          }
        } else if (time.minutes < bestTime.minutes) {
          localStorage.setItem("bestTimeEver", JSON.stringify(time));
          setBestTime(time);
        }
      }

      setTime({
        minutes: 0,
        seconds: 0,
      });
    }
  }, [allNewDice]);
  //Helper functions
  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function numberArray() {
    return [...new Array(10)].map(() => {
      return generateNewDie();
    });
  }
  // UI functionality
  function rollDice() {
    setAllNewDice((prevState) => {
      return prevState.map((number) => {
        return number.isHeld ? number : generateNewDie();
      });
    });
  }

  function newGame() {
    setAllNewDice(numberArray);
    setTenzies(false);
    setIsActive(true);
    setwinGame(false);
  }

  function holdDie(id) {
    setAllNewDice((prevState) =>
      prevState.map((number) =>
        number.id === id
          ? {
              ...number,
              isHeld: !number.isHeld,
            }
          : number
      )
    );
  }
  // Dice
  const dice = allNewDice.map((number) => (
    <Die
      key={number.id}
      value={number.value}
      isHeld={number.isHeld}
      holdDie={() => holdDie(number.id)}
      isActive={isActive}
    />
  ));

  return (
    <div className="app f-c">
      {winGame && <Confetti />}
      <main className="game f-c">
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="f-c timer">
          <div className="f-column">
            <h3>Current time:</h3>
            <p>
              {time.minutes < 10 && 0}
              {time.minutes}:{time.seconds < 10 && 0}
              {time.seconds}
            </p>
          </div>
          <div className="f-column">
            <h3>Best Time:</h3>
            {bestTime !== null ? (
              <p>
                {bestTime.minutes < 10 && 0}
                {bestTime.minutes}:{bestTime.seconds < 10 && 0}
                {bestTime.seconds}
              </p>
            ) : (
              <p>00:00</p>
            )}
          </div>
        </div>
        <div className="dice">{dice}</div>
        <button onClick={tenzies ? newGame : rollDice} className="button-roll">
          {tenzies ? "New Game" : "Roll"}
        </button>
      </main>
    </div>
  );
}

export default App;
