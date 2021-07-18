import React, { useEffect, useState } from "react";
import { FlyToInterpolator, ViewportProps } from "react-map-gl";
import { ViewState } from "react-map-gl/src/mapbox/mapbox";
import { csv, json } from "d3";

import Map from "./Map";
import "./App.css";
// import { ViewState } from 'react-map-gl/src/mapbox/mapbox';
import { capitals } from "./locations";

const TrafficInter =
  "https://data.gov.au/dataset/f28878de-4ea1-4ae2-a342-a08c2a5a4e7a/resource/9e58f0b8-9250-4cd6-9937-017c3510f654/download/rrcsignalisedintersections.csv";
const wsb =
  "https://data.gov.au/data/dataset/1b853228-5bc4-42e6-82e7-5d43a563251d/resource/323ae3a5-66b8-432c-8b64-ddda32fc93e6/download/wasteboundary.kmz";
const Boundry = "http://localhost:8989/boundryllproj.json";
const Mesh = "http://localhost:8989/mesh_original.geo.json";

function App() {
  const [viewState, setViewState] = useState<ViewportProps>(capitals.Goldie);
  const [data, setData] = useState([]);
  const [boundries, setBoundries] = useState();
  const [mesh, setMesh] = useState();
  const [showMesh, setShowMesh] = useState<boolean>(true);
  const [mapStyle, setMapStyle] = useState<string>(
    "mapbox://styles/mapbox/satellite-v9"
  );

  useEffect(() => {
    csv(TrafficInter, (d: any, ind: number) => ({
      id: ind,
      fid: d.FID,
      position: [+d.Longitude, +d.Latitude],
    })).then((tid: any) => {
      setData(tid);
    });

    json(Boundry).then((data: any) => {
      setBoundries(data);
    });

    json(Mesh).then((data: any) => {
      setMesh(data);
    });
  }, []);

  const handleViewStateChange = ({ viewState }: { viewState: ViewportProps }) =>
    setViewState(viewState);

  const handleFlyTo = (destination: ViewportProps) => {
    setViewState({
      ...viewState,
      ...destination,
      transitionDuration: 2000,
      transitionInterpolator: new FlyToInterpolator(),
    });
  };

  const toggleMesh = () => setShowMesh(!showMesh);

  const handleOnChange = (e: HTMLInputElement) => {
    const { value } = e.target;
    switch (value) {
      case "streets":
        setMapStyle("mapbox://styles/mapbox/streets-v11");
        break;
      case "satellite":
        setMapStyle("mapbox://styles/mapbox/satellite-streets-v11");
        break;
      default:
        break;
    }
  };

  return (
    <div className="App box">
      <header id="header">DeckGL Sandbox</header>
      <main id="content">
        <Map
          width="100vw"
          height="100%"
          mapStyle={mapStyle}
          viewState={viewState as ViewState}
          onViewStateChange={handleViewStateChange}
          showMesh={showMesh}
          svgdata={data}
          boundrydata={boundries}
          meshdata={mesh}
        />
        <div className="controls">
          {Object.keys(capitals).map((key) => {
            return (
              <button key={key} onClick={() => handleFlyTo(capitals[key])}>
                {key}
              </button>
            );
          })}
        </div>
        <div className="layers">
          <button onClick={toggleMesh}>
            {showMesh ? "Hide mesh " : "Show mesh"}
          </button>
          <div className="baselayers">
            <input
              type="radio"
              id="streets"
              name="base_layer"
              value="streets"
              onChange={handleOnChange}
            />
            <label htmlFor="streets">Streets</label>
            <br />
            <input
              type="radio"
              id="satellite"
              name="base_layer"
              value="satellite"
              onChange={handleOnChange}
            />
            <label htmlFor="streets">Satellite</label>
          </div>
        </div>
      </main>
      <footer id="footer">Map Footer</footer>
    </div>
  );
}

export default App;
