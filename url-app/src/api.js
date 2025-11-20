const API_BASE =  'https://url-app-bnwh.onrender.com';

export async function fetchLinks() {
  const res = await fetch(`${API_BASE}/api/links`);
  if (!res.ok) throw new Error(`Failed to fetch links (${res.status})`);
  return res.json();
}

export async function createLink({ url, code }) {
  const res = await fetch(`${API_BASE}/api/links`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, code }),
  });
  if (res.status === 409) {
    const msg = await res.json().catch(() => ({}));
    throw new Error(msg.error || 'Code already exists');
  }
  if (!res.ok) {
    const msg = await res.json().catch(() => ({}));
    throw new Error(msg.error || `Failed to create (${res.status})`);
  }
  return res.json();
}

export async function deleteLink(code) {
  const res = await fetch(`${API_BASE}/api/links/${code}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`Failed to delete (${res.status})`);
  return res.json();
}

export async function getLinkStats(code) {
  const res = await fetch(`${API_BASE}/api/links/${code}`);
  if (res.status === 404) throw new Error('Not found');
  if (!res.ok) throw new Error(`Failed to load stats (${res.status})`);
  return res.json();
}
