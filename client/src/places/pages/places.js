import React, { useState } from "react";
import Map from "../components/map";

import "./place.scss";

const Places = () => {
  const [showPanel, setShowPanel] = useState(false);
  const [placeInfos, setPlaceInfos] = useState(null);

  const _ShowHidePanel = () => {
    setShowPanel(!showPanel);
  };

  const processDataInfo = data => {
    setPlaceInfos(data);
    setShowPanel(true);
  };

  console.log("data vus de app >>>", placeInfos);
  return (
    <>
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
        {/* <h3>side panel</h3>s */}
        <select name="placeType" id="placeType" className="placeType">
          <option value="">-- Select the type of place --</option>
          <option value="All">All</option>
          <option value="Resto">Restaurant</option>
          <option value="Plage">Plage</option>
          <option value="Pointofview">Point de vue</option>
          <option value="Hotel">hotels</option>
          <option value="Gites">Gite</option>
        </select>
        {placeInfos && (
          <>
            <div className="place-image">
              <img src={placeInfos.image} alt={placeInfos.name} />
            </div>
            <div className="place-infos">
              <div className="name">
                <h2>{placeInfos.name}</h2>
              </div>

              <div className="rating">{`${placeInfos.rating}/10`}</div>
              <hr />

              <div className="address">
                <h4 className="address-title">address :</h4>
                <p className="address-item">{placeInfos.address}</p>
              </div>

              <div className="description">
                <h4 className="description-title">Description :</h4>
                <p className="description-item">{placeInfos.description}</p>
              </div>

              {/* loop dans les commentaire si existe et affichage */}
              <div className="comment">
                <h4 className="comment-title">Commentaire(s)</h4>
                {placeInfos.comment.map((comment, i) => {
                  return (
                    <div key={i} className="comment-item">
                      {" "}
                      {comment.contente}{" "}
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
      <Map dataInfos={processDataInfo} />
    </>
  );
};

export default Places;
