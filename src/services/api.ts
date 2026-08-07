const BASE_URL = import.meta.env.VITE_API_URL || '/api';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function request(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('societyconnect_token') || localStorage.getItem('sahaaya_token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(response.status, errorData.error || errorData.message || 'API request failed');
  }

  return response.json();
}

export const api = {
  auth: {
    login: (credentials: any) => request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
    me: () => request('/auth/me'),
  },
  flats: {
    getAll: () => request('/flats'),
    getById: (id: string) => request(`/flats/${id}`),
  },
  bills: {
    getAll: () => request('/bills'),
    pay: (id: string, method: string) => request(`/bills/${id}/pay`, { method: 'POST', body: JSON.stringify({ method }) }),
  },
  tenants: {
    getNOCs: () => request('/tenants/nocs'),
    createNOC: (data: any) => request('/tenants/nocs', { method: 'POST', body: JSON.stringify(data) }),
  },
  complaints: {
    getAll: () => request('/complaints'),
    create: (data: any) => request('/complaints', { method: 'POST', body: JSON.stringify(data) }),
  },
  visitors: {
    getAll: () => request('/visitors'),
    create: (data: any) => request('/visitors', { method: 'POST', body: JSON.stringify(data) }),
    getStaff: () => request('/visitors/staff'),
  },
  amenities: {
    getAll: () => request('/amenities'),
    getBookings: () => request('/amenities/bookings'),
    createBooking: (data: any) => request('/amenities/bookings', { method: 'POST', body: JSON.stringify(data) }),
  },
  voting: {
    getResolutions: () => request('/voting/resolutions'),
    vote: (id: string, optionId: string) => request(`/voting/resolutions/${id}/vote`, { method: 'POST', body: JSON.stringify({ optionId }) }),
  },
  documents: {
    getAll: () => request('/documents'),
  },
  vendors: {
    getAll: () => request('/vendors'),
  },
  utilities: {
    getTankers: () => request('/utilities/tankers'),
    createTanker: (data: any) => request('/utilities/tankers', { method: 'POST', body: JSON.stringify(data) }),
    getDGLogs: () => request('/utilities/dg-logs'),
    createDGLog: (data: any) => request('/utilities/dg-logs', { method: 'POST', body: JSON.stringify(data) }),
    getEVSessions: () => request('/utilities/ev-sessions'),
  },
  clearances: {
    getAll: () => request('/clearances'),
    create: (data: any) => request('/clearances', { method: 'POST', body: JSON.stringify(data) }),
  },
};
