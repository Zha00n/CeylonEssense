import { API_URL } from "../configs/constants";

export const getAccessToken = () => {
    return localStorage.getItem('accessToken');
  };
  
  export const setAccessToken = (token) => {
    localStorage.setItem('accessToken', token);
  };
  
  export const getRefreshToken = () => {
    return localStorage.getItem('refreshToken');
  };
  
  export const refreshAccessToken = async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      // No refresh token available, redirect to login
      window.location.href = '/login';
      return;
    }
  
    try {
      const response = await fetch(`${API_URL}/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });
  
      if (response.ok) {
        const data = await response.json();
        setAccessToken(data.accessToken);
        return data.accessToken;
      } else {
        // Handle refresh token failure, maybe redirect to login
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Error refreshing access token:', error);
      window.location.href = '/login';
    }
  };
  