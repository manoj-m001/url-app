import { Link } from 'react-router-dom'
import {notify}  from './LinkForm.jsx';

function formatTime(t) {
  if (!t) return '—';
  try {
    const d = new Date(t);
    return d.toLocaleString();
  } catch {
    return String(t);
  }
}

export default function LinkTable({ items, onDelete, sortBy, sortDir, onToggleSort }) {
  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      notify('Copied to clipboard');
    } catch (e) {
      console.error('Copy failed', e);
      notify('Failed to copy');
    }
  }

  function SortButton({ field, children }) {
    const active = sortBy === field;
    return (
      <button className={`table-sort ${active ? 'active' : ''}`} onClick={() => onToggleSort(field)}>
        {children} {active ? (sortDir === 'asc' ? '▲' : '▼') : ''}
      </button>
    );
  }

  return (
    <div className="table-wrapper">

      <table className="table">
        <thead>
          <tr>
            <th><SortButton field="code">Short code</SortButton></th>
            <th>short URL</th>
            <th><SortButton field="total_clicks">Total clicks</SortButton></th>
            <th><SortButton field="last_clicked">Last clicked</SortButton></th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((l) => {
            const shortUrl = l.short_url || `${window.location.origin}/${l.code}`;
            return (
              <tr key={l.code}>
                <td>
                  <Link to={`/code/${l.code}`} className="code-link">{l.code}</Link>
                </td>
                <td>
                  <div className="truncate" title={shortUrl}>{shortUrl}</div>
                </td>
                <td>{l.total_clicks}</td>
                <td>{formatTime(l.last_clicked)}</td>
                <td>
                  <div className="row-actions">
                    <button className="button" onClick={() => copyText(shortUrl)}>Copy</button>
                    <a className="button" onClick={()=>notify('redirecting')} href={shortUrl} target="_blank" rel="noreferrer">Open</a>
                    <button className="button danger" onClick={() => onDelete(l.code)}>Delete</button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}