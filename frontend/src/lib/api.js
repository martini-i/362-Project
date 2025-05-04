export const apiFetch = (path, opts = {}) =>
  fetch(`${import.meta.env.VITE_API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    ...opts,
  }).then(r => r.json());
