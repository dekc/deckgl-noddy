import React from "react";
import MapGL, { Layer, LayerProps, Source, SVGOverlay } from "react-map-gl";
import { InteractiveMapProps } from "react-map-gl/src/components/interactive-map";

const boundryStyle: LayerProps = {
  type: "line",
  id: "boundry",
  paint: {
    "line-color": "#32361e",
    "line-width": 2,
    "line-opacity": 0.8,
  },
};

const meshStyle: LayerProps = {
  type: "fill",
  id: "mesh",
  paint: {
    "fill-color": [
      "rgb",
      ["*", -1, ["/", 200, ["get", "Bathymetry"]]],
      0,
      ["+", 255, ["/", 255, ["get", "Bathymetry"]]],
    ],
    "fill-opacity": 0.75,
    "fill-outline-color": "#9b0909",
  },
};

export type MapProps = InteractiveMapProps & {
  width: number | string;
  height: number | string;
  svgdata: any;
  boundrydata: any;
  meshdata: any;
};

const Map = ({
  width,
  height,
  svgdata,
  boundrydata,
  meshdata,
  ...rest
}: MapProps) => {
  return (
    <MapGL
      width={width}
      height={height}
      mapboxApiAccessToken={import.meta.env.VITE_MapboxAccessToken as string}
      {...rest}
    >
      <SvgOverlayData data={svgdata} radius={12} />
      <GeoJsonOverlayData
        data={meshdata}
        layerId="boundry"
        layerStyle={meshStyle}
      />
      <GeoJsonOverlayData
        data={boundrydata}
        layerId="mesh"
        layerStyle={boundryStyle}
      />
    </MapGL>
  );
};

type SvgOverlayDataProps = {
  data: any;
  radius: number;
};

const SvgOverlayData = ({ data, radius }: SvgOverlayDataProps) => {
  const redraw = ({ project }: { project: Function }) => {
    return (
      <g>
        {data.map((datum: any) => {
          const [x, y] = project(datum.position);
          return (
            <circle key={datum.fid} cx={x} cy={y} r={radius} fill="tomato" />
          );
        })}
      </g>
    );
  };
  return <SVGOverlay redraw={redraw} />;
};

type GeoJsonOverlayDataProps = {
  data: any;
  layerId: string;
  layerStyle: LayerProps;
};

const GeoJsonOverlayData = ({
  data,
  layerId,
  layerStyle,
}: GeoJsonOverlayDataProps) => {
  return (
    <Source id={layerId} type="geojson" data={data} tolerance={0.2}>
      <Layer {...layerStyle} />
    </Source>
  );
};

export default Map;
