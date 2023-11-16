import axios from 'axios';

export const $api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

$api.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers['x-api-key'] = process.env.REACT_APP_API_KEY;
    config.headers['Content-Type'] ='application/json';
  }
  return config;
});
