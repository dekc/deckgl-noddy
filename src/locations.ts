import { ViewState } from "react-map-gl/src/mapbox/mapbox";
 

const Goldie: ViewState = {
  longitude: 153.399994,
  latitude: -28.016666,
  zoom: 10,
  pitch: 0,
  bearing: 0,
};

const Perth: ViewState = {
  longitude: 115.857048,
  latitude: -31.953512,
  zoom: 12,
  pitch: 47.5,
  bearing: -1.45,
};

const Sydney: ViewState = {
  longitude: 151.209900,
  latitude:  -33.865143,
  zoom: 14,
  pitch: 47.5,
  bearing: -1.45,
};

const Brisbane: ViewState = {
  longitude: 153.021072,
  latitude:  -27.470125,
  zoom: 12,
  pitch: 47.5,
  bearing: -1.45,
};

const Melbourne: ViewState = {
  longitude: 144.946457,
  latitude:  -37.840935,
  zoom: 15,
  pitch: 47.5,
  bearing: -1.45,
};

const Darwin: ViewState = {
  longitude: 130.841782,
  latitude:  -12.462827,
  zoom: 8.3,
  pitch: 0,
  bearing: 0,
};

const Hobart: ViewState = {
  longitude:  147.324997,
  latitude:  -42.880554,
  zoom: 11,
  pitch: 0,
  bearing: 0,
};

const Canberra: ViewState = {
  longitude:  149.128998,
  latitude:   -35.282001,
  zoom: 16,
  pitch: 0,
  bearing: 0,
};

export type Locations = {
  [key: string]: ViewState;
}

export const capitals: Locations = {
  Goldie,
  Sydney,
  Brisbane,
  Perth,
  Melbourne,
  Hobart,
  Canberra,
};