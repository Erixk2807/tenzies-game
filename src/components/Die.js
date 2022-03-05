import React from "react";
import "./die.css";

const Pip = () => <span className="pip" />;

const Die = ({ value, isHeld, holdDie, isActive }) => {
  let pips = Array(value)
    .fill(0)
    .map((_, i) => <Pip key={i} />);
  return (
    <div
      className={`face die f-c ${isHeld && "die--active"}`}
      disabled={isActive}
      onClick={isActive ? holdDie : undefined}
    >
      {pips}
    </div>
  );
};

export default Die;

// <p className='number'>{value}</p>
