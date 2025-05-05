const apiBase = process.env.REACT_APP_API_BASE?.replace(/\/$/, ""); // remove trailing slash just in case

export const apiFetch = (path, opts = {}) =>
  fetch(`${apiBase}${path.startsWith('/') ? path : `/${path}`}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(opts.headers || {}),
    },
    credentials: 'include',
    ...opts,
  }).then((r) => r.json());
