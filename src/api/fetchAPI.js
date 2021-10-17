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

const fetchGET = async (url, params) => {
  console.log('fetch GET API', url, params);
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    params: JSON.stringify(params)
  });
  const data = await response.json();

  if (response.status >= 400) {
    throw new Error(JSON.stringify(data));
  }
  return data;
};

export { fetchPOST, fetchGET, fetchPATCH };
