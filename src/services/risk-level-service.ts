import * as restClient from "./restClient";
import { ENDPOINTS } from "./endpoints";

export const riskLevelByGeoPos = async (
  latitude: number,
  longitude: number
) => {
  return restClient.post(ENDPOINTS.pois.riskLevelByGeoPos, {
    latitude,
    longitude,
  });
};

export const riskv4 = async (latitude: number, longitude: number)  => {
  return restClient.get(ENDPOINTS.pois.riskv4, {
    latitude,
    longitude,
  });;
};
