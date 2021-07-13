import React from 'react'
import MapGL, {SVGOverlay} from 'react-map-gl';
import { InteractiveMapProps } from 'react-map-gl/src/components/interactive-map';

export type MapProps = InteractiveMapProps & {
  width: number | string;
  height: number | string;
  data: any;
};

const Map = ({width, height, data, ...rest }: MapProps) => {
  return (
    <MapGL width={width} height={height} 
      mapboxApiAccessToken={import.meta.env.VITE_MapboxAccessToken as string}
      {...rest}
      >
        <SvgOverlayData data={data} radius={12} />
    </MapGL>
  )
}

type SvgOverlayDataProps = {
  data: any;
  radius: number;
};

const SvgOverlayData = ({ data, radius }: SvgOverlayDataProps) => {
  const redraw = ({ project }: {project: Function}) => {
    return (
      <g>
        {data.map((datum: any) => {
          const [x,y] = project(datum.position);
          return <circle key={datum.fid} cx={x} cy={y} r={radius} fill="tomato" />
        })}
      </g>
    )
  };
  return <SVGOverlay redraw={redraw} />
}

export default Map
