import React from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "./Map.css";
import { showDataOnMap } from "./util";

function Map({ countries, casesType, center, zoom }) {

  function ChangeView({ center, zoom }) { //to reset center n zoom upon country change
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

  //using MapContainer in place of Leaflet
  return (
    <div className="map">
      <MapContainer center={center} zoom={zoom}>    
        <ChangeView center={center} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {showDataOnMap(countries, casesType)}
      </MapContainer>
      {/* <h1>map here</h1> */}
    </div>
  );
}

export default Map;
