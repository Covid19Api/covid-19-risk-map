import * as restClient from "./restClient";
import { ENDPOINTS } from "./endpoints";

export const riskLevelByGeoPos = async (
  latitude: number,
  longitude: number
) => {
  try {
  // return restClient.post('https://cors-anywhere.herokuapp.com/' + ENDPOINTS.pois.riskLevelByGeoPos, {
  //   "type": "Feature",
  //   "geometry": {
  //     "type": "Point",
  //     "coordinates": [latitude, longitude]
  //   }
  // });

  return {
    "city": "New York City",
    "detailedRiskByCity": "high",
    "currentCasesByCity": "50"
  }
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
