import { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { getLinkStats } from '../api';
import SpotlightCard from './SpotlightCard';
export default function StatsPage() {
  const { code } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError('');
    getLinkStats(code)
      .then((d) => {
        if (mounted) setData(d);
      })
      .catch((e) => {
        if (mounted) setError(e.message || 'Failed to load stats');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => { mounted = false; };
  }, [code]);

  return (
        <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.3)">
    
    <div className="page">
      <div className="panel">
        <div className="panel-header">
          <h2>Stats for <span className="mono">{code}</span></h2>
          <RouterLink className="button" to="/dashboard">Back</RouterLink>
        </div>
        {loading && <div className="status">Loading…</div>}
        {error && <div className="status error">{error}</div>}
        {!loading && !error && data && (
          <div className="stats-grid">
            <div className="stat">
              <div className="stat-label">Target URL</div>
              <div className="truncate" title={data.target_url}>{data.target_url}</div>
            </div>
            <div className="stat">
              <div className="stat-label">Total clicks</div>
              <div className="stat-value">{data.total_clicks}</div>
            </div>
            <div className="stat">
              <div className="stat-label">Last clicked</div>
              <div className="stat-value">{data.last_clicked ? new Date(data.last_clicked).toLocaleString() : '—'}</div>
            </div>
            <div className="stat">
              <div className="stat-label">Created</div>
              <div className="stat-value">{new Date(data.created_at).toLocaleString()}</div>
            </div>
            <div className="stat">
              <div className="stat-label">Short URL</div>
              <div className="stat-value">
                <a href={data.short_url || `/${code}`} target="_blank" rel="noreferrer">
                  {data.short_url || `${window.location.origin}/${code}`}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </SpotlightCard>
  );
}