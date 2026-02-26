// simple wrapper for backend API calls
const BASE = process.env.REACT_APP_API_BASE || '';

export async function login(identifier) {
  const resp = await fetch(`${BASE}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier }),
  });
  return resp.json();
}

export async function verifyDevice(payload) {
  const resp = await fetch(`${BASE}/api/verify-device`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return resp.json();
}

export async function verifyLecture(payload) {
  const resp = await fetch(`${BASE}/api/verify-lecture`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return resp.json();
}

export async function recordAttendance(payload) {
  const resp = await fetch(`${BASE}/api/record-attendance`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return resp.json();
}
