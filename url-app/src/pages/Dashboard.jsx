import { useEffect, useMemo, useRef, useState } from "react";
import { createLink, deleteLink, fetchLinks } from "../api";
import LinkForm from "../components/LinkForm";
import LinkTable from "../components/LinkTable";
import {notify } from '../components/LinkForm.jsx';

export default function Dashboard() {
  const [links, setLinks] = useState(() => {
    try {
      const raw = localStorage.getItem('tl_links');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState(() => localStorage.getItem('tl_filter') || "");
  const [sortBy, setSortBy] = useState(() => localStorage.getItem('tl_sortBy') || "created_at");
  const [sortDir, setSortDir] = useState(() => localStorage.getItem('tl_sortDir') || "desc");
  const hasLoaded = useRef(false);

  // Persist UI preferences
  useEffect(() => { localStorage.setItem('tl_filter', filter); }, [filter]);
  useEffect(() => { localStorage.setItem('tl_sortBy', sortBy); }, [sortBy]);
  useEffect(() => { localStorage.setItem('tl_sortDir', sortDir); }, [sortDir]);

  // Fetch links on mount; prehydrate from localStorage instantly
  useEffect(() => {
    if (hasLoaded.current) return;
    setLoading(false); // we already have prehydrated links; show immediately

    const load = async () => {
      setError("");
      try {
        const data = await fetchLinks();
        setLinks(data);
        localStorage.setItem('tl_links', JSON.stringify(data));
        notify('Links updated');

      } catch (e) {
        setError(e.message || "Failed to load");
        notify('Failed to update links');
      }
    };
    load();
    hasLoaded.current = true;
  }, []);

  // Separate function for refresh button
  async function handleRefresh() {
    setError("");
    try {
      const data = await fetchLinks();
      setLinks(data);
      localStorage.setItem('tl_links', JSON.stringify(data));
      notify('Links updated');
    } catch (e) {
      setError(e.message || "Failed to load");
      notify('Failed to update links');
    }
  }

  async function handleCreate({ url, code }) {
    setError("");
    try {
      const created = await createLink({ url, code });
      setLinks((prev) => {
        const next = [
          {
            code: created.code,
            target_url: url,
            short_url: created.shortUrl,
            total_clicks: 0,
            last_clicked: null,
            created_at: new Date().toISOString(),
          },
          ...prev,
        ];
        localStorage.setItem('tl_links', JSON.stringify(next));
        notify('Link created');
        return next;
      });
    } catch (e) {
      setError(e.message || "Failed to create");
    }
  }

  async function handleDelete(code) {
    setError("");
    try {
      await deleteLink(code);
      setLinks((prev) => {
        const next = prev.filter((l) => l.code !== code);
        localStorage.setItem('tl_links', JSON.stringify(next));
        notify('Link deleted');
        return next;
      });
    } catch (e) {
      setError(e.message || "Failed to delete");
      notify('Failed to delete link');
    }
  }

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    let arr = links;
    if (q) {
      arr = arr.filter(
        (l) =>
          l.code.toLowerCase().includes(q) ||
          (l.target_url || "").toLowerCase().includes(q)
      );
    }
    arr = [...arr].sort((a, b) => {
      let av = a[sortBy];
      let bv = b[sortBy];
      if (sortBy === "created_at" || sortBy === "last_clicked") {
        av = av ? new Date(av).getTime() : 0;
        bv = bv ? new Date(bv).getTime() : 0;
      }
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return arr;
  }, [links, filter, sortBy, sortDir]);

  function onToggleSort(field) {
    if (sortBy === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortDir("asc");
    }
  }

  return (
    <div className="page">
      <div className="panel">
        <h2>Create a short link</h2>
        <LinkForm onSubmit={handleCreate} />
      </div>

      <div className="panel">
        <div className="panel-header">
          <h2>Links</h2>
          <input
            className="input"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter by code or URL"
          />
          <button className="button" onClick={handleRefresh} disabled={loading}>
            Refresh
          </button>
        </div>
        {error && <div className="status error">{error}</div>}
        {filtered.length === 0 && links.length === 0 && !error && (
          <div className="status">No links yet. Create your first above!</div>
        )}
        {filtered.length === 0 && links.length > 0 && !error && (
          <div className="status">No matching links found.</div>
        )}
        {filtered.length > 0 && (
          <LinkTable
            items={filtered}
            onDelete={handleDelete}
            sortBy={sortBy}
            sortDir={sortDir}
            onToggleSort={onToggleSort}
          />
        )}
      </div>
    </div>
  );
}
