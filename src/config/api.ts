// API Configuration
// In production, API requests go through Nginx proxy at /api/
// In development, they go directly to localhost:3001
export const API_BASE_URL = import.meta.env.PROD
    ? '/api'
    : 'http://localhost:3001/api';
