function objectToQueryString(obj) {
  return Object.keys(obj)
    .map((key) => key + '=' + obj[key])
    .join('&');
}

// Custom POST Method
const fetchPOST = async (url, bodyData, auth) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${auth}`
    },
    body: JSON.stringify(bodyData)
  });
  const data = await response.json();

  if (response.status >= 400) {
    throw new Error(JSON.stringify(data));
  }
  return data;
};

// Custom PATCH Method
const fetchPATCH = async (url, bodyData, auth) => {
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${auth}`
    },
    body: JSON.stringify(bodyData)
  });
  const data = await response.json();

  if (response.status >= 400) {
    throw new Error(JSON.stringify(data));
  }
  return data;
};

// Custom GET Method
const fetchGET = async (url, queryData = {}) => {
  const queryObj = objectToQueryString(queryData);
  const response = await fetch(url + '?' + queryObj, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();

  if (response.status >= 400) {
    throw new Error(JSON.stringify(data));
  }
  return data;
};

export { fetchPOST, fetchGET, fetchPATCH };
