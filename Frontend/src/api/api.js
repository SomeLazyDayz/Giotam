import axios from 'axios';

const API_BASE_URL = 'https://arletta-unfavoured-immemorially.ngrok-free.dev';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Các hàm gọi API như trước
export const getUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

export const createAlert = async (alertData) => {
  const response = await api.post('/create_alert', alertData);
  return response.data;
};

// ... các hàm khác