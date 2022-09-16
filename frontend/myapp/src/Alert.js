import React from "react";
import "./alert.css";
const Alert = ({ msg, functionalert }) => {
  return (
    <>
      <div className="alertcontainer">
        <div className="cross" onClick={() => functionalert(false)}>
          X
        </div>
        <div className="text">{msg}</div>
        <div className="alertbutton">
          <button onClick={() => functionalert(false)}>OK</button>
        </div>
      </div>
    </>
  );
};

export default Alert;
