import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import StatsPage from "./pages/StatsPage";
import RedirectPage from "./pages/RedirectPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <header className="app-header">
          <div className="header-inner">
            <Link to="/" className="brand">
              TinyLink
            </Link>
            <nav>
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
              <Link
                to="https://github.com/manoj-m001/url-app"
                className="nav-link"
              >
                 <FontAwesomeIcon icon={faGithub} size="lg" />
              </Link>
            </nav>
          </div>
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/code/:code" element={<StatsPage />} />
            <Route path="/:code" element={<RedirectPage />} />
          </Routes>
        </main>
        <footer className="app-footer">
          <div className="footer-inner">© TinyLink • v1.0</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
