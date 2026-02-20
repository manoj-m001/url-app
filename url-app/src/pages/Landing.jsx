import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";
export default function Landing() {
  return (
    <div className="landing">
      <section className="hero">
        <div className="hero-content">
          <h2>One click to cleaner links
          </h2>
          
          <p className="hero-subtitle">
            Turn long, messy URLs into short, trusted links with instant stats.
            Built to be fast, simple, and easy.
          </p>
          <div className="hero-actions">
            <Link to="/dashboard" className="button primary">
              Create a link
            </Link>
            <Link to="/dashboard" className="button">
              View dashboard
            </Link>
          </div>
          <div className="hero-meta">
            No sign-in • Clean redirects • Click tracking
          </div>
        </div>

        <div className="hero-card panel">
          <div className="hero-card-header">
            <span className="pill">Live Preview</span>
            <span className="pill ghost">tiny.lk/clean</span>
          </div>
          <div className="hero-card-body">
            <div className="kv">
              <span className="label">Original</span>
              <span className="mono truncate">
                https://example.com/portfolio/resume/projects?utm_source=resume
              </span>
            </div>
            <div className="kv">
              <span className="label">Short</span>
              <span className="mono">url-app-nine.vercel.app/clean</span>
            </div>
            <div className="hero-stats">
              <div>
                <div className="stat-value">2917</div>
                <div className="stat-label">Clicks</div>
              </div>
              <div>
                <div className="stat-value">500ms</div>
                <div className="stat-label">Avg. redirect</div>
              </div>
              <div>
                <div className="stat-value">Today</div>
                <div className="stat-label">Last hit</div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-glow glow-a" />
        <div className="hero-glow glow-b" />
      </section>

      <section className="feature-grid">
        <div className="feature-card panel">
          <h3>Smart defaults</h3>
          <p>Create short links in seconds, with the option to customize them your way. The clean, intuitive interface keeps everything organized and easy to share.
          </p>
        </div>
        <div className="feature-card panel">
          <h3>Actionable stats</h3>
          <p>
                     Track total clicks and recent activity in one place. Stay informed about how your links are performing at any time. </p>

        </div>
        <div className="feature-card panel">
          <h3>Fast refresh</h3>
          <p>
         Experience real-time updates with smooth refresh controls and local caching, ensuring fast performance every time you visit. </p>
        </div>
      </section>

      <section className="cta panel">
        <div>
          <h3>Ready to ship cleaner links?</h3>
          <p>
            Start shortening in one click and keep your URLs polished.
          </p>
        </div>
        <Link to="/dashboard" className="button primary">
          Open dashboard{"   "}
<FontAwesomeIcon icon={faAnglesRight} fade size="lg"/>    
</Link>
</section>
    </div>
  );
}
