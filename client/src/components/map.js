import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import { listeplace } from "../services/api";

import {
  ICON_HOSTEL,
  ICON_BEACH,
  ICON_GITES,
  ICON_RESTO,
  ICON_RIVER,
  ICON_POINTOFVIEW,
} from "../components/iconTypeMarker";
import "./map.scss";

export default function Map() {
  const [place, setPlace] = useState([]);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 14.641528,
    longitude: -61.024174,
    zoom: 8,
    maxZoom: 17,
    minZoom: 6,
  });

  useEffect(() => {
    // -- iife => immediatly invoque function expression (()=>{})() --
    // can't make useEffect async, whel use iife
    (async () => {
      const listPlace = await listeplace();
      // console.log("listplace >>>", listPlace);
      setPlace(listPlace);
    })();
  }, []);

  // _TODO: create the function and assign it to onViewportChange handler
  /* -- _onViewportChange --
   * function whos restric the min and max long lat of the viewport
   */
  // const _onViewportChange = () => {};!

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/mapbox/dark-v10"
      onViewportChange={setViewport}
      mapboxApiAccessToken={process.env.REACT_APP_MapboxAccessToken}
    >
      {place.map(plc => (
        <Marker
          key={plc._id}
          latitude={plc.latitude}
          longitude={plc.longitude}
          // offsetLeft={-12}
          // offsetTop={-40}
        >
          <svg
            className="marker-icon"
            viewBox="0 0 24 40"
            style={{ height: `calc(1vmin * ${viewport.zoom}*0.5)` }}
          >
            <path
              d="M23.5 11.9565C23.5 13.7415 22.6206 16.355 21.2818 19.367C19.9531 22.3563 18.2124 25.6537 16.5607 28.7818L16.5569 28.7889C15.3477 31.0791 14.1854 33.2804 13.2794 35.1859C12.7501 36.2992 12.2986 37.3308 11.9763 38.2322C11.6571 37.3882 11.229 36.4276 10.7328 35.3906C9.86457 33.5762 8.76415 31.4805 7.61315 29.2884L7.60988 29.2822C5.93519 26.0928 4.15178 22.6959 2.78625 19.6096C1.41046 16.5001 0.5 13.7925 0.5 11.9565C0.5 5.63097 5.64701 0.5 12 0.5C18.353 0.5 23.5 5.63097 23.5 11.9565ZM12 17.2442C15.1772 17.2442 17.78 14.7444 17.78 11.6279C17.78 8.51141 15.1772 6.01165 12 6.01165C8.82276 6.01165 6.22 8.51141 6.22 11.6279C6.22 14.7444 8.82276 17.2442 12 17.2442Z"
              fill="#FFA51F"
              stroke="black"
            />
          </svg>
          {ICON_POINTOFVIEW({ viewportzoom: viewport.zoom })}
          {/* {ICON_RIVER({ viewportzoom: viewport.zoom })} */}
          {/* {ICON_RESTO({ viewportzoom: viewport.zoom })} */}
          {/* {ICON_GITES({ viewportzoom: viewport.zoom })} */}
          {/* {ICON_BEACH({ viewportzoom: viewport.zoom })} */}
          {/* {ICON_HOSTEL({ viewportzoom: viewport.zoom })} */}
        </Marker>
      ))}
    </ReactMapGL>
  );
}
