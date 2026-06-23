import React from "react";
import { Search } from "lucide-react";

export default function SearchBar({
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
            className="form-input"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            style={{ cursor: "pointer" }}
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
