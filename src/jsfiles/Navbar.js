import React, { useState, useEffect } from "react";
import "../scssfiles/Navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import handburgericon from "../pictures/c1handburger.png";

function Navbar() {

  const [handburgerval, sethandburgerval] = useState(true);
  const handburger = () => {
    sethandburgerval(!handburgerval);
  };

  // Accessing scss variable "--background-color" and "--fordisplay" using plain JavaScript and changing the same according to the state of "handburgerval"
  useEffect(() => {
    const root = document.documentElement;
    root?.style.setProperty("--fordisplay", handburgerval ? "none" : "block");
  }, [handburgerval]);

  return (
    <div className="navbar__main">
      <div className="navbar">
        <div className="navbar__left">
          <div>
            <FontAwesomeIcon icon={faArrowLeft} className="navbar__leftarrow" />
          </div>
          <div className="navbar__dashboard">Dashboard</div>
          <div>
            <FontAwesomeIcon
              icon={faAngleRight}
              className="navbar__rightarrow"
            />
          </div>
          <div className="navbar__socialfeed ">Social Feed</div>
        </div>
        <div className="navbar__right">
          <button className="navbar__handburger--button" onClick={handburger}>
            <img src={handburgericon} className="navbar__handburger" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
