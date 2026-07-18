const API_BASE = `${window.location.origin}/api`;

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || (error.errors && error.errors.join(', ')) || 'Request failed');
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}
