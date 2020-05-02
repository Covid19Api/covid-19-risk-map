const defaultHeader = { "Content-type": "application/json" };

const defaultOptions = { method: "GET", headers: defaultHeader };

const _fetch = async (url: string, options: RequestInit = defaultOptions) => {
  return fetch(url, options);
};

export const get = async (url: string, params: any) => {
  try {
    if (params) {
      url += setQueryParams(params);
    }
    return await _fetch(url, {
      ...defaultOptions,
    });
  } catch (e) {
    const errorMessage = `Failed to fetch from ${url} with params: ${JSON.stringify(params)}`;
    console.error(errorMessage, e);
  }
};

const setQueryParams = (params: any) =>
  "?" +
  Object.keys(params)
    .map(
      (param) =>
        `${encodeURIComponent(param)}=${encodeURIComponent(params[param])}`
    )
    .join("&");

export const post = async (url: string, body: any) => {
  try {
    const response = await _fetch(url, {
      ...defaultOptions,
      ...{ method: "POST", body: JSON.stringify(body) },
    });
    return response.json();
  } catch (e) {
    const errorMessage = `Failed to post to ${url} with body: ${JSON.stringify(
      body
    )}`;
    console.error(errorMessage, e);
  }
};
