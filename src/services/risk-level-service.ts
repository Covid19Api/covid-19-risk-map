import * as restClient from "./restClient";
import { ENDPOINTS } from "./endpoints";

export const riskLevelByGeoPos = async (
  latitude: number,
  longitude: number
) => {
  try {
  return restClient.post(ENDPOINTS.pois.riskLevelByGeoPos, {
    latitude,
    longitude,
  });
} catch(e) {
  const errorMessage = `Failed to fetch riskLevelByGeoPos for: ${{latitude, longitude}})}`
  const err = new Error(errorMessage)
  console.error(errorMessage, e)
  throw err;
}
};

export const riskv4 = async (latitude: number, longitude: number)  => {
  try {
  return restClient.get(ENDPOINTS.pois.riskv4, {
    latitude,
    longitude,
  });;
} catch(e) {
  const errorMessage = `Failed to fetch riskv4 for: ${{latitude, longitude}})}`
  const err = new Error(errorMessage)
  console.error(errorMessage, e)
  throw err;
}
};
