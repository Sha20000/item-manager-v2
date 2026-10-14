import axios from 'axios';


// TODO 7 (deployment): do not hardcode this - read it from an environment variable
const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || 'http://localhost:5006'}/api/items`
});

export default API;
