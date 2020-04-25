const defaultHeader = { "Content-type": "application/json" };

const defaultOptions = { method: "GET", headers: defaultHeader };

const _fetch = async (url: string, options: RequestInit = defaultOptions) => {
  return fetch(url, options);
};

export const get = async (url: string, data: any) => {
  try {
    if(data) {
      url += setQueryParams(data)
    }
    return await _fetch(url, {
      ...defaultOptions
    });
  } catch (e) {
    console.error(`Failed to fetch from ${url}`, e);
  }
};

const setQueryParams = (params: any) => '?' + Object.keys(params).map(param => `${param}=${params[param]}`).join('&')

export const post = async (url: string, data: any) => {
  try {
    const response = await _fetch(url, {
      ...defaultOptions,
      ...{ method: "POST", body: JSON.stringify(data) },
    });
    return response.json();
  } catch (e) {
    console.error(`Failed to post to ${url} with data: ${JSON.stringify(data)}`, e);
  }
};
