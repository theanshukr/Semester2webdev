import React, { useState } from "react";
import { PlusCircle } from "lucide-react";

export default function AddItemForm({ onAddItem }) {
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [type, setType] = useState("Lost"); // Lost or Found
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Simple validation checks
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

    // Phone format regex helper (accepts standard formats)
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

    // Reset Form fields
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
        {error && (
          <div style={{
            color: "var(--lost-color)",
            background: "var(--lost-bg)",
            border: "1px solid var(--lost-border)",
            padding: "0.75rem",
            borderRadius: "0.5rem",
            fontSize: "0.8rem",
            fontWeight: "600",
            marginBottom: "1rem"
          }}>
            {error}
          </div>
        )}

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
            className="form-input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ appearance: "none", cursor: "pointer" }}
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
