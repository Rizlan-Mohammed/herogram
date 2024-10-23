import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BaseUrl, 
});


axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token'); 

    if (!config.url.includes('/api/medias/shared/')) {
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`; 
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle 401 response
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      sessionStorage.clear(); 
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
