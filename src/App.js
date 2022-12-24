import logo from "./logo.svg";
import "./App.css";
import Navbar from "./jsfiles/Navbar";
import ProfileBar from "./jsfiles/ProfileBar";
import FeedBar1 from "./jsfiles/FeedBar";
import { useState } from "react";

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <div className="forFlex">
        <ProfileBar></ProfileBar>
        <FeedBar1></FeedBar1>
      </div>
    </div>
  );
}

export default App;
