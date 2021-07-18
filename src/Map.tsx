import React from "react";
import MapGL, { Layer, LayerProps, MapRef, Source, SVGOverlay } from "react-map-gl";
import { InteractiveMapProps, MapEvent, State } from "react-map-gl/src/components/interactive-map";

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
    'fill-opacity': [
      "case",
      ["boolean", ["feature-state", "hover"], false],
      1,
      0.4,
    ],
    "fill-outline-color": [
      "case",
      ["boolean", ["feature-state", "hover"], false],
      'rgba(255, 30, 30, 1)',
      'rgba(100, 100, 240, 0.5)',
    ],
  },
  layout: {
    visibility: 'visible',
  },
};

const highlightLayerStyle: LayerProps = {
  id: 'mesh-highlighted',
  type: 'fill',
  source: 'mesh',
  paint: {
    'fill-outline-color': '#484896',
    'fill-color': '#6e599f',
    'fill-opacity': 0.7,
  }
};

export type MapProps = InteractiveMapProps & {
  width: number | string;
  height: number | string;
  svgdata: any;
  boundrydata: any;
  meshdata: any;
  showMesh?: boolean;
};

const Map = ({
  width,
  height,
  svgdata,
  boundrydata,
  meshdata,
  showMesh = false,
  ...rest
}: MapProps) => {
  const mapRef = React.useRef<MapRef>();
  const [cellId, setCellId] = React.useState<number>(0);
  const [hoverInfo, setHoverInfo] = React.useState<any>(null)
  const [meshStyling, setMeshStyling] = React.useState<LayerProps>(meshStyle);



  React.useEffect(() => {
    const style: LayerProps = {
      ...meshStyle,
      layout: {
        ...meshStyle.layout,
        visibility: showMesh ? 'visible': 'none',
      }
    }
    setMeshStyling(style);
  }, [showMesh])

  const onHover = React.useCallback( (event: MapEvent) => {
    const cell = event.features && event.features[0];
    if (!cell) return;

    const map = mapRef.current?.getMap()
    map.setFeatureState({source: 'mesh', id: cellId},{hover: false});
    map.setFeatureState({source: 'mesh', id: cell.id},{hover: true});
    setCellId(cell.id);

    //TODO: display info at centroid of element
    setHoverInfo({
      longitude: event.lngLat[0],
      latitude: event.lngLat[1],
      element: cell && cell.properties,
    });

  }, [cellId]);

  const onMouseLeave = React.useCallback( (event) => {
    const map = mapRef.current?.getMap()
    map.setFeatureState({source: 'mesh', id: cellId},{hover: false});
  }, [cellId])

  const getCursor = ({ isDragging, isHovering }: State) => {
    if (isDragging) return 'grabbing';
    if (isHovering && isDragging) return 'grabbing';
    if (isHovering) return 'crosshair';
    return 'pointer';
  }

  return (
    <MapGL
      ref={mapRef}
      width={width}
      height={height}
      mapboxApiAccessToken={import.meta.env.VITE_MapboxAccessToken as string}
      onHover={onHover}
      interactiveLayerIds={['mesh']}
      onMouseLeave={onMouseLeave}
      getCursor={getCursor}
      {...rest}
    >
      <SvgOverlayData data={svgdata} radius={12} />

      <GeoJsonOverlayData
        data={meshdata}
        layerId="mesh"
        layerStyle={meshStyling} 
      />

      <GeoJsonOverlayData
        data={boundrydata}
        layerId="boundry"
        layerStyle={boundryStyle}
      />
      )
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
  filter?: any[];
};

const GeoJsonOverlayData = ({
  data,
  layerId,
  layerStyle,
  filter,
}: GeoJsonOverlayDataProps) => {
  return (
    <Source id={layerId} type="geojson" data={data} tolerance={0.2} generateId >
      <Layer {...layerStyle} />
      {filter && <Layer {...highlightLayerStyle} filter={filter} />}
    </Source>
  );
};

export default Map;
