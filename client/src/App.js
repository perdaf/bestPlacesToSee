import React, { useState } from "react";
import "./App.scss";
import Map from "./components/map";

function App() {
  const [showPanel, setShowPanel] = useState(true);

  const _ShowHidePanel = () => {
    setShowPanel(!showPanel);
  };

  console.log("showPanel >>>", showPanel);

  return (
    <div className="App">
      <div className="top">
        <h1 className="title">Welcome to Best Place To Share</h1>
      </div>
      <div className="content">
        <div
          className={`showHidePanelBtn${showPanel ? "" : " hiddenPanelBtn"}`}
          onClick={_ShowHidePanel}
        >
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          {showPanel ? "Hide Panel" : "Show Panel"}
        </div>
        l
        <div className={`sidePanel${showPanel ? "" : " hiddenPanel"}`}>
          <h3>side panel</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
            molestiae sapiente illo iure, dolor, unde modi cumque aut eius
            aperiam laudantium!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
            molestiae sapiente illo iure, dolor, unde modi cumque aut eius
            aperiam laudantium!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
            molestiae sapiente illo iure, dolor, unde modi cumque aut eius
            aperiam laudantium!
          </p>
        </div>
        <Map />
      </div>
    </div>
  );
}

export default App;
