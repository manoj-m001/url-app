import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import StatsPage from './pages/StatsPage';
import RedirectPage from './pages/RedirectPage';
function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <header className="app-header">
          <div className="header-inner">
            <h1 className="brand">TinyLink</h1>
            <nav>
              <Link to="/" className="nav-link">Dashboard</Link>
            </nav>
          </div>
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
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
