import { MapCoordinate } from "../../../types/map/map";

export type MapCoordinateState = MapCoordinate & { zoom: number };

export const defaultMapCoordinateState: MapCoordinateState = {
  lat: 0,
  lng: 0,
  zoom: 2,
};

export function coordinatesReducer(state: any, action: any) {
  switch (action.type) {
    case "SET_LNG":
      return { ...state, ...{ lng: action.lng } };
    case "SET_LAT":
      return { ...state, ...{ lat: action.lat } };
    case "SET_COORDINATES":
      return { ...state, ...{ lat: action.lat, lng: action.lng } };
    case "SET_ZOOM":
      return { ...state, ...{ lat: action.zoom } };
  }
}

export const SET_LAT = '@@mapCoordinatesReducer/SET_LAT'
export const SET_LNG = '@@mapCoordinatesReducer/SET_LNG'
export const SET_COORDINATES = '@@mapCoordinatesReducer/SET_COORDINATES'
export const SET_ZOOM = '@@mapCoordinatesReducer/SET_ZOOM'

export const setLat = (lat: number) => {
  return {
    type: SET_LAT,
    lat
  }
}

export const setLng = (lng: number) => {
  return {
    type: SET_LNG,
    lng
  }
}

export const setCoordinates = (lat: number, lng: number) => {
  return {
    type: SET_COORDINATES,
    lat,
    lng
  }
}

export const setZoom = (zoom: number) => {
  return {
    type: SET_ZOOM,
    zoom
  }
}
