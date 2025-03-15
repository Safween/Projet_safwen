// src/services/api.ts
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api', // Assurez-vous que l'URL correspond à celle de votre serveur Django
});

export default API;