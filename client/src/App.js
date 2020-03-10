import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Places from "./places/pages/places";
import "./App.scss";

function App() {
  return (
    <div className="App">
      {/* -- header -- */}
      <div className="top">
        <h1 className="title">Welcome to Best Place To Share</h1>

        <div className="userInfos">
          <a href="#">Sign In </a> / <a href="#">Log In</a>
        </div>
      </div>

      <div className="content">
        <Places />
      </div>
    </div>
  );
}

export default App;
