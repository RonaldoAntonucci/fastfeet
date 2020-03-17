import axios from 'axios';

const api = axios.create({
  baseURL: 'http://178.128.155.198',
});

export const { CancelToken } = axios;

export default api;
