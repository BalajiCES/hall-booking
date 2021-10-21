function objectToQueryString(obj) {
  return Object.keys(obj)
    .map((key) => key + '=' + obj[key])
    .join('&');
}

const fetchPOST = async (url, bodyData) => {
  console.log('fetch API', url, bodyData);
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bodyData)
  });
  const data = await response.json();

  if (response.status >= 400) {
    throw new Error(JSON.stringify(data));
  }
  return data;
};

const fetchPATCH = async (url, bodyData) => {
  console.log('fetch API', url, bodyData);
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bodyData)
  });
  const data = await response.json();

  if (response.status >= 400) {
    throw new Error(JSON.stringify(data));
  }
  return data;
};

const fetchGET = async (url, queryData = {}) => {
  console.log('Url', url, 'queryData', queryData);
  const queryObj = objectToQueryString(queryData);
  console.log('NewUrl', url, queryObj);
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
