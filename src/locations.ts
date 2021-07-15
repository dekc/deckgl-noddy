// import { ViewportProps } from "react-map-gl/src/mapbox/mapbox";

import { ViewportProps } from "react-map-gl/src/utils/map-state";

const Goldie: ViewportProps = {
  longitude: 153.399994,
  latitude: -28.016666,
  zoom: 10,
  pitch: 0,
  bearing: 0,
};

const Perth: ViewportProps = {
  longitude: 115.857048,
  latitude: -31.953512,
  zoom: 12,
  pitch: 47.5,
  bearing: -1.45,
};

const Sydney: ViewportProps = {
  longitude: 151.2099,
  latitude: -33.865143,
  zoom: 14,
  pitch: 47.5,
  bearing: -1.45,
};

const Brisbane: ViewportProps = {
  longitude: 153.021072,
  latitude: -27.470125,
  zoom: 12,
  pitch: 47.5,
  bearing: -1.45,
};

const Melbourne: ViewportProps = {
  longitude: 144.946457,
  latitude: -37.840935,
  zoom: 15,
  pitch: 47.5,
  bearing: -1.45,
};

const Darwin: ViewportProps = {
  longitude: 130.841782,
  latitude: -12.462827,
  zoom: 8.3,
  pitch: 0,
  bearing: 0,
};

const Hobart: ViewportProps = {
  longitude: 147.324997,
  latitude: -42.880554,
  zoom: 11,
  pitch: 0,
  bearing: 0,
};

const Canberra: ViewportProps = {
  longitude: 149.128998,
  latitude: -35.282001,
  zoom: 16,
  pitch: 0,
  bearing: 0,
};

export type Locations = {
  [key: string]: ViewportProps;
};

export const capitals: Locations = {
  Goldie,
  Sydney,
  Brisbane,
  Perth,
  Melbourne,
  Hobart,
  Canberra,
};
