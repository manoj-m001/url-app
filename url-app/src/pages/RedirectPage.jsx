import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const API_BASE = 'https://url-app-bnwh.onrender.com';

export default function RedirectPage() {
  const { code } = useParams();

  useEffect(() => {
    const url = `${API_BASE}/${code}`;
    window.location.replace(url);
  }, [code]);

  return (
    <div className="page">
      <div className="panel">
        <div className="panel-header"><h2>Redirecting…</h2></div>
        <div className="status">You will be redirected shortly. If not, <a href={`${API_BASE}/${code}`}>click here</a>.</div>
      </div>
    </div>
  );
}