import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
const {notify} = require('../components/LinkForm.jsx');

const API_BASE = process.env.REACT_APP_API_BASE;

export default function RedirectPage() {
  const { code } = useParams();

  useEffect(() => {
    const url = `${API_BASE}/redirect/${code}`;
    window.location.replace(url);
    notify('Redirecting...');
  }, [code]);

  return (
    <div className="page">
      <div className="panel">
        <div className="panel-header"><h2>Redirecting…</h2></div>
        <div className="status">You will be redirected shortly. If not, <a href={`${API_BASE}/redirect/${code}`}>click here</a>.</div>
      </div>
    </div>
  );
}