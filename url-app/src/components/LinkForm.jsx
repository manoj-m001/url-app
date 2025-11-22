import { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';


function isValidUrl(url) {
  try {
    const u = new URL(url);
    return !!u.protocol && !!u.host;
  } catch (e) {
    return false;
  }
}

function isValidCode(code) {
  return /^[A-Za-z0-9]{6,8}$/.test(code);
}
export const notify = (msg) => toast(msg, { duration: 3000 });
export default function LinkForm({ onSubmit }) {
  const [url, setUrl] = useState(() => localStorage.getItem('tl_form_url') || '');
  const [code, setCode] = useState(() => localStorage.getItem('tl_form_code') || '');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!isValidUrl(url)) {
      setError('Please enter a valid URL');
      return;
    }
    if (code && !isValidCode(code)) {
      setError('Code must be 6–8 letters or digits');
      return;
    }
    setSubmitting(true);
    try {
      await onSubmit({ url, code: code || undefined });
      setUrl('');
      setCode('');
      localStorage.removeItem('tl_form_url');
      localStorage.removeItem('tl_form_code');
      notify('Link created');
    } catch (e) {
      setError(e.message || 'Failed to create');
      notify('Failed to create link');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
            <Toaster position="bottom-left" reverseOrder={false} />

      <div className="form-row">
        <label className="label">Target URL</label>
        <input
          className="input"
          type="url"
          placeholder="https://example.com/docs"
          value={url}
          onChange={(e) => { setUrl(e.target.value); localStorage.setItem('tl_form_url', e.target.value); }}
          required
        />
      </div>
      <div className="form-row">
        <label className="label">Custom code (optional)</label>
        <input
          className="input"
          type="text"
          placeholder="6–8 letters or digits"
          value={code}
          onChange={(e) => { setCode(e.target.value); localStorage.setItem('tl_form_code', e.target.value); }}
        />
      </div>
      {error && <div className="status error">{error}</div>}
      <div className="form-actions">
        <button className="button primary" type="submit" disabled={submitting}>
          {submitting ? 'Creating…' : 'Create link'}
        </button>
      </div>
    </form>
  );
}