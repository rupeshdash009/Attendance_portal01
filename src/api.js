import axios from 'axios';

// 1. Axios Global Configuration
const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production'
    ? 'https://api.yourdomain.com' // Production backend
    : 'http://localhost:5000',     // Local development
  withCredentials: true,           // Required for cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Request Interceptor (Add auth token if exists)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Optional fallback
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 3. Response Interceptor (Handle token refresh)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If 401 and not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Attempt token refresh
        const { data } = await axios.get('/auth/refresh', { 
          withCredentials: true 
        });
        
        // Store new token (if using localStorage fallback)
        if (data.token) localStorage.setItem('token', data.token);
        
        // Retry original request
        return api(originalRequest);
      } catch (refreshError) {
        // Handle refresh failure (redirect to login)
        window.location = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

// 4. Fetch API Wrapper (Alternative to Axios)
export const fetchAPI = async (url, options = {}) => {
  const response = await fetch(
    `${process.env.NODE_ENV === 'production' 
      ? 'https://api.yourdomain.com' 
      : 'http://localhost:5000'}${url}`,
    {
      ...options,
      credentials: 'include', // Required for cookies
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Request failed');
  }

  return response.json();
};

// 5. Auth API Examples
export const login = (credentials) => api.post('/auth/login', credentials);
export const signup = (userData) => api.post('/auth/signup', userData);
export const logout = () => api.post('/auth/logout');

// 6. Protected API Example
export const getProfile = () => api.get('/profile');

export default api;