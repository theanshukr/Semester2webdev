import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import AddItemForm from "./components/AddItemForm";
import SearchBar from "./components/SearchBar";
import ItemCard from "./components/ItemCard";
import { AlertCircle } from "lucide-react";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [darkMode, setDarkMode] = useState(false);

  // Load items from local storage on mount
  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("items")) || [];
    setItems(savedItems);
  }, []);

  // Load and apply system or user dark mode theme on mount
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

  // Sync theme changes
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

  // Add Item handler
  const handleAddItem = (newItem) => {
    const updatedItems = [newItem, ...items];
    setItems(updatedItems);
    localStorage.setItem("items", JSON.stringify(updatedItems));
  };

  // Delete Item handler
  const handleDeleteItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem("items", JSON.stringify(updatedItems));
  };

  // Compute stat metrics
  const totalCount = items.length;
  const lostCount = items.filter((item) => item.type === "Lost").length;
  const foundCount = items.filter((item) => item.type === "Found").length;

  // Filter items based on search name, selected category, and active type tab
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
        {/* Left Side: Report Form */}
        <section className="sidebar-panel">
          <AddItemForm onAddItem={handleAddItem} />
        </section>

        {/* Right Side: Filters & Dashboard cards list */}
        <section style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <SearchBar
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            filterType={filterType}
            onFilterTypeChange={setFilterType}
          />

          <div className="items-section-header">
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.25rem" }}>
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
