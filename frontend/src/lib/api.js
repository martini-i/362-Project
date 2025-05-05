const apiBase = process.env.REACT_APP_API_BASE;

export const apiFetch = (path, opts = {}) =>
  fetch(`${apiBase}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(opts.headers || {}),
    },
    credentials: 'include',
    ...opts,
  }).then((r) => r.json());
