/**
 * API Service
 * Centralized API handling for the app using Axios
 */

import axios from 'axios';

const BASE_URL = 'https://api.fuugohub.com'; // TODO: Update with your actual API URL

// Create axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // TODO: Add authentication token
    // const token = getToken();
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('API request failed:', error);
    
    // Handle different error types
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // Unauthorized - handle logout
          // TODO: Dispatch logout action
          break;
        case 403:
          // Forbidden
          break;
        case 404:
          // Not found
          break;
        case 500:
          // Server error
          break;
        default:
          break;
      }
      
      return Promise.reject(new Error(data?.message || `HTTP ${status} error`));
    } else if (error.request) {
      // Network error
      return Promise.reject(new Error('Network error. Please check your connection.'));
    } else {
      // Other error
      return Promise.reject(new Error('An unexpected error occurred.'));
    }
  }
);

/**
 * GET request
 * @param {string} endpoint - API endpoint
 * @param {object} params - Query parameters
 * @returns {Promise} - API response
 */
export const apiGet = async (endpoint, params = {}) => {
  return apiClient.get(endpoint, { params });
};

/**
 * POST request
 * @param {string} endpoint - API endpoint
 * @param {object} data - Request body data
 * @returns {Promise} - API response
 */
export const apiPost = async (endpoint, data = {}) => {
  return apiClient.post(endpoint, data);
};

/**
 * PUT request
 * @param {string} endpoint - API endpoint
 * @param {object} data - Request body data
 * @returns {Promise} - API response
 */
export const apiPut = async (endpoint, data = {}) => {
  return apiClient.put(endpoint, data);
};

/**
 * DELETE request
 * @param {string} endpoint - API endpoint
 * @returns {Promise} - API response
 */
export const apiDelete = async (endpoint) => {
  return apiClient.delete(endpoint);
};

// Auth API endpoints
export const authAPI = {
  login: (credentials) => apiPost('/auth/login', credentials),
  register: (userData) => apiPost('/auth/register', userData),
  forgotPassword: (email) => apiPost('/auth/forgot-password', { email }),
  resetPassword: (token, password) => apiPost('/auth/reset-password', { token, password }),
  logout: () => apiPost('/auth/logout'),
};

// User API endpoints
export const userAPI = {
  getProfile: () => apiGet('/user/profile'),
  updateProfile: (data) => apiPut('/user/profile', data),
  changePassword: (data) => apiPut('/user/change-password', data),
};

// App specific API endpoints
export const appAPI = {
  getDashboard: () => apiGet('/dashboard'),
  getSettings: () => apiGet('/settings'),
  updateSettings: (data) => apiPut('/settings', data),
};

export default {
  apiGet,
  apiPost,
  apiPut,
  apiDelete,
  authAPI,
  userAPI,
  appAPI,
}; 