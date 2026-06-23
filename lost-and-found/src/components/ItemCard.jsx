import React from "react";
import { MapPin, Phone, Calendar, Trash2 } from "lucide-react";

export default function ItemCard({ item, onDelete }) {
  const { id, itemName, category, description, location, contact, type } = item;

  // Format the id (which is Date.now() timestamp) to a readable date
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
        <span>📞 <a href={`tel:${contact}`} style={{ color: "inherit", textDecoration: "none" }}>{contact}</a></span>
      </div>

      <div className="card-footer">
        <span className="card-date">
          <Calendar size={12} style={{ display: "inline", marginRight: "4px", verticalAlign: "middle" }} />
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
