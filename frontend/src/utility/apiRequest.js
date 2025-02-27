// src/utility/apiRequest.js
import { getAccessToken, refreshAccessToken } from './token';

const apiRequest = async (url, options = {}) => {
  let accessToken = getAccessToken();

  if (!accessToken) {
    accessToken = await refreshAccessToken();
    if (!accessToken) {
      throw new Error('Unauthorized');
    }
  }

  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${accessToken}`,
  };

  let response = await fetch(url, options);

  if (response.status === 401) {
    accessToken = await refreshAccessToken();

    if (accessToken) {
      options.headers.Authorization = `Bearer ${accessToken}`;
      response = await fetch(url, options);
    } else {
      throw new Error('Unauthorized');
    }
  }

  // Check if the response is OK (status 200-299)
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || 'Request failed');
  }

  return response.json();
};

export default apiRequest;
