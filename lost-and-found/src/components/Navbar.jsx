import React from "react";
import { Compass, Sun, Moon, AlertTriangle, CheckCircle, List } from "lucide-react";

export default function Navbar({
  totalCount,
  lostCount,
  foundCount,
  darkMode,
  onToggleDarkMode,
}) {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="brand">
          <Compass size={28} style={{ color: "var(--accent-primary)" }} />
          <span>Campus Lost & Found</span>
        </div>
        
        <div className="nav-actions">
          <div className="nav-stats">
            <div className="stat-pill" title="Total reported items">
              <List size={14} />
              <span>{totalCount} Total</span>
            </div>
            <div className="stat-pill lost-pill" title="Lost items count">
              <AlertTriangle size={14} />
              <span>{lostCount} Lost</span>
            </div>
            <div className="stat-pill found-pill" title="Found items count">
              <CheckCircle size={14} />
              <span>{foundCount} Found</span>
            </div>
          </div>
          
          <button 
            onClick={onToggleDarkMode} 
            className="theme-toggle"
            aria-label="Toggle theme"
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
