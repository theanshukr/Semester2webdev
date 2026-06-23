import React, { useState, useEffect } from "react";
import { 
  Compass, 
  Sun, 
  Moon, 
  AlertTriangle, 
  CheckCircle, 
  List, 
  PlusCircle, 
  Search, 
  MapPin, 
  Phone, 
  Calendar, 
  Trash2, 
  AlertCircle 
} from "lucide-react";
import "./App.css";

// ==========================================
// 1. HELPER COMPONENTS (All in one file for simplicity)
// ==========================================

/**
 * Navbar Component: Renders the site header, item stats, and dark/light mode toggle.
 */
function Navbar({ totalCount, lostCount, foundCount, darkMode, onToggleDarkMode }) {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Brand Logo & Name */}
        <div className="brand">
          <Compass size={28} style={{ color: "var(--accent-primary)" }} />
          <span>Campus Lost & Found</span>
        </div>
        
        {/* Stats and Theme Toggle Action Buttons */}
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
          
          {/* Dark Mode Switcher */}
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

/**
 * AddItemForm Component: Form allowing students to submit new lost/found reports.
 */
function AddItemForm({ onAddItem }) {
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [type, setType] = useState("Lost"); // Can be either "Lost" or "Found"
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Form inputs validation checks (easy for first-year Viva explanations)
    if (!itemName.trim()) {
      setError("Item Name is required.");
      return;
    }
    if (!location.trim()) {
      setError("Location is required.");
      return;
    }
    if (!contact.trim()) {
      setError("Contact number is required.");
      return;
    }

    // Phone format validation check (using simple Regular Expression)
    const phoneRegex = /^[+]?[0-9\s-]{7,15}$/;
    if (!phoneRegex.test(contact.trim())) {
      setError("Please enter a valid contact number.");
      return;
    }

    // Create unique item object (uses timestamp as unique ID)
    const newItem = {
      id: Date.now(),
      itemName: itemName.trim(),
      category,
      description: description.trim(),
      location: location.trim(),
      contact: contact.trim(),
      type
    };

    onAddItem(newItem);

    // Reset Form inputs after successful submit
    setItemName("");
    setCategory("Electronics");
    setDescription("");
    setLocation("");
    setContact("");
    setType("Lost");
  };

  return (
    <div className="glass-panel animate-fade-in">
      <h2 className="panel-title">
        <PlusCircle size={20} style={{ color: "var(--accent-primary)" }} />
        Report an Item
      </h2>
      
      <form onSubmit={handleSubmit}>
        {/* Error Alert Box */}
        {error && <div className="error-alert">{error}</div>}

        {/* Input: Report Type Segmented Control */}
        <div className="form-group">
          <label className="form-label">Report Type</label>
          <div className="type-segmented-control">
            <div 
              className={`type-option ${type === "Lost" ? "active lost" : ""}`}
              onClick={() => setType("Lost")}
            >
              Lost
            </div>
            <div 
              className={`type-option ${type === "Found" ? "active found" : ""}`}
              onClick={() => setType("Found")}
            >
              Found
            </div>
          </div>
        </div>

        {/* Input: Item Name */}
        <div className="form-group">
          <label className="form-label" htmlFor="itemName">Item Name *</label>
          <input
            id="itemName"
            type="text"
            className="form-input"
            placeholder="e.g. Leather Wallet, Student Card"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </div>

        {/* Input: Category Select Option */}
        <div className="form-group">
          <label className="form-label" htmlFor="category">Category</label>
          <select
            id="category"
            className="form-input pointer-cursor"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Electronics">Electronics & Gadgets</option>
            <option value="Accessories">Accessories (Wallets, Bags, Watches)</option>
            <option value="Documents">Documents & ID Cards</option>
            <option value="Books">Books & Stationery</option>
            <option value="Clothing">Clothing & Apparel</option>
            <option value="Keys">Keys</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Input: Location */}
        <div className="form-group">
          <label className="form-label" htmlFor="location">Location *</label>
          <input
            id="location"
            type="text"
            className="form-input"
            placeholder="e.g. Central Library, Cafe Area"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        {/* Input: Contact */}
        <div className="form-group">
          <label className="form-label" htmlFor="contact">Contact Number *</label>
          <input
            id="contact"
            type="tel"
            className="form-input"
            placeholder="e.g. 9876543210"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </div>

        {/* Input: Description */}
        <div className="form-group">
          <label className="form-label" htmlFor="description">Description</label>
          <textarea
            id="description"
            className="form-input"
            placeholder="Describe the item (color, brand, specific marks)..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button type="submit" className="btn-primary">
          Submit Report
        </button>
      </form>
    </div>
  );
}

/**
 * SearchBar Component: Contains search text field and filters.
 */
function SearchBar({
  searchQuery,
  onSearchQueryChange,
  selectedCategory,
  onCategoryChange,
  filterType,
  onFilterTypeChange,
}) {
  return (
    <div className="glass-panel search-container animate-fade-in">
      <div className="search-inputs">
        {/* Text Search Input */}
        <div className="search-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="form-input search-input-with-icon"
            placeholder="Search by item name..."
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
          />
        </div>

        {/* Category Filter dropdown */}
        <div className="category-select-wrapper">
          <select
            className="form-input pointer-cursor"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Accessories">Accessories</option>
            <option value="Documents">Documents & IDs</option>
            <option value="Books">Books & Stationery</option>
            <option value="Clothing">Clothing</option>
            <option value="Keys">Keys</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Tabs Filter for Lost / Found / All */}
      <div className="filter-tabs">
        <button
          className={`filter-tab ${filterType === "All" ? "active" : ""}`}
          onClick={() => onFilterTypeChange("All")}
        >
          All Items
        </button>
        <button
          className={`filter-tab ${filterType === "Lost" ? "active" : ""}`}
          onClick={() => onFilterTypeChange("Lost")}
        >
          Lost Items
        </button>
        <button
          className={`filter-tab ${filterType === "Found" ? "active" : ""}`}
          onClick={() => onFilterTypeChange("Found")}
        >
          Found Items
        </button>
      </div>
    </div>
  );
}

/**
 * ItemCard Component: Displays summary details for each reported item.
 */
function ItemCard({ item, onDelete }) {
  const { id, itemName, category, description, location, contact, type } = item;

  // Convert the timestamp ID into a readable date format
  const formattedDate = new Date(id).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className={`glass-panel item-card ${type === "Lost" ? "lost-card" : "found-card"} animate-fade-in`}>
      <span className="card-badge">{type}</span>
      <div className="card-category">{category}</div>
      <h3 className="card-title">{itemName}</h3>
      
      <p className="card-description">
        {description ? description : <i>No description provided.</i>}
      </p>
      
      {/* Details: Location and Phone */}
      <div className="card-detail-item">
        <MapPin size={15} />
        <span>📍 {location}</span>
      </div>
      
      <div className="card-detail-item">
        <Phone size={15} />
        <span>
          📞 <a href={`tel:${contact}`} className="contact-link">{contact}</a>
        </span>
      </div>

      {/* Card footer containing date and delete button */}
      <div className="card-footer">
        <span className="card-date">
          <Calendar size={12} className="calendar-icon" />
          {formattedDate}
        </span>
        <button 
          onClick={() => onDelete(id)} 
          className="btn-delete"
          title="Delete item report"
        >
          <Trash2 size={13} />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 2. MAIN APPLICATION COMPONENT
// ==========================================

function App() {
  // --- React State Hooks ---
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [darkMode, setDarkMode] = useState(false);

  // --- Load saved items from Browser LocalStorage on mount ---
  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("items")) || [];
    setItems(savedItems);
  }, []);

  // --- Apply system/stored Dark Mode theme on mount ---
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      setDarkMode(false);
      document.documentElement.removeAttribute("data-theme");
    }
  }, []);

  // --- Toggle Dark Mode theme ---
  const toggleDarkMode = () => {
    const nextMode = !darkMode;
    setDarkMode(nextMode);
    if (nextMode) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    }
  };

  // --- Create & Add Item ---
  const handleAddItem = (newItem) => {
    const updatedItems = [newItem, ...items];
    setItems(updatedItems);
    localStorage.setItem("items", JSON.stringify(updatedItems));
  };

  // --- Delete Item ---
  const handleDeleteItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem("items", JSON.stringify(updatedItems));
  };

  // --- Compute Summary Statistics ---
  const totalCount = items.length;
  const lostCount = items.filter((item) => item.type === "Lost").length;
  const foundCount = items.filter((item) => item.type === "Found").length;

  // --- Filter and Search logic ---
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;

    const matchesType = 
      filterType === "All" || item.type === filterType;

    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <Navbar
        totalCount={totalCount}
        lostCount={lostCount}
        foundCount={foundCount}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* Main Layout Grid */}
      <main className="main-content">
        {/* Left Section: Add Item Form */}
        <section className="sidebar-panel">
          <AddItemForm onAddItem={handleAddItem} />
        </section>

        {/* Right Section: Filters & Reported Items Grid */}
        <section className="items-section">
          {/* Search and Category Filter Bar */}
          <SearchBar
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            filterType={filterType}
            onFilterTypeChange={setFilterType}
          />

          {/* Dynamic title with item counts */}
          <div className="items-section-header">
            <h2>
              Reported Items ({filteredItems.length})
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="items-grid">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  onDelete={handleDeleteItem}
                />
              ))
            ) : (
              /* Empty State (when no items matched or list is empty) */
              <div className="glass-panel empty-state animate-fade-in">
                <div className="empty-state-icon">
                  <AlertCircle size={32} />
                </div>
                <h3 className="empty-state-title">No items found</h3>
                <p className="empty-state-desc">
                  {items.length === 0
                    ? "Try reporting a new lost or found item using the form on the left."
                    : "No items match your search or filter options. Try adjusting the query."}
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
