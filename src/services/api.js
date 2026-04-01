import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth helpers
let authToken = localStorage.getItem('admin_token') || null;

export const setAuthToken = (token) => {
  authToken = token;
  if (token) {
    localStorage.setItem('admin_token', token);
  } else {
    localStorage.removeItem('admin_token');
  }
};

export const getAuthToken = () => {
  return authToken || localStorage.getItem('admin_token');
};

export const getAuthHeaders = () => {
  if (authToken) {
    return { Authorization: `Bearer ${authToken}` };
  }
  return {};
};

// Auth API
export const authApi = {
  login: async (email, password) => {
    const response = await api.post('/v1/forms/admin/login', { email, password });
    return response.data;
  },
  logout: () => {
    setAuthToken(null);
  },
};

// Forms API
export const formsApi = {
  listForms: async () => {
    const response = await api.get('/v1/forms', { headers: getAuthHeaders() });
    return response.data;
  },

  getForm: async (formId) => {
    const response = await api.get(`/v1/forms/${formId}`, { headers: getAuthHeaders() });
    return response.data;
  },

  getResponses: async (formId) => {
    const response = await api.get(`/v1/forms/${formId}/responses`, { headers: getAuthHeaders() });
    return response.data;
  },

  activateForm: async (formId) => {
    const response = await api.put(`/v1/forms/${formId}/activate`, {}, { headers: getAuthHeaders() });
    return response.data;
  },

  deactivateForm: async (formId) => {
    const response = await api.put(`/v1/forms/${formId}/deactivate`, {}, { headers: getAuthHeaders() });
    return response.data;
  },

  getPublicForm: async (formId) => {
    const response = await api.get(`/v1/forms/public/${formId}`);
    return response.data;
  },

  submitForm: async (formId, formData, recaptchaToken = null, captchaType = null) => {
    const payload = {
      form_id: formId,
      ...formData,
    };
    if (recaptchaToken) {
      payload.recaptcha_token = recaptchaToken;
      payload.captcha_type = captchaType;
    }
    const response = await api.post('/v1/core/landingPageFormSubmit', payload);
    return response.data;
  },
};

// Landing page Users API
export const landingPageApi = {
  getSubmissions: async () => {
    const response = await api.get('/v1/core/landing-page-users', { headers: getAuthHeaders() });
    return response.data;
  },
};

export default api;
