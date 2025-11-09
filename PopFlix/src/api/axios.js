import axios from 'axios';

export const axiosBackend = axios.create();

export const axiosPhimApi = axios.create({
  baseURL: 'https://phimapi.com',
});

axiosPhimApi.interceptors.request.use(
  (config) => {
    if (!config.params) {
      config.params = {};
    }

    if (!config.params.limit) {
      config.params.limit = 20;
    }

    return config; 
  },
  (error) => {
    return Promise.reject(error);
  }
);
