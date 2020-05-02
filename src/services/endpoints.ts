const BASE = "https://api.xapix.dev/covid-19";

export const ENDPOINTS = {
  pois: {
    allInfo: `${BASE}/pois/all-info`, // GET
    riskLevelByGeoPos: `${BASE}/pois/risk-level-by-geopos`, // POST
    cdc: `${BASE}/pois/cdc`, // POST
    riskv4: `${BASE}/pois/riskv4`, // GET
  },
};
