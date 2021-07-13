import React, { useEffect, useState } from 'react'
import  { FlyToInterpolator } from 'react-map-gl';
import { InteractiveMapProps } from 'react-map-gl/src/components/interactive-map';
import { ViewState } from 'react-map-gl/src/mapbox/mapbox';
import { csv } from 'd3';

import  Map from './Map';
import './App.css'
// import { ViewState } from 'react-map-gl/src/mapbox/mapbox';
import { capitals } from './locations';

const TrafficInter = 'https://data.gov.au/dataset/f28878de-4ea1-4ae2-a342-a08c2a5a4e7a/resource/9e58f0b8-9250-4cd6-9937-017c3510f654/download/rrcsignalisedintersections.csv';
const wsb = 'https://data.gov.au/data/dataset/1b853228-5bc4-42e6-82e7-5d43a563251d/resource/323ae3a5-66b8-432c-8b64-ddda32fc93e6/download/wasteboundary.kmz';

function App() {
const [viewState, setViewState] = useState<ViewState>(capitals.Goldie)
const [data, setData] = useState([]);
const [boundaries, setBoundaries] = useState([]);

useEffect(() => {
  csv(TrafficInter, (d: any, ind: number) => ({
    id: ind,
    fid: d.FID,
    position: [+d.Longitude, +d.Latitude] 

  }))
  .then((tid:any) => {
    setData(tid)
  });



}, [])

const handleViewStateChange = ({viewState}: {viewState: InteractiveMapProps}) => setViewState(viewState)

const handleFlyTo = (destination: InteractiveMapProps) => {
  setViewState({
    ...viewState, 
    ...destination,
  })
}


  return (
    <div className="App box">
      <header id="header">
        Map demo
      </header>
      <main id="content">
        
        <Map 
          width="100vw" 
          height="100%" 
          viewState={viewState}
          onViewStateChange={handleViewStateChange}
          transitionInterpolator={new FlyToInterpolator()}
          transitionDuration={2000}
          data={data}
        />
        <div className="controls">
          {Object.keys(capitals).map(key => {
            return <button key={key} onClick={() => handleFlyTo(capitals[key])}>{key}</button>
          })}
        </div>
      </main>
      <footer id="footer">
        Map Footer
      </footer>
    </div>

  )
}

export default App
