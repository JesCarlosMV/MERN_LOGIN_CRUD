import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

export const RegisterUser = (user) => axios.post(`${API_URL}/register`, user);
