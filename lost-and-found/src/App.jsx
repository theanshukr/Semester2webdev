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

function Navbar({ totalCount, lostCount, foundCount, darkMode, onToggleDarkMode }) {
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

function AddItemForm({ onAddItem }) {
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [type, setType] = useState("Lost");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

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

    const phoneRegex = /^[+]?[0-9\s-]{7,15}$/;
    if (!phoneRegex.test(contact.trim())) {
      setError("Please enter a valid contact number.");
      return;
    }

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
        {error && <div className="error-alert">{error}</div>}

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

function ItemCard({ item, onDelete }) {
  const { id, itemName, category, description, location, contact, type } = item;

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

function App() {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("items")) || [];
    setItems(savedItems);
  }, []);

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

  const handleAddItem = (newItem) => {
    const updatedItems = [newItem, ...items];
    setItems(updatedItems);
    localStorage.setItem("items", JSON.stringify(updatedItems));
  };

  const handleDeleteItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem("items", JSON.stringify(updatedItems));
  };

  const totalCount = items.length;
  const lostCount = items.filter((item) => item.type === "Lost").length;
  const foundCount = items.filter((item) => item.type === "Found").length;

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
      <Navbar
        totalCount={totalCount}
        lostCount={lostCount}
        foundCount={foundCount}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      <main className="main-content">
        <section className="sidebar-panel">
          <AddItemForm onAddItem={handleAddItem} />
        </section>

        <section className="items-section">
          <SearchBar
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            filterType={filterType}
            onFilterTypeChange={setFilterType}
          />

          <div className="items-section-header">
            <h2>
              Reported Items ({filteredItems.length})
            </h2>
          </div>

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
